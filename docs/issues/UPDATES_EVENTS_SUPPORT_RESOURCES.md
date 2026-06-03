# Codex Task: Build “Updates, Events & Support Resources” Page for ACaring Adult Home Website

## Issue Tracking Note

Status: Open / not implemented yet.

Date noted: 2026-06-02.

Recommended implementation path:

- Create a new `updates.html` page instead of overloading the current `events.html` page.
- Update the visible navigation label from `Updates` or `Events` to `Updates & Resources` once the page exists.
- Keep the page static for phase 1; do not add `data/resources.json` or automation until the page content is stable.
- Preserve all external-link disclaimers and emergency language from this task.
- Verify external URLs before implementation because public agency URLs and event pages can change.

Dependency / sequencing note:

- Finish or commit the current contact workflow and Location + Contact layout changes before starting this issue, so this larger page build can be reviewed in its own PR.
- Keep this issue separate from the pending `docs/CODEX_INSTRUCTIONS.md` local change unless that change is intentionally part of a documentation PR.

Acceptance criteria summary:

- New `updates.html` renders as a calm resource hub.
- Navigation works from every public page.
- Each major resource section includes appropriate disclaimers.
- Emergency guidance clearly says to call `911` for immediate danger and call/text `988` for crisis support.
- External links use `target="_blank" rel="noopener noreferrer"`.
- The page does not imply legal, medical, emergency, eligibility, or regulatory advice.

---

## Objective

Build a polished, trustworthy, and easy-to-navigate website page for ACaring Adult Home called:

**Updates, Events & Support Resources**

This page should serve as a curated resource hub for:

* Washington adult family home regulatory updates
* DSHS / RCS / ALTSA provider notices
* Adult Family Home Council events and trainings
* Federal Way community events and senior activities
* Resident and family support resources
* Best-practice reminders for care, safety, documentation, and communication

The page must feel calm, professional, warm, and trustworthy. It should not look like a random news feed. It should look like a curated community and care-resource directory.

---

## Page File Decision

Use one of these approaches:

### Preferred

Create a new page:

```text
updates.html
```

Then add it to the site navigation as:

```text
Updates & Resources
```

### Alternative

If the existing site already has `events.html`, convert that page into the new resource hub and update navigation label from:

```text
Events
```

to:

```text
Updates & Resources
```

Do not remove existing useful content from `events.html`; instead, reorganize and improve it.

---

## Navigation Update

Update the main navigation across all pages to include:

```html
<a href="updates.html">Updates & Resources</a>
```

If keeping the existing `events.html` file, use:

```html
<a href="events.html">Updates & Resources</a>
```

Make sure the active/current page state still works if the project already uses active navigation styling.

---

## Page Title / SEO

Use the following metadata:

```html
<title>Updates & Resources | ACaring Adult Home</title>
<meta name="description" content="Helpful updates, community resources, resident support links, trainings, and official adult family home resources for families, residents, caregivers, and community partners in Federal Way, Washington.">
```

---

## Page Hero Section

Add a calm hero section at the top of the page.

### Hero content

```html
<section class="page-hero updates-hero">
  <div class="container">
    <p class="eyebrow">Updates & Community Resources</p>
    <h1>Helpful updates, trusted resources, and community support in one place.</h1>
    <p class="hero-lead">
      A curated resource page for families, residents, caregivers, and community partners looking for adult family home updates, local events, resident support, and helpful care-related information.
    </p>
  </div>
</section>
```

### Tone

The page should not sound like legal advice, medical advice, or official government interpretation. It should sound like:

* “Here are useful resources”
* “Here are official places to verify information”
* “Here are local support options”
* “Here are helpful reminders”

---

# Page Layout

Build the page using the following major sections:

1. Important Notice / Disclaimer Banner
2. Latest AFH Updates
3. Training & Provider Events
4. Federal Way Community Events
5. Resident & Family Support Directory
6. Activities & Community Engagement
7. Monthly Care Reminders
8. Emergency / Immediate Support Notice
9. Final Disclaimer

---

# Section 1: Important Notice / Disclaimer Banner

Place this near the top, below the hero.

```html
<section class="notice-section">
  <div class="container">
    <div class="notice-card">
      <h2>Important Notice</h2>
      <p>
        This page is provided for general information and convenience only. ACaring Adult Home does not provide legal, medical, regulatory, or emergency advice through this page. External resources should be confirmed directly with the issuing agency or organization.
      </p>
      <p>
        For immediate danger or a life-threatening emergency, call <strong>911</strong>. For emotional or mental health crisis support, call or text <strong>988</strong>.
      </p>
    </div>
  </div>
</section>
```

---

# Section 2: Latest AFH Updates

Purpose: Provide quick access to official adult family home regulatory and provider-update sources.

Use cards.

```html
<section class="resource-section" id="latest-afh-updates">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Official Updates</p>
      <h2>Latest Adult Family Home Updates</h2>
      <p>
        Official sources for adult family home providers, families, and community partners who want to stay informed about Washington State care-setting guidance and licensing-related information.
      </p>
    </div>

    <div class="resource-grid">
      <article class="resource-card">
        <span class="resource-tag">DSHS / AFH Providers</span>
        <h3>Information for Adult Family Home Providers</h3>
        <p>
          Official Washington State DSHS page for adult family home provider information, licensing resources, resident rights, forms, and related guidance.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/residential-care-services/information-adult-family-home-providers" target="_blank" rel="noopener noreferrer">
          View official DSHS provider page
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Provider Letters</span>
        <h3>ALTSA / RCS Provider & Administrator Letters</h3>
        <p>
          Official provider letters and notices from Washington State Aging and Long-Term Support Administration and Residential Care Services.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/residential-care-services/altsa-provider-letters" target="_blank" rel="noopener noreferrer">
          View provider letters
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">WAC Reference</span>
        <h3>Chapter 388-76 WAC</h3>
        <p>
          Washington Administrative Code chapter for adult family home minimum licensing requirements. Use this as an official reference source.
        </p>
        <a href="https://app.leg.wa.gov/wac/default.aspx?cite=388-76" target="_blank" rel="noopener noreferrer">
          View WAC 388-76
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">RCS Oversight</span>
        <h3>Residential Care Services</h3>
        <p>
          Official DSHS Residential Care Services information for licensed residential care settings, including adult family homes.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/residential-care-services/residential-care-services" target="_blank" rel="noopener noreferrer">
          View Residential Care Services
        </a>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> This section links to official public resources for convenience. ACaring Adult Home does not interpret, replace, or guarantee regulatory guidance. Always confirm requirements directly with DSHS, RCS, ALTSA, WAC, or the appropriate issuing agency.
      </p>
    </div>
  </div>
</section>
```

---

# Section 3: Training & Provider Events

Purpose: Provide quick links to provider trainings, networking, AFHC events, and professional education.

```html
<section class="resource-section alt-section" id="training-events">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Training & Provider Events</p>
      <h2>Adult Family Home Trainings, Meetings, and Provider Events</h2>
      <p>
        Helpful links for adult family home providers and caregivers looking for trainings, meetings, professional updates, and networking opportunities.
      </p>
    </div>

    <div class="resource-grid">
      <article class="resource-card">
        <span class="resource-tag">AFHC Events</span>
        <h3>Adult Family Home Council Events</h3>
        <p>
          Upcoming AFH meetings, trainings, webinars, forums, networking events, and chapter meetings hosted or listed by the Adult Family Home Council.
        </p>
        <a href="https://adultfamilyhomecouncil.org/events" target="_blank" rel="noopener noreferrer">
          View AFHC events
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">AFHC News</span>
        <h3>Adult Family Home Council News</h3>
        <p>
          Provider-focused news, articles, and updates from the Adult Family Home Council.
        </p>
        <a href="https://adultfamilyhomecouncil.org/news" target="_blank" rel="noopener noreferrer">
          View AFHC news
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Training Requirements</span>
        <h3>DSHS Training Requirements for Adult Family Homes</h3>
        <p>
          DSHS training requirement information for adult family home settings, including orientation, safety training, basic training, and specialty training topics.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/training/training-requirements-adult-family-homes" target="_blank" rel="noopener noreferrer">
          View DSHS training requirements
        </a>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> Training availability, registration requirements, fees, eligibility, and dates may change. ACaring Adult Home does not control external training schedules. Please verify directly with the listed organization before relying on event details.
      </p>
    </div>
  </div>
</section>
```

---

# Section 4: Federal Way Community Events

Purpose: Support local engagement and show that ACaring Adult Home is connected to the Federal Way community.

```html
<section class="resource-section" id="federal-way-events">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Federal Way Community</p>
      <h2>Federal Way Meetings, Events, and Community Updates</h2>
      <p>
        Local resources for families, residents, and community partners who want to stay aware of city meetings, public events, and community activities in Federal Way.
      </p>
    </div>

    <div class="resource-grid">
      <article class="resource-card">
        <span class="resource-tag">City Calendar</span>
        <h3>City of Federal Way Calendar</h3>
        <p>
          Public city calendar listing meetings, local events, and city activities.
        </p>
        <a href="https://www.federalwaywa.gov/calendar/event-list" target="_blank" rel="noopener noreferrer">
          View city calendar
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Meetings & Agendas</span>
        <h3>Federal Way Meetings and Agendas</h3>
        <p>
          City Council, committee, advisory body, and public meeting information.
        </p>
        <a href="https://www.federalwaywa.gov/page/meetings-and-agendas" target="_blank" rel="noopener noreferrer">
          View meetings and agendas
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Recreation</span>
        <h3>Federal Way Recreation & Cultural Services</h3>
        <p>
          Information about community recreation, senior programs, wellness activities, trips, classes, and drop-in activities.
        </p>
        <a href="https://www.federalwaywa.gov/page/recreation-cultural-services" target="_blank" rel="noopener noreferrer">
          View recreation services
        </a>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> Community events, public meeting dates, times, locations, and participation rules may change. ACaring Adult Home provides these links for convenience only and does not control city schedules or public-agency content.
      </p>
    </div>
  </div>
</section>
```

---

# Section 5: Resident & Family Support Directory

Purpose: This is the most important support-resource section. It should be very easy to scan.

Use category cards.

```html
<section class="resource-section alt-section" id="resident-family-support">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Resident & Family Support</p>
      <h2>Support Resources for Residents and Families</h2>
      <p>
        Quick links to resident advocacy, safety reporting, developmental disability services, dementia support, crisis support, and basic community needs.
      </p>
    </div>

    <div class="resource-grid support-grid">
      <article class="resource-card">
        <span class="resource-tag">Resident Rights</span>
        <h3>Washington State Long-Term Care Ombudsman</h3>
        <p>
          Advocacy and support for residents of adult family homes, assisted living facilities, and nursing homes. Helpful for resident rights, concerns, questions, and referrals.
        </p>
        <a href="https://www.waombudsman.org/" target="_blank" rel="noopener noreferrer">
          Contact the Long-Term Care Ombuds
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Safety Concerns</span>
        <h3>Adult Protective Services</h3>
        <p>
          For concerns involving abuse, abandonment, neglect, exploitation, or self-neglect of vulnerable adults in Washington State.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/adult-protective-services" target="_blank" rel="noopener noreferrer">
          View APS reporting information
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Licensed Care Concerns</span>
        <h3>Report Concerns Involving Vulnerable Adults</h3>
        <p>
          DSHS reporting page for complaints or concerns involving vulnerable adults in licensed long-term care settings, including adult family homes.
        </p>
        <a href="https://www.dshs.wa.gov/altsa/home-and-community-services/report-concerns-involving-vulnerable-adults" target="_blank" rel="noopener noreferrer">
          Report a concern
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Developmental Disabilities</span>
        <h3>DSHS Developmental Disabilities Administration</h3>
        <p>
          DDA services and information for adults with developmental disabilities, families, guardians, and community partners.
        </p>
        <a href="https://www.dshs.wa.gov/dda" target="_blank" rel="noopener noreferrer">
          Visit DDA
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Residential DD Support</span>
        <h3>DDA Community Residential Services for Adults</h3>
        <p>
          Information about community residential service models and support options for adults with developmental disabilities.
        </p>
        <a href="https://www.dshs.wa.gov/dda/community-residential-services-adults" target="_blank" rel="noopener noreferrer">
          View DDA residential services
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Dementia Support</span>
        <h3>Alzheimer’s Association Washington State Chapter</h3>
        <p>
          Dementia education, caregiver support, local resources, and support group information for Washington families.
        </p>
        <a href="https://www.alz.org/alzwa" target="_blank" rel="noopener noreferrer">
          Visit Alzheimer’s Association Washington
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">24/7 Dementia Helpline</span>
        <h3>Alzheimer’s Association 24/7 Helpline</h3>
        <p>
          Support for people living with dementia, caregivers, families, and the public. Call 800-272-3900 for dementia-related support.
        </p>
        <a href="https://www.alz.org/help-support/resources/helpline" target="_blank" rel="noopener noreferrer">
          View helpline information
        </a>
      </article>

      <article class="resource-card urgent-card">
        <span class="resource-tag">Crisis Support</span>
        <h3>988 Suicide & Crisis Lifeline</h3>
        <p>
          Free, confidential support for mental health crisis, emotional distress, suicidal thoughts, or concern for a loved one. Call, text, or chat 988.
        </p>
        <a href="https://doh.wa.gov/you-and-your-family/injury-and-violence-prevention/suicide-prevention/988-suicide-crisis-lifeline" target="_blank" rel="noopener noreferrer">
          Learn about 988 in Washington
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Basic Needs</span>
        <h3>WA 211</h3>
        <p>
          Free, confidential connection to community services such as food, housing, healthcare, elder care, transportation, utilities, and other local supports.
        </p>
        <a href="https://wa211.org/" target="_blank" rel="noopener noreferrer">
          Find local help through WA 211
        </a>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> These resources are provided for general information and convenience. ACaring Adult Home does not control external agencies, determine eligibility, provide legal advice, provide medical advice, or guarantee the availability of services. For immediate danger, call 911. For emotional or mental health crisis support, call or text 988.
      </p>
    </div>
  </div>
</section>
```

---

# Section 6: Activities & Community Engagement

Purpose: Give residents and families quick-click links to activities, senior programs, recreation, meals, wellness, outings, and community participation.

```html
<section class="resource-section" id="activities-community-engagement">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Activities & Engagement</p>
      <h2>Local Activities, Senior Programs, and Community Engagement</h2>
      <p>
        Helpful local links for families and caregivers looking for activities, outings, wellness programs, meals, and social engagement opportunities in and around Federal Way.
      </p>
    </div>

    <div class="resource-grid">
      <article class="resource-card">
        <span class="resource-tag">Senior Activities</span>
        <h3>Federal Way Community Center Senior Recreation</h3>
        <p>
          Senior activities, wellness programs, fitness options, classes, trips, dancing, contests, and community events.
        </p>
        <a href="https://itallhappenshere.org/seniors/" target="_blank" rel="noopener noreferrer">
          View senior recreation programs
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Senior Center</span>
        <h3>Federal Way Senior Center</h3>
        <p>
          Local senior center supporting social connection, meals, activities, food support, and community engagement.
        </p>
        <a href="https://federalwayseniorcenter.org/" target="_blank" rel="noopener noreferrer">
          Visit Federal Way Senior Center
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Meals & Activities</span>
        <h3>Federal Way Senior Center Activities and Meals</h3>
        <p>
          Activity cards, meals, bingo, snack buffet, and local senior programming.
        </p>
        <a href="https://federalwayseniorcenter.org/activities-and-meals/" target="_blank" rel="noopener noreferrer">
          View activities and meals
        </a>
      </article>

      <article class="resource-card">
        <span class="resource-tag">Recreation Catalog</span>
        <h3>Federal Way Parks & Recreation Catalog</h3>
        <p>
          Federal Way parks and recreation catalog resources for classes, events, and community programs.
        </p>
        <a href="https://catalogs.cityoffederalway.com/" target="_blank" rel="noopener noreferrer">
          View recreation catalog
        </a>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> Activity availability, fees, schedules, transportation needs, supervision requirements, and eligibility may vary. Families and caregivers should verify details directly with the program provider before attending or making care-related plans.
      </p>
    </div>
  </div>
</section>
```

---

# Section 7: Monthly Care Reminders

Purpose: This section should build trust. It should not claim regulatory authority. It should simply provide helpful reminders that show ACaring Adult Home thinks carefully about resident care and operations.

```html
<section class="resource-section alt-section" id="monthly-care-reminders">
  <div class="container">
    <div class="section-heading">
      <p class="eyebrow">Care Reminders</p>
      <h2>Monthly Care and Safety Reminders</h2>
      <p>
        General reminders that may help families, caregivers, and care teams stay organized around safety, communication, and resident support.
      </p>
    </div>

    <div class="reminder-list">
      <article class="reminder-card">
        <h3>Resident Records</h3>
        <p>Review emergency contacts, care preferences, physician information, pharmacy information, and responsible-party contact details.</p>
      </article>

      <article class="reminder-card">
        <h3>Medication Documentation</h3>
        <p>Confirm medication records, refill timing, pharmacy communication, and documentation routines are current and clearly maintained.</p>
      </article>

      <article class="reminder-card">
        <h3>Fall Prevention</h3>
        <p>Review walking paths, lighting, footwear, mobility aids, bathroom safety, and resident-specific fall-risk observations.</p>
      </article>

      <article class="reminder-card">
        <h3>Emergency Preparedness</h3>
        <p>Review evacuation plans, emergency supplies, backup contacts, weather planning, and staff awareness of emergency procedures.</p>
      </article>

      <article class="reminder-card">
        <h3>Infection Control</h3>
        <p>Check basic supplies, hand hygiene practices, cleaning routines, illness monitoring, and communication plans when symptoms appear.</p>
      </article>

      <article class="reminder-card">
        <h3>Activities and Social Engagement</h3>
        <p>Review resident preferences, seasonal activities, family visits, community options, and opportunities for meaningful daily routines.</p>
      </article>
    </div>

    <div class="section-disclaimer">
      <p>
        <strong>Disclaimer:</strong> These reminders are general care-organization prompts only. They are not a substitute for individualized care planning, physician orders, licensed clinical guidance, legal requirements, or official regulatory direction.
      </p>
    </div>
  </div>
</section>
```

---

# Section 8: Emergency / Immediate Support Notice

Place this near the bottom before the final disclaimer.

```html
<section class="urgent-support-section">
  <div class="container">
    <div class="urgent-support-card">
      <h2>Need Immediate Help?</h2>
      <div class="urgent-support-grid">
        <div>
          <h3>Immediate danger</h3>
          <p>Call <strong>911</strong>.</p>
        </div>
        <div>
          <h3>Mental health or emotional crisis</h3>
          <p>Call or text <strong>988</strong>.</p>
        </div>
        <div>
          <h3>Abuse, neglect, exploitation, or safety concern</h3>
          <p>Contact Adult Protective Services or use the official DSHS reporting resources linked above.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

# Section 9: Final Page Disclaimer

Place this at the very bottom of the page content before the footer.

```html
<section class="final-disclaimer-section">
  <div class="container">
    <div class="final-disclaimer">
      <h2>Resource Disclaimer</h2>
      <p>
        The information and external links on this page are provided as a convenience for residents, families, caregivers, and community partners. ACaring Adult Home does not own, manage, or control the external websites listed here and does not guarantee their accuracy, availability, timeliness, eligibility rules, or completeness.
      </p>
      <p>
        Nothing on this page should be understood as legal advice, medical advice, emergency guidance, regulatory interpretation, or a substitute for direct communication with the appropriate agency, licensed professional, emergency responder, or official source.
      </p>
      <p>
        For emergencies, call <strong>911</strong>. For emotional or mental health crisis support, call or text <strong>988</strong>. For official adult family home regulatory guidance, verify directly with Washington State DSHS, Residential Care Services, ALTSA, WAC, or the issuing authority.
      </p>
    </div>
  </div>
</section>
```

---

# Styling Requirements

Add the following CSS classes to `styles.css` or the current main stylesheet.

The design should match the existing website theme:

* warm
* soft
* professional
* readable
* not overly corporate
* not flashy
* mobile-friendly

Suggested CSS:

```css
.page-hero.updates-hero {
  padding: 4rem 0 3rem;
}

.notice-section,
.resource-section,
.urgent-support-section,
.final-disclaimer-section {
  padding: 3rem 0;
}

.alt-section {
  background: rgba(245, 240, 232, 0.55);
}

.notice-card,
.final-disclaimer,
.urgent-support-card {
  border: 1px solid rgba(90, 74, 55, 0.18);
  border-radius: 22px;
  padding: 1.5rem;
  background: #fffaf3;
  box-shadow: 0 12px 30px rgba(48, 35, 20, 0.06);
}

.notice-card {
  border-left: 5px solid #b9864f;
}

.section-heading {
  max-width: 820px;
  margin-bottom: 1.75rem;
}

.section-heading h2 {
  margin-bottom: 0.65rem;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.support-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.resource-card,
.reminder-card {
  background: #ffffff;
  border: 1px solid rgba(90, 74, 55, 0.15);
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 10px 24px rgba(48, 35, 20, 0.05);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.resource-card h3,
.reminder-card h3 {
  margin: 0;
}

.resource-card p,
.reminder-card p {
  margin: 0;
}

.resource-card a {
  margin-top: auto;
  font-weight: 700;
  text-decoration: none;
}

.resource-card a:hover {
  text-decoration: underline;
}

.resource-tag {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border-radius: 999px;
  padding: 0.3rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 700;
  background: rgba(185, 134, 79, 0.14);
  color: #5f4225;
}

.urgent-card {
  border-left: 5px solid #9d4b3f;
}

.section-disclaimer {
  margin-top: 1.5rem;
  padding: 1rem 1.15rem;
  border-radius: 16px;
  background: rgba(90, 74, 55, 0.06);
  font-size: 0.95rem;
}

.reminder-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.urgent-support-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 980px) {
  .resource-grid,
  .support-grid,
  .reminder-list,
  .urgent-support-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .resource-grid,
  .support-grid,
  .reminder-list,
  .urgent-support-grid {
    grid-template-columns: 1fr;
  }

  .notice-section,
  .resource-section,
  .urgent-support-section,
  .final-disclaimer-section {
    padding: 2.25rem 0;
  }
}
```

---

# Data Model Recommendation

If the project is still simple static HTML, hardcode the cards for now.

If possible, prepare for a later Phase 2 by creating:

```text
data/resources.json
```

Suggested structure:

```json
[
  {
    "section": "Latest AFH Updates",
    "category": "DSHS / AFH Providers",
    "title": "Information for Adult Family Home Providers",
    "description": "Official Washington State DSHS page for adult family home provider information, licensing resources, resident rights, forms, and related guidance.",
    "url": "https://www.dshs.wa.gov/altsa/residential-care-services/information-adult-family-home-providers",
    "audience": ["providers", "families", "caregivers"],
    "priority": "high"
  }
]
```

Do not build automation yet unless specifically requested. For now, build a clean static page with trustworthy links and strong disclaimers.

---

# Footer / Global Link Treatment

All external links must use:

```html
target="_blank" rel="noopener noreferrer"
```

Do not make external links look like ACaring Adult Home owns or controls those resources.

Where helpful, add small visual text such as:

```text
External resource
Official source
Community resource
```

---

# Accessibility Requirements

Make sure:

* Cards use readable headings.
* Link text is descriptive.
* Do not use “click here” as link text.
* Color contrast is readable.
* Cards stack cleanly on mobile.
* The page can be navigated by keyboard.
* Emergency numbers are visible as text, not only icons.
* External links are understandable without relying on icons.

---

# Content Rules

Follow these wording rules:

## Do use

* “Helpful resource”
* “Official source”
* “General information”
* “Verify directly with the agency”
* “For immediate danger, call 911”
* “For crisis support, call or text 988”

## Do not use

* “We guarantee”
* “This is legal advice”
* “This is medical advice”
* “This is the complete rule”
* “This replaces DSHS guidance”
* “This page determines eligibility”
* “This page confirms compliance”

---

# Quality Check Before Completion

After implementation, verify:

* `updates.html` or updated `events.html` renders correctly.
* Navigation link works from every page.
* All cards are responsive.
* External links open in a new tab.
* Disclaimer appears:

  * near the top
  * at the bottom of each major section
  * as a final full-page disclaimer
* No external source is presented as owned by ACaring Adult Home.
* The page does not promise legal, medical, emergency, or regulatory advice.
* The page visually matches the rest of the ACaring Adult Home site.
* The page does not use resident photos or protected/private health information.
* The page can be maintained manually without breaking the design.

---

# Commit / PR Instruction

After completing the implementation:

1. Commit the changes.
2. Open a pull request.
3. Do not merge the pull request automatically.
4. Provide a concise summary of:

   * files changed
   * page added or modified
   * navigation updates
   * resource sections added
   * disclaimer protections added
   * any remaining follow-up tasks
