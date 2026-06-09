import { EmailMessage } from "cloudflare:email";

const CONTACT_PATH = "/api/contact";
const RECIPIENT_EMAIL = "acaringadulthome@gmail.com";
const SENDER_EMAIL = "inquiries@acaringadulthome.com";
const SUCCESS_MESSAGE = "Thank you. Your inquiry has been sent.";
const FAILURE_MESSAGE = "We could not send your inquiry. Please call or email us directly.";

const LIMITS = {
  name: 100,
  email: 150,
  phone: 50,
  preferred_contact: 80,
  inquiry_role: 80,
  inquiry_type: 80,
  hear_about: 80,
  message: 2000
};

function jsonResponse(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...headers
    }
  });
}

function trimValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasOversizedField(fields) {
  return Object.entries(LIMITS).some(([key, limit]) => fields[key].length > limit);
}

function escapeHeader(value) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildEmailText(fields) {
  return [
    "New website inquiry received.",
    "",
    "Name:",
    fields.name,
    "",
    "Email:",
    fields.email,
    "",
    "Phone:",
    fields.phone,
    "",
    "Preferred contact method:",
    fields.preferred_contact || "Not provided",
    "",
    "Role:",
    fields.inquiry_role,
    "",
    "Inquiry type:",
    fields.inquiry_type,
    "",
    "How did they hear about us?:",
    fields.hear_about || "Not provided",
    "",
    "Message:",
    fields.message,
    "",
    "Submitted from:",
    "ACaring Adult Home website",
    "",
    "Privacy reminder:",
    "This form is intended for general inquiries only. Sensitive medical, Medicaid, Social Security, or detailed health information should not be submitted through this form."
  ].join("\n");
}

function buildRawEmail(fields) {
  const subject = "New Website Inquiry - ACaring Adult Home";
  const body = buildEmailText(fields);

  return [
    `From: ACaring Adult Home Website <${SENDER_EMAIL}>`,
    `To: ${RECIPIENT_EMAIL}`,
    `Reply-To: ${escapeHeader(fields.email)}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
    "",
    body
  ].join("\r\n");
}

function isValidSubmission(fields) {
  return (
    fields.name &&
    fields.email &&
    fields.phone &&
    fields.inquiry_role &&
    fields.inquiry_type &&
    fields.message &&
    isValidEmail(fields.email) &&
    !hasOversizedField(fields)
  );
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname !== CONTACT_PATH) {
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 404);
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { ok: false, message: FAILURE_MESSAGE },
        405,
        { allow: "POST" }
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");

    if (contentLength > 12000) {
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 413);
    }

    let formData;

    try {
      formData = await request.formData();
    } catch (error) {
      console.error("Contact form parse failed.");
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
    }

    if (trimValue(formData.get("website"))) {
      return jsonResponse({ ok: true, message: SUCCESS_MESSAGE });
    }

    const fields = {
      name: trimValue(formData.get("name")),
      email: trimValue(formData.get("email")),
      phone: trimValue(formData.get("phone")),
      preferred_contact: trimValue(formData.get("preferred_contact")),
      inquiry_role: trimValue(formData.get("inquiry_role")),
      inquiry_type: trimValue(formData.get("inquiry_type")),
      hear_about: trimValue(formData.get("hear_about")),
      message: trimValue(formData.get("message"))
    };

    if (!isValidSubmission(fields)) {
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
    }

    if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
      console.error("Missing Cloudflare EMAIL binding for contact form.");
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
    }

    try {
      const email = new EmailMessage(
        SENDER_EMAIL,
        RECIPIENT_EMAIL,
        buildRawEmail(fields)
      );

      await env.EMAIL.send(email);
    } catch (error) {
      console.error("Contact email send failed.");
      return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
    }

    return jsonResponse({ ok: true, message: SUCCESS_MESSAGE });
  }
};
