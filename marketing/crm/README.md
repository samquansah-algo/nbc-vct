# PMR CRM (Google Sheets)

**Live CRM: [NBC PMR CRM (Fall 2026)](https://docs.google.com/spreadsheets/d/11LfHholpkKC0vhpQ7z_DvRme57lPln2jZR7Nm4EMrjg/edit)**

A Salesforce-style CRM for the market research tactic, built in Google Sheets so the whole team can use it for free.

## Set it up (once, about 2 minutes)
1. Open the [CRM sheet](https://docs.google.com/spreadsheets/d/11LfHholpkKC0vhpQ7z_DvRme57lPln2jZR7Nm4EMrjg/edit) → **Extensions → Apps Script**.
2. Delete any code there. Paste all of [NBC_CRM.gs](NBC_CRM.gs) (open it, then use GitHub's **Copy raw file** button). Click **Save**.
3. In the function list pick **setupCRM** and click **Run**. Approve the permissions (it only touches this sheet, and sends the daily reminder emails).
4. Reload the sheet. You'll see the new tabs and an **NBC CRM** menu.
5. On the **Team** tab, add each teammate's email, then **NBC CRM → Share with team**.

Running setup again is safe: it never deletes data or the Activity log. It only re-applies dropdowns, formulas, colours and automation. Your first import is kept as a hidden tab, "Old import (28 Sep)".

## What it does

| Salesforce idea | In this CRM |
|---|---|
| Accounts | **Accounts** tab: the 10 watering holes plus Cape Coast canvassing, with owner, status, permission to post and live counts of touches, sends, replies and interviews |
| Opportunities / pipeline | **Pipeline** tab: all 22 outreach touches (v1, v2, canvassing), each linked to its exact message. Dropdowns for **Stage, Owner, Channel, Priority, Version** |
| Workflow rules | Enter a **Sent date** → Stage becomes *Sent*. Enter a **Reply date** → Stage becomes *Replied*. **Follow-up due** = sent + 5 days. **Alert** shows OVERDUE, FOLLOW UP or DUE TODAY and turns the row red when overdue |
| Contacts | **Contacts** tab: people by role only (no names), with account, segment, consent checkbox, owner, status and next step |
| Activities / Chatter | **Activity log**: every stage or status change and every comment (typed in "Latest comment" or via **NBC CRM → Log an update**) is saved with the time and who made it. Pipeline and Contacts show **Last update** and the number of updates |
| Tasks and reminders | Every record has a dated **Next step**. Each owner gets a **daily 8am email** of their overdue items; **NBC CRM → Email today's digest** sends one now |
| Collaboration | Share with the team from the menu; @mention teammates in cell comments to assign questions |
| Reports and dashboards | **Dashboard**: key numbers, pipeline by stage (with chart), work by owner, reply rates by channel, v1 against v2, and an action list of everything overdue or due |
| Custom report | **Insights**: the insights grid from the interviews, with each problem marked Confirmed / Not confirmed / Pending (confirmed = 6+ of 10 rate it 2+, including 3+ buyers) |

Automatic columns are protected with a warning so nobody overwrites a formula by accident.

## Privacy
The CRM is linked from this public repository. **Log people by role and ID only** (Owner 1, C03…). Keep names, emails and phone numbers in your own address book, and never record children. Share the sheet with named teammates; only use "Anyone with the link can view" if it holds no personal details.
