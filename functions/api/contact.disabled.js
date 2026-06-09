const RECIPIENT_EMAIL = "inquiries@acaringadulthome.com";
const SENDER_EMAIL = "inquiries@acaringadulthome.com";
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

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  });
}

function trimValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function tooLong(fields) {
  return Object.entries(LIMITS).some(([key, limit]) => fields[key].length > limit);
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
    "Inquiry Type:",
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

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");

  if (contentLength > 12000) {
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 413);
  }

  let formData;

  try {
    formData = await request.formData();
  } catch (error) {
    console.error("Contact form parse failed:", error);
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
  }

  if (trimValue(formData.get("website"))) {
    return jsonResponse({ ok: true, message: "Thank you. Your inquiry has been sent." });
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

  if (
    !fields.name ||
    !fields.email ||
    !fields.phone ||
    !fields.inquiry_role ||
    !fields.inquiry_type ||
    !fields.message ||
    !isValidEmail(fields.email) ||
    tooLong(fields)
  ) {
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 400);
  }

  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    console.error("Missing Cloudflare EMAIL binding for contact form.");
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
  }

  try {
    await env.EMAIL.send({
      to: RECIPIENT_EMAIL,
      from: { email: SENDER_EMAIL, name: "ACaring Adult Home Website" },
      replyTo: fields.email,
      subject: "New Website Inquiry - ACaring Adult Home",
      text: buildEmailText(fields)
    });
  } catch (error) {
    console.error("Contact email send failed:", error && error.code, error && error.message);
    return jsonResponse({ ok: false, message: FAILURE_MESSAGE }, 500);
  }

  return jsonResponse({ ok: true, message: "Thank you. Your inquiry has been sent." });
}
