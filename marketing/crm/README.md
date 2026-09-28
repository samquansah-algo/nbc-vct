# NBC PMR CRM (Google Sheets)

**Live CRM: [NBC PMR CRM (Fall 2026)](https://docs.google.com/spreadsheets/d/11LfHholpkKC0vhpQ7z_DvRme57lPln2jZR7Nm4EMrjg/edit)** · Script: [NBC_CRM.gs](NBC_CRM.gs) (v2)

A Salesforce-style CRM that runs entirely inside the Google Sheet. It covers prospecting, leads and qualification, opportunities, accounts and contacts, interviews, roles, automation and notifications. The team works in the spreadsheet; nothing runs anywhere else.

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

## Automation and notifications

| What | When |
|---|---|
| Stage changes | Sent date → Sent; reply date → Replied; Proposal → offer date; Closed → closed date; Done → interview date |
| Activity log (like Salesforce Chatter) | Every status change, assignment, comment and form update, with the time and who did it |
| Assignment email | When someone becomes owner of a record |
| Daily reminders | Each morning (hour in Settings): your overdue, follow-up and due-today items, with links to the rows |
| Escalation | Items overdue longer than the Settings limit go to the owner's manager, and are logged |
| Won / lost alert | Admins and Managers are emailed when an opportunity closes |
| Weekly summary | Tuesdays (weeks run Wednesday to Tuesday): numbers, funnel and who has what |

## Forms (NBC CRM menu)
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

## Build prompt
[prompts/CRM_BUILD_PROMPT.md](../../prompts/CRM_BUILD_PROMPT.md) is the full specification. Use it to extend the CRM or rebuild it with any AI assistant.
