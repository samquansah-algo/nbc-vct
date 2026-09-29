# NBC PMR CRM (Google Sheets)

**Live CRM: [NBC PMR CRM (Fall 2026)](https://docs.google.com/spreadsheets/d/11LfHholpkKC0vhpQ7z_DvRme57lPln2jZR7Nm4EMrjg/edit)** · Script: [NBC_CRM.gs](NBC_CRM.gs) (v3) · Tests: [tests/](tests/)

A Salesforce-style CRM that runs entirely inside the Google Sheet. It covers prospecting, leads and qualification, opportunities, accounts, people and organization profiles, contacts, interviews, tasks, linked resources, roles, automation and a full notification engine. The team works in the spreadsheet; nothing runs anywhere else.

## Install once (sheet owner, about 2 minutes)
1. Open the [CRM sheet](https://docs.google.com/spreadsheets/d/11LfHholpkKC0vhpQ7z_DvRme57lPln2jZR7Nm4EMrjg/edit) → **Extensions → Apps Script**.
2. Replace any code there with all of [NBC_CRM.gs](NBC_CRM.gs) (GitHub's **Copy raw file** button). Click **Save**.
3. Choose **setupCRM** → **Run** → approve the permissions. If Google says the app is unverified: **Advanced → Go to project**. It is your own script.
4. Reload the sheet. The **NBC CRM** menu appears.
5. **Team & roles** tab: add each teammate's email, choose their CRM role, then **NBC CRM → Admin → Apply roles and sharing**.

Google only lets tabs, dropdowns and automation be added from inside the sheet, so this one paste is needed. Running **setupCRM** again (menu: Admin → Repair) is always safe. It never deletes records or history, and it upgrades a v1 install in place.

## The sales funnel

| Stage | Tab | Standard |
|---|---|---|
| **Prospecting** | Outreach | Every message and visit to a watering hole (v1, v2, canvassing), with automatic stage changes: sent date → *Sent*, reply date → *Replied*, follow-up due after N days |
| **Leads (prospects)** | Leads | People who could buy, by role. Lead source and status: New → Contacted → Engaged → Qualified → Converted (or Nurture / Unqualified) |
| **Qualifying** | Leads | **BANT**: Budget (Yes / Maybe / No), Authority (Decision maker / Influencer / User), Need (0–3 from the interview ratings), Timeline (This term / Next term / Later). The score out of 4 marks the lead **Qualified** at the Settings bar (default 3) |
| **Opportunities (deals)** | Opportunities | **NBC CRM → Convert selected lead** creates one at the default value (,600 per site per year). Stages: Discovery (10%) → Qualification (20%) → Proposal: costed pilot offer (40%) → Negotiation (60%) → **Closed Won**: paid commitment (100%) / **Closed Lost** (loss reason required). Probability and weighted value are automatic; the offer date and closed date fill themselves |
| **Accounts and contacts** | Accounts, Contacts | Organisations (the watering holes and Cape Coast) with live counts; people by role with consent tracking |
| **Discovery research** | Interviews, Insights | Interview notes and P1–P5 problem ratings; Insights marks each problem Confirmed / Not confirmed / Pending |

**Dashboard:**
- Key numbers.
- Sales: qualified leads, open opportunities, offers sent against the target of 10, paid commitments against the target of 3, pipeline value, weighted pipeline, won value and win rate.
- The **sales funnel**, with conversion at each step and a chart.
- Outreach by stage, with a chart.
- The team's workload.
- Reply rates by channel, and v1 against v2.
- An action list of everything overdue or due.

## Roles and assignment (all on the sheet)

| CRM role | Can do |
|---|---|
| **Admin** | Everything, including the Team & roles, Settings, Dashboard and Insights tabs (protected for Admins only). Applies roles and sharing |
| **Manager** | Edits all records and Accounts; receives escalations and won/lost alerts |
| **Member** | Edits Leads, Opportunities, Outreach, Contacts, Interviews and the Activity log |
| **Viewer** | View only |

- **Apply roles and sharing** gives each active person editor or viewer access, removes inactive people, and re-protects the Admin and Manager tabs.
- **Assign** by changing an **Owner** dropdown, or reassign in the Log an interaction form. The new owner gets an email if "Email me when assigned" is ticked. Every assignment is logged.
- **My work**: pick your name to see your open leads, opportunities, outreach, contacts and interviews, soonest first. Your open-item and overdue counts also show on Team & roles.

## Notifications (v3)

**Email is off until an Admin switches it on.**
- To switch it on, an Admin runs **Admin → Enable email delivery…**. The CRM shows the exact recipient list, and the Admin must confirm it.
- Only internal team members (Team & roles) can ever receive email. Anyone added later must be confirmed again.
- External people (People, Contacts) are **never** emailed automatically. Adding a profile or changing a status sends them nothing.
- Emails contain the record name, the reason, the owner, the due date and a link. They **never** contain interview notes or comment text.

| Event (rule) | Default | Who |
|---|---|---|
| Lead / opportunity assigned | Immediate | New owner |
| Task assigned / reassigned | Immediate | New owner (the previous owner is named) |
| Other record assigned | Digest | New owner |
| Follow-up due soon (N days) | Digest | Owner |
| Follow-up or task overdue | Immediate | Owner |
| Interview coming up (N days) | Immediate | Owner |
| Interview notes still missing (N days after) | Immediate | Owner |
| Opportunity with no activity for N days | Digest | Owner |
| @mention in a comment | Immediate | Person mentioned |
| Significant opportunity stage (Proposal, Negotiation, Won, Lost) | Immediate | Owner and their manager |
| Overdue N+ days (escalation) | Immediate | Owner's manager |
| Daily / weekly summary (tasks, interviews, pipeline changes) | Digest | Everyone who opts in |

**Tabs:**
- **Notification center:** each person's unread in-app alerts, with links.
- **Notification rules:** switch any rule on or off, set its parameter (days, stages), and choose immediate or digest delivery and the recipients.
- **Notification preferences:** per person and per event: channel (in-app, email, both, none), frequency (immediate, daily, weekly, off), timezone, quiet hours and digest hour.
- **Notification templates:** editable subject and body with placeholders.
- **Notification queue:** every notification, with its status (Pending, Held for quiet hours, Delivered, Email sent or not sent and why, Retry, Failed, Cancelled because it was resolved), the number of attempts and the time delivered.
- **Delivery log:** every attempt, with the result and the remaining email quota.

**Safeguards:**
- **Duplicates:** each notification has a dedupe key; a retried assignment creates one notification.
- **Freshness:** reminders are re-checked before sending. Finishing a task or writing interview notes cancels pending reminders.
- **Failures:** emails retry with back-off up to MaxAttempts, then are marked Failed, and failures never interrupt the CRM.
- **Limits:** a daily cap and a Google quota check.

**Admin → Notification preview** is a dry run: it lists every message and recipient, and queues and sends nothing. The DryRun setting is on by default.

**Triggers:** Admin → Install, Inspect or Remove notification triggers. One hourly job scans for due items, builds digests at each person's local digest hour, and delivers the queue.

## People, organizations and links (v3)
- **People** (external stakeholder profiles):
  - Full and preferred name, job title and department.
  - Current organization, CRM owner and stakeholder role.
  - Primary email and phone, location and timezone, preferred contact method.
  - LinkedIn, website and other public links.
  - Relationship source, introducer and first-connected date.
  - Background, relationship notes, communication preferences and do-not-contact.
  - Live counts of related leads, opportunities, interviews, activities, tasks and resources.
- **Affiliations:** a person can belong to many organizations. A job change (changeAffiliation) closes the old affiliation and keeps it as history.
- **Contact methods:** many emails and phones per person, with one primary of each type.
- **Accounts** (organizations) now also hold sector, website, location, operating regions, parent and related organizations, key contacts (automatic, from current affiliations), and counts of resources and activities.
- **Separation:** internal users stay on Team & roles (application role, team, timezone and notification preferences), apart from external profiles.
- **Add person / Add organization** forms: required fields first, optional fields folded away. They search for matches (same email, similar name, same website) before creating, and warn before a duplicate is saved. Contacts without an organization are allowed.
- **Quick creation:** from **Record details** (any lead, opportunity or interview) or the **Log an interaction** form (Person involved).
- **Resources:**
  - Each has a stable ID, title, URL, type, description, linked record, creator and date.
  - Only https:// and mailto: links are accepted, and readable titles fill in automatically.
  - Resources can be filtered and searched on their tab, and each record shows its resources in Record details.
  - **Linking never changes a file's sharing.** The Access column says so on every row.
- **Optional uploads:** they go to the Drive folder set in UploadFolderId, keep the file ID and link, inherit that folder's access, and are never stored in cells.
- **No enrichment:** nothing scrapes profiles or enriches data automatically (EnrichmentEnabled is off). Any enrichment must record its source and retrieval date in the People columns provided.

## Acceptance tests
[tests/acceptance.test.js](tests/acceptance.test.js) runs the real script against an in-memory copy of Google Sheets (`node tests/acceptance.test.js`). It checks:
1. Duplicate-email warnings.
2. Multiple affiliations and contact methods.
3. Resources on the correct record, with no sharing changes.
4. One notification per assignment despite retries.
5. Timezone, quiet hours and digest preferences.
6. Task completion cancelling overdue reminders.
7. Record links and access.
8. Dry run sending nothing.
9. Disabled rules stopping deliveries.
10. External contacts never being emailed.
11. No notes or comment text in emails.
12. Retry limits and failure logging.

All 12 pass, and each safety check was confirmed by deliberately breaking the code and watching its test fail.

## Forms (NBC CRM menu)
- **My notifications**, **Record details**, **Add person**, **Add organization**, **Add task**, **Add link or document**.
- **Log an interaction:**
  - Pick the record and the type (email sent, reply received, call, meeting, note…).
  - Say what happened.
  - Set the new stage and the next step with its date, and reassign if needed.
- **New record:** adds a lead, outreach touch or contact with the next ID.
- **Convert selected lead to opportunity.**

## Settings (Admins)
Follow-up days, escalation days, reminder hours, qualification bar, deal value, offer and paid targets, interview target, confirmation rule and time zone. The formulas read these directly; after changing an hour, use **Admin → Re-install automation**.

## Privacy
The CRM is linked from this public repository. **Log people by role and ID only** (Owner 1, C03, L02…). Keep names, emails and phone numbers in your own address book, and never record children. Share with named teammates through the Team & roles tab.
