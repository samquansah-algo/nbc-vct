/**
 * NBC PMR CRM v3: a Salesforce-style CRM that lives entirely in this Google Sheet.
 * v3 adds a notification engine (queue, rules, preferences, templates, delivery log,
 * dry run; email OFF until an Admin confirms recipients), people and organization
 * profiles with affiliations and contact methods, tasks, and linked resources.
 *
 * INSTALL ONCE (about 2 minutes, by the sheet owner):
 *   1. In the CRM sheet: Extensions → Apps Script.
 *   2. Replace any code with this whole file. Save.
 *   3. Pick "setupCRM" in the function list → Run → approve permissions
 *      (Google may say "unverified app": Advanced → Go to project. It is your own script).
 *   4. Reload the sheet. Use the "NBC CRM" menu from then on.
 *
 * Everything after that happens on the spreadsheet: roles on the "Team & roles" tab,
 * assignment by the Owner dropdowns, updates through the menu forms, automatic
 * stage changes, alerts, assignment emails, escalations and daily/weekly summaries.
 * Running setupCRM again is safe: it never deletes records or the Activity log.
 */

var CRM = {
  version: '3.0',
  repo: '__R__',
  team: [
    ['Sam', '', 'Admin', 'Founder', true, true, true, true, ''],
    ['Deborah', '', 'Manager', 'Sales and Marketing Lead', true, true, true, true, 'Sam'],
    ['Vera', '', 'Member', 'Learning Designer', true, true, true, true, 'Deborah'],
    ['Nana Adwoa', '', 'Member', 'Learning Experience Designer', true, true, true, true, 'Deborah']
  ],
  settings: [
    ['FollowUpDays', 'Follow up when there is no reply after (days)', 5],
    ['EscalateDays', 'Escalate to the manager when overdue by (days)', 2],
    ['DigestHour', 'Daily reminder email at (hour, 0–23)', 8],
    ['WeeklyHour', 'Weekly summary on Tuesday at (hour, 0–23)', 17],
    ['InterviewTarget', 'Interview target', 10],
    ['ConfirmN', 'Problem confirmed when at least this many rate it 2+', 6],
    ['ConfirmBuyers', '…including at least this many buyers', 3],
    ['QualifyScore', 'A lead is qualified at this BANT score (0–4)', 3],
    ['DealValue', 'Default opportunity value (USD per site per year)', 3600],
    ['OfferTarget', 'Target: costed offers sent (by Tue 20 Oct)', 10],
    ['PaidTarget', 'Target: paid commitments (by Tue 10 Nov)', 3],
    ['TimeZone', 'Time zone', 'Africa/Accra']
  ],
  lists: {
    Stage: ['Scheduled', 'Sent', 'Follow up', 'Replied', 'Booked', 'Interviewed', 'No response', 'Declined', 'Not sent'],
    Channel: ['Email', 'Formal letter', 'Facebook group', 'Community post', 'LinkedIn', 'Forum / DM', 'Reddit', 'In person', 'Phone', 'WhatsApp'],
    Priority: ['High', 'Medium', 'Low'],
    Segment: ['Buyer', 'User', 'Host', 'Research'],
    Setting: ['Constrained', 'Tech-rich', 'Both'],
    InterviewStatus: ['Scheduled', 'Done', 'Rescheduled', 'No-show', 'Cancelled'],
    AccountStatus: ['Not contacted', 'Contacted', 'Engaged', 'Interviewing', 'Closed'],
    ContactStatus: ['New', 'Contacted', 'Replied', 'Scheduled', 'Interviewed', 'Declined'],
    Permission: ['Not needed', 'To request', 'Requested', 'Granted', 'Refused'],
    Rating: [0, 1, 2, 3],
    Version: ['v1', 'v2', 'v3'],
    CrmRole: ['Admin', 'Manager', 'Member', 'Viewer'],
    LeadStatus: ['New', 'Contacted', 'Engaged', 'Qualified', 'Nurture', 'Unqualified', 'Converted'],
    LeadSource: ['Email outreach', 'In-person canvass', 'Formal letter', 'LinkedIn', 'Community post', 'Referral', 'Algo Peers network', 'Inbound'],
    Budget: ['Yes', 'Maybe', 'No', 'Unknown'],
    Authority: ['Decision maker', 'Influencer', 'User', 'Unknown'],
    Timeline: ['This term', 'Next term', 'Later', 'Unknown'],
    OppStage: ['Discovery', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
    LossReason: ['Price', 'No budget', 'Timing', 'No decision', 'Chose alternative', 'Not a fit', 'Other'],
    LogType: ['Comment', 'Status change', 'Assignment', 'Email sent', 'Reply received', 'Call', 'Meeting', 'Task', 'Escalation', 'Created', 'Converted', 'Won', 'Lost', 'Note']
  },
  seed: __SEED__
};

var SHEETS = ['Start here', 'Dashboard', 'My work', 'Notification center', 'Leads', 'Opportunities', 'Accounts', 'People', 'Contacts', 'Outreach', 'Interviews', 'Tasks', 'Resources', 'Activity log', 'Insights',
  'Affiliations', 'Contact methods', 'Team & roles', 'Notification preferences', 'Notification rules', 'Notification templates', 'Notification queue', 'Delivery log', 'Settings', 'Lists'];
var ADMIN_TABS = ['Start here', 'Dashboard', 'Insights', 'Team & roles', 'Settings', 'Lists', 'Notification rules', 'Notification templates', 'Notification queue', 'Delivery log'];
var MANAGER_TABS = ['Accounts'];
var CLOSED = { Leads: ['Converted', 'Unqualified'], Opportunities: ['Closed Won', 'Closed Lost'], Outreach: ['Interviewed', 'Declined', 'Not sent', 'No response'], Contacts: ['Interviewed', 'Declined'], Interviews: ['Done', 'Cancelled', 'No-show'], Accounts: ['Closed'] };
// 1-based columns per record tab
var TABS = {
  Tasks: { type: 'Task', status: 6, owner: 4, next: 2, date: 5, comment: 12, statusList: 'TaskStatus', prefix: 'K' },
  Leads: { type: 'Lead', status: 8, owner: 7, next: 15, date: 16, comment: 21, statusList: 'LeadStatus', prefix: 'L' },
  Opportunities: { type: 'Opportunity', status: 7, owner: 6, next: 15, date: 16, comment: 19, statusList: 'OppStage', prefix: 'O' },
  Outreach: { type: 'Outreach touch', status: 8, owner: 7, next: 15, date: 16, comment: 22, statusList: 'Stage', prefix: 'T' },
  Contacts: { type: 'Contact', status: 10, owner: 9, next: 11, date: 12, comment: 15, statusList: 'ContactStatus', prefix: 'C' },
  Interviews: { type: 'Interview', status: 8, owner: 5, next: 16, date: 0, comment: 23, statusList: 'InterviewStatus', prefix: 'I' },
  Accounts: { type: 'Account', status: 10, owner: 9, next: 0, date: 0, comment: 15, statusList: 'AccountStatus', prefix: 'A' }
};

function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }
function tz_() { return ss_().getSpreadsheetTimeZone() || 'Africa/Accra'; }
function setting_(key) {
  var r = ss_().getRangeByName(key);
  return r ? r.getValue() : null;
}

/* ================================================================ SETUP */
function setupCRM() {
  var ss = ss_();
  // v1 compatibility: rename old tabs
  if (ss.getSheetByName('Pipeline') && !ss.getSheetByName('Outreach')) ss.getSheetByName('Pipeline').setName('Outreach');
  if (ss.getSheetByName('Team') && !ss.getSheetByName('Team & roles')) ss.getSheetByName('Team').setName('Team & roles');
  if (ss.getSheetByName('How to use')) ss.deleteSheet(ss.getSheetByName('How to use'));
  var created = {};
  SHEETS.forEach(function (name, i) {
    if (!ss.getSheetByName(name)) { ss.insertSheet(name, i); created[name] = true; }
  });
  ss.getSheets().forEach(function (sh) {
    if (SHEETS.indexOf(sh.getName()) < 0) {
      if (sh.getName().indexOf('Old import') !== 0) sh.setName('Old import (28 Sep)');
      sh.hideSheet();
    }
  });
  buildLists_(ss);
  buildSettings_(ss, created.Settings);
  ss.setSpreadsheetTimeZone(String(setting_('TimeZone') || 'Africa/Accra'));
  buildRoles_(ss, created['Team & roles']);
  buildAccounts_(ss, created.Accounts);
  buildLeads_(ss, created.Leads);
  buildOpps_(ss, created.Opportunities);
  buildOutreach_(ss, created.Outreach);
  buildContacts_(ss, created.Contacts);
  buildInterviews_(ss, created.Interviews);
  buildLog_(ss);
  setupV3_(ss, created);
  buildInsights_(ss);
  buildMyWork_(ss);
  buildDashboard_(ss);
  buildStart_(ss);
  SHEETS.forEach(function (name, i) { ss.setActiveSheet(ss.getSheetByName(name)); ss.moveActiveSheet(i + 1); });
  ss.getSheetByName('Lists').hideSheet();
  installAutomation();
  applyProtection_();
  if (created['Activity log']) log_('SETUP', 'CRM', 'CRM v' + CRM.version + ' set up: tabs, dropdowns, roles, automation and notifications.', 'Note', '');
  ss.setActiveSheet(ss.getSheetByName('Start here'));
  toast_('NBC CRM is ready. Reload the sheet to see the NBC CRM menu.');
}

/* ================================================================ HELPERS */
function toast_(msg) { try { ss_().toast(msg, 'NBC CRM', 8); } catch (e) {} }
function alert_(msg) { try { SpreadsheetApp.getUi().alert(msg); } catch (e) { toast_(msg); } }
function header_(sh, heads, widths, color) {
  heads.forEach(function (h, i) {
    var c = sh.getRange(1, i + 1);
    if (h.charAt(0) === '=') c.setFormula(h); else c.setValue(h);
  });
  sh.getRange(1, 1, 1, heads.length).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818').setWrap(true).setVerticalAlignment('middle');
  sh.setRowHeight(1, 44);
  sh.setFrozenRows(1);
  widths.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.setTabColor(color);
  if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), heads.length).createFilter();
}
function listRange_(name) {
  var ss = ss_();
  if (name === 'Team') return ss.getSheetByName('Team & roles').getRange('A2:A50');
  var keys = Object.keys(CRM.lists);
  return ss.getSheetByName('Lists').getRange(2, keys.indexOf(name) + 1, CRM.lists[name].length, 1);
}
function dropdown_(sh, col, listName, rows, strict) {
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(listRange_(listName), true).setAllowInvalid(strict === false).build();
  sh.getRange(2, col, rows || 500, 1).setDataValidation(rule);
}
function idDropdown_(sh, col, src) {
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(ss_().getSheetByName(src).getRange('A2:A500'), true).setAllowInvalid(true).build();
  sh.getRange(2, col, 500, 1).setDataValidation(rule);
}
function checkbox_(sh, col, rows) { sh.getRange(2, col, rows || 500, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build()); }
function dates_(sh, cols) { cols.forEach(function (c) { sh.getRange(2, c, 500, 1).setNumberFormat('ddd d mmm yyyy'); }); }
function d_(s) { if (!s) return ''; var p = s.split('-'); return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); }
function color_(rules, range, text, bg, fg) {
  var b = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(text).setBackground(bg).setRanges([range]);
  if (fg) b.setFontColor(fg).setBold(true);
  rules.push(b.build());
}
function rule_(rules, range, formula, bg) {
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied(formula).setBackground(bg).setRanges([range]).build());
}
function warnFormulas_(sh, a1s) {
  sh.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function (p) { if (p.getDescription() === 'Automatic column') p.remove(); });
  a1s.forEach(function (a1) { sh.getRange(a1).protect().setDescription('Automatic column').setWarningOnly(true); });
}
function lastUpdate_(c) {
  return '={"Last update";ARRAYFORMULA(IF(' + c + '2:' + c + '="","",IFERROR(VLOOKUP(' + c + '2:' + c + ',SORT({\'Activity log\'!B2:B,\'Activity log\'!A2:A},2,FALSE),2,FALSE),"")))}';
}
function closedRx_(tab) { return '"^(' + CLOSED[tab].join('|') + ')$"'; }

/* ================================================================ TABS */
function buildLists_(ss) {
  var sh = ss.getSheetByName('Lists'), keys = Object.keys(CRM.lists);
  sh.clear();
  keys.forEach(function (k, i) {
    var vals = [[k]].concat(CRM.lists[k].map(function (v) { return [v]; }));
    sh.getRange(1, i + 1, vals.length, 1).setValues(vals);
  });
}

function buildSettings_(ss, isNew) {
  var sh = ss.getSheetByName('Settings');
  header_(sh, ['Setting', 'Value', 'What it controls'], [200, 140, 440], '#5B5B60');
  if (isNew) sh.getRange(2, 1, CRM.settings.length, 3).setValues(CRM.settings.map(function (s) { return [s[0], s[2], s[1]]; }));
  CRM.settings.forEach(function (s, i) { ss.setNamedRange(s[0], sh.getRange(i + 2, 2)); });
  sh.getRange(2, 2, CRM.settings.length, 1).setBackground('#FFF4D6').setFontWeight('bold');
  sh.getRange(CRM.settings.length + 3, 1).setValue('Admins only. After changing the hours, use NBC CRM → Admin → Re-install automation.').setFontColor('#5B5B60');
}

function buildRoles_(ss, isNew) {
  var sh = ss.getSheetByName('Team & roles');
  var open = 'COUNTIF(Outreach!G2:G,A2:A)' + CLOSED.Outreach.map(function (s) { return '-COUNTIFS(Outreach!G2:G,A2:A,Outreach!H2:H,"' + s + '")'; }).join('') +
    '+COUNTIFS(Contacts!I2:I,A2:A,Contacts!J2:J,"<>Interviewed",Contacts!J2:J,"<>Declined",Contacts!A2:A,"<>")' +
    '+COUNTIFS(Interviews!E2:E,A2:A,Interviews!H2:H,"Scheduled")+COUNTIFS(Interviews!E2:E,A2:A,Interviews!H2:H,"Rescheduled")' +
    '+COUNTIFS(Leads!G2:G,A2:A,Leads!H2:H,"<>Converted",Leads!H2:H,"<>Unqualified",Leads!A2:A,"<>")' +
    '+COUNTIFS(Opportunities!F2:F,A2:A,Opportunities!G2:G,"<>Closed Won",Opportunities!G2:G,"<>Closed Lost",Opportunities!A2:A,"<>")';
  header_(sh, ['Name', 'Email', 'CRM role', 'Job title', 'Active?', 'Email me when assigned', 'Daily reminders', 'Weekly summary', 'Manager',
    '={"Open items";ARRAYFORMULA(IF(A2:A="","",' + open + '))}',
    '={"Overdue";ARRAYFORMULA(IF(A2:A="","",COUNTIFS(Outreach!G2:G,A2:A,Outreach!Q2:Q,"OVERDUE")+COUNTIFS(Contacts!I2:I,A2:A,Contacts!M2:M,"OVERDUE")+COUNTIFS(Leads!G2:G,A2:A,Leads!Q2:Q,"OVERDUE")+COUNTIFS(Opportunities!F2:F,A2:A,Opportunities!Q2:Q,"OVERDUE")))}',
    'Access (set by NBC CRM → Admin → Apply roles)'], [120, 240, 95, 210, 65, 95, 85, 85, 100, 75, 70, 260], '#6833D9');
  if (isNew) {
    sh.getRange(2, 1, CRM.team.length, 9).setValues(CRM.team);
    var me = Session.getEffectiveUser().getEmail();
    if (me) sh.getRange('B2').setValue(me);
  }
  dropdown_(sh, 3, 'CrmRole', 50); dropdown_(sh, 9, 'Team', 50);
  [5, 6, 7, 8].forEach(function (c) { checkbox_(sh, c, 50); });
  var m = [['Role', 'Edit records', 'Edit accounts', 'Manage team, roles and settings', 'Gets escalations'],
    ['Admin', '✓', '✓', '✓', '✓'], ['Manager', '✓', '✓', '–', '✓'], ['Member', '✓', '–', '–', '–'], ['Viewer', 'view only', 'view only', '–', '–']];
  sh.getRange(1, 16, m.length, 5).setValues(m);
  sh.getRange(1, 16, 1, 5).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#6833D9').setWrap(true);
  sh.setColumnWidth(15, 20);
  var rules = [], role = sh.getRange('C2:C50');
  color_(rules, role, 'Admin', '#181818', '#FFFFFF'); color_(rules, role, 'Manager', '#6833D9', '#FFFFFF'); color_(rules, role, 'Member', '#E6F0FF'); color_(rules, role, 'Viewer', '#E4E4E7');
  rule_(rules, sh.getRange('K2:K50'), '=K2>0', '#FDE7E4');
  rule_(rules, sh.getRange('B2:B50'), '=AND($A2<>"",$B2="")', '#FFF4D6');
  sh.setConditionalFormatRules(rules);
  warnFormulas_(sh, ['J1:K50']);
}

function buildAccounts_(ss, isNew) {
  var sh = ss.getSheetByName('Accounts');
  header_(sh, ['Account ID', 'Account', 'Type', 'Segment', 'Setting', 'Size', 'Link', 'Permission to post', 'Owner', 'Status',
    '={"Touches";ARRAYFORMULA(IF(A2:A="","",COUNTIF(Outreach!C2:C,A2:A)))}',
    '={"Sent";ARRAYFORMULA(IF(A2:A="","",COUNTIFS(Outreach!C2:C,A2:A,Outreach!K2:K,"<>")))}',
    '={"Replies";ARRAYFORMULA(IF(A2:A="","",COUNTIFS(Outreach!C2:C,A2:A,Outreach!L2:L,"<>")))}',
    '={"Interviews";ARRAYFORMULA(IF(A2:A="","",COUNTIF(Interviews!D2:D,A2:A)))}',
    'Latest comment'], [80, 240, 170, 80, 95, 170, 80, 110, 95, 110, 70, 60, 65, 75, 280], '#006EFB');
  if (isNew) sh.getRange(2, 1, CRM.seed.acc.length, 10).setValues(CRM.seed.acc.map(function (a) {
    return [a[0], a[1], a[2], a[3], a[4], a[5], a[6] ? '=HYPERLINK("' + a[6] + '","Open")' : '', a[7], a[8], a[9]];
  }));
  dropdown_(sh, 4, 'Segment'); dropdown_(sh, 5, 'Setting'); dropdown_(sh, 8, 'Permission'); dropdown_(sh, 9, 'Team'); dropdown_(sh, 10, 'AccountStatus');
  var rules = [], st = sh.getRange('J2:J500');
  color_(rules, st, 'Contacted', '#FFF4D6'); color_(rules, st, 'Engaged', '#E6F0FF'); color_(rules, st, 'Interviewing', '#D9F7E8'); color_(rules, st, 'Closed', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  warnFormulas_(sh, ['K1:N500']);
}

function alertFormula_(statusCol, tab) {
  return '={"Alert";ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(' + statusCol + '2:' + statusCol + '&"",' + closedRx_(tab) + '),"",IF((P2:P<>"")*(P2:P<TODAY()),"OVERDUE",IF((P2:P<>"")*(P2:P=TODAY()),"DUE TODAY","")))))}';
}

function buildLeads_(ss, isNew) {
  var sh = ss.getSheetByName('Leads');
  header_(sh, ['Lead ID', 'Prospect (role and organisation type, no names)', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Lead source', 'Segment', 'Owner', 'Lead status', 'Budget', 'Authority', 'Need (0–3, from interview)', 'Timeline',
    '={"BANT score";ARRAYFORMULA(IF(A2:A="","",(I2:I="Yes")+0.5*(I2:I="Maybe")+(J2:J="Decision maker")+0.5*(J2:J="Influencer")+(IFERROR(K2:K*1,0)>=2)+(L2:L="This term")))}',
    '={"Qualified?";ARRAYFORMULA(IF(A2:A="","",IF(M2:M>=QualifyScore,"Qualified","Not yet")))}',
    'Next step', 'Next step date', alertFormula_('H', 'Leads'), lastUpdate_('A'), 'Contact ID', 'Opportunity ID', 'Latest comment (logged automatically)'],
    [70, 230, 75, 200, 130, 80, 100, 100, 75, 110, 90, 90, 70, 85, 170, 105, 90, 105, 80, 95, 260], '#F2643E');
  if (isNew) CRM.seed.leads.forEach(function (l, i) {
    var row = i + 2;
    sh.getRange(row, 1, 1, 3).setValues([[l[0], l[1], l[2]]]);
    sh.getRange(row, 5, 1, 8).setValues([[l[3], l[4], l[5], 'New', 'Unknown', 'Unknown', '', 'Unknown']]);
    sh.getRange(row, 15, 1, 2).setValues([['Discovery interview', d_(l[6])]]);
    if (l[7]) sh.getRange(row, 19).setValue(l[7]);
  });
  idDropdown_(sh, 3, 'Accounts'); dropdown_(sh, 5, 'LeadSource'); dropdown_(sh, 6, 'Segment'); dropdown_(sh, 7, 'Team'); dropdown_(sh, 8, 'LeadStatus');
  dropdown_(sh, 9, 'Budget'); dropdown_(sh, 10, 'Authority'); dropdown_(sh, 11, 'Rating'); dropdown_(sh, 12, 'Timeline'); idDropdown_(sh, 19, 'Contacts');
  dates_(sh, [16, 18]);
  var rules = [], st = sh.getRange('H2:H500'), al = sh.getRange('Q2:Q500');
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, sh.getRange('N2:N500'), 'Qualified', '#01C778', '#181818');
  rule_(rules, st, '=AND($H2="Qualified",$N2<>"Qualified")', '#FFE0B2');
  color_(rules, st, 'Contacted', '#FFF4D6'); color_(rules, st, 'Engaged', '#E6F0FF'); color_(rules, st, 'Qualified', '#D9F7E8'); color_(rules, st, 'Converted', '#01C778', '#181818');
  color_(rules, st, 'Nurture', '#EEE7FF'); color_(rules, st, 'Unqualified', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  sh.setFrozenColumns(2);
  warnFormulas_(sh, ['D1:D500', 'M1:N500', 'Q1:R500']);
}

function buildOpps_(ss, isNew) {
  var sh = ss.getSheetByName('Opportunities');
  header_(sh, ['Opp ID', 'Opportunity', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Lead ID', 'Owner', 'Stage',
    '={"Probability";ARRAYFORMULA(IF(A2:A="","",IF(G2:G="Discovery",0.1,IF(G2:G="Qualification",0.2,IF(G2:G="Proposal",0.4,IF(G2:G="Negotiation",0.6,IF(G2:G="Closed Won",1,0)))))))}',
    'Amount (USD)',
    '={"Weighted (USD)";ARRAYFORMULA(IF(A2:A="","",IFERROR(I2:I*1,0)*H2:H))}',
    'Offer sent', 'Expected close', 'Closed on', 'Loss reason', 'Next step', 'Next step date', alertFormula_('G', 'Opportunities'), lastUpdate_('A'),
    'Latest comment (logged automatically)'],
    [70, 230, 75, 200, 70, 100, 110, 80, 100, 100, 100, 105, 100, 120, 170, 105, 90, 105, 260], '#01C778');
  idDropdown_(sh, 3, 'Accounts'); idDropdown_(sh, 5, 'Leads'); dropdown_(sh, 6, 'Team'); dropdown_(sh, 7, 'OppStage'); dropdown_(sh, 14, 'LossReason');
  dates_(sh, [11, 12, 13, 16, 18]);
  sh.getRange('H2:H500').setNumberFormat('0%'); sh.getRange('I2:J500').setNumberFormat('$#,##0');
  var rules = [], st = sh.getRange('G2:G500'), al = sh.getRange('Q2:Q500');
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, st, 'Proposal', '#FFF4D6'); color_(rules, st, 'Negotiation', '#E6F0FF'); color_(rules, st, 'Closed Won', '#01C778', '#181818'); color_(rules, st, 'Closed Lost', '#E4E4E7');
  rule_(rules, sh.getRange('N2:N500'), '=AND($G2="Closed Lost",$N2="")', '#F2643E');
  rule_(rules, sh.getRange('I2:I500'), '=AND($A2<>"",$I2="")', '#FFE0B2');
  sh.setConditionalFormatRules(rules);
  sh.setFrozenColumns(2);
  warnFormulas_(sh, ['D1:D500', 'H1:H500', 'J1:J500', 'Q1:R500']);
}

function convertLead() {
  var ss = ss_(), sh = ss.getActiveSheet();
  if (sh.getName() !== 'Leads') { alert_('Select a lead on the Leads tab first.'); return; }
  var row = sh.getActiveRange().getRow(), v = sh.getRange(row, 1, 1, 20).getValues()[0];
  if (row < 2 || !v[0]) { alert_('Select a lead row first.'); return; }
  if (v[19]) { alert_(v[0] + ' is already converted to ' + v[19] + '.'); return; }
  if (v[13] !== 'Qualified') {
    var ui = SpreadsheetApp.getUi();
    if (ui.alert('Convert ' + v[0] + '?', 'Its BANT score (' + v[12] + ') is below the qualification bar. Convert anyway?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  }
  var op = ss.getSheetByName('Opportunities'), ids = op.getRange('A2:A500').getValues(), r = 2;
  while (r - 2 < ids.length && ids[r - 2][0]) r++;
  var id = nextId_(op, 'O'), name = (v[3] || v[1]) + ' · Learning Worlds pilot';
  op.getRange(r, 1, 1, 3).setValues([[id, name, v[2]]]);
  op.getRange(r, 5, 1, 3).setValues([[v[0], v[6], 'Qualification']]);
  op.getRange(r, 9).setValue(Number(setting_('DealValue') || 3600));
  op.getRange(r, 15, 1, 2).setValues([['Send costed pilot offer', new Date(new Date().getTime() + 3 * 86400000)]]);
  sh.getRange(row, 8).setValue('Converted'); sh.getRange(row, 20).setValue(id);
  log_(v[0], 'Lead', 'Converted to opportunity ' + id, 'Converted', 'Converted');
  log_(id, 'Opportunity', 'Created from lead ' + v[0] + ' · ' + name, 'Created', 'Qualification');
  ss.setActiveSheet(op); op.setActiveRange(op.getRange(r, 1));
  toast_(v[0] + ' converted to ' + id + '.');
}

function buildOutreach_(ss, isNew) {
  var sh = ss.getSheetByName('Outreach');
  header_(sh, ['ID', 'Version', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Channel', 'Audience', 'Owner', 'Stage', 'Priority', 'Scheduled', 'Sent date', 'Reply date',
    '={"Days to reply";ARRAYFORMULA(IF((K2:K<>"")*(L2:L<>""),L2:L-K2:K,""))}',
    '={"Follow-up due";ARRAYFORMULA(IF((K2:K<>"")*(L2:L=""),K2:K+FollowUpDays,""))}',
    'Next step', 'Next step date',
    '={"Alert";ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(H2:H&"",' + closedRx_('Outreach') + '),"",IF((P2:P<>"")*(P2:P<TODAY()),"OVERDUE",IF((N2:N<>"")*(N2:N<=TODAY()),"FOLLOW UP",IF((P2:P<>"")*(P2:P=TODAY()),"DUE TODAY",""))))))}',
    lastUpdate_('A'),
    '={"Updates";ARRAYFORMULA(IF(A2:A="","",COUNTIF(\'Activity log\'!B2:B,A2:A)))}',
    'Message', 'Screenshot link', 'Latest comment (logged automatically)'],
    [70, 60, 75, 210, 115, 170, 100, 100, 75, 105, 105, 105, 70, 105, 170, 105, 90, 105, 65, 70, 120, 280], '#FFBE00');
  if (isNew) {
    CRM.seed.pipe.forEach(function (p, i) {
      var row = i + 2, anchor = p[8] === '1' ? 'v1-first-messages' : p[8] === '2' ? 'v2-refined-messages' : '';
      sh.getRange(row, 1, 1, 3).setValues([[p[0], p[1], p[2]]]);
      sh.getRange(row, 5, 1, 6).setValues([[p[3], p[4], p[5], 'Scheduled', p[6], d_(p[7])]]);
      sh.getRange(row, 15, 1, 2).setValues([[p[3] === 'In person' ? 'Visit and canvass' : 'Send message', d_(p[7])]]);
      if (anchor) sh.getRange(row, 20).setFormula('=HYPERLINK("' + CRM.repo + 'marketing/OUTREACH_MESSAGES.md#' + anchor + '","Open")');
    });
  }
  dropdown_(sh, 2, 'Version'); idDropdown_(sh, 3, 'Accounts'); dropdown_(sh, 5, 'Channel'); dropdown_(sh, 7, 'Team'); dropdown_(sh, 8, 'Stage'); dropdown_(sh, 9, 'Priority');
  dates_(sh, [10, 11, 12, 14, 16, 18]);
  var rules = [], st = sh.getRange('H2:H500'), al = sh.getRange('Q2:Q500'), open = 'NOT(REGEXMATCH($H2&"",' + closedRx_('Outreach') + '))';
  rule_(rules, sh.getRange('A2:P500'), '=$Q2="OVERDUE"', '#FDE7E4');
  rule_(rules, sh.getRange('G2:G500'), '=AND($A2<>"",$G2="",' + open + ')', '#FFE0B2');
  rule_(rules, sh.getRange('P2:P500'), '=AND($A2<>"",$P2="",' + open + ')', '#FFE0B2');
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'FOLLOW UP', '#FFBE00', '#181818'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, st, 'Sent', '#FFF4D6'); color_(rules, st, 'Follow up', '#FFE0B2'); color_(rules, st, 'Replied', '#E6F0FF'); color_(rules, st, 'Booked', '#D9F7E8');
  color_(rules, st, 'Interviewed', '#01C778', '#181818'); color_(rules, st, 'Declined', '#E4E4E7'); color_(rules, st, 'No response', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  sh.setFrozenColumns(1);
  warnFormulas_(sh, ['D1:D500', 'M1:N500', 'Q1:S500']);
}

function buildContacts_(ss, isNew) {
  var sh = ss.getSheetByName('Contacts');
  header_(sh, ['Contact ID', 'Role (no names)', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Segment', 'Setting', 'Connected to Algo Peers?', 'Consent recorded?', 'Owner', 'Status', 'Next step', 'Next step date',
    '={"Alert";ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(J2:J&"",' + closedRx_('Contacts') + '),"",IF((L2:L<>"")*(L2:L<TODAY()),"OVERDUE",IF((L2:L<>"")*(L2:L=TODAY()),"DUE TODAY","")))))}',
    lastUpdate_('A'), 'Latest comment (logged automatically)'],
    [80, 150, 75, 210, 80, 95, 95, 90, 100, 100, 170, 110, 90, 105, 280], '#6833D9');
  checkbox_(sh, 7); checkbox_(sh, 8);
  if (isNew) {
    sh.getRange(2, 1, CRM.seed.con.length, 3).setValues(CRM.seed.con.map(function (c) { return [c[0], c[1], c[2]]; }));
    sh.getRange(2, 5, CRM.seed.con.length, 8).setValues(CRM.seed.con.map(function (c) { return [c[3], c[4], c[5], false, c[6], 'New', 'Interview', d_(c[7])]; }));
  }
  idDropdown_(sh, 3, 'Accounts'); dropdown_(sh, 5, 'Segment'); dropdown_(sh, 6, 'Setting'); dropdown_(sh, 9, 'Team'); dropdown_(sh, 10, 'ContactStatus');
  dates_(sh, [12, 14]);
  var rules = [], al = sh.getRange('M2:M500'), st = sh.getRange('J2:J500');
  rule_(rules, sh.getRange('H2:H500'), '=AND($A2<>"",$H2=FALSE,$J2="Scheduled")', '#FDE7E4');
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, st, 'Replied', '#E6F0FF'); color_(rules, st, 'Scheduled', '#FFF4D6'); color_(rules, st, 'Interviewed', '#01C778', '#181818'); color_(rules, st, 'Declined', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  warnFormulas_(sh, ['D1:D500', 'M1:N500']);
}

function buildInterviews_(ss, isNew) {
  var sh = ss.getSheetByName('Interviews');
  header_(sh, ['Interview ID', 'Contact ID',
    '={"Participant";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:B,2,FALSE),"")))}',
    '={"Account ID";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:C,3,FALSE),"")))}',
    'Owner',
    '={"Role";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:E,5,FALSE),"")))}',
    'Interview date', 'Status', 'Done date', 'Consent given?', 'Recent problem (their words)', 'Workaround', 'Consequence', 'Who buys / budget process', 'Offer response', 'Next step',
    'P1 Can\'t tell if skill transfers', 'P2 Stops without key facilitator', 'P3 Prep time too high', 'P4 Hard to show families progress', 'P5 No budget route',
    'Notes / screenshot link', 'Latest comment (logged automatically)'],
    [80, 80, 130, 75, 100, 75, 110, 100, 110, 80, 260, 180, 180, 180, 180, 170, 90, 90, 90, 90, 90, 150, 280], '#01C778');
  checkbox_(sh, 10);
  if (isNew) {
    sh.getRange(2, 1, CRM.seed.con.length, 2).setValues(CRM.seed.con.map(function (c, i) { return ['I' + ('0' + (i + 1)).slice(-2), c[0]]; }));
    sh.getRange(2, 5, CRM.seed.con.length, 1).setValues(CRM.seed.con.map(function (c) { return [c[6]]; }));
    sh.getRange(2, 7, CRM.seed.con.length, 2).setValues(CRM.seed.con.map(function (c) { return [d_(c[7]), 'Scheduled']; }));
  }
  idDropdown_(sh, 2, 'Contacts'); dropdown_(sh, 5, 'Team'); dropdown_(sh, 8, 'InterviewStatus');
  for (var c = 17; c <= 21; c++) dropdown_(sh, c, 'Rating');
  dates_(sh, [7, 9]);
  sh.getRange('K2:P500').setWrap(true);
  var rules = [], st = sh.getRange('H2:H500');
  rule_(rules, sh.getRange('J2:J500'), '=AND($A2<>"",$H2="Done",$J2=FALSE)', '#F2643E');
  rule_(rules, sh.getRange('Q2:U500'), '=AND($H2="Done",Q2="")', '#FFF4D6');
  color_(rules, st, 'Done', '#01C778', '#181818'); color_(rules, st, 'No-show', '#FDE7E4'); color_(rules, st, 'Rescheduled', '#FFF4D6'); color_(rules, st, 'Cancelled', '#E4E4E7');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(2).setBackground('#01C778').setRanges([sh.getRange('Q2:U500')]).build());
  sh.setConditionalFormatRules(rules);
  warnFormulas_(sh, ['C1:D500', 'F1:F500']);
}

function buildLog_(ss) {
  var sh = ss.getSheetByName('Activity log');
  header_(sh, ['When', 'Record ID', 'Record type', 'By', 'Type', 'Update / comment', 'Stage or status after'], [150, 85, 110, 190, 110, 520, 150], '#F2643E');
  sh.getRange('A2:A3000').setNumberFormat('ddd d mmm yyyy, HH:mm');
  sh.getRange('F2:F3000').setWrap(true);
  dropdown_(sh, 5, 'LogType', 3000, false);
  var rules = [], t = sh.getRange('E2:E3000');
  color_(rules, t, 'Escalation', '#F2643E', '#FFFFFF'); color_(rules, t, 'Assignment', '#E6F0FF'); color_(rules, t, 'Status change', '#FFF4D6');
  sh.setConditionalFormatRules(rules);
}

function buildInsights_(ss) {
  var sh = ss.getSheetByName('Insights');
  sh.clear();
  sh.getRange('A1').setFormula('=QUERY(Interviews!A1:U,"select C, F, H, Q, R, S, T, U where A is not null",1)');
  sh.getRange('A1:H1').setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818').setWrap(true);
  sh.getRange('J1:N1').setValues([['Problem', 'Rated', 'Rated 2+', 'Buyers rating 2+', 'Result']]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
  var names = ['P1 Can\'t tell if skill transfers', 'P2 Stops without key facilitator', 'P3 Prep time too high', 'P4 Hard to show families progress', 'P5 No budget route'];
  ['Q', 'R', 'S', 'T', 'U'].forEach(function (c, i) {
    var r = i + 2;
    sh.getRange(r, 10).setValue(names[i]);
    sh.getRange(r, 11, 1, 4).setFormulas([['=COUNT(Interviews!' + c + '2:' + c + ')', '=COUNTIF(Interviews!' + c + '2:' + c + ',">=2")',
      '=COUNTIFS(Interviews!F2:F,"Buyer",Interviews!' + c + '2:' + c + ',">=2")',
      '=IF(L' + r + '>=ConfirmN,IF(M' + r + '>=ConfirmBuyers,"Confirmed","Not confirmed"),IF(K' + r + '<InterviewTarget,"Pending","Not confirmed"))']]);
  });
  sh.getRange('J8').setFormula('="Rating: 0 not raised · 1 raised when asked · 2 raised with an example · 3 raised unprompted with a recent example. Confirmed = "&ConfirmN&"+ of "&InterviewTarget&" rate it 2+, including "&ConfirmBuyers&"+ buyers."').setWrap(true);
  [220, 80, 90, 70, 70, 70, 70, 70, 20, 260, 70, 80, 120, 120].forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.setFrozenRows(1);
  var rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(2).setBackground('#01C778').setRanges([sh.getRange('D2:H200')]).build());
  color_(rules, sh.getRange('N2:N6'), 'Confirmed', '#01C778', '#181818'); color_(rules, sh.getRange('N2:N6'), 'Not confirmed', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  sh.setTabColor('#C2410C');
}

function buildMyWork_(ss) {
  var sh = ss.getSheetByName('My work');
  var keep = sh.getRange('B1').getValue() || CRM.team[0][0];
  sh.clear();
  sh.getRange('A1').setValue('Show work for →').setFontWeight('bold');
  sh.getRange('B1').setValue(keep).setBackground('#FFBE00').setFontWeight('bold').setFontSize(13);
  dropdownCell_(sh.getRange('B1'));
  sh.getRange('C1').setFormula('=IFERROR(VLOOKUP(B1,\'Team & roles\'!A:C,3,FALSE),"")&"  ·  open items: "&IFERROR(VLOOKUP(B1,\'Team & roles\'!A:J,10,FALSE),0)&"  ·  overdue: "&IFERROR(VLOOKUP(B1,\'Team & roles\'!A:K,11,FALSE),0)').setFontColor('#5B5B60');
  var blocks = [
    [22, 'MY LEADS', ['ID', 'Prospect', 'Status', 'Next step', 'Due', 'Alert'],
      '=IFERROR(SORT(FILTER({Leads!A2:A,Leads!B2:B,Leads!H2:H,Leads!O2:O,Leads!P2:P,Leads!Q2:Q},Leads!G2:G=$B$1,Leads!A2:A<>"",NOT(REGEXMATCH(Leads!H2:H&"",' + closedRx_('Leads') + '))),5,TRUE),"Nothing open")'],
    [29, 'MY OPPORTUNITIES', ['ID', 'Opportunity', 'Stage', 'Next step', 'Due', 'Alert'],
      '=IFERROR(SORT(FILTER({Opportunities!A2:A,Opportunities!B2:B,Opportunities!G2:G,Opportunities!O2:O,Opportunities!P2:P,Opportunities!Q2:Q},Opportunities!F2:F=$B$1,Opportunities!A2:A<>"",NOT(REGEXMATCH(Opportunities!G2:G&"",' + closedRx_('Opportunities') + '))),5,TRUE),"Nothing open")'],
    [1, 'MY OUTREACH', ['ID', 'Account', 'Stage', 'Next step', 'Due', 'Alert'],
      '=IFERROR(SORT(FILTER({Outreach!A2:A,Outreach!D2:D,Outreach!H2:H,Outreach!O2:O,Outreach!P2:P,Outreach!Q2:Q},Outreach!G2:G=$B$1,Outreach!A2:A<>"",NOT(REGEXMATCH(Outreach!H2:H&"",' + closedRx_('Outreach') + '))),5,TRUE),"Nothing open")'],
    [8, 'MY CONTACTS', ['ID', 'Role', 'Status', 'Next step', 'Due', 'Alert'],
      '=IFERROR(SORT(FILTER({Contacts!A2:A,Contacts!B2:B,Contacts!J2:J,Contacts!K2:K,Contacts!L2:L,Contacts!M2:M},Contacts!I2:I=$B$1,Contacts!A2:A<>"",NOT(REGEXMATCH(Contacts!J2:J&"",' + closedRx_('Contacts') + '))),5,TRUE),"Nothing open")'],
    [15, 'MY INTERVIEWS', ['ID', 'Participant', 'Date', 'Status', 'Consent?'],
      '=IFERROR(SORT(FILTER({Interviews!A2:A,Interviews!C2:C,Interviews!G2:G,Interviews!H2:H,Interviews!J2:J},Interviews!E2:E=$B$1,Interviews!A2:A<>"",NOT(REGEXMATCH(Interviews!H2:H&"",' + closedRx_('Interviews') + '))),3,TRUE),"Nothing open")']
  ];
  blocks.forEach(function (b) {
    sh.getRange(3, b[0]).setValue(b[1]).setFontWeight('bold');
    sh.getRange(4, b[0], 1, b[2].length).setValues([b[2]]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
    sh.getRange(5, b[0]).setFormula(b[3]);
  });
  ['Z5:Z200', 'AG5:AG200'].forEach(function (a1) { sh.getRange(a1).setNumberFormat('ddd d mmm'); });
  sh.getRange('E5:E200').setNumberFormat('ddd d mmm'); sh.getRange('L5:L200').setNumberFormat('ddd d mmm'); sh.getRange('Q5:Q200').setNumberFormat('ddd d mmm');
  [60, 190, 90, 150, 80, 85, 20, 60, 120, 90, 150, 80, 85, 20, 60, 110, 90, 90, 70, 20, 20, 60, 200, 90, 150, 80, 85, 20, 60, 220, 100, 150, 80, 85].forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  var rules = [];
  ['F5:F200', 'M5:M200', 'AA5:AA200', 'AH5:AH200'].forEach(function (a1) { color_(rules, sh.getRange(a1), 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, sh.getRange(a1), 'FOLLOW UP', '#FFBE00'); color_(rules, sh.getRange(a1), 'DUE TODAY', '#006EFB', '#FFFFFF'); });
  sh.setConditionalFormatRules(rules);
  sh.setFrozenRows(4);
  sh.setTabColor('#FFBE00');
}
function dropdownCell_(cell) {
  cell.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(listRange_('Team'), true).setAllowInvalid(false).build());
}

function buildDashboard_(ss) {
  var sh = ss.getSheetByName('Dashboard');
  sh.getCharts().forEach(function (ch) { sh.removeChart(ch); });
  sh.clear();
  sh.getRange('A1').setValue('NBC · PMR CRM').setFontSize(20).setFontWeight('bold');
  sh.getRange('A2').setFormula('="Today: "&TEXT(TODAY(),"ddd d mmm yyyy")&"   ·   weeks run Wednesday to Tuesday"').setFontColor('#5B5B60');
  sh.getRange('A3').setFormula('=HYPERLINK("' + CRM.repo + 'marketing/crm/README.md","CRM guide")');
  sh.getRange('B3').setFormula('=HYPERLINK("https://github.com/samquansah-algo/nbc-vct/tree/main/weekly-tactics/01-market-research","PMR deck")');
  sh.getRange('C3').setFormula('=HYPERLINK("' + CRM.repo + 'marketing/OUTREACH_MESSAGES.md","Messages")');
  var kpi = [
    ['Touches planned', '=COUNTA(Outreach!A2:A)'], ['Sent', '=COUNT(Outreach!K2:K)'], ['Replies', '=COUNT(Outreach!L2:L)'],
    ['Reply rate', '=IFERROR(B7/B6,0)'], ['Booked or interviewed', '=COUNTIF(Outreach!H2:H,"Booked")+COUNTIF(Outreach!H2:H,"Interviewed")'],
    ['Overdue next steps', '=COUNTIF(Outreach!Q2:Q,"OVERDUE")+COUNTIF(Contacts!M2:M,"OVERDUE")'], ['Follow-ups due', '=COUNTIF(Outreach!Q2:Q,"FOLLOW UP")'],
    ['Interviews done', '=COUNTIF(Interviews!H2:H,"Done")&" of "&InterviewTarget'], ['Problems confirmed', '=COUNTIF(Insights!N2:N6,"Confirmed")&" of 5"'],
    ['Unassigned open touches', '=COUNTIFS(Outreach!A2:A,"<>",Outreach!G2:G,"")']
  ];
  var sales = [
    ['Qualified leads', '=COUNTIF(Leads!N2:N,"Qualified")'],
    ['Open opportunities', '=COUNTIFS(Opportunities!A2:A,"<>",Opportunities!G2:G,"<>Closed Won",Opportunities!G2:G,"<>Closed Lost")'],
    ['Offers sent', '=COUNT(Opportunities!K2:K)&" of "&OfferTarget'],
    ['Paid commitments (won)', '=COUNTIF(Opportunities!G2:G,"Closed Won")&" of "&PaidTarget'],
    ['Open pipeline value', '=SUMIFS(Opportunities!I2:I,Opportunities!G2:G,"<>Closed Won",Opportunities!G2:G,"<>Closed Lost")'],
    ['Weighted pipeline', '=SUMIFS(Opportunities!J2:J,Opportunities!G2:G,"<>Closed Won",Opportunities!G2:G,"<>Closed Lost")'],
    ['Won value', '=SUMIF(Opportunities!G2:G,"Closed Won",Opportunities!I2:I)'],
    ['Win rate (of closed)', '=IFERROR(COUNTIF(Opportunities!G2:G,"Closed Won")/(COUNTIF(Opportunities!G2:G,"Closed Won")+COUNTIF(Opportunities!G2:G,"Closed Lost")),0)']
  ];
  sh.getRange('D4').setValue('SALES').setFontWeight('bold');
  sh.getRange(5, 4, sales.length, 1).setValues(sales.map(function (k) { return [k[0]]; }));
  sh.getRange(5, 5, sales.length, 1).setFormulas(sales.map(function (k) { return [k[1]]; })).setFontWeight('bold').setFontSize(13).setHorizontalAlignment('right');
  sh.getRange('E9:E11').setNumberFormat('$#,##0'); sh.getRange('E12').setNumberFormat('0%');

  sh.getRange('A4').setValue('KEY NUMBERS').setFontWeight('bold');
  sh.getRange(5, 1, kpi.length, 1).setValues(kpi.map(function (k) { return [k[0]]; }));
  sh.getRange(5, 2, kpi.length, 1).setFormulas(kpi.map(function (k) { return [k[1]]; })).setFontWeight('bold').setFontSize(13).setHorizontalAlignment('right');
  sh.getRange('B8').setNumberFormat('0%'); sh.getRange('B10').setBackground('#FDE7E4');
  var r = 17;
  function table(title, heads, keys, fns) {
    sh.getRange(r, 1).setValue(title).setFontWeight('bold');
    sh.getRange(r + 1, 1, 1, heads.length).setValues([heads]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
    keys.forEach(function (k, i) { var row = r + 2 + i; sh.getRange(row, 1).setValue(k); fns.forEach(function (fn, j) { sh.getRange(row, 2 + j).setFormula(fn(row)); }); });
    var start = r + 2; r = r + 3 + keys.length; return start;
  }
  var funnel = [
    ['Prospects identified', '=COUNTA(Leads!A2:A)', ''],
    ['Contacted', '=COUNTA(Leads!A2:A)-COUNTIF(Leads!H2:H,"New")', ''],
    ['Engaged (replied or met)', '=COUNTIF(Leads!H2:H,"Engaged")+COUNTIF(Leads!H2:H,"Qualified")+COUNTIF(Leads!H2:H,"Converted")', ''],
    ['Qualified (BANT)', '=COUNTIF(Leads!H2:H,"Qualified")+COUNTIF(Leads!H2:H,"Converted")', ''],
    ['Opportunities', '=COUNTA(Opportunities!A2:A)', ''],
    ['Proposal: costed offer sent', '=COUNT(Opportunities!K2:K)', '=OfferTarget'],
    ['Closed won: paid commitment', '=COUNTIF(Opportunities!G2:G,"Closed Won")', '=PaidTarget']
  ];
  sh.getRange(r, 1).setValue('SALES FUNNEL').setFontWeight('bold');
  sh.getRange(r + 1, 1, 1, 4).setValues([['Stage', 'Count', 'Conversion from previous', 'Target']]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
  var fStart = r + 2;
  funnel.forEach(function (f, i) {
    var row = fStart + i;
    sh.getRange(row, 1).setValue(f[0]); sh.getRange(row, 2).setFormula(f[1]);
    if (i) sh.getRange(row, 3).setFormula('=IFERROR(B' + row + '/B' + (row - 1) + ',0)').setNumberFormat('0%');
    if (f[2]) sh.getRange(row, 4).setFormula(f[2]);
  });
  r = fStart + funnel.length + 1;
  sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(fStart, 1, funnel.length, 2))
    .setPosition(22, 16, 0, 0).setOption('title', 'Sales funnel').setOption('legend', { position: 'none' }).setOption('colors', ['#01C778'])
    .setOption('width', 520).setOption('height', 300).build());
  var stageStart = table('OUTREACH BY STAGE', ['Stage', 'Touches', 'Overdue'], CRM.lists.Stage, [
    function (x) { return '=COUNTIF(Outreach!H$2:H,A' + x + ')'; }, function (x) { return '=COUNTIFS(Outreach!H$2:H,A' + x + ',Outreach!Q$2:Q,"OVERDUE")'; }]);
  sh.getRange(r, 1).setValue('TEAM').setFontWeight('bold');
  sh.getRange(r + 1, 1).setFormula('=QUERY(\'Team & roles\'!A1:K,"select A, C, J, K where A is not null",1)');
  r += 3 + CRM.team.length + 3;
  var chStart = table('BY CHANNEL', ['Channel', 'Planned', 'Sent', 'Replies', 'Reply rate'], CRM.lists.Channel.slice(0, 8), [
    function (x) { return '=COUNTIF(Outreach!E$2:E,A' + x + ')'; }, function (x) { return '=COUNTIFS(Outreach!E$2:E,A' + x + ',Outreach!K$2:K,"<>")'; },
    function (x) { return '=COUNTIFS(Outreach!E$2:E,A' + x + ',Outreach!L$2:L,"<>")'; }, function (x) { return '=IFERROR(D' + x + '/C' + x + ',0)'; }]);
  var vStart = table('v1 AGAINST v2', ['Version', 'Planned', 'Sent', 'Replies', 'Reply rate'], ['v1', 'v2'], [
    function (x) { return '=COUNTIF(Outreach!B$2:B,A' + x + ')'; }, function (x) { return '=COUNTIFS(Outreach!B$2:B,A' + x + ',Outreach!K$2:K,"<>")'; },
    function (x) { return '=COUNTIFS(Outreach!B$2:B,A' + x + ',Outreach!L$2:L,"<>")'; }, function (x) { return '=IFERROR(D' + x + '/C' + x + ',0)'; }]);
  sh.getRange(chStart, 5, 8, 1).setNumberFormat('0%'); sh.getRange(vStart, 5, 2, 1).setNumberFormat('0%');
  sh.getRange('H4').setValue('ACTION LIST: overdue, follow-ups and due today').setFontWeight('bold');
  sh.getRange('H5').setFormula('=IFERROR(QUERY(Outreach!A1:Q,"select A, D, G, H, O, P, Q where Q is not null and Q <> \'\' order by P",1),"Nothing due. Nice work.")');
  sh.getRange('H5:N5').setFontWeight('bold');
  sh.setColumnWidth(1, 230); [90, 90, 90, 90, 20, 20].forEach(function (w, i) { sh.setColumnWidth(i + 2, w); });
  [70, 200, 90, 100, 170, 110, 100].forEach(function (w, i) { sh.setColumnWidth(i + 8, w); });
  sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(stageStart, 1, CRM.lists.Stage.length, 2))
    .setPosition(4, 16, 0, 0).setOption('title', 'Outreach by stage').setOption('legend', { position: 'none' }).setOption('colors', ['#FFBE00'])
    .setOption('width', 520).setOption('height', 300).build());
  sh.setTabColor('#181818'); sh.setFrozenRows(3);
}

function buildStart_(ss) {
  var sh = ss.getSheetByName('Start here');
  sh.clear();
  var L = [
    ['NBC PMR CRM', ''],
    ['A Salesforce-style CRM for our market research, run entirely from this spreadsheet.', ''],
    ['', ''],
    ['THE SALES FUNNEL', ''],
    ['Prospecting → Outreach', 'Every message and visit to a watering hole. Replies become leads.'],
    ['Leads (prospects)', 'People who could buy, logged by role. Status: New → Contacted → Engaged → Qualified → Converted (or Nurture / Unqualified).'],
    ['Qualifying (BANT)', 'Budget, Authority, Need (0–3, from the interview) and Timeline give a score out of 4. At or above the Settings bar the lead shows "Qualified".'],
    ['Opportunities (deals)', 'NBC CRM → Convert selected lead creates one at the default value. Stages: Discovery → Qualification → Proposal (costed pilot offer) → Negotiation → Closed Won (paid) / Closed Lost (give a reason).'],
    ['Accounts and contacts', 'Organisations and the people in them, by role. Interviews record what we learn and rate the five problems.'],
    ['', ''],
    ['DAILY USE', ''],
    ['1. Open "My work" and pick your name', 'Your open touches, contacts and interviews, soonest first, with OVERDUE alerts.'],
    ['2. Log what happened', 'NBC CRM → Log an interaction: pick the type, write what happened, set the new stage, next step and date, and reassign if needed. It is saved to the record and the Activity log.'],
    ['3. Or edit a row directly', 'Choose from the dropdowns. Typing a Sent date moves the stage to Sent; a Reply date moves it to Replied. Anything typed in "Latest comment" is logged with your name and the time.'],
    ['4. Add new people or touches', 'NBC CRM → New record gives the next ID and fills in the defaults.'],
    ['5. Assign work', 'Change the Owner dropdown (or reassign in the form). The new owner gets an email if they switched that on in Team & roles.'],
    ['', ''],
    ['ROLES (Team & roles tab)', ''],
    ['Admin', 'Everything, including Team & roles, Settings, Dashboard and Insights. Runs NBC CRM → Admin → Apply roles and sharing.'],
    ['Manager', 'Edits all records and Accounts. Receives escalations when their team\'s items stay overdue.'],
    ['Member', 'Edits Leads, Opportunities, Outreach, Contacts, Interviews and the Activity log.'],
    ['Viewer', 'Can view, cannot edit.'],
    ['', ''],
    ['AUTOMATION AND NOTIFICATIONS', ''],
    ['Assignment emails', 'Sent when you become the owner of a record (if "Email me when assigned" is ticked).'],
    ['Daily reminders', 'Every day at the hour in Settings: your overdue, follow-up and due-today items.'],
    ['Escalations', 'Items overdue longer than the Settings limit are emailed to the owner\'s manager and logged.'],
    ['Weekly summary', 'Tuesdays (our weeks run Wednesday to Tuesday): pipeline numbers, reply rates, interviews and who has what.'],
    ['', ''],
    ['NOTIFICATIONS', ''],
    ['Notification center', 'Your unread alerts, newest first: assignments, due and overdue follow-ups, upcoming interviews, missing interview notes, quiet opportunities, @mentions, big stage changes and summaries. NBC CRM → My notifications marks them read.'],
    ['Your preferences', 'Notification preferences tab: channel (in-app, email, both), frequency (immediate, daily, weekly, off), timezone, quiet hours and digest hour, for all events or one at a time.'],
    ['Email is off by default', 'Nothing is emailed until an Admin runs Admin → Enable email delivery and confirms the recipients. Only internal team members can receive email. External people are never emailed automatically. Emails never include interview notes or comment text.'],
    ['Admin tools', 'Rules can be switched off one by one; templates are editable; the queue shows delivery status; the Delivery log shows every attempt; Admin → Notification preview is a dry run that sends nothing.'],
    ['', ''],
    ['PEOPLE, ORGANIZATIONS AND LINKS', ''],
    ['Add person / organization', 'Simple forms with optional extra fields. The CRM checks for existing matches (same email, similar name, same website) before creating.'],
    ['Affiliations and contact methods', 'A person can belong to several organizations and have several emails and phones, with one primary of each. Changing jobs keeps the old affiliation as history.'],
    ['Links and documents', 'Add link or document attaches websites, Drive files, proposals, recordings and more to any record. Only https:// and mailto: links are accepted. Linking never changes who can open the file.'],
    ['', ''],
    ['PRIVACY', 'Research participants stay anonymous (role and ID). Full profiles are for professional stakeholders only; keep this sheet shared with the team, never public. No profile scraping or automatic enrichment. Never contact or record children.'],
    ['', ''],
    ['Automation status', PropertiesService.getDocumentProperties().getProperty('installed') || 'Not installed yet']
  ];
  sh.getRange(1, 1, L.length, 2).setValues(L).setWrap(true).setVerticalAlignment('top');
  sh.getRange('A1').setFontSize(20).setFontWeight('bold');
  L.forEach(function (l, i) {
    var row = i + 1;
    if (row > 1 && l[0] && !l[1] && l[0] === l[0].toUpperCase()) sh.getRange(row, 1, 1, 2).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
    else if (l[0] && l[1]) sh.getRange(row, 1).setFontWeight('bold');
  });
  sh.getRange(L.length, 1, 1, 2).setFontWeight('bold').setBackground('#D9F7E8');
  sh.setColumnWidth(1, 260); sh.setColumnWidth(2, 760);
  sh.getRange('D1').setFormula('=HYPERLINK("' + CRM.repo + 'marketing/crm/README.md","Full guide on GitHub")');
  sh.setTabColor('#FFBE00');
}

/* ================================================================ ROLES AND SHARING */
function team_() {
  return ss_().getSheetByName('Team & roles').getRange('A2:I50').getValues().filter(function (r) { return r[0]; }).map(function (r) {
    return { name: String(r[0]), email: String(r[1]).trim(), role: r[2], title: r[3], active: r[4] === true, assign: r[5] === true, daily: r[6] === true, weekly: r[7] === true, manager: String(r[8]) };
  });
}
function member_(name) { return team_().filter(function (m) { return m.name === name; })[0]; }
function myRole_() {
  var ss = ss_(), me = '';
  try { me = Session.getActiveUser().getEmail(); } catch (e) {}
  try { if (me && ss.getOwner() && ss.getOwner().getEmail() === me) return 'Admin'; } catch (e) {}
  var m = team_().filter(function (x) { return x.email && x.email.toLowerCase() === String(me).toLowerCase(); })[0];
  return m ? m.role : '';
}
function requireAdmin_() {
  if (myRole_() === 'Admin') return true;
  alert_('Only an Admin can do this. Ask an Admin, or check your role on the Team & roles tab.');
  return false;
}

function applyRoles() {
  if (!requireAdmin_()) return;
  var ss = ss_(), sh = ss.getSheetByName('Team & roles'), rows = sh.getRange('A2:E50').getValues(), done = [];
  var stamp = Utilities.formatDate(new Date(), tz_(), 'd MMM HH:mm');
  rows.forEach(function (r, i) {
    var email = String(r[1]).trim(), role = r[2], active = r[4] === true, status = '';
    if (!r[0]) return;
    if (!email || email.indexOf('@') < 1) { status = 'Add an email to give access'; }
    else if (!active) {
      try { ss.removeEditor(email); } catch (e) {}
      try { ss.removeViewer(email); } catch (e) {}
      status = 'Access removed · ' + stamp;
    } else if (role === 'Viewer') { ss.addViewer(email); status = 'Viewer · ' + stamp; }
    else if (role) { ss.addEditor(email); status = 'Editor (' + role + ') · ' + stamp; }
    else status = 'Choose a CRM role';
    sh.getRange(i + 2, 12).setValue(status);
    if (role && email) done.push(r[0] + ' (' + role + ')');
  });
  applyProtection_();
  log_('ROLES', 'Team', 'Roles and sharing applied: ' + done.join(', '), 'Note', '');
  alert_('Roles applied. People with emails now have access, and Admin/Manager-only tabs are protected.');
}

function applyProtection_() {
  var ss = ss_(), t = team_(), owner = '';
  try { owner = ss.getOwner().getEmail(); } catch (e) {}
  var admins = t.filter(function (m) { return m.active && m.role === 'Admin' && m.email; }).map(function (m) { return m.email; });
  var managers = t.filter(function (m) { return m.active && m.role === 'Manager' && m.email; }).map(function (m) { return m.email; });
  function lock(names, emails, label) {
    names.forEach(function (n) {
      var sh = ss.getSheetByName(n); if (!sh) return;
      sh.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(function (p) { if (p.getDescription().indexOf('NBC CRM:') === 0) p.remove(); });
      var p = sh.protect().setDescription('NBC CRM: ' + label);
      if (n === 'My work') return;
      var keep = emails.concat(owner ? [owner] : []);
      try { p.removeEditors(p.getEditors()); } catch (e) {}
      if (keep.length) p.addEditors(keep);
      if (p.canDomainEdit()) p.setDomainEdit(false);
    });
  }
  lock(ADMIN_TABS, admins, 'Admins only');
  lock(MANAGER_TABS, admins.concat(managers), 'Admins and managers');
}

/* ================================================================ AUTOMATION */
function installAutomation() {
  var ss = ss_();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (['crmOnEdit', 'dailyJob', 'weeklySummary', 'dailyDigest', 'hourlyTick'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('crmOnEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('hourlyTick').timeBased().everyHours(1).create();
  var tz = String(setting_('TimeZone') || 'Africa/Accra'), who = Session.getEffectiveUser().getEmail() || 'the owner';
  PropertiesService.getDocumentProperties().setProperty('installed', 'Installed ' + Utilities.formatDate(new Date(), tz, 'EEE d MMM yyyy HH:mm') + ' by ' + who + ' · v' + CRM.version + ' · email delivery ' + (v3bool_(v3setting_('EmailEnabled', false)) ? 'ON' : 'OFF (in-app only)'));
  var st = ss.getSheetByName('Start here');
  if (st) { var a = st.getRange('A1:A80').getValues(); for (var k = 0; k < a.length; k++) if (a[k][0] === 'Automation status') st.getRange(k + 1, 2).setValue(PropertiesService.getDocumentProperties().getProperty('installed')); }
}
function reinstallAutomation() { if (requireAdmin_()) { installAutomation(); alert_('Automation re-installed with the current Settings.'); } }

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('NBC CRM')
    .addItem('My notifications', 'showMyNotifications')
    .addItem('Log an interaction…', 'showInteractionForm')
    .addItem('Record details (selected row)', 'showRecordDetails')
    .addSeparator()
    .addItem('Add person…', 'showAddPersonForm')
    .addItem('Add organization…', 'showAddOrganizationForm')
    .addItem('Add task…', 'showAddTaskForm')
    .addItem('Add link or document…', 'showAddResourceForm')
    .addItem('New lead / outreach / contact…', 'showNewRecordForm')
    .addItem('Convert selected lead to opportunity', 'convertLead')
    .addItem('Open my work', 'openMyWork')
    .addSubMenu(ui.createMenu('Admin')
      .addItem('Apply roles and sharing', 'applyRoles')
      .addItem('Notification preview (dry run, sends nothing)', 'previewNotifications')
      .addItem('Enable email delivery… (confirm recipients)', 'enableEmailDelivery')
      .addItem('Disable email delivery', 'disableEmailDelivery')
      .addItem('Process notification queue now', 'processNotificationQueue')
      .addItem('Send summaries now', 'weeklySummaryNow')
      .addItem('Inspect triggers', 'inspectTriggers')
      .addItem('Install notification triggers', 'installNotificationTriggers')
      .addItem('Remove notification triggers', 'removeNotificationTriggers')
      .addItem('Re-install all automation (after changing Settings)', 'reinstallAutomation')
      .addItem('Repair / re-apply setup', 'setupCRM'))
    .addToUi();
}

function who_() {
  var e = '';
  try { e = Session.getActiveUser().getEmail(); } catch (err) {}
  if (!e) return 'team member';
  var m = team_().filter(function (x) { return x.email && x.email.toLowerCase() === e.toLowerCase(); })[0];
  return m ? m.name + ' <' + e + '>' : e;
}
function log_(id, type, text, kind, after) {
  var sh = ss_().getSheetByName('Activity log');
  sh.insertRowAfter(1);
  sh.getRange(2, 1, 1, 7).setValues([[new Date(), id, type, who_(), kind, text, after || '']]);
}
function rowLink_(sheetName, row) {
  var ss = ss_(), sh = ss.getSheetByName(sheetName);
  return ss.getUrl() + '#gid=' + sh.getSheetId() + '&range=A' + row;
}

function notifyAssignee_(name, sheetName, row, oldOwner) {
  // v3: assignments go through the notification queue (in-app first; email only if an Admin enabled it)
  try { queueAssignment_(name, sheetName, row, oldOwner || ''); processQueueSafe_(); } catch (e) {}
}

function crmOnEdit(e) {
  if (!e || !e.range) return;
  var sh = e.range.getSheet(), name = sh.getName(), cfg = TABS[name];
  if (!cfg || e.range.getRow() < 2 || e.range.getNumRows() > 1 || e.range.getNumColumns() > 1) return;
  var row = e.range.getRow(), col = e.range.getColumn(), id = sh.getRange(row, 1).getValue();
  if (!id) return;
  var val = e.range.getValue();
  if (name === 'Outreach') {
    var stage = sh.getRange(row, 8);
    if (col === 11 && val && ['', 'Scheduled'].indexOf(stage.getValue()) >= 0) {
      stage.setValue('Sent');
      log_(id, cfg.type, 'Sent on ' + Utilities.formatDate(new Date(val), tz_(), 'EEE d MMM') + '. Stage set to Sent.', 'Email sent', 'Sent');
      return;
    }
    if (col === 12 && val && ['Booked', 'Interviewed'].indexOf(stage.getValue()) < 0) {
      stage.setValue('Replied');
      log_(id, cfg.type, 'Reply received ' + Utilities.formatDate(new Date(val), tz_(), 'EEE d MMM') + '. Stage set to Replied.', 'Reply received', 'Replied');
      return;
    }
  }
  if (name === 'Interviews' && col === 8 && val === 'Done' && !sh.getRange(row, 9).getValue()) sh.getRange(row, 9).setValue(new Date());
  if (name === 'Opportunities' && col === 7) {
    if (val === 'Proposal' && !sh.getRange(row, 11).getValue()) sh.getRange(row, 11).setValue(new Date());
    if (val === 'Closed Won' || val === 'Closed Lost') {
      if (!sh.getRange(row, 13).getValue()) sh.getRange(row, 13).setValue(new Date());
      log_(id, cfg.type, (e.oldValue || '(blank)') + ' → ' + val + (val === 'Closed Won' ? ' · paid commitment, $' + sh.getRange(row, 9).getValue() : ''), val === 'Closed Won' ? 'Won' : 'Lost', val);
      try { queueStageChange_(name, row, e.oldValue, val); processQueueSafe_(); } catch (x) {}
      return;
    }
  }
  if (name === 'Leads' && col === 8 && val === 'Qualified' && sh.getRange(row, 14).getValue() !== 'Qualified') toast_(id + ' is marked Qualified but its BANT score is below the bar. Check budget, authority, need and timeline.');
  if (name === 'Tasks' && col === 6 && (val === 'Done' || val === 'Cancelled')) {
    if (!sh.getRange(row, 10).getValue()) sh.getRange(row, 10).setValue(new Date());
    try { onTaskCompleted_(id); } catch (x) {}
  }
  if (col === cfg.status) {
    log_(id, cfg.type, (e.oldValue || '(blank)') + ' → ' + (val || '(blank)'), 'Status change', val);
    if (name === 'Opportunities') { try { queueStageChange_(name, row, e.oldValue, val); processQueueSafe_(); } catch (x) {} }
  } else if (col === cfg.owner) {
    log_(id, cfg.type, 'Assigned to ' + (val || 'nobody') + (e.oldValue ? ' (was ' + e.oldValue + ')' : ''), 'Assignment', sh.getRange(row, cfg.status).getValue());
    if (val) notifyAssignee_(String(val), name, row, e.oldValue);
  } else if (col === cfg.comment && val) {
    log_(id, cfg.type, String(val), 'Comment', sh.getRange(row, cfg.status).getValue());
    try { if (queueMentions_(name, row, String(val))) processQueueSafe_(); } catch (x) {}
  }
}

/* ================================================================ FORMS (sidebar) */
function openMyWork() {
  var ss = ss_(), sh = ss.getSheetByName('My work');
  var me = '';
  try { me = Session.getActiveUser().getEmail(); } catch (e) {}
  var m = team_().filter(function (x) { return x.email && x.email.toLowerCase() === String(me).toLowerCase(); })[0];
  if (m) sh.getRange('B1').setValue(m.name);
  ss.setActiveSheet(sh);
}

function formContext() {
  var ss = ss_(), sh = ss.getActiveSheet(), name = sh.getName(), row = sh.getActiveRange().getRow(), ctx = { tab: 'Leads', id: '', status: '', owner: '', next: '' };
  if (TABS[name] && row >= 2 && sh.getRange(row, 1).getValue()) {
    var cfg = TABS[name], v = sh.getRange(row, 1, 1, sh.getLastColumn()).getValues()[0];
    ctx = { tab: name, id: String(v[0]), status: String(v[cfg.status - 1]), owner: String(v[cfg.owner - 1]), next: cfg.next ? String(v[cfg.next - 1]) : '' };
  }
  ctx.team = team_().map(function (m) { return m.name; });
  ctx.lists = { Tasks: V3.lists.TaskStatus, Leads: CRM.lists.LeadStatus, Opportunities: CRM.lists.OppStage, Outreach: CRM.lists.Stage, Contacts: CRM.lists.ContactStatus, Interviews: CRM.lists.InterviewStatus, Accounts: CRM.lists.AccountStatus };
  ctx.ids = {};
  Object.keys(TABS).forEach(function (t) { ctx.ids[t] = ss.getSheetByName(t).getRange('A2:A500').getValues().map(function (r) { return String(r[0]); }).filter(String); });
  ctx.types = CRM.lists.LogType;
  ctx.accounts = ss.getSheetByName('Accounts').getRange('A2:B500').getValues().filter(function (r) { return r[0]; }).map(function (r) { return r[0] + ' · ' + r[1]; });
  ctx.channels = CRM.lists.Channel; ctx.sources = CRM.lists.LeadSource; ctx.segments = CRM.lists.Segment; ctx.settings = CRM.lists.Setting;
  return ctx;
}

var FORM_CSS = '<style>body{font:13px Arial,sans-serif;margin:12px;color:#181818}label{display:block;margin:10px 0 3px;font-weight:bold}select,input,textarea{width:100%;box-sizing:border-box;padding:6px;border:1px solid #ccc;border-radius:6px;font:13px Arial}textarea{height:80px}button{margin-top:14px;width:100%;padding:10px;border:0;border-radius:8px;background:#FFBE00;font-weight:bold;cursor:pointer}.muted{color:#5B5B60;font-size:12px}#msg{margin-top:10px;font-weight:bold}</style>';

function showInteractionForm() {
  var html = FORM_CSS + '<div class="muted">Saved to the record and the Activity log with your name and the time.</div>' +
    '<label>Record type</label><select id="tab" onchange="fillIds()"></select>' +
    '<label>Record ID</label><select id="id"></select>' +
    '<label>What kind of update?</label><select id="type"></select>' +
    '<label>What happened?</label><textarea id="summary" placeholder="e.g. Club owner replied, happy to talk Thursday 4pm"></textarea>' +
    '<label>New stage / status</label><select id="status"></select>' +
    '<label>Next step</label><input id="next" placeholder="e.g. Run interview, send summary">' +
    '<label>Next step date</label><input id="date" type="date">' +
    '<label>Owner (reassign)</label><select id="owner"></select>' +
    '<details><summary style="margin-top:10px;font-weight:bold;cursor:pointer">Person involved (optional)</summary><label>Name</label><input id="personName"><label>Email</label><input id="personEmail">' +
    '<label><input type="checkbox" id="createPerson" style="width:auto"> Create new person if not found</label><div class="muted">Existing people are matched first. Adding a person never emails them.</div></details>' +
    '<button onclick="save()">Save update</button><div id="msg"></div>' +
    '<script>var C;function opt(el,a,sel){el.innerHTML="";a.forEach(function(x){var o=document.createElement("option");o.text=x;o.value=x;if(x===sel)o.selected=true;el.add(o);});}' +
    'function fillIds(){var t=document.getElementById("tab").value;opt(document.getElementById("id"),C.ids[t],C.id);opt(document.getElementById("status"),["(no change)"].concat(C.lists[t]),C.tab===t?C.status:"(no change)");}' +
    'google.script.run.withSuccessHandler(function(c){C=c;opt(document.getElementById("tab"),Object.keys(c.lists),c.tab);fillIds();opt(document.getElementById("type"),c.types,"Comment");opt(document.getElementById("owner"),["(no change)"].concat(c.team),"(no change)");document.getElementById("next").value=c.next||"";}).formContext();' +
    'function save(){var f={};["tab","id","type","summary","status","next","date","owner","personName","personEmail"].forEach(function(k){f[k]=document.getElementById(k).value;});f.createPerson=document.getElementById("createPerson").checked;document.getElementById("msg").textContent="Saving…";' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("msg").textContent=m;document.getElementById("summary").value="";}).withFailureHandler(function(e){document.getElementById("msg").textContent=e.message;}).saveInteraction(f);}</script>';
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(html).setTitle('Log an interaction'));
}

function saveInteraction(f) {
  var ss = ss_(), sh = ss.getSheetByName(f.tab), cfg = TABS[f.tab];
  if (!sh || !cfg) throw new Error('Unknown record type');
  var ids = sh.getRange('A2:A500').getValues().map(function (r) { return String(r[0]); });
  var row = ids.indexOf(String(f.id)) + 2;
  if (row < 2) throw new Error('Record ' + f.id + ' not found');
  var after = sh.getRange(row, cfg.status).getValue();
  if (f.status && f.status !== '(no change)' && f.status !== after) {
    log_(f.id, cfg.type, after + ' → ' + f.status, 'Status change', f.status);
    sh.getRange(row, cfg.status).setValue(f.status); after = f.status;
  }
  if (f.next && cfg.next) sh.getRange(row, cfg.next).setValue(f.next);
  if (f.date && cfg.date) sh.getRange(row, cfg.date).setValue(d_(f.date));
  if (f.summary) { sh.getRange(row, cfg.comment).setValue(f.summary); log_(f.id, cfg.type, f.summary + (f.next ? ' · Next: ' + f.next + (f.date ? ' by ' + f.date : '') : ''), f.type || 'Comment', after); }
  if (f.owner && f.owner !== '(no change)' && f.owner !== String(sh.getRange(row, cfg.owner).getValue())) {
    var was = sh.getRange(row, cfg.owner).getValue();
    sh.getRange(row, cfg.owner).setValue(f.owner);
    log_(f.id, cfg.type, 'Assigned to ' + f.owner + (was ? ' (was ' + was + ')' : ''), 'Assignment', after);
    notifyAssignee_(f.owner, f.tab, row, was);
  }
  if (f.summary) { try { queueMentions_(f.tab, row, f.summary); processQueueSafe_(); } catch (x) {} }
  var extra = '';
  if (f.personName || f.personEmail) {
    var m = findPersonMatches(f.personName, f.personEmail), exact = m.filter(function (x) { return x.match === 'same email'; });
    var pick = exact[0] || (m.length === 1 && !f.createPerson ? m[0] : null);
    if (pick) extra = ' ' + linkPersonToRecord(f.id, pick.id).message;
    else if (f.createPerson) {
      var cp = createPerson({ fullName: f.personName, email: f.personEmail });
      extra = ' ' + cp.message + (cp.ok ? ' ' + linkPersonToRecord(f.id, cp.id).message : '');
    } else extra = m.length ? ' Several people match; open Record details to link the right one.' : ' No matching person; tick "Create new person" to add one.';
  }
  return 'Saved to ' + f.id + '.' + extra;
}

function showNewRecordForm() {
  var html = FORM_CSS + '<div class="muted">Adds a row with the next ID. People are logged by role only (no names).</div>' +
    '<label>Add a</label><select id="tab"><option value="Leads">Lead (a prospect who could buy)</option><option value="Outreach">Outreach touch (a message or visit)</option><option value="Contacts">Contact (a person, by role)</option></select>' +
    '<label>Account</label><select id="account"></select>' +
    '<label>Channel (touch), source (lead) or segment (contact)</label><select id="kind"></select>' +
    '<label>Who (role and organisation type, no names)</label><input id="label" placeholder="e.g. Club owner, Parent 3">' +
    '<label>Owner</label><select id="owner"></select>' +
    '<label>Next step</label><input id="next" placeholder="e.g. Send v2 message">' +
    '<label>Next step date</label><input id="date" type="date">' +
    '<button onclick="save()">Create record</button><div id="msg"></div>' +
    '<script>var C;function opt(el,a,sel){el.innerHTML="";a.forEach(function(x){var o=document.createElement("option");o.text=x;o.value=x;if(x===sel)o.selected=true;el.add(o);});}' +
    'function kinds(){var t=document.getElementById("tab").value;opt(document.getElementById("kind"),t==="Outreach"?C.channels:t==="Leads"?C.sources:C.segments);}' +
    'document.getElementById("tab").onchange=kinds;' +
    'google.script.run.withSuccessHandler(function(c){C=c;opt(document.getElementById("account"),c.accounts);opt(document.getElementById("owner"),c.team);kinds();}).formContext();' +
    'function save(){var f={};["tab","account","kind","label","owner","next","date"].forEach(function(k){f[k]=document.getElementById(k).value;});document.getElementById("msg").textContent="Creating…";' +
    'google.script.run.withSuccessHandler(function(m){document.getElementById("msg").textContent=m;}).withFailureHandler(function(e){document.getElementById("msg").textContent=e.message;}).saveNewRecord(f);}</script>';
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(html).setTitle('New record'));
}

function nextId_(sh, prefix) {
  var n = 0;
  sh.getRange('A2:A500').getValues().forEach(function (r) {
    var m = String(r[0]).match(new RegExp('^' + prefix + '(\\d+)$'));
    if (m) n = Math.max(n, Number(m[1]));
  });
  return prefix + ('0' + (n + 1)).slice(-2);
}

function saveNewRecord(f) {
  var ss = ss_(), sh = ss.getSheetByName(f.tab), cfg = TABS[f.tab];
  var ids = sh.getRange('A2:A500').getValues(), row = 2;
  while (row - 2 < ids.length && ids[row - 2][0]) row++;
  var id = nextId_(sh, cfg.prefix), acct = String(f.account).split(' · ')[0], date = f.date ? d_(f.date) : '';
  if (f.tab === 'Outreach') {
    sh.getRange(row, 1, 1, 3).setValues([[id, 'v3', acct]]);
    sh.getRange(row, 5, 1, 6).setValues([[f.kind, f.label, f.owner, 'Scheduled', 'Medium', date]]);
    sh.getRange(row, 15, 1, 2).setValues([[f.next || 'Send message', date]]);
  } else if (f.tab === 'Leads') {
    sh.getRange(row, 1, 1, 3).setValues([[id, f.label || 'New prospect', acct]]);
    sh.getRange(row, 5, 1, 8).setValues([[f.kind, 'Buyer', f.owner, 'New', 'Unknown', 'Unknown', '', 'Unknown']]);
    sh.getRange(row, 15, 1, 2).setValues([[f.next || 'First contact', date]]);
  } else {
    sh.getRange(row, 1, 1, 3).setValues([[id, f.label || 'New contact', acct]]);
    sh.getRange(row, 5, 1, 8).setValues([[f.kind, 'Constrained', false, false, f.owner, 'New', f.next || 'First contact', date]]);
  }
  log_(id, cfg.type, 'Created by form' + (f.next ? ' · Next: ' + f.next : ''), 'Created', f.tab === 'Outreach' ? 'Scheduled' : 'New');
  notifyAssignee_(f.owner, f.tab, row);
  return 'Created ' + id + ' on the ' + f.tab + ' tab.';
}

/* ================================================================ NOTIFICATIONS */
function items_() {
  var ss = ss_(), out = [], today = new Date(); today.setHours(0, 0, 0, 0);
  ss.getSheetByName('Outreach').getRange('A2:Q500').getValues().forEach(function (r, i) {
    if (r[0] && r[16]) out.push({ owner: String(r[6]), alert: r[16], id: r[0], what: r[3] + ' · ' + r[14], due: r[15], tab: 'Outreach', row: i + 2 });
  });
  ss.getSheetByName('Contacts').getRange('A2:M500').getValues().forEach(function (r, i) {
    if (r[0] && r[12]) out.push({ owner: String(r[8]), alert: r[12], id: r[0], what: r[1] + ' · ' + r[10], due: r[11], tab: 'Contacts', row: i + 2 });
  });
  ss.getSheetByName('Leads').getRange('A2:Q500').getValues().forEach(function (r, i) {
    if (r[0] && r[16]) out.push({ owner: String(r[6]), alert: r[16], id: r[0], what: r[1] + ' · ' + r[14], due: r[15], tab: 'Leads', row: i + 2 });
  });
  ss.getSheetByName('Opportunities').getRange('A2:Q500').getValues().forEach(function (r, i) {
    if (r[0] && r[16]) out.push({ owner: String(r[5]), alert: r[16], id: r[0], what: r[1] + ' · ' + r[14], due: r[15], tab: 'Opportunities', row: i + 2 });
  });
  out.forEach(function (it) { it.late = (it.due instanceof Date) ? Math.floor((today - it.due) / 86400000) : 0; });
  return out;
}
function line_(it) { return '• ' + it.alert + ' · ' + it.id + ' · ' + it.what + (it.late > 0 ? ' (' + it.late + ' days late)' : '') + '\n  ' + rowLink_(it.tab, it.row); }

function dailyJob() { hourlyTick(); }   // kept so old triggers keep working

function remindMeNow() { showMyNotifications(); }

function weeklySummary() { try { v3digest_(new Date(), true); processNotificationQueue(); } catch (e) {} }
function weeklySummaryNow() { if (requireAdmin_()) { weeklySummary(); alert_('Summaries built for every active person. They appear in the Notification center; email goes only if an Admin has enabled delivery.'); } }
