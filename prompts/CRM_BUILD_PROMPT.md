# Prompt: build or extend the NBC PMR CRM

*Use this prompt with any AI coding assistant to rebuild, extend or audit the CRM. The current implementation is [marketing/crm/NBC_CRM.gs](../marketing/crm/NBC_CRM.gs).*

---

**Role.** You are a senior revenue-operations engineer who builds Salesforce-grade CRMs in Google Sheets with Google Apps Script. Write production-quality, commented Apps Script (V8) that a non-technical founder can install by pasting one file into Extensions → Apps Script and running `setupCRM` once.

**Context.**
- **Who:** NBC (Next Billion Children), built by Algo Peers in Cape Coast, Ghana.
- **Team (4):** Sam (Founder), Deborah (Sales and Marketing Lead), Vera (Learning Designer) and Nana Adwoa (Learning Experience Designer).
- **Market research:** reach programme owners (the people who run after-school clubs, holiday camps and learning centres for children aged 9–12) through 10 watering holes. Send v1 and v2 outreach and run 10 problem interviews.
- **Buying:** convert qualified buyers into opportunities for a costed Learning Worlds pilot ($3,600 per site per year).
- **Targets:** 10 offers sent by Tue 20 Oct 2026; 3 paid commitments by Tue 10 Nov 2026.
- **Cadence:** weeks run Wednesday to Tuesday; the time zone is Africa/Accra.

**Hard rules.**
1. Everything happens in the spreadsheet: tabs, dropdowns, formulas, forms, automation and notifications. Use no external services beyond Google (SpreadsheetApp, MailApp, HtmlService, ScriptApp, PropertiesService).
2. Setup is **idempotent**: re-running never deletes records or the Activity log; it re-applies structure and upgrades older versions in place.
3. **Privacy:** people are recorded by role and ID only (no names, emails or phones of research participants). Children are never contacted or recorded.
4. Calculated columns use **ARRAYFORMULA in the header row** (`={"Header";ARRAYFORMULA(...)}`), so new rows compute automatically. They carry a warning-only protection.
5. Every dropdown is fed from a hidden **Lists** tab or from the **Team & roles** names. Settings are **named ranges** that formulas and scripts read.
6. Functions called from sidebar HTML must be public (no trailing underscore).
7. Label honestly: nothing marks outreach as sent or an interview as done unless a person entered it.

**Objects (tabs) and funnel.**
- **Outreach** (prospecting touches):
  - Columns: ID, version, account, channel, audience, owner, stage (Scheduled → Sent → Follow up → Replied → Booked → Interviewed / No response / Declined / Not sent), priority, dates.
  - Calculated: days to reply, follow-up due, alert, last update, update count.
  - Links: the message link, a screenshot link and the latest comment.
- **Leads**:
  - Prospect by role, account, lead source, segment, owner and status (New → Contacted → Engaged → Qualified → Nurture / Unqualified / Converted).
  - **BANT** (Budget, Authority, Need 0–3, Timeline), with an automatic score and a Qualified flag.
  - Next step and date, alert, contact ID and opportunity ID.
- **Opportunities**:
  - Name, account, lead, owner and stage (Discovery → Qualification → Proposal → Negotiation → Closed Won / Closed Lost), with automatic probability.
  - Amount, weighted amount, offer-sent date, expected close, closed date, and a loss reason (required when lost).
  - Next step and alert.
- **Accounts:** watering holes and organisations, with owner, status, permission to post, and live counts of touches, sends, replies and interviews.
- **Contacts:** people by role, account, segment, setting, connected flag, consent checkbox, owner, status, next step and alert.
- **Interviews:** contact, participant, account, owner, role, date, status, done date, consent, notes fields, and P1–P5 problem ratings (0–3).
- **Insights:** a query of the interviews plus per-problem results: Confirmed (≥ ConfirmN rate it 2+, including ≥ ConfirmBuyers buyers), Not confirmed or Pending.
- **Activity log:** time, record ID, record type, who, type (comment, status change, assignment, email sent, reply received, call, meeting, task, escalation, created, converted, won, lost, note), text and stage after. Newest first.
- **Dashboard:**
  - Key numbers and sales numbers (qualified leads, open opportunities, offers against target, paid against target, pipeline, weighted pipeline, won value, win rate).
  - The **sales funnel** (prospects → contacted → engaged → qualified → opportunities → proposal → won), with conversion rates and a chart.
  - Outreach by stage, with a chart.
  - Team workload, channel and version reply rates, and an action list.
- **My work:** pick a name to see that person's open items across all record tabs, soonest first.
- **Team & roles:**
  - Name, email and CRM role (Admin, Manager, Member, Viewer), plus job title, active, notification preferences and manager.
  - Calculated open and overdue counts, and access status.
  - A permissions matrix.
- **Settings:** follow-up days, escalation days, reminder hours, qualification bar, deal value, offer and paid targets, interview target, confirmation rule and time zone.
- **Start here:** a plain-language guide and the automation status.

**Automation.**
- **Installable onEdit:**
  - Stage rules: sent date → Sent; reply date → Replied; Proposal → offer date; Closed → closed date; Done → done date.
  - Log every status change, assignment and comment.
  - Email the new owner on assignment.
  - Email Admins and Managers when a deal is won or lost.
- **Daily job:**
  - Each person's reminders.
  - Escalations to the owner's manager for items overdue ≥ EscalateDays, which are also logged.
- **Weekly job:** on Tuesday, a summary to people who opted in.

**Menu (NBC CRM).**
- **Everyone:** Log an interaction (sidebar form), New record, Convert selected lead to opportunity, Open my work, Email my reminders now.
- **Admin:** Apply roles and sharing, Send weekly summary now, Re-install automation, Repair setup.
- **Role checks:** Admin actions check the caller's role; Admin-only tabs are protected for Admins, and Accounts for Admins and Managers.

**Deliverables.**
1. One `.gs` file.
2. A README with install steps, a funnel table, a roles table, an automation table and a privacy note.
3. A mock test that runs every public function without errors in Node.

Before finishing, check every Apps Script method name against the official reference.
