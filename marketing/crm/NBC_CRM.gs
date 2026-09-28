/**
 * NBC PMR CRM — builds a Salesforce-style CRM inside this Google Sheet.
 *
 * HOW TO INSTALL (once, about 2 minutes):
 *   1. Open the CRM sheet → Extensions → Apps Script.
 *   2. Delete any code there, paste this whole file, click Save.
 *   3. Choose "setupCRM" in the function list and click Run. Approve the permissions.
 *   4. Reload the sheet. An "NBC CRM" menu appears.
 *
 * Safe to run again: it never deletes your data or the Activity log; it only
 * re-applies dropdowns, formulas, colours and automation.
 */

var CRM = {
  tz: 'Africa/Accra',
  repo: 'https://github.com/samquansah-algo/nbc-vct/blob/main/',
  team: [['Sam', '', 'Founder'], ['Vera', '', 'Learning Designer'], ['Nana Adwoa', '', 'Learning Experience Designer'], ['Deborah', '', 'Sales and Marketing Lead']],
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
    LogType: ['Comment', 'Status change', 'Email', 'Call', 'Meeting', 'Task', 'Note']
  },
  seed: {"acc":[["G1","Ghana Code Club","Teacher and mentor network","User","Constrained","7,000 teachers · 22 centres","https://ghanacodeclub.org/","Not needed","Vera","Not contacted"],["G2","Ghana Robotics Academy Foundation","Organisation and club coaches","Buyer","Constrained","Robofest clubs","https://foundation.ghanarobotics.org/","Not needed","Sam","Not contacted"],["G3","Ghana Library Authority","Librarian trainers","Host","Constrained","15 libraries","https://www.library.gov.gh/","Not needed","Nana Adwoa","Not contacted"],["G4","Ghana Society for Education and Technology","Teacher association","User","Constrained","~20,000 members","https://gset.education/","Not needed","Vera","Not contacted"],["G5","The MakersPlace (Accra)","STEAM programme","Buyer","Constrained","10,000+ learners","https://makersplacegh.com/","Not needed","Deborah","Not contacted"],["F1","MakerSpaces and the Participatory Library","Facebook group","User","Tech-rich","1,257 members","https://www.facebook.com/groups/librarymaker/","To request","Nana Adwoa","Not contacted"],["M1","micro:bit Champions","Practitioner network","User","Both","382 educators · 51 countries","https://microbit.org/champions/","To request","Vera","Not contacted"],["M2","Scratch Educator Meetups","Meetup network","User","Tech-rich","4,000+ members · 44 groups","https://www.scratchfoundation.org/scratch-meetups-learn","Not needed","Nana Adwoa","Not contacted"],["T3","r/homeschool","Reddit community","Buyer","Tech-rich","~238,000 subscribers","https://www.reddit.com/r/homeschool/","To request","Deborah","Not contacted"],["R1","International Society of the Learning Sciences","Research society","Research","Both","Global","https://www.isls.org/","Not needed","Sam","Not contacted"],["CC","Cape Coast programme owners","In person","Buyer","Constrained","No online group","","Not needed","Deborah","Not contacted"]],"pipe":[["P1","v1","G2","Email","GRAF / club owner","Sam","High","2026-09-28","1"],["P2","v1","G1","Email","Ghana Code Club","Vera","High","2026-09-28","1"],["P3","v1","G3","Formal letter","Ghana Library Authority","Nana Adwoa","High","2026-09-28","1"],["P4","v1","F1","Facebook group","Participatory Library group","Nana Adwoa","High","2026-09-29","1"],["P5","v1","R1","Email","Learning-sciences researcher","Sam","High","2026-09-28","1"],["R1","v1","M1","Community post","Facilitator community","Vera","Medium","2026-09-29","1"],["R2","v1","G5","LinkedIn","Programme owner","Deborah","Medium","2026-09-29","1"],["R3","v1","M2","Forum / DM","Makerspace practitioner","Nana Adwoa","Medium","2026-09-29","1"],["R4","v1","T3","Reddit","Parent community","Deborah","Medium","2026-09-29","1"],["R5","v1","R1","Email","Assessment researcher","Sam","Medium","2026-09-28","1"],["CC1","v1","CC","In person","Programme owners","Deborah","High","2026-09-28",""],["CC2","v1","CC","In person","Programme owners","Deborah","High","2026-09-29",""],["P1-v2","v2","G2","Email","GRAF / club owner","Sam","Medium","2026-09-30","2"],["P2-v2","v2","G1","Email","Ghana Code Club","Vera","Medium","2026-09-30","2"],["P3-v2","v2","G3","Formal letter","Ghana Library Authority","Nana Adwoa","Medium","2026-10-01","2"],["P4-v2","v2","F1","Facebook group","Participatory Library group","Nana Adwoa","Medium","2026-10-01","2"],["P5-v2","v2","R1","Email","Learning-sciences researcher","Sam","Medium","2026-10-02","2"],["R1-v2","v2","M1","Community post","Facilitator community","Vera","Medium","2026-10-02","2"],["R2-v2","v2","G5","LinkedIn","Programme owner","Deborah","Medium","2026-10-02","2"],["R3-v2","v2","M2","Forum / DM","Makerspace practitioner","Nana Adwoa","Medium","2026-10-05","2"],["R4-v2","v2","T3","Reddit","Parent community","Deborah","Medium","2026-10-05","2"],["R6","v2","","Email","All v1 non-responders","Sam","Medium","2026-10-06","2"]],"con":[["C01","Owner 1","G2","Buyer","Constrained",false,"Sam","2026-10-01"],["C02","Owner 2","CC","Buyer","Constrained",false,"Deborah","2026-09-30"],["C03","Owner 3","CC","Buyer","Constrained",false,"Deborah","2026-10-01"],["C04","Parent 1","","Buyer","Constrained",true,"Sam","2026-09-30"],["C05","Facilitator 1","G1","User","Constrained",false,"Vera","2026-10-02"],["C06","Facilitator 2","G1","User","Constrained",false,"Vera","2026-10-03"],["C07","Librarian","G3","Host","Constrained",false,"Nana Adwoa","2026-10-05"],["C08","Library maker lead","F1","User","Tech-rich",false,"Nana Adwoa","2026-10-05"],["C09","Parent 2","T3","Buyer","Tech-rich",false,"Deborah","2026-10-06"],["C10","Researcher","R1","Research","Both",false,"Sam","2026-10-06"]]}
};

var SHEETS = ['Dashboard', 'Pipeline', 'Contacts', 'Interviews', 'Activity log', 'Accounts', 'Insights', 'Team', 'How to use', 'Lists'];
// Columns watched by the automation: status column and comment column (1-based)
var WATCH = {
  'Pipeline': { status: 8, comment: 22, type: 'Pipeline' },
  'Contacts': { status: 10, comment: 15, type: 'Contact' },
  'Interviews': { status: 8, comment: 23, type: 'Interview' },
  'Accounts': { status: 10, comment: 15, type: 'Account' }
};

function ss_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/* ---------------------------------------------------------------- setup */
function setupCRM() {
  var ss = ss_();
  ss.setSpreadsheetTimeZone(CRM.tz);
  var created = {};
  SHEETS.forEach(function (name, i) {
    var sh = ss.getSheetByName(name);
    if (!sh) { sh = ss.insertSheet(name, i); created[name] = true; }
  });
  // hide the original one-tab import so nobody edits it by mistake
  ss.getSheets().forEach(function (sh) {
    if (SHEETS.indexOf(sh.getName()) < 0) {
      if (sh.getName().indexOf('Old import') !== 0) sh.setName('Old import (28 Sep)');
      sh.hideSheet();
    }
  });
  buildLists_(ss);
  buildTeam_(ss, created.Team);
  buildAccounts_(ss, created.Accounts);
  buildPipeline_(ss, created.Pipeline);
  buildContacts_(ss, created.Contacts);
  buildInterviews_(ss, created.Interviews);
  buildLog_(ss, created['Activity log']);
  buildInsights_(ss);
  buildDashboard_(ss);
  buildHelp_(ss);
  SHEETS.forEach(function (name, i) { ss.setActiveSheet(ss.getSheetByName(name)); ss.moveActiveSheet(i + 1); });
  ss.getSheetByName('Lists').hideSheet();
  ss.setActiveSheet(ss.getSheetByName('Dashboard'));
  installAutomation();
  if (created['Activity log']) {
    log_('SETUP', 'CRM', 'CRM set up: pipeline, contacts, interviews, dashboard and automation installed.', 'Comment', '');
  }
  try { SpreadsheetApp.getUi().alert('NBC CRM is ready. Reload the sheet to see the NBC CRM menu.'); } catch (e) {}
}

/* ---------------------------------------------------------------- helpers */
function header_(sh, heads, widths, color) {
  var r = sh.getRange(1, 1, 1, heads.length);
  heads.forEach(function (h, i) {
    if (h.charAt(0) === '=') sh.getRange(1, i + 1).setFormula(h); else sh.getRange(1, i + 1).setValue(h);
  });
  r.setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818').setWrap(true).setVerticalAlignment('middle');
  sh.setRowHeight(1, 42);
  sh.setFrozenRows(1);
  widths.forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.setTabColor(color);
  if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), heads.length).createFilter();
}
function listRange_(name) {
  var ss = ss_();
  if (name === 'Team') return ss.getSheetByName('Team').getRange('A2:A30');
  var keys = Object.keys(CRM.lists);
  var col = keys.indexOf(name) + 1;
  return ss.getSheetByName('Lists').getRange(2, col, CRM.lists[name].length, 1);
}
function dropdown_(sh, col, listName, rows) {
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(listRange_(listName), true).setAllowInvalid(false).build();
  sh.getRange(2, col, rows || 500, 1).setDataValidation(rule);
}
function idDropdown_(sh, col, srcSheet) {
  var rule = SpreadsheetApp.newDataValidation().requireValueInRange(ss_().getSheetByName(srcSheet).getRange('A2:A500'), true).setAllowInvalid(true).build();
  sh.getRange(2, col, 500, 1).setDataValidation(rule);
}
function checkbox_(sh, col) {
  sh.getRange(2, col, 500, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
}
function dates_(sh, cols) {
  cols.forEach(function (c) { sh.getRange(2, c, 500, 1).setNumberFormat('ddd d mmm yyyy'); });
}
function d_(s) {
  if (!s) return '';
  var p = s.split('-');
  return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
}
function color_(rules, range, text, bg, fg) {
  var b = SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(text).setBackground(bg).setRanges([range]);
  if (fg) b.setFontColor(fg).setBold(true);
  rules.push(b.build());
}
function protectFormulas_(sh, a1s) {
  sh.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function (p) { if (p.getDescription() === 'Automatic column') p.remove(); });
  a1s.forEach(function (a1) { sh.getRange(a1).protect().setDescription('Automatic column').setWarningOnly(true); });
}
function lastUpdate_(idCol) {
  return '={"Last update";ARRAYFORMULA(IF(' + idCol + '2:' + idCol + '="","",IFERROR(VLOOKUP(' + idCol + '2:' + idCol + ',SORT({\'Activity log\'!B2:B,\'Activity log\'!A2:A},2,FALSE),2,FALSE),"")))}';
}

/* ---------------------------------------------------------------- tabs */
function buildLists_(ss) {
  var sh = ss.getSheetByName('Lists');
  var keys = Object.keys(CRM.lists);
  sh.clear();
  keys.forEach(function (k, i) {
    var vals = [[k]].concat(CRM.lists[k].map(function (v) { return [v]; }));
    sh.getRange(1, i + 1, vals.length, 1).setValues(vals);
  });
}

function buildTeam_(ss, isNew) {
  var sh = ss.getSheetByName('Team');
  header_(sh, ['Name', 'Email (for sharing and reminders)', 'Role'], [140, 300, 240], '#6833D9');
  if (isNew) sh.getRange(2, 1, CRM.team.length, 3).setValues(CRM.team);
  sh.getRange('E1').setValue('Add each teammate\'s email, then NBC CRM → Share with team. Owners get a daily 8am email of their overdue items.').setWrap(true);
  sh.setColumnWidth(5, 360);
}

function buildAccounts_(ss, isNew) {
  var sh = ss.getSheetByName('Accounts');
  header_(sh, ['Account ID', 'Account', 'Type', 'Segment', 'Setting', 'Size', 'Link', 'Permission to post', 'Owner', 'Status',
    '={"Touches";ARRAYFORMULA(IF(A2:A="","",COUNTIF(Pipeline!C2:C,A2:A)))}',
    '={"Sent";ARRAYFORMULA(IF(A2:A="","",COUNTIFS(Pipeline!C2:C,A2:A,Pipeline!K2:K,"<>")))}',
    '={"Replies";ARRAYFORMULA(IF(A2:A="","",COUNTIFS(Pipeline!C2:C,A2:A,Pipeline!L2:L,"<>")))}',
    '={"Interviews";ARRAYFORMULA(IF(A2:A="","",COUNTIF(Interviews!D2:D,A2:A)))}',
    'Latest comment'], [80, 240, 170, 80, 95, 170, 90, 110, 95, 110, 70, 60, 65, 75, 280], '#006EFB');
  if (isNew) {
    var rows = CRM.seed.acc.map(function (a) {
      return [a[0], a[1], a[2], a[3], a[4], a[5], a[6] ? '=HYPERLINK("' + a[6] + '","Open")' : '', a[7], a[8], a[9]];
    });
    sh.getRange(2, 1, rows.length, 10).setValues(rows);
  }
  dropdown_(sh, 4, 'Segment'); dropdown_(sh, 5, 'Setting'); dropdown_(sh, 8, 'Permission'); dropdown_(sh, 9, 'Team'); dropdown_(sh, 10, 'AccountStatus');
  var rules = [], st = sh.getRange('J2:J500');
  color_(rules, st, 'Contacted', '#FFF4D6'); color_(rules, st, 'Engaged', '#E6F0FF'); color_(rules, st, 'Interviewing', '#D9F7E8'); color_(rules, st, 'Closed', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  protectFormulas_(sh, ['K1:N500']);
}

function buildPipeline_(ss, isNew) {
  var sh = ss.getSheetByName('Pipeline');
  header_(sh, ['ID', 'Version', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Channel', 'Audience', 'Owner', 'Stage', 'Priority', 'Scheduled', 'Sent date', 'Reply date',
    '={"Days to reply";ARRAYFORMULA(IF((K2:K<>"")*(L2:L<>""),L2:L-K2:K,""))}',
    '={"Follow-up due";ARRAYFORMULA(IF((K2:K<>"")*(L2:L=""),K2:K+5,""))}',
    'Next step', 'Next step date',
    '={"Alert";ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(H2:H&"","^(Interviewed|Declined|Not sent|No response)$"),"",IF((P2:P<>"")*(P2:P<TODAY()),"OVERDUE",IF((N2:N<>"")*(N2:N<=TODAY()),"FOLLOW UP",IF((P2:P<>"")*(P2:P=TODAY()),"DUE TODAY",""))))))}',
    lastUpdate_('A'),
    '={"Updates";ARRAYFORMULA(IF(A2:A="","",COUNTIF(\'Activity log\'!B2:B,A2:A)))}',
    'Message', 'Screenshot link', 'Latest comment (logged automatically)'],
    [70, 60, 75, 210, 115, 170, 95, 100, 75, 105, 105, 105, 70, 105, 170, 105, 90, 105, 65, 70, 120, 280], '#FFBE00');
  if (isNew) {
    var rows = CRM.seed.pipe.map(function (p) {
      var anchor = p[8] === '1' ? 'v1-first-messages' : p[8] === '2' ? 'v2-refined-messages' : '';
      return [p[0], p[1], p[2], p[3], p[4], p[5], 'Scheduled', p[6], d_(p[7]), p[3] === 'In person' ? 'Visit and canvass' : 'Send message', d_(p[7]),
        anchor ? '=HYPERLINK("' + CRM.repo + 'marketing/OUTREACH_MESSAGES.md#' + anchor + '","Open")' : ''];
    });
    rows.forEach(function (r, i) {
      var row = i + 2;
      sh.getRange(row, 1, 1, 3).setValues([[r[0], r[1], r[2]]]);
      sh.getRange(row, 5, 1, 6).setValues([[r[3], r[4], r[5], r[6], r[7], r[8]]]);
      sh.getRange(row, 15, 1, 2).setValues([[r[9], r[10]]]);
      if (r[11]) sh.getRange(row, 20).setFormula(r[11]);
    });
  }
  dropdown_(sh, 2, 'Version'); idDropdown_(sh, 3, 'Accounts'); dropdown_(sh, 5, 'Channel'); dropdown_(sh, 7, 'Team'); dropdown_(sh, 8, 'Stage'); dropdown_(sh, 9, 'Priority');
  dates_(sh, [10, 11, 12, 14, 16, 18]);
  var rules = [], st = sh.getRange('H2:H500'), al = sh.getRange('Q2:Q500');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenFormulaSatisfied('=$Q2="OVERDUE"').setBackground('#FDE7E4').setRanges([sh.getRange('A2:P500')]).build());
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'FOLLOW UP', '#FFBE00', '#181818'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, st, 'Sent', '#FFF4D6'); color_(rules, st, 'Follow up', '#FFE0B2'); color_(rules, st, 'Replied', '#E6F0FF'); color_(rules, st, 'Booked', '#D9F7E8');
  color_(rules, st, 'Interviewed', '#01C778', '#181818'); color_(rules, st, 'Declined', '#E4E4E7'); color_(rules, st, 'No response', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  sh.setFrozenColumns(1);
  protectFormulas_(sh, ['D1:D500', 'M1:N500', 'Q1:S500']);
}

function buildContacts_(ss, isNew) {
  var sh = ss.getSheetByName('Contacts');
  header_(sh, ['Contact ID', 'Role (no names)', 'Account ID',
    '={"Account";ARRAYFORMULA(IF(C2:C="","",IFERROR(VLOOKUP(C2:C,Accounts!A:B,2,FALSE),"")))}',
    'Segment', 'Setting', 'Connected to Algo Peers?', 'Consent recorded?', 'Owner', 'Status', 'Next step', 'Next step date',
    '={"Alert";ARRAYFORMULA(IF(A2:A="","",IF(REGEXMATCH(J2:J&"","^(Interviewed|Declined)$"),"",IF((L2:L<>"")*(L2:L<TODAY()),"OVERDUE",IF((L2:L<>"")*(L2:L=TODAY()),"DUE TODAY","")))))}',
    lastUpdate_('A'), 'Latest comment (logged automatically)'],
    [80, 150, 75, 210, 80, 95, 95, 90, 95, 100, 170, 110, 90, 105, 280], '#6833D9');
  checkbox_(sh, 7); checkbox_(sh, 8);
  if (isNew) {
    var rows = CRM.seed.con.map(function (c) { return [c[0], c[1], c[2]]; });
    sh.getRange(2, 1, rows.length, 3).setValues(rows);
    var rest = CRM.seed.con.map(function (c) { return [c[3], c[4], c[5], false, c[6], 'New', 'Interview', d_(c[7])]; });
    sh.getRange(2, 5, rest.length, 8).setValues(rest);
  }
  idDropdown_(sh, 3, 'Accounts'); dropdown_(sh, 5, 'Segment'); dropdown_(sh, 6, 'Setting'); dropdown_(sh, 9, 'Team'); dropdown_(sh, 10, 'ContactStatus');
  dates_(sh, [12, 14]);
  var rules = [], al = sh.getRange('M2:M500'), st = sh.getRange('J2:J500');
  color_(rules, al, 'OVERDUE', '#F2643E', '#FFFFFF'); color_(rules, al, 'DUE TODAY', '#006EFB', '#FFFFFF');
  color_(rules, st, 'Replied', '#E6F0FF'); color_(rules, st, 'Scheduled', '#FFF4D6'); color_(rules, st, 'Interviewed', '#01C778', '#181818'); color_(rules, st, 'Declined', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  protectFormulas_(sh, ['D1:D500', 'M1:N500']);
}

function buildInterviews_(ss, isNew) {
  var sh = ss.getSheetByName('Interviews');
  header_(sh, ['Interview ID', 'Contact ID',
    '={"Participant";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:B,2,FALSE),"")))}',
    '={"Account ID";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:C,3,FALSE),"")))}',
    'Owner',
    '={"Role";ARRAYFORMULA(IF(B2:B="","",IFERROR(VLOOKUP(B2:B,Contacts!A:E,5,FALSE),"")))}',
    'Target date', 'Status', 'Done date', 'Consent given?', 'Recent problem (their words)', 'Workaround', 'Consequence', 'Who buys / budget process', 'Offer response', 'Next step',
    'P1 Can\'t tell if skill transfers', 'P2 Stops without key facilitator', 'P3 Prep time too high', 'P4 Hard to show families progress', 'P5 No budget route',
    'Notes / screenshot link', 'Latest comment (logged automatically)'],
    [80, 80, 130, 75, 95, 75, 110, 100, 110, 80, 260, 180, 180, 180, 180, 170, 90, 90, 90, 90, 90, 150, 280], '#01C778');
  checkbox_(sh, 10);
  if (isNew) {
    var rows = CRM.seed.con.map(function (c, i) { return ['I' + ('0' + (i + 1)).slice(-2), c[0]]; });
    sh.getRange(2, 1, rows.length, 2).setValues(rows);
    var rest = CRM.seed.con.map(function (c) { return [c[6]]; });
    sh.getRange(2, 5, rest.length, 1).setValues(rest);
    var more = CRM.seed.con.map(function (c) { return [d_(c[7]), 'Scheduled']; });
    sh.getRange(2, 7, more.length, 2).setValues(more);
  }
  idDropdown_(sh, 2, 'Contacts'); dropdown_(sh, 5, 'Team'); dropdown_(sh, 8, 'InterviewStatus');
  for (var c = 17; c <= 21; c++) dropdown_(sh, c, 'Rating');
  dates_(sh, [7, 9]);
  sh.getRange('K2:P500').setWrap(true);
  var rules = [], st = sh.getRange('H2:H500');
  color_(rules, st, 'Done', '#01C778', '#181818'); color_(rules, st, 'No-show', '#FDE7E4'); color_(rules, st, 'Rescheduled', '#FFF4D6'); color_(rules, st, 'Cancelled', '#E4E4E7');
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(2).setBackground('#01C778').setRanges([sh.getRange('Q2:U500')]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberEqualTo(1).setBackground('#FFF4D6').setRanges([sh.getRange('Q2:U500')]).build());
  sh.setConditionalFormatRules(rules);
  protectFormulas_(sh, ['C1:D500', 'F1:F500']);
}

function buildLog_(ss, isNew) {
  var sh = ss.getSheetByName('Activity log');
  header_(sh, ['When', 'Record ID', 'Record type', 'By', 'Type', 'Update / comment', 'Stage or status after'], [150, 85, 95, 190, 110, 520, 150], '#F2643E');
  sh.getRange('A2:A2000').setNumberFormat('ddd d mmm yyyy, HH:mm');
  sh.getRange('F2:F2000').setWrap(true);
  dropdown_(sh, 5, 'LogType', 2000);
}

function buildInsights_(ss) {
  var sh = ss.getSheetByName('Insights');
  sh.clear();
  sh.getRange('A1').setFormula('=QUERY(Interviews!A1:U,"select C, F, H, Q, R, S, T, U where A is not null",1)');
  sh.getRange('A1:H1').setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818').setWrap(true);
  var heads = [['Problem', 'Rated', 'Rated 2+', 'Buyers rating 2+', 'Result']];
  sh.getRange('J1:N1').setValues(heads).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
  var names = ['P1 Can\'t tell if skill transfers', 'P2 Stops without key facilitator', 'P3 Prep time too high', 'P4 Hard to show families progress', 'P5 No budget route'];
  var cols = ['Q', 'R', 'S', 'T', 'U'];
  for (var i = 0; i < 5; i++) {
    var r = i + 2, c = cols[i];
    sh.getRange(r, 10).setValue(names[i]);
    sh.getRange(r, 11).setFormula('=COUNT(Interviews!' + c + '2:' + c + ')');
    sh.getRange(r, 12).setFormula('=COUNTIF(Interviews!' + c + '2:' + c + ',">=2")');
    sh.getRange(r, 13).setFormula('=COUNTIFS(Interviews!F2:F,"Buyer",Interviews!' + c + '2:' + c + ',">=2")');
    sh.getRange(r, 14).setFormula('=IF(L' + r + '>=6,IF(M' + r + '>=3,"Confirmed","Not confirmed"),IF(K' + r + '<10,"Pending","Not confirmed"))');
  }
  sh.getRange('J8').setValue('Rating: 0 not raised · 1 raised when asked · 2 raised with an example · 3 raised unprompted with a recent example. Confirmed = 6+ of 10 rate it 2+, including 3+ buyers.').setWrap(true);
  [220, 80, 90, 70, 70, 70, 70, 70, 20, 260, 70, 80, 120, 120].forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  sh.setFrozenRows(1);
  var rules = [];
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(2).setBackground('#01C778').setRanges([sh.getRange('D2:H200')]).build());
  color_(rules, sh.getRange('N2:N6'), 'Confirmed', '#01C778', '#181818'); color_(rules, sh.getRange('N2:N6'), 'Not confirmed', '#E4E4E7');
  sh.setConditionalFormatRules(rules);
  sh.setTabColor('#C2410C');
}

function buildDashboard_(ss) {
  var sh = ss.getSheetByName('Dashboard');
  sh.getCharts().forEach(function (ch) { sh.removeChart(ch); });
  sh.clear();
  sh.getRange('A1').setValue('NBC · PMR CRM').setFontSize(20).setFontWeight('bold');
  sh.getRange('A2').setFormula('="Today: "&TEXT(TODAY(),"ddd d mmm yyyy")&"   ·   weeks run Wednesday to Tuesday"').setFontColor('#5B5B60');
  sh.getRange('A3').setFormula('=HYPERLINK("' + CRM.repo + 'marketing/crm/README.md","How to use this CRM")');
  sh.getRange('B3').setFormula('=HYPERLINK("https://github.com/samquansah-algo/nbc-vct/tree/main/weekly-tactics/01-market-research","PMR deck")');
  sh.getRange('C3').setFormula('=HYPERLINK("' + CRM.repo + 'marketing/OUTREACH_MESSAGES.md","Messages")');
  var kpi = [
    ['Touches planned', '=COUNTA(Pipeline!A2:A)'],
    ['Sent', '=COUNT(Pipeline!K2:K)'],
    ['Replies', '=COUNT(Pipeline!L2:L)'],
    ['Reply rate', '=IFERROR(B7/B6,0)'],
    ['Booked or interviewed', '=COUNTIF(Pipeline!H2:H,"Booked")+COUNTIF(Pipeline!H2:H,"Interviewed")'],
    ['Overdue next steps', '=COUNTIF(Pipeline!Q2:Q,"OVERDUE")+COUNTIF(Contacts!M2:M,"OVERDUE")'],
    ['Follow-ups due', '=COUNTIF(Pipeline!Q2:Q,"FOLLOW UP")'],
    ['Interviews done (target 10)', '=COUNTIF(Interviews!H2:H,"Done")'],
    ['Problems confirmed (of 5)', '=COUNTIF(Insights!N2:N6,"Confirmed")']
  ];
  sh.getRange('A4').setValue('KEY NUMBERS').setFontWeight('bold');
  sh.getRange(5, 1, kpi.length, 1).setValues(kpi.map(function (k) { return [k[0]]; }));
  sh.getRange(5, 2, kpi.length, 1).setFormulas(kpi.map(function (k) { return [k[1]]; })).setFontWeight('bold').setFontSize(13);
  sh.getRange('B8').setNumberFormat('0%');
  sh.getRange('B10').setBackground('#FDE7E4');

  var r = 16;
  function table(title, heads, keys, fns) {
    sh.getRange(r, 1).setValue(title).setFontWeight('bold');
    sh.getRange(r + 1, 1, 1, heads.length).setValues([heads]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
    keys.forEach(function (k, i) {
      var row = r + 2 + i;
      sh.getRange(row, 1).setValue(k);
      fns.forEach(function (fn, j) { sh.getRange(row, 2 + j).setFormula(fn(row)); });
    });
    var start = r + 2;
    r = r + 3 + keys.length;
    return start;
  }
  var stageStart = table('PIPELINE BY STAGE', ['Stage', 'Touches', 'Overdue'], CRM.lists.Stage, [
    function (x) { return '=COUNTIF(Pipeline!H$2:H,A' + x + ')'; },
    function (x) { return '=COUNTIFS(Pipeline!H$2:H,A' + x + ',Pipeline!Q$2:Q,"OVERDUE")'; }]);
  table('BY OWNER', ['Owner', 'Open touches', 'Overdue', 'Interviews', 'Done'], CRM.team.map(function (t) { return t[0]; }), [
    function (x) { return '=COUNTIF(Pipeline!G$2:G,A' + x + ')-COUNTIFS(Pipeline!G$2:G,A' + x + ',Pipeline!H$2:H,"Interviewed")-COUNTIFS(Pipeline!G$2:G,A' + x + ',Pipeline!H$2:H,"Declined")-COUNTIFS(Pipeline!G$2:G,A' + x + ',Pipeline!H$2:H,"No response")-COUNTIFS(Pipeline!G$2:G,A' + x + ',Pipeline!H$2:H,"Not sent")'; },
    function (x) { return '=COUNTIFS(Pipeline!G$2:G,A' + x + ',Pipeline!Q$2:Q,"OVERDUE")+COUNTIFS(Contacts!I$2:I,A' + x + ',Contacts!M$2:M,"OVERDUE")'; },
    function (x) { return '=COUNTIF(Interviews!E$2:E,A' + x + ')'; },
    function (x) { return '=COUNTIFS(Interviews!E$2:E,A' + x + ',Interviews!H$2:H,"Done")'; }]);
  var chStart = table('BY CHANNEL', ['Channel', 'Planned', 'Sent', 'Replies', 'Reply rate'], CRM.lists.Channel.slice(0, 8), [
    function (x) { return '=COUNTIF(Pipeline!E$2:E,A' + x + ')'; },
    function (x) { return '=COUNTIFS(Pipeline!E$2:E,A' + x + ',Pipeline!K$2:K,"<>")'; },
    function (x) { return '=COUNTIFS(Pipeline!E$2:E,A' + x + ',Pipeline!L$2:L,"<>")'; },
    function (x) { return '=IFERROR(D' + x + '/C' + x + ',0)'; }]);
  var vStart = table('v1 AGAINST v2', ['Version', 'Planned', 'Sent', 'Replies', 'Reply rate'], ['v1', 'v2'], [
    function (x) { return '=COUNTIF(Pipeline!B$2:B,A' + x + ')'; },
    function (x) { return '=COUNTIFS(Pipeline!B$2:B,A' + x + ',Pipeline!K$2:K,"<>")'; },
    function (x) { return '=COUNTIFS(Pipeline!B$2:B,A' + x + ',Pipeline!L$2:L,"<>")'; },
    function (x) { return '=IFERROR(D' + x + '/C' + x + ',0)'; }]);
  sh.getRange(chStart, 5, 8, 1).setNumberFormat('0%');
  sh.getRange(vStart, 5, 2, 1).setNumberFormat('0%');
  sh.getRange('H4').setValue('ACTION LIST (overdue, follow-ups and due today)').setFontWeight('bold');
  sh.getRange('H5').setFormula('=IFERROR(QUERY(Pipeline!A1:Q,"select A, D, G, H, O, P, Q where Q is not null and Q <> \'\' order by P",1),"Nothing due. Nice work.")');
  sh.getRange('H5:N5').setFontWeight('bold');
  sh.setColumnWidth(1, 230); [90, 90, 90, 90, 20, 20].forEach(function (w, i) { sh.setColumnWidth(i + 2, w); });
  [70, 200, 90, 100, 170, 110, 100].forEach(function (w, i) { sh.setColumnWidth(i + 8, w); });
  var chart = sh.newChart().setChartType(Charts.ChartType.BAR)
    .addRange(sh.getRange(stageStart, 1, CRM.lists.Stage.length, 2))
    .setPosition(4, 16, 0, 0).setOption('title', 'Pipeline by stage').setOption('legend', { position: 'none' })
    .setOption('colors', ['#FFBE00']).setOption('width', 520).setOption('height', 300).build();
  sh.insertChart(chart);
  sh.setTabColor('#181818');
  sh.setFrozenRows(3);
}

function buildHelp_(ss) {
  var sh = ss.getSheetByName('How to use');
  sh.clear();
  var lines = [
    ['NBC PMR CRM: how to use'],
    ['Pipeline = every outreach touch (like Salesforce opportunities). Pick the Stage from the dropdown: Scheduled → Sent → Follow up → Replied → Booked → Interviewed (or No response / Declined).'],
    ['Automation: type a Sent date and the Stage moves to Sent; type a Reply date and it moves to Replied. Days to reply, Follow-up due (5 days) and Alert (OVERDUE, FOLLOW UP, DUE TODAY) fill in by themselves.'],
    ['Every record has an Owner (Sam, Vera, Nana Adwoa, Deborah) and a Next step with a date. Use the filter arrows in row 1 to show only your records.'],
    ['Updates and comments: type in the "Latest comment" column (or use NBC CRM → Log an update). Every comment and every stage or status change is saved to the Activity log with the time and who made it, like Salesforce Chatter.'],
    ['To ask a teammate something: right-click a cell → Comment → type @ and their email to assign it. Google emails them.'],
    ['Interviews: set Status to Done, fill in the notes the same day and rate P1–P5 from 0 to 3. Insights and the Dashboard update themselves.'],
    ['Team: add emails on the Team tab, then NBC CRM → Share with team. Each owner gets a daily 8am email listing their overdue items.'],
    ['Privacy: log people by role and ID only (Owner 1, C03…). Keep names, emails and phone numbers in your own address book. Never contact or record children.'],
    ['Grey columns with formulas are automatic: please don\'t type in them (the sheet warns you).']
  ];
  sh.getRange(1, 1, lines.length, 1).setValues(lines).setWrap(true).setVerticalAlignment('top');
  sh.getRange('A1').setFontSize(16).setFontWeight('bold');
  sh.setColumnWidth(1, 900);
  sh.setTabColor('#FFBE00');
}

/* ---------------------------------------------------------------- automation */
function installAutomation() {
  var ss = ss_();
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (['crmOnEdit', 'dailyDigest'].indexOf(t.getHandlerFunction()) >= 0) ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('crmOnEdit').forSpreadsheet(ss).onEdit().create();
  ScriptApp.newTrigger('dailyDigest').timeBased().atHour(8).everyDays(1).inTimezone(CRM.tz).create();
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('NBC CRM')
    .addItem('Log an update for the selected row…', 'logUpdate')
    .addItem('Share with team (emails on Team tab)', 'shareWithTeam')
    .addItem('Email today\'s digest to me now', 'digestToMe')
    .addSeparator()
    .addItem('Repair / re-apply CRM setup', 'setupCRM')
    .addToUi();
}

function who_() {
  var e = '';
  try { e = Session.getActiveUser().getEmail(); } catch (err) {}
  return e || 'team member';
}

function log_(id, type, text, kind, after) {
  var sh = ss_().getSheetByName('Activity log');
  sh.insertRowAfter(1);
  sh.getRange(2, 1, 1, 7).setValues([[new Date(), id, type, who_(), kind, text, after || '']]);
}

function crmOnEdit(e) {
  if (!e || !e.range) return;
  var sh = e.range.getSheet(), cfg = WATCH[sh.getName()];
  if (!cfg || e.range.getRow() < 2 || e.range.getNumRows() > 1 || e.range.getNumColumns() > 1) return;
  var row = e.range.getRow(), col = e.range.getColumn();
  var id = sh.getRange(row, 1).getValue();
  if (!id) return;
  var val = e.range.getValue();
  if (sh.getName() === 'Pipeline') {
    var stage = sh.getRange(row, 8);
    if (col === 11 && val && ['', 'Scheduled'].indexOf(stage.getValue()) >= 0) {
      stage.setValue('Sent');
      log_(id, cfg.type, 'Sent on ' + Utilities.formatDate(new Date(val), CRM.tz, 'EEE d MMM') + '. Stage set to Sent.', 'Status change', 'Sent');
      return;
    }
    if (col === 12 && val && ['Booked', 'Interviewed'].indexOf(stage.getValue()) < 0) {
      stage.setValue('Replied');
      log_(id, cfg.type, 'Reply received ' + Utilities.formatDate(new Date(val), CRM.tz, 'EEE d MMM') + '. Stage set to Replied.', 'Status change', 'Replied');
      return;
    }
  }
  if (col === cfg.status) {
    log_(id, cfg.type, (e.oldValue || '(blank)') + ' → ' + (val || '(blank)'), 'Status change', val);
  } else if (col === cfg.comment && val) {
    log_(id, cfg.type, String(val), 'Comment', sh.getRange(row, cfg.status).getValue());
  }
}

function logUpdate() {
  var ui = SpreadsheetApp.getUi(), sh = ss_().getActiveSheet(), cfg = WATCH[sh.getName()];
  var row = sh.getActiveRange().getRow();
  if (!cfg || row < 2) { ui.alert('Select a row on Pipeline, Contacts, Interviews or Accounts first.'); return; }
  var id = sh.getRange(row, 1).getValue();
  var res = ui.prompt('Log an update for ' + id, 'What happened? (saved to the Activity log with the time and your name)', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK || !res.getResponseText()) return;
  sh.getRange(row, cfg.comment).setValue(res.getResponseText());
  log_(id, cfg.type, res.getResponseText(), 'Comment', sh.getRange(row, cfg.status).getValue());
}

function shareWithTeam() {
  var ss = ss_(), rows = ss.getSheetByName('Team').getRange('A2:B30').getValues(), added = [];
  rows.forEach(function (r) { if (r[1] && String(r[1]).indexOf('@') > 0) { ss.addEditor(String(r[1]).trim()); added.push(r[0]); } });
  var msg = added.length ? 'Shared as editors with: ' + added.join(', ') : 'Add emails in column B of the Team tab first.';
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) {}
}

function alerts_() {
  var ss = ss_(), out = [];
  var p = ss.getSheetByName('Pipeline').getRange('A2:Q500').getValues();
  p.forEach(function (r) { if (r[0] && r[16]) out.push({ owner: r[6], line: r[16] + ' · ' + r[0] + ' · ' + r[3] + ' · ' + r[14] }); });
  var c = ss.getSheetByName('Contacts').getRange('A2:M500').getValues();
  c.forEach(function (r) { if (r[0] && r[12]) out.push({ owner: r[8], line: r[12] + ' · ' + r[0] + ' (' + r[1] + ') · ' + r[10] }); });
  return out;
}

function dailyDigest() {
  var ss = ss_(), items = alerts_();
  if (!items.length) return;
  var emails = {};
  ss.getSheetByName('Team').getRange('A2:B30').getValues().forEach(function (r) { if (r[0] && r[1]) emails[r[0]] = String(r[1]).trim(); });
  var me = Session.getEffectiveUser().getEmail(), byTo = {};
  items.forEach(function (it) { var to = emails[it.owner] || me; (byTo[to] = byTo[to] || []).push(it.line); });
  Object.keys(byTo).forEach(function (to) {
    MailApp.sendEmail(to, 'NBC CRM: ' + byTo[to].length + ' item(s) need you today', byTo[to].join('\n') + '\n\nOpen the CRM: ' + ss.getUrl());
  });
}

function digestToMe() {
  var items = alerts_(), ss = ss_();
  var body = items.length ? items.map(function (i) { return i.owner + ': ' + i.line; }).join('\n') : 'Nothing overdue or due today.';
  MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'NBC CRM digest', body + '\n\n' + ss.getUrl());
  try { SpreadsheetApp.getUi().alert('Digest emailed to you.'); } catch (e) {}
}
