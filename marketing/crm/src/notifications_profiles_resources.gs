/* =====================================================================
 * NBC CRM v3 MODULE: notifications, profiles, contacts and linked resources
 *
 * Safety defaults (see Settings):
 *   EmailEnabled = FALSE and DryRun = TRUE. No email leaves the CRM until an
 *   Admin runs NBC CRM → Admin → Enable email delivery… and confirms the exact
 *   recipient list. Only internal users on "Team & roles" can ever be
 *   recipients. External people (People / Contacts) are never emailed
 *   automatically. Emails never contain interview notes or comment text.
 * ===================================================================== */

var V3 = {
  NQ: 'Notification queue', NR: 'Notification rules', NP: 'Notification preferences', NT: 'Notification templates', NL: 'Delivery log',
  NC: 'Notification center', PEOPLE: 'People', AFF: 'Affiliations', METHODS: 'Contact methods', RES: 'Resources', TASKS: 'Tasks', PREVIEW: 'Notification preview',
  safeProtocols: /^(https:\/\/|mailto:)/i,
  emailRx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  significantDefault: 'Proposal,Negotiation,Closed Won,Closed Lost',
  headers: {
    'Tasks': ['Task ID', 'Title', 'Related record ID', 'Owner', 'Due date', 'Status', 'Priority', 'Created by', 'Created on', 'Completed on', 'Notes (no interview details)', 'Latest comment (logged automatically)'],
    'People': ['Person ID', 'Full name', 'Preferred name', 'Job title', 'Department', 'Current organization ID', 'Current organization', 'CRM owner', 'Stakeholder role',
      'Primary email', 'Primary phone', 'Location', 'Timezone', 'Preferred contact method', 'LinkedIn', 'Website', 'Other public links', 'Relationship source', 'Introducer',
      'First connected', 'Professional background', 'Relationship notes', 'Communication preferences', 'Do not contact', 'Enrichment source', 'Enrichment retrieved on',
      'Created by', 'Created on', 'Leads', 'Opportunities', 'Interviews', 'Activities', 'Tasks', 'Resources'],
    'Affiliations': ['Affiliation ID', 'Person ID', 'Organization ID', 'Role / title', 'Start date', 'End date', 'Current?', 'Person', 'Organization', 'Notes'],
    'Contact methods': ['Method ID', 'Person ID', 'Type', 'Value', 'Label', 'Primary?', 'Notes', 'Person'],
    'Resources': ['Resource ID', 'Title', 'URL', 'Resource type', 'Description', 'Linked record type', 'Linked record ID', 'Linked record', 'Created by', 'Created on', 'Drive file ID', 'Open', 'Access'],
    'Notification rules': ['Rule ID', 'Event', 'Enabled', 'Delivery', 'Recipients', 'Parameter', 'Template ID', 'What it does'],
    'Notification preferences': ['User', 'Event', 'Enabled', 'Channel', 'Frequency', 'Timezone', 'Quiet hours start', 'Quiet hours end', 'Digest hour'],
    'Notification templates': ['Template ID', 'Subject', 'Body'],
    'Notification queue': ['Notification ID', 'Created', 'Rule ID', 'Event', 'Dedupe key', 'Recipient', 'Recipient email', 'Channel', 'Delivery', 'Record type', 'Record ID',
      'Record name', 'Reason', 'Owner', 'Due', 'Link', 'Subject', 'Body', 'Status', 'Attempts', 'Next attempt', 'Last error', 'Delivered at', 'Read'],
    'Delivery log': ['When', 'Notification ID', 'Recipient', 'Channel', 'Result', 'Detail', 'Email quota left']
  },
  rules: [
    ['R01', 'LEAD_ASSIGNED', true, 'Immediate', 'Assignee', '', 'T_ASSIGN', 'A lead is assigned to you'],
    ['R02', 'OPP_ASSIGNED', true, 'Immediate', 'Assignee', '', 'T_ASSIGN', 'An opportunity is assigned to you'],
    ['R03', 'TASK_ASSIGNED', true, 'Immediate', 'Assignee', '', 'T_ASSIGN', 'A task is assigned to you'],
    ['R04', 'TASK_REASSIGNED', true, 'Immediate', 'Assignee', '', 'T_REASSIGN', 'A task is moved to you from someone else'],
    ['R05', 'RECORD_ASSIGNED', true, 'Digest', 'Assignee', '', 'T_ASSIGN', 'An outreach touch, contact, interview or account is assigned to you'],
    ['R06', 'FOLLOWUP_UPCOMING', true, 'Digest', 'Owner', 1, 'T_GENERIC', 'A next step or task is due within N days'],
    ['R07', 'FOLLOWUP_OVERDUE', true, 'Immediate', 'Owner', 0, 'T_GENERIC', 'A next step or task is past its date'],
    ['R08', 'INTERVIEW_UPCOMING', true, 'Immediate', 'Owner', 1, 'T_GENERIC', 'An interview is within N days'],
    ['R09', 'INTERVIEW_NOTES_MISSING', true, 'Immediate', 'Owner', 1, 'T_GENERIC', 'Interview notes still empty N days after the interview'],
    ['R10', 'OPP_STALE', true, 'Digest', 'Owner', 7, 'T_GENERIC', 'An open opportunity has had no activity for N days'],
    ['R11', 'MENTION', true, 'Immediate', 'Mentioned', '', 'T_MENTION', 'Someone @mentions you in a comment'],
    ['R12', 'OPP_STAGE_CHANGE', true, 'Immediate', 'Owner+Manager', 'Proposal,Negotiation,Closed Won,Closed Lost', 'T_GENERIC', 'An opportunity reaches a significant stage'],
    ['R13', 'ESCALATION', true, 'Immediate', 'Manager', 2, 'T_GENERIC', 'An item is overdue by N or more days'],
    ['R14', 'DAILY_SUMMARY', true, 'Digest', 'All', '', 'T_DIGEST', 'Daily summary of tasks, interviews and pipeline changes'],
    ['R15', 'WEEKLY_SUMMARY', true, 'Digest', 'All', 'Tuesday', 'T_DIGEST', 'Weekly summary on the given weekday']
  ],
  templates: [
    ['T_ASSIGN', 'NBC CRM: {{recordName}} is assigned to you', 'Hi {{recipient}},\n\n{{reason}}\n\nRecord: {{recordName}} ({{recordId}}, {{recordType}})\nOwner: {{owner}}\nDue: {{due}}\nOpen: {{link}}\n\n{{footer}}'],
    ['T_REASSIGN', 'NBC CRM: {{recordName}} was reassigned to you', 'Hi {{recipient}},\n\n{{reason}}\n\nRecord: {{recordName}} ({{recordId}})\nDue: {{due}}\nOpen: {{link}}\n\n{{footer}}'],
    ['T_GENERIC', 'NBC CRM: {{reason}}', 'Hi {{recipient}},\n\n{{reason}}\n\nRecord: {{recordName}} ({{recordId}}, {{recordType}})\nOwner: {{owner}}\nDue: {{due}}\nOpen: {{link}}\n\n{{footer}}'],
    ['T_MENTION', 'NBC CRM: you were mentioned on {{recordName}}', 'Hi {{recipient}},\n\n{{reason}} Open the record to read the comment (comment text is not included in emails).\n\nRecord: {{recordName}} ({{recordId}})\nOpen: {{link}}\n\n{{footer}}'],
    ['T_DIGEST', 'NBC CRM {{period}} summary for {{recipient}}', 'Hi {{recipient}},\n\n{{items}}\n\nOpen the CRM: {{link}}\n\n{{footer}}']
  ],
  footer: 'Sent by the NBC CRM because of your notification preferences. Opening a link needs access to the CRM; your access is checked by Google.',
  lists: {
    TaskStatus: ['Open', 'In progress', 'Done', 'Cancelled'],
    StakeholderRole: ['Buyer', 'Decision maker', 'Champion', 'Influencer', 'User', 'Gatekeeper', 'Partner', 'Researcher', 'Funder', 'Other'],
    MethodType: ['Email', 'Phone', 'WhatsApp', 'Other'],
    ContactPref: ['Email', 'Phone', 'WhatsApp', 'In person', 'LinkedIn', 'No preference'],
    ResourceType: ['Website', 'Professional profile', 'Drive file', 'Drive folder', 'Proposal', 'Presentation', 'Agreement', 'Report', 'Meeting link', 'Scheduling link', 'Recording', 'Transcript', 'Article', 'Research', 'Other'],
    RecordType: ['Lead', 'Opportunity', 'Account', 'Person', 'Contact', 'Outreach touch', 'Interview', 'Task'],
    NotifChannel: ['In-app', 'Email', 'In-app + email', 'None'],
    NotifFrequency: ['Immediate', 'Daily digest', 'Weekly digest', 'Off'],
    NotifDelivery: ['Immediate', 'Digest'],
    NotifRecipients: ['Assignee', 'Owner', 'Manager', 'Owner+Manager', 'Admins', 'Mentioned', 'All'],
    Timezone: ['Africa/Accra', 'Africa/Lagos', 'Africa/Nairobi', 'Europe/London', 'America/New_York', 'America/Los_Angeles', 'Asia/Kolkata', 'Asia/Tokyo'],
    EventOrAll: ['All', 'LEAD_ASSIGNED', 'OPP_ASSIGNED', 'TASK_ASSIGNED', 'TASK_REASSIGNED', 'RECORD_ASSIGNED', 'FOLLOWUP_UPCOMING', 'FOLLOWUP_OVERDUE', 'INTERVIEW_UPCOMING',
      'INTERVIEW_NOTES_MISSING', 'OPP_STALE', 'MENTION', 'OPP_STAGE_CHANGE', 'ESCALATION', 'DAILY_SUMMARY', 'WEEKLY_SUMMARY']
  },
  settings: [
    ['EmailEnabled', 'Email delivery switched on (only via Admin → Enable email delivery)', false],
    ['DryRun', 'Dry run: build notifications but send no email', true],
    ['MaxAttempts', 'Email retry limit per notification', 3],
    ['EmailDailyCap', 'Maximum emails per day from the CRM (below Google\'s quota)', 80],
    ['UploadFolderId', 'Google Drive folder ID for uploads (blank = uploads off)', ''],
    ['EnrichmentEnabled', 'Contact enrichment (off; never scrapes profiles)', false]
  ]
};

/* ------------------------------------------------------------ table helpers */
function v3sheet_(name) { return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name); }
function v3table_(name) {
  var sh = v3sheet_(name);
  if (!sh) return { sh: null, head: [], rows: [], col: function () { return -1; } };
  var lr = Math.max(sh.getLastRow(), 1), lc = Math.max(sh.getLastColumn(), 1);
  var all = sh.getRange(1, 1, lr, lc).getValues(), head = all[0].map(String);
  return { sh: sh, head: head, rows: all.slice(1), col: function (h) { return head.indexOf(h); } };
}
function v3objects_(name) {
  var t = v3table_(name);
  return t.rows.map(function (r, i) { var o = { _row: i + 2 }; t.head.forEach(function (h, j) { o[h] = r[j]; }); return o; }).filter(function (o) { return o[t.head[0]] !== '' && o[t.head[0]] !== null && o[t.head[0]] !== undefined; });
}
function v3firstEmptyRow_(sh) {
  var lr = sh.getLastRow();
  if (lr < 2) return 2;
  var ids = sh.getRange(2, 1, lr - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (ids[i][0] === '' || ids[i][0] === null) return i + 2;
  return lr + 1;
}
function v3append_(name, obj) {
  var sh = v3sheet_(name), head = v3table_(name).head, row = v3firstEmptyRow_(sh);
  var vals = head.map(function (h) { return Object.prototype.hasOwnProperty.call(obj, h) ? obj[h] : null; });
  // write only the plain columns (leave formula columns alone)
  head.forEach(function (h, j) { if (vals[j] !== null && vals[j] !== undefined) sh.getRange(row, j + 1).setValue(vals[j]); });
  return row;
}
function v3set_(name, row, header, value) {
  var j = v3table_(name).col(header);
  if (j >= 0) v3sheet_(name).getRange(row, j + 1).setValue(value);
}
function v3seq_(name, prefix, width) {
  var n = 0, rx = new RegExp('^' + prefix + '(\\d+)$');
  v3table_(name).rows.forEach(function (r) { var m = String(r[0]).match(rx); if (m) n = Math.max(n, Number(m[1])); });
  var s = String(n + 1); while (s.length < width) s = '0' + s;
  return prefix + s;
}
function v3setting_(key, dflt) {
  try { var r = SpreadsheetApp.getActiveSpreadsheet().getRangeByName(key); if (r) { var v = r.getValue(); return v === '' || v === null ? dflt : v; } } catch (e) {}
  return dflt;
}
function v3bool_(v) { return v === true || String(v).toUpperCase() === 'TRUE'; }
function v3now_() { return new Date(); }
function v3fmt_(d, tz, f) { try { return Utilities.formatDate(d instanceof Date ? d : new Date(d), tz || 'Africa/Accra', f); } catch (e) { return String(d); } }
function v3props_() { return PropertiesService.getDocumentProperties(); }
function v3actor_() { try { return (typeof who_ === 'function') ? who_() : Session.getActiveUser().getEmail(); } catch (e) { return 'team member'; } }

/* ------------------------------------------------------------ internal users */
function v3users_() {
  var t = v3table_('Team & roles');
  return t.rows.filter(function (r) { return r[0]; }).map(function (r) {
    return { name: String(r[0]), email: String(r[1] || '').trim(), role: String(r[2] || ''), active: v3bool_(r[4]), manager: String(r[8] || ''),
      team: t.col('Team') >= 0 ? String(r[t.col('Team')] || '') : '', tz: (t.col('Timezone') >= 0 && r[t.col('Timezone')]) ? String(r[t.col('Timezone')]) : 'Africa/Accra' };
  });
}
function v3user_(name) { return v3users_().filter(function (u) { return u.name === name; })[0]; }
function v3isInternalEmail_(email) {
  email = String(email || '').toLowerCase();
  return !!email && v3users_().some(function (u) { return u.active && u.email.toLowerCase() === email; });
}

/* ------------------------------------------------------------ rules, prefs, templates */
function v3rules_() {
  var out = {};
  v3objects_(V3.NR).forEach(function (r) { out[r['Event']] = { id: r['Rule ID'], event: r['Event'], enabled: v3bool_(r['Enabled']), delivery: r['Delivery'], recipients: r['Recipients'], param: r['Parameter'], template: r['Template ID'] }; });
  return out;
}
function v3pref_(user, event) {
  var u = v3user_(user) || {}, base = { enabled: true, channel: 'In-app', frequency: 'Immediate', tz: u.tz || 'Africa/Accra', quietStart: 21, quietEnd: 7, digestHour: 8 };
  v3objects_(V3.NP).forEach(function (p) {
    if (p['User'] !== user || (p['Event'] !== 'All' && p['Event'] !== event)) return;
    var specific = p['Event'] === event;
    if (!specific && base._specific) return;
    base.enabled = v3bool_(p['Enabled']);
    base.channel = p['Channel'] || base.channel;
    base.frequency = p['Frequency'] || base.frequency;
    if (p['Timezone']) base.tz = String(p['Timezone']);
    if (p['Quiet hours start'] !== '' && p['Quiet hours start'] !== null) base.quietStart = Number(p['Quiet hours start']);
    if (p['Quiet hours end'] !== '' && p['Quiet hours end'] !== null) base.quietEnd = Number(p['Quiet hours end']);
    if (p['Digest hour'] !== '' && p['Digest hour'] !== null) base.digestHour = Number(p['Digest hour']);
    if (specific) base._specific = true;
  });
  return base;
}
function v3template_(id) {
  var t = v3objects_(V3.NT).filter(function (x) { return x['Template ID'] === id; })[0];
  if (t) return { subject: String(t['Subject']), body: String(t['Body']) };
  var d = V3.templates.filter(function (x) { return x[0] === id; })[0] || V3.templates[2];
  return { subject: d[1], body: d[2] };
}
function v3render_(tpl, data) {
  return String(tpl).replace(/\{\{(\w+)\}\}/g, function (m, k) { return data[k] === undefined || data[k] === null || data[k] === '' ? (k === 'due' ? 'no date' : '') : String(data[k]); });
}
function v3inQuiet_(hour, start, end) {
  if (start === end) return false;
  return start < end ? (hour >= start && hour < end) : (hour >= start || hour < end);
}

/* ------------------------------------------------------------ record lookup (for links and names) */
var V3_RECORD_TABS = [
  ['Leads', 'Lead', 2], ['Opportunities', 'Opportunity', 2], ['Accounts', 'Account', 2], ['People', 'Person', 2], ['Contacts', 'Contact', 2],
  ['Outreach', 'Outreach touch', 4], ['Interviews', 'Interview', 3], ['Tasks', 'Task', 2]
];
function v3findRecord_(id) {
  id = String(id || '');
  if (!id) return null;
  for (var i = 0; i < V3_RECORD_TABS.length; i++) {
    var sh = v3sheet_(V3_RECORD_TABS[i][0]); if (!sh || sh.getLastRow() < 2) continue;
    var ids = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues();
    for (var r = 0; r < ids.length; r++) if (String(ids[r][0]) === id) {
      var nameCol = V3_RECORD_TABS[i][2];
      var nm = String(sh.getRange(r + 2, nameCol).getValue() || '');
      if (V3_RECORD_TABS[i][0] === 'Interviews') nm = id + (nm ? ' · ' + nm : '');   // never expose notes, only ID + role label
      return { tab: V3_RECORD_TABS[i][0], type: V3_RECORD_TABS[i][1], row: r + 2, name: nm || id };
    }
  }
  return null;
}
function v3link_(tab, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(tab);
  return ss.getUrl() + '#gid=' + sh.getSheetId() + '&range=A' + row;
}

/* ------------------------------------------------------------ enqueue (never throws) */
function v3resolveRecipients_(rule, ctx) {
  var users = v3users_().filter(function (u) { return u.active; }), names = [];
  var byName = function (n) { return users.filter(function (u) { return u.name === n; })[0]; };
  var add = function (n) { if (n && byName(n) && names.indexOf(n) < 0) names.push(n); };
  var r = String(rule.recipients || 'Owner');
  if (r === 'Assignee') add(ctx.assignee || ctx.owner);
  if (r === 'Owner' || r === 'Owner+Manager') add(ctx.owner);
  if (r === 'Manager' || r === 'Owner+Manager') { var o = byName(ctx.owner); if (o && o.manager) add(o.manager); else users.filter(function (u) { return u.role === 'Admin' || u.role === 'Manager'; }).forEach(function (u) { add(u.name); }); }
  if (r === 'Admins') users.filter(function (u) { return u.role === 'Admin'; }).forEach(function (u) { add(u.name); });
  if (r === 'Mentioned') (ctx.mentioned || []).forEach(add);
  if (r === 'All') users.forEach(function (u) { add(u.name); });
  if (ctx.exclude) names = names.filter(function (n) { return n !== ctx.exclude; });
  return names;   // internal users only, by construction
}

function v3enqueue_(event, ctx, opts) {
  opts = opts || {};
  var out = [];
  try {
    var rule = v3rules_()[event];
    if (!rule || !rule.enabled) return out;
    var recips = ctx.recipients || v3resolveRecipients_(rule, ctx);
    var lock = null;
    if (!opts.preview) { try { lock = LockService.getDocumentLock(); lock.waitLock(20000); } catch (e) { lock = null; } }
    try {
      var q = v3table_(V3.NQ), keyCol = q.col('Dedupe key'), keys = {};
      q.rows.forEach(function (r) { if (r[keyCol]) keys[r[keyCol]] = true; });
      recips.forEach(function (name) {
        var u = v3user_(name), p = v3pref_(name, event);
        if (!u || !p.enabled || p.frequency === 'Off' || p.channel === 'None') return;
        var day = v3fmt_(v3now_(), p.tz, 'yyyy-MM-dd');
        var key = [event, ctx.recordId || '', name, ctx.dedupe || day].join('|');
        if (keys[key]) return;
        keys[key] = true;
        var delivery = (rule.delivery === 'Digest' || p.frequency !== 'Immediate') ? 'Digest' : 'Immediate';
        var due = ctx.due instanceof Date ? v3fmt_(ctx.due, p.tz, 'EEE d MMM yyyy') : (ctx.due || '');
        var data = { recipient: name, reason: ctx.reason, recordName: ctx.recordName, recordId: ctx.recordId, recordType: ctx.recordType, owner: ctx.owner || 'Unassigned', due: due, link: ctx.link, footer: V3.footer, period: ctx.period || '', items: ctx.items || '' };
        var tpl = v3template_(rule.template);
        var row = {
          'Notification ID': opts.preview ? '(preview)' : v3seq_(V3.NQ, 'N', 5), 'Created': v3now_(), 'Rule ID': rule.id, 'Event': event, 'Dedupe key': key,
          'Recipient': name, 'Recipient email': u.email, 'Channel': p.channel, 'Delivery': delivery, 'Record type': ctx.recordType || '', 'Record ID': ctx.recordId || '',
          'Record name': ctx.recordName || '', 'Reason': ctx.reason || '', 'Owner': ctx.owner || '', 'Due': due, 'Link': ctx.link || '',
          'Subject': v3render_(tpl.subject, data), 'Body': v3render_(tpl.body, data), 'Status': 'Pending', 'Attempts': 0, 'Read': false
        };
        if (opts.preview) { out.push(row); return; }
        v3append_(V3.NQ, row);
        out.push(row);
      });
    } finally { if (lock) try { lock.releaseLock(); } catch (e) {} }
  } catch (err) {
    v3log_('', '', '', 'Enqueue error', String(err && err.message || err));
  }
  return out;
}

function v3log_(id, recipient, channel, result, detail) {
  try {
    var quota = ''; try { quota = MailApp.getRemainingDailyQuota(); } catch (e) {}
    var sh = v3sheet_(V3.NL); if (!sh) return;
    sh.insertRowAfter(1);
    sh.getRange(2, 1, 1, 7).setValues([[v3now_(), id, recipient, channel, result, detail || '', quota]]);
  } catch (e) { /* logging must never break the CRM */ }
}

/* ------------------------------------------------------------ event helpers called from the CRM */
function queueAssignment_(assignee, tab, row, oldOwner) {
  var rec = v3findRecordByRow_(tab, row); if (!rec) return;
  var event = tab === 'Leads' ? 'LEAD_ASSIGNED' : tab === 'Opportunities' ? 'OPP_ASSIGNED' : tab === 'Tasks' ? (oldOwner ? 'TASK_REASSIGNED' : 'TASK_ASSIGNED') : 'RECORD_ASSIGNED';
  v3enqueue_(event, {
    assignee: assignee, owner: assignee, recordId: rec.id, recordName: rec.name, recordType: rec.type, due: rec.due, link: v3link_(tab, row),
    reason: rec.type + ' ' + rec.name + ' was assigned to you by ' + v3actor_() + (oldOwner ? ' (previously ' + oldOwner + ')' : '') + '.',
    dedupe: 'assigned:' + assignee + ':' + v3fmt_(v3now_(), 'Etc/UTC', 'yyyyMMddHHmm').slice(0, 11)   // same assignment within 10 minutes = one notification
  });
}
function v3findRecordByRow_(tab, row) {
  var sh = v3sheet_(tab); if (!sh) return null;
  var id = String(sh.getRange(row, 1).getValue() || ''); if (!id) return null;
  var r = v3findRecord_(id) || { tab: tab, type: tab, name: id };
  var due = '';
  try { if (typeof TABS !== 'undefined' && TABS[tab] && TABS[tab].date) due = sh.getRange(row, TABS[tab].date).getValue(); } catch (e) {}
  return { id: id, name: r.name, type: r.type, due: due };
}
function queueStageChange_(tab, row, oldStage, newStage) {
  var rule = v3rules_()['OPP_STAGE_CHANGE']; if (!rule) return;
  var sig = String(rule.param || V3.significantDefault).split(',').map(function (s) { return s.trim(); });
  if (sig.indexOf(String(newStage)) < 0) return;
  var sh = v3sheet_(tab), rec = v3findRecordByRow_(tab, row), owner = String(sh.getRange(row, 6).getValue() || '');
  v3enqueue_('OPP_STAGE_CHANGE', { owner: owner, recordId: rec.id, recordName: rec.name, recordType: 'Opportunity', due: rec.due, link: v3link_(tab, row),
    reason: 'Opportunity ' + rec.name + ' moved from ' + (oldStage || '(blank)') + ' to ' + newStage + '.', dedupe: 'stage:' + newStage });
}
function queueMentions_(tab, row, text) {
  var names = [], lower = String(text || '').toLowerCase();
  v3users_().forEach(function (u) {
    if (!u.active) return;
    var tags = ['@' + u.name.toLowerCase(), '@' + u.name.split(' ')[0].toLowerCase()];
    if (u.email) tags.push('@' + u.email.toLowerCase());
    if (tags.some(function (t) { return lower.indexOf(t) >= 0; })) names.push(u.name);
  });
  if (!names.length) return 0;
  var rec = v3findRecordByRow_(tab, row); if (!rec) return 0;
  var hash = Utilities.base64Encode(String(text)).slice(0, 24);
  return v3enqueue_('MENTION', { mentioned: names, exclude: v3currentUserName_(), recordId: rec.id, recordName: rec.name, recordType: rec.type, link: v3link_(tab, row),
    reason: v3actor_() + ' mentioned you on ' + rec.name + '.', dedupe: 'mention:' + hash }).length;
}
function v3currentUserName_() {
  var e = ''; try { e = Session.getActiveUser().getEmail(); } catch (x) {}
  var u = v3users_().filter(function (x) { return x.email && x.email.toLowerCase() === String(e).toLowerCase(); })[0];
  return u ? u.name : '';
}
function v3cancelFor_(recordId, events, why) {
  try {
    var q = v3table_(V3.NQ), sc = q.col('Status'), rc = q.col('Record ID'), ec = q.col('Event');
    q.rows.forEach(function (r, i) {
      if (String(r[rc]) === String(recordId) && events.indexOf(String(r[ec])) >= 0 && ['Pending', 'Retry', 'Held (quiet hours)'].indexOf(String(r[sc])) >= 0)
        q.sh.getRange(i + 2, sc + 1).setValue('Cancelled (' + why + ')');
    });
  } catch (e) {}
}
function onTaskCompleted_(taskId) { v3cancelFor_(taskId, ['FOLLOWUP_OVERDUE', 'FOLLOWUP_UPCOMING', 'ESCALATION', 'TASK_ASSIGNED', 'TASK_REASSIGNED'], 'task completed'); }

/* ------------------------------------------------------------ time-based rules */
function v3scan_(now, opts) {
  opts = opts || {};
  var out = [], rules = v3rules_(), day = 86400000;
  var today = new Date(now.getTime()); today.setHours(0, 0, 0, 0);
  var push = function (a) { out = out.concat(a); };
  var dateOf = function (v) { if (!(v instanceof Date)) return null; var d = new Date(v.getTime()); d.setHours(0, 0, 0, 0); return d; };
  // follow-ups: next-step dates on record tabs + task due dates
  var sources = [['Leads', 7, 16, 8, ['Converted', 'Unqualified']], ['Opportunities', 6, 16, 7, ['Closed Won', 'Closed Lost']], ['Outreach', 7, 16, 8, ['Interviewed', 'Declined', 'Not sent', 'No response']],
    ['Contacts', 9, 12, 10, ['Interviewed', 'Declined']], ['Tasks', 4, 5, 6, ['Done', 'Cancelled']]];
  var up = rules['FOLLOWUP_UPCOMING'], over = rules['FOLLOWUP_OVERDUE'], esc = rules['ESCALATION'];
  sources.forEach(function (s) {
    var sh = v3sheet_(s[0]); if (!sh || sh.getLastRow() < 2) return;
    var vals = sh.getRange(2, 1, sh.getLastRow() - 1, Math.max(s[1], s[2], s[3])).getValues();
    vals.forEach(function (r, i) {
      if (!r[0] || s[4].indexOf(String(r[s[3] - 1])) >= 0) return;
      var due = dateOf(r[s[2] - 1]); if (!due) return;
      var rec = v3findRecord_(r[0]) || { name: r[0], type: s[0] }, owner = String(r[s[1] - 1] || ''), link = v3link_(s[0], i + 2);
      var lateDays = Math.round((today - due) / day);
      var base = { owner: owner, recordId: r[0], recordName: rec.name, recordType: rec.type, due: due, link: link };
      if (lateDays > 0 && over && over.enabled) push(v3enqueue_('FOLLOWUP_OVERDUE', Object.assign({}, base, { reason: rec.type + ' ' + rec.name + ' is ' + lateDays + ' day(s) overdue.' }), opts));
      else if (lateDays <= 0 && -lateDays <= Number(up && up.param || 1) && up && up.enabled) push(v3enqueue_('FOLLOWUP_UPCOMING', Object.assign({}, base, { reason: rec.type + ' ' + rec.name + ' is due ' + (lateDays === 0 ? 'today' : 'in ' + (-lateDays) + ' day(s)') + '.' }), opts));
      if (esc && esc.enabled && lateDays >= Number(esc.param || 2)) push(v3enqueue_('ESCALATION', Object.assign({}, base, { reason: rec.type + ' ' + rec.name + ' owned by ' + (owner || 'nobody') + ' is ' + lateDays + ' days overdue.' }), opts));
    });
  });
  // interviews
  var iv = v3sheet_('Interviews');
  if (iv && iv.getLastRow() >= 2) {
    iv.getRange(2, 1, iv.getLastRow() - 1, 16).getValues().forEach(function (r, i) {
      if (!r[0]) return;
      var date = dateOf(r[6]), status = String(r[7]), owner = String(r[4] || ''), link = v3link_('Interviews', i + 2), name = r[0] + (r[2] ? ' · ' + r[2] : '');
      var base = { owner: owner, recordId: r[0], recordName: name, recordType: 'Interview', due: date, link: link };
      var ru = rules['INTERVIEW_UPCOMING'], rn = rules['INTERVIEW_NOTES_MISSING'];
      if (date && ['Scheduled', 'Rescheduled'].indexOf(status) >= 0 && ru && ru.enabled) {
        var d = Math.round((date - today) / day);
        if (d >= 0 && d <= Number(ru.param || 1)) push(v3enqueue_('INTERVIEW_UPCOMING', Object.assign({}, base, { reason: 'Interview ' + name + ' is ' + (d === 0 ? 'today' : 'in ' + d + ' day(s)') + '.' }), opts));
      }
      var notesEmpty = !String(r[10] || '').trim();
      if (date && notesEmpty && rn && rn.enabled && (status === 'Done' || (status === 'Scheduled' && date < today))) {
        var late = Math.round((today - date) / day);
        if (late >= Number(rn.param || 1)) push(v3enqueue_('INTERVIEW_NOTES_MISSING', Object.assign({}, base, { reason: 'Interview ' + name + ' has no notes yet (' + late + ' day(s) after the interview).' }), opts));
      }
    });
  }
  // stale opportunities (no Activity log entry for N days)
  var rs = rules['OPP_STALE'], op = v3sheet_('Opportunities');
  if (rs && rs.enabled && op && op.getLastRow() >= 2) {
    var last = {};
    v3table_('Activity log').rows.forEach(function (r) { var t = r[0] instanceof Date ? r[0].getTime() : 0; if (r[1] && (!last[r[1]] || t > last[r[1]])) last[r[1]] = t; });
    op.getRange(2, 1, op.getLastRow() - 1, 7).getValues().forEach(function (r, i) {
      if (!r[0] || ['Closed Won', 'Closed Lost'].indexOf(String(r[6])) >= 0) return;
      var idle = last[r[0]] ? Math.floor((now.getTime() - last[r[0]]) / day) : 999;
      if (idle >= Number(rs.param || 7)) push(v3enqueue_('OPP_STALE', { owner: String(r[5] || ''), recordId: r[0], recordName: String(r[1] || r[0]), recordType: 'Opportunity', link: v3link_('Opportunities', i + 2),
        reason: 'Opportunity ' + (r[1] || r[0]) + ' has had no activity for ' + (idle === 999 ? 'a long time' : idle + ' days') + '.', dedupe: 'stale:' + v3fmt_(now, 'Etc/UTC', 'yyyy-ww') }, opts));
    });
  }
  return out;
}

/* ------------------------------------------------------------ still valid? (prevents stale reminders) */
function v3stillValid_(n) {
  var ev = String(n['Event']);
  if (['FOLLOWUP_OVERDUE', 'FOLLOWUP_UPCOMING', 'ESCALATION', 'TASK_ASSIGNED', 'TASK_REASSIGNED'].indexOf(ev) >= 0) {
    var rec = v3findRecord_(n['Record ID']); if (!rec) return false;
    var sh = v3sheet_(rec.tab);
    if (rec.tab === 'Tasks') { var st = String(sh.getRange(rec.row, 6).getValue()); if (st === 'Done' || st === 'Cancelled') return false; }
    var closed = { Leads: [8, ['Converted', 'Unqualified']], Opportunities: [7, ['Closed Won', 'Closed Lost']], Outreach: [8, ['Interviewed', 'Declined', 'Not sent', 'No response']], Contacts: [10, ['Interviewed', 'Declined']] }[rec.tab];
    if (closed && closed[1].indexOf(String(sh.getRange(rec.row, closed[0]).getValue())) >= 0 && ev !== 'TASK_ASSIGNED') return false;
  }
  if (ev === 'INTERVIEW_NOTES_MISSING') {
    var r2 = v3findRecord_(n['Record ID']); if (!r2) return false;
    if (String(v3sheet_('Interviews').getRange(r2.row, 11).getValue() || '').trim()) return false;
  }
  return true;
}

/* ------------------------------------------------------------ delivery */
function v3confirmed_() { try { return JSON.parse(v3props_().getProperty('confirmedRecipients') || '[]'); } catch (e) { return []; } }
function v3emailAllowed_(email) {
  if (!v3bool_(v3setting_('EmailEnabled', false)) || v3bool_(v3setting_('DryRun', true))) return 'email off';
  if (!V3.emailRx.test(String(email))) return 'no valid email';
  if (!v3isInternalEmail_(email)) return 'not an internal user';
  if (v3confirmed_().map(function (x) { return String(x).toLowerCase(); }).indexOf(String(email).toLowerCase()) < 0) return 'recipient not confirmed by an Admin';
  var sentToday = Number(v3props_().getProperty('sent:' + v3fmt_(v3now_(), 'Etc/UTC', 'yyyy-MM-dd')) || 0);
  if (sentToday >= Number(v3setting_('EmailDailyCap', 80))) return 'daily email cap reached';
  try { if (MailApp.getRemainingDailyQuota() < 5) return 'Google email quota low'; } catch (e) {}
  return '';
}
function v3countSent_() { var k = 'sent:' + v3fmt_(v3now_(), 'Etc/UTC', 'yyyy-MM-dd'); v3props_().setProperty(k, String(Number(v3props_().getProperty(k) || 0) + 1)); }

function processNotificationQueue(opts) {
  opts = opts || {};
  var now = opts.now || v3now_(), done = 0, lock = null;
  try { lock = LockService.getDocumentLock(); if (!lock.tryLock(15000)) return 0; } catch (e) { lock = null; }
  try {
    var q = v3table_(V3.NQ), c = function (h) { return q.col(h); }, max = Number(v3setting_('MaxAttempts', 3));
    q.rows.forEach(function (r, i) {
      if (opts.limit && done >= opts.limit) return;
      var status = String(r[c('Status')]), row = i + 2;
      if (['Pending', 'Retry', 'Held (quiet hours)'].indexOf(status) < 0 || String(r[c('Delivery')]) !== 'Immediate') return;
      var next = r[c('Next attempt')]; if (next instanceof Date && next > now) return;
      var n = {}; q.head.forEach(function (h, j) { n[h] = r[j]; });
      var set = function (h, v) { q.sh.getRange(row, c(h) + 1).setValue(v); };
      try {
        if (!v3stillValid_(n)) { set('Status', 'Cancelled (resolved)'); v3log_(n['Notification ID'], n['Recipient'], '', 'Cancelled', 'No longer applies'); return; }
        var p = v3pref_(n['Recipient'], n['Event']);
        var hour = Number(v3fmt_(now, p.tz, 'H'));
        if (v3inQuiet_(hour, p.quietStart, p.quietEnd)) {
          var wait = ((p.quietEnd - hour + 24) % 24) || 24;
          set('Status', 'Held (quiet hours)'); set('Next attempt', new Date(now.getTime() + wait * 3600000)); return;
        }
        var ch = String(n['Channel']), wantsEmail = ch === 'Email' || ch === 'In-app + email', wantsApp = ch === 'In-app' || ch === 'In-app + email';
        var result = wantsApp ? 'Delivered in-app' : '';
        if (wantsEmail) {
          var block = v3emailAllowed_(n['Recipient email']);
          if (block) { result = (result ? result + ' · ' : '') + 'Email not sent (' + block + ')'; v3log_(n['Notification ID'], n['Recipient'], 'Email', 'Not sent', block); }
          else {
            try {
              MailApp.sendEmail({ to: String(n['Recipient email']), subject: String(n['Subject']), body: String(n['Body']), name: 'NBC CRM' });
              v3countSent_(); result = (result ? result + ' · ' : '') + 'Email sent';
              v3log_(n['Notification ID'], n['Recipient'], 'Email', 'Sent', n['Subject']);
            } catch (mailErr) {
              var att = Number(r[c('Attempts')] || 0) + 1; set('Attempts', att); set('Last error', String(mailErr.message || mailErr));
              v3log_(n['Notification ID'], n['Recipient'], 'Email', 'Failed attempt ' + att, String(mailErr.message || mailErr));
              if (att >= max) { set('Status', 'Failed'); } else { set('Status', 'Retry'); set('Next attempt', new Date(now.getTime() + 15 * 60000 * att)); }
              return;
            }
          }
        }
        set('Status', result || 'Delivered'); set('Delivered at', now);
        if (wantsApp) v3log_(n['Notification ID'], n['Recipient'], 'In-app', 'Delivered', n['Reason']);
        done++;
      } catch (rowErr) { try { set('Last error', String(rowErr.message || rowErr)); } catch (e) {} }
    });
  } catch (err) { v3log_('', '', '', 'Queue error', String(err && err.message || err)); }
  finally { if (lock) try { lock.releaseLock(); } catch (e) {} }
  return done;
}
function processQueueSafe_() { try { processNotificationQueue({ limit: 10 }); } catch (e) {} }

/* ------------------------------------------------------------ digests */
function v3digest_(now, force) {
  var props = v3props_(), sent = 0;
  v3users_().filter(function (u) { return u.active; }).forEach(function (u) {
    try {
      var pd = v3pref_(u.name, 'DAILY_SUMMARY'), pw = v3pref_(u.name, 'WEEKLY_SUMMARY');
      var hour = Number(v3fmt_(now, pd.tz, 'H')), date = v3fmt_(now, pd.tz, 'yyyy-MM-dd'), dow = v3fmt_(now, pd.tz, 'EEEE');
      var weeklyRule = v3rules_()['WEEKLY_SUMMARY'], weekly = weeklyRule && weeklyRule.enabled && pw.enabled && pw.frequency !== 'Off' && dow === String(weeklyRule.param || 'Tuesday');
      if (!force && hour !== pd.digestHour) return;
      var key = 'digest:' + u.name + ':' + date;
      if (!force && props.getProperty(key)) return;
      var q = v3table_(V3.NQ), c = function (h) { return q.col(h); }, items = [];
      q.rows.forEach(function (r, i) {
        if (r[c('Recipient')] !== u.name || r[c('Delivery')] !== 'Digest' || ['Pending', 'Retry'].indexOf(String(r[c('Status')])) < 0) return;
        var n = {}; q.head.forEach(function (h, j) { n[h] = r[j]; });
        if (!v3stillValid_(n)) { q.sh.getRange(i + 2, c('Status') + 1).setValue('Cancelled (resolved)'); return; }
        items.push('• ' + n['Reason'] + (n['Due'] ? ' (due ' + n['Due'] + ')' : '') + '\n  ' + n['Link']);
        q.sh.getRange(i + 2, c('Status') + 1).setValue('In digest ' + date);
      });
      var changes = v3pipelineChanges_(now, weekly ? 7 : 1);
      var dailyRule = v3rules_()['DAILY_SUMMARY'];
      var wantDaily = dailyRule && dailyRule.enabled && pd.enabled && pd.frequency !== 'Off';
      if (!items.length && !changes.length && !weekly) { props.setProperty(key, 'empty'); return; }
      if (!wantDaily && !weekly) return;
      var body = (items.length ? 'Your items:\n' + items.join('\n') : 'Nothing overdue or due soon.') + (changes.length ? '\n\nPipeline changes:\n' + changes.join('\n') : '');
      v3enqueue_(weekly ? 'WEEKLY_SUMMARY' : 'DAILY_SUMMARY', { recipients: [u.name], recordId: 'DIGEST', recordName: (weekly ? 'Weekly' : 'Daily') + ' summary', recordType: 'Summary',
        reason: (weekly ? 'Weekly' : 'Daily') + ' summary', period: weekly ? 'weekly' : 'daily', items: body, link: SpreadsheetApp.getActiveSpreadsheet().getUrl(), dedupe: 'digest:' + date });
      // digests are delivered straight away (they are the digest)
      var qq = v3table_(V3.NQ), cc = function (h) { return qq.col(h); };
      qq.rows.forEach(function (r, i) { if (r[cc('Dedupe key')] && String(r[cc('Dedupe key')]).indexOf('|' + u.name + '|digest:' + date) > 0 && r[cc('Status')] === 'Pending') qq.sh.getRange(i + 2, cc('Delivery') + 1).setValue('Immediate'); });
      props.setProperty(key, 'sent');
      sent++;
    } catch (e) { v3log_('', u.name, '', 'Digest error', String(e.message || e)); }
  });
  return sent;
}
function v3pipelineChanges_(now, days) {
  var since = now.getTime() - days * 86400000, out = [];
  v3table_('Activity log').rows.forEach(function (r) {
    if (r[0] instanceof Date && r[0].getTime() >= since && ['Status change', 'Won', 'Lost', 'Converted', 'Created', 'Assignment'].indexOf(String(r[4])) >= 0 && /^(L|O)\d+/.test(String(r[1])))
      out.push('• ' + r[1] + ': ' + r[5]);
  });
  return out.slice(0, 30);
}

/* ------------------------------------------------------------ the hourly job */
function hourlyTick() {
  var now = v3now_();
  try { v3scan_(now); } catch (e) { v3log_('', '', '', 'Scan error', String(e.message || e)); }
  try { v3digest_(now, false); } catch (e) { v3log_('', '', '', 'Digest error', String(e.message || e)); }
  try { processNotificationQueue({ now: now }); } catch (e) { v3log_('', '', '', 'Queue error', String(e.message || e)); }
}

/* ------------------------------------------------------------ admin: triggers, enable, dry run */
function installNotificationTriggers() {
  removeNotificationTriggers(true);
  ScriptApp.newTrigger('hourlyTick').timeBased().everyHours(1).create();
  v3log_('', '', '', 'Triggers', 'Hourly notification trigger installed');
  return inspectTriggers(true);
}
function removeNotificationTriggers(silent) {
  var n = 0;
  ScriptApp.getProjectTriggers().forEach(function (t) { if (['hourlyTick', 'dailyJob', 'weeklySummary', 'dailyDigest'].indexOf(t.getHandlerFunction()) >= 0) { ScriptApp.deleteTrigger(t); n++; } });
  if (silent !== true) alert_('Removed ' + n + ' notification trigger(s). Notifications stay in the queue until triggers are installed again.');
  return n;
}
function inspectTriggers(silent) {
  var list = ScriptApp.getProjectTriggers().map(function (t) { return t.getHandlerFunction() + ' · ' + String(t.getEventType()); });
  var msg = list.length ? 'Installed triggers:\n' + list.join('\n') : 'No triggers installed.';
  msg += '\n\nEmail delivery: ' + (v3bool_(v3setting_('EmailEnabled', false)) ? 'ON' : 'OFF') + ' · Dry run: ' + (v3bool_(v3setting_('DryRun', true)) ? 'ON' : 'OFF') + '\nConfirmed recipients: ' + (v3confirmed_().join(', ') || 'none');
  if (silent !== true) alert_(msg);
  return list;
}
function v3intendedRecipients_() {
  var set = {};
  v3users_().forEach(function (u) {
    if (!u.active || !V3.emailRx.test(u.email)) return;
    var wants = V3.lists.EventOrAll.some(function (ev) { var p = v3pref_(u.name, ev); return p.enabled && (p.channel === 'Email' || p.channel === 'In-app + email'); });
    if (wants) set[u.email] = u.name;
  });
  return set;
}
function enableEmailDelivery() {
  if (typeof requireAdmin_ === 'function' && !requireAdmin_()) return;
  var ui = SpreadsheetApp.getUi(), rec = v3intendedRecipients_(), emails = Object.keys(rec);
  if (!emails.length) { ui.alert('No internal users have chosen email in Notification preferences, so there is nobody to email.'); return; }
  var msg = 'Emails will go ONLY to these internal users (never to external contacts):\n\n' + emails.map(function (e) { return rec[e] + ' <' + e + '>'; }).join('\n') +
    '\n\nDaily cap: ' + v3setting_('EmailDailyCap', 80) + '. Interview notes and comment text are never included.\n\nConfirm these recipients and switch email on?';
  if (ui.alert('Enable email delivery', msg, ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  v3props_().setProperty('confirmedRecipients', JSON.stringify(emails));
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName('EmailEnabled').setValue(true);
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName('DryRun').setValue(false);
  if (typeof log_ === 'function') log_('NOTIFY', 'CRM', 'Email delivery enabled for: ' + emails.join(', '), 'Note', '');
  v3log_('', emails.join(', '), 'Email', 'Enabled', 'Confirmed by ' + v3actor_());
  ui.alert('Email delivery is on for the confirmed recipients. New people must be confirmed again before they get email.');
}
function disableEmailDelivery() {
  if (typeof requireAdmin_ === 'function' && !requireAdmin_()) return;
  SpreadsheetApp.getActiveSpreadsheet().getRangeByName('EmailEnabled').setValue(false);
  v3log_('', '', 'Email', 'Disabled', 'By ' + v3actor_());
  alert_('Email delivery is off. In-app notifications continue.');
}
function previewNotifications() {
  var rows = v3scan_(v3now_(), { preview: true });
  var q = v3table_(V3.NQ), c = function (h) { return q.col(h); };
  q.rows.forEach(function (r) {
    if (['Pending', 'Retry', 'Held (quiet hours)'].indexOf(String(r[c('Status')])) >= 0) { var o = {}; q.head.forEach(function (h, j) { o[h] = r[j]; }); rows.push(o); }
  });
  var ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName(V3.PREVIEW) || ss.insertSheet(V3.PREVIEW);
  sh.clear();
  var out = [['Recipient', 'Email would go to', 'Would email be sent?', 'Delivery', 'Event', 'Record', 'Subject', 'Body']];
  rows.forEach(function (n) {
    var wantsEmail = n['Channel'] === 'Email' || n['Channel'] === 'In-app + email', block = wantsEmail ? v3emailAllowed_(n['Recipient email']) : 'in-app only';
    out.push([n['Recipient'], n['Recipient email'], block ? 'No (' + block + ')' : 'Yes', n['Delivery'], n['Event'], n['Record name'], n['Subject'], n['Body']]);
  });
  sh.getRange(1, 1, out.length, out[0].length).setValues(out);
  sh.getRange(1, 1, 1, out[0].length).setFontWeight('bold').setBackground('#181818').setFontColor('#FFFFFF');
  sh.getRange(2, 8, Math.max(out.length - 1, 1), 1).setWrap(true);
  ss.setActiveSheet(sh);
  alert_('Dry run: ' + (out.length - 1) + ' notification(s) previewed. Nothing was queued or sent.');
  return out.length - 1;
}

/* ------------------------------------------------------------ notification center */
function myNotifications() {
  var me = v3currentUserName_(), q = v3table_(V3.NQ), c = function (h) { return q.col(h); }, out = [];
  q.rows.forEach(function (r, i) {
    if (!r[0] || (me && r[c('Recipient')] !== me)) return;
    if (!/In-app/.test(String(r[c('Channel')])) || v3bool_(r[c('Read')])) return;
    if (!/Delivered|Email sent|Email not sent|In digest|Pending|Held/.test(String(r[c('Status')]))) return;
    out.push({ row: i + 2, id: r[0], when: v3fmt_(r[c('Created')], 'Africa/Accra', 'EEE d MMM HH:mm'), reason: String(r[c('Reason')]), due: String(r[c('Due')] || ''), link: String(r[c('Link')]), status: String(r[c('Status')]) });
  });
  return { me: me || '(your email is not on Team & roles)', items: out.reverse().slice(0, 50) };
}
function markNotificationsRead(ids) {
  var q = v3table_(V3.NQ), rc = q.col('Read'), me = v3currentUserName_(), n = 0;
  q.rows.forEach(function (r, i) { if (ids.indexOf(String(r[0])) >= 0 && (!me || r[q.col('Recipient')] === me)) { q.sh.getRange(i + 2, rc + 1).setValue(true); n++; } });
  return n;
}
function showMyNotifications() {
  var html = v3css_() + '<div id="list">Loading…</div><button onclick="readAll()">Mark all as read</button>' +
    '<script>var ids=[];google.script.run.withSuccessHandler(function(d){ids=d.items.map(function(x){return x.id});var h="<div class=muted>For "+d.me+"</div>";' +
    'if(!d.items.length)h+="<p>No new notifications.</p>";d.items.forEach(function(x){h+="<div class=card><b>"+esc(x.reason)+"</b><br><span class=muted>"+esc(x.when)+(x.due?" · due "+esc(x.due):"")+"</span><br><a target=_blank href=\\""+encodeURI(x.link)+"\\">Open record</a></div>";});' +
    'document.getElementById("list").innerHTML=h;}).myNotifications();function readAll(){google.script.run.withSuccessHandler(function(n){document.getElementById("list").innerHTML="Marked "+n+" as read.";}).markNotificationsRead(ids);}' +
    'function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c];});}</script>';
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(html).setTitle('My notifications'));
}

/* ------------------------------------------------------------ PROFILES: people */
function v3norm_(s) { return String(s || '').trim().toLowerCase(); }
function findPersonMatches(name, email) {
  var out = [], n = v3norm_(name), e = v3norm_(email), seen = {};
  var methods = v3objects_(V3.METHODS);
  v3objects_(V3.PEOPLE).forEach(function (p) {
    var emails = [v3norm_(p['Primary email'])].concat(methods.filter(function (m) { return m['Person ID'] === p['Person ID'] && m['Type'] === 'Email'; }).map(function (m) { return v3norm_(m['Value']); }));
    var byEmail = e && emails.indexOf(e) >= 0;
    var byName = n && n.length > 2 && (v3norm_(p['Full name']).indexOf(n) >= 0 || v3norm_(p['Preferred name']) === n);
    if ((byEmail || byName) && !seen[p['Person ID']]) {
      seen[p['Person ID']] = true;
      out.push({ id: p['Person ID'], name: String(p['Full name']), email: String(p['Primary email'] || ''), org: String(p['Current organization'] || p['Current organization ID'] || ''), match: byEmail ? 'same email' : 'similar name' });
    }
  });
  return out;
}
function createPerson(p, force) {
  p = p || {};
  var name = String(p.fullName || '').trim();
  if (!name) return { ok: false, message: 'Full name is required.' };
  var emails = [].concat(p.emails || (p.email ? [p.email] : [])).map(function (x) { return String(x).trim(); }).filter(String);
  var phones = [].concat(p.phones || (p.phone ? [p.phone] : [])).map(function (x) { return String(x).trim(); }).filter(String);
  var bad = emails.filter(function (x) { return !V3.emailRx.test(x); });
  if (bad.length) return { ok: false, message: 'Not a valid email: ' + bad.join(', ') };
  var links = [p.linkedin, p.website].filter(String);
  var unsafe = links.filter(function (u) { return u && !V3.safeProtocols.test(u); });
  if (unsafe.length) return { ok: false, message: 'Links must start with https:// — ' + unsafe.join(', ') };
  var dupes = [];
  emails.forEach(function (e) { dupes = dupes.concat(findPersonMatches('', e).filter(function (m) { return m.match === 'same email'; })); });
  if (dupes.length && force !== true) return { ok: false, duplicate: true, matches: dupes, message: 'A person with this email already exists: ' + dupes.map(function (d) { return d.name + ' (' + d.id + ')'; }).join(', ') + '. Link the existing person or choose "Create anyway".' };
  var id = v3seq_(V3.PEOPLE, 'P', 3);
  v3append_(V3.PEOPLE, {
    'Person ID': id, 'Full name': name, 'Preferred name': p.preferredName || '', 'Job title': p.title || '', 'Department': p.department || '',
    'Current organization ID': p.orgId || '', 'CRM owner': p.owner || '', 'Stakeholder role': p.role || '', 'Primary email': emails[0] || '', 'Primary phone': phones[0] || '',
    'Location': p.location || '', 'Timezone': p.timezone || '', 'Preferred contact method': p.contactPref || '', 'LinkedIn': p.linkedin || '', 'Website': p.website || '',
    'Other public links': p.otherLinks || '', 'Relationship source': p.source || '', 'Introducer': p.introducer || '', 'First connected': p.firstConnected ? new Date(p.firstConnected) : '',
    'Professional background': p.background || '', 'Relationship notes': p.notes || '', 'Communication preferences': p.commsPrefs || '', 'Do not contact': p.doNotContact === true,
    'Created by': v3actor_(), 'Created on': v3now_()
  });
  emails.forEach(function (e, i) { addContactMethod(id, 'Email', e, i === 0 ? 'Primary' : 'Other', i === 0); });
  phones.forEach(function (ph, i) { addContactMethod(id, 'Phone', ph, i === 0 ? 'Primary' : 'Other', i === 0); });
  if (p.orgId) addAffiliation(id, p.orgId, p.title || '', p.firstConnected || '', true);
  if (typeof log_ === 'function') log_(id, 'Person', 'Profile created' + (dupes.length ? ' (duplicate warning overridden)' : ''), 'Created', '');
  // Deliberately NO notification or email to the external person.
  return { ok: true, id: id, message: 'Created ' + name + ' (' + id + ').' };
}
function addContactMethod(personId, type, value, label, primary) {
  if (type === 'Email' && !V3.emailRx.test(String(value))) return { ok: false, message: 'Not a valid email' };
  if (primary) {
    var t = v3table_(V3.METHODS), pc = t.col('Primary?');
    t.rows.forEach(function (r, i) { if (r[1] === personId && r[2] === type && v3bool_(r[pc])) t.sh.getRange(i + 2, pc + 1).setValue(false); });
    var pp = v3objects_(V3.PEOPLE).filter(function (x) { return x['Person ID'] === personId; })[0];
    if (pp) v3set_(V3.PEOPLE, pp._row, type === 'Email' ? 'Primary email' : 'Primary phone', value);
  }
  var id = v3seq_(V3.METHODS, 'M', 3);
  v3append_(V3.METHODS, { 'Method ID': id, 'Person ID': personId, 'Type': type, 'Value': value, 'Label': label || '', 'Primary?': primary === true });
  return { ok: true, id: id };
}
function addAffiliation(personId, orgId, role, start, current) {
  var id = v3seq_(V3.AFF, 'F', 3);
  v3append_(V3.AFF, { 'Affiliation ID': id, 'Person ID': personId, 'Organization ID': orgId, 'Role / title': role || '', 'Start date': start ? new Date(start) : '', 'Current?': current !== false });
  return id;
}
/** Job change: closes current affiliations (kept as history) and adds the new one. */
function changeAffiliation(personId, newOrgId, role, date) {
  var when = date ? new Date(date) : v3now_(), t = v3table_(V3.AFF), cc = t.col('Current?'), ec = t.col('End date');
  t.rows.forEach(function (r, i) { if (r[1] === personId && v3bool_(r[cc])) { t.sh.getRange(i + 2, cc + 1).setValue(false); t.sh.getRange(i + 2, ec + 1).setValue(when); } });
  var id = addAffiliation(personId, newOrgId, role, when, true);
  var pp = v3objects_(V3.PEOPLE).filter(function (x) { return x['Person ID'] === personId; })[0];
  if (pp) { v3set_(V3.PEOPLE, pp._row, 'Current organization ID', newOrgId); if (role) v3set_(V3.PEOPLE, pp._row, 'Job title', role); }
  if (typeof log_ === 'function') log_(personId, 'Person', 'Moved to ' + newOrgId + (role ? ' as ' + role : '') + '; previous affiliation kept as history', 'Note', '');
  return id;
}

/* ------------------------------------------------------------ PROFILES: organizations */
function v3domain_(url) { var m = String(url || '').toLowerCase().match(/^https:\/\/(www\.)?([^\/]+)/); return m ? m[2] : ''; }
function findOrganizationMatches(name, website) {
  var n = v3norm_(name), d = v3domain_(website);
  return v3objects_('Accounts').filter(function (a) {
    return (n && v3norm_(a['Account']) === n) || (d && (v3domain_(a['Website']) === d));
  }).map(function (a) { return { id: a['Account ID'], name: String(a['Account']) }; });
}
function createOrganization(o, force) {
  o = o || {};
  var name = String(o.name || '').trim();
  if (!name) return { ok: false, message: 'Organization name is required.' };
  if (o.website && !V3.safeProtocols.test(o.website)) return { ok: false, message: 'Website must start with https://' };
  var dupes = findOrganizationMatches(name, o.website);
  if (dupes.length && force !== true) return { ok: false, duplicate: true, matches: dupes, message: 'Looks like an existing organization: ' + dupes.map(function (d) { return d.name + ' (' + d.id + ')'; }).join(', ') };
  var id = v3seq_('Accounts', 'A', 2);
  v3append_('Accounts', { 'Account ID': id, 'Account': name, 'Type': o.type || '', 'Segment': o.segment || '', 'Setting': o.setting || '', 'Owner': o.owner || '', 'Status': 'Not contacted',
    'Sector': o.sector || '', 'Website': o.website || '', 'Location': o.location || '', 'Operating regions': o.regions || '', 'Parent organization ID': o.parent || '', 'Related organizations': o.related || '' });
  if (typeof log_ === 'function') log_(id, 'Account', 'Organization created', 'Created', 'Not contacted');
  return { ok: true, id: id, message: 'Created ' + name + ' (' + id + ').' };
}

/* ------------------------------------------------------------ RESOURCES */
function v3validUrl_(url) {
  url = String(url || '').trim();
  if (!V3.safeProtocols.test(url)) return 'Only https:// and mailto: links are allowed.';
  if (/\s/.test(url) || url.length > 2000) return 'That does not look like a valid link.';
  if (/^https:\/\/[^\/]*$/.test(url) && url.length < 12) return 'That does not look like a valid link.';
  return '';
}
function v3titleFor_(url) {
  if (/docs\.google\.com\/(document|spreadsheets|presentation)/.test(url)) return 'Google ' + url.match(/docs\.google\.com\/(\w+)/)[1] + ' file';
  if (/drive\.google\.com\/drive\/folders/.test(url)) return 'Google Drive folder';
  if (/drive\.google\.com/.test(url)) return 'Google Drive file';
  if (/^mailto:/i.test(url)) return 'Email: ' + url.slice(7);
  var m = url.match(/^https:\/\/(www\.)?([^\/?#]+)(\/[^?#]*)?/i);
  return m ? m[2] + (m[3] && m[3] !== '/' ? m[3].replace(/\/$/, '') : '') : url;
}
function addResource(r, force) {
  r = r || {};
  var url = String(r.url || '').trim(), err = v3validUrl_(url);
  if (err) return { ok: false, message: err };
  var rec = v3findRecord_(r.recordId);
  if (!rec) return { ok: false, message: 'Record ' + r.recordId + ' was not found.' };
  var dup = v3objects_(V3.RES).filter(function (x) { return String(x['URL']) === url && String(x['Linked record ID']) === String(r.recordId); });
  if (dup.length && force !== true) return { ok: false, duplicate: true, message: 'This link is already on ' + r.recordId + ' (' + dup[0]['Resource ID'] + ').' };
  var id = v3seq_(V3.RES, 'R', 4);
  v3append_(V3.RES, { 'Resource ID': id, 'Title': String(r.title || '').trim() || v3titleFor_(url), 'URL': url, 'Resource type': r.type || 'Other', 'Description': r.description || '',
    'Linked record type': rec.type, 'Linked record ID': r.recordId, 'Created by': v3actor_(), 'Created on': v3now_(), 'Drive file ID': r.fileId || '',
    'Access': 'Opening this link needs its own access. Adding it to the CRM did not change who can open the file.' });
  // NOTE: sharing permissions of the linked file are never read or changed here.
  if (typeof log_ === 'function') log_(r.recordId, rec.type, 'Linked resource ' + id + ': ' + (r.title || v3titleFor_(url)), 'Note', '');
  return { ok: true, id: id, message: 'Linked ' + id + ' to ' + r.recordId + '.' };
}
function resourcesFor(recordId) {
  return v3objects_(V3.RES).filter(function (x) { return String(x['Linked record ID']) === String(recordId); })
    .map(function (x) { return { id: x['Resource ID'], title: String(x['Title']), url: String(x['URL']), type: String(x['Resource type']), created: v3fmt_(x['Created on'], 'Africa/Accra', 'd MMM yyyy') }; });
}
function uploadResourceFile(f) {
  var folderId = String(v3setting_('UploadFolderId', '') || '');
  if (!folderId) return { ok: false, message: 'Uploads are off. An Admin can set UploadFolderId in Settings.' };
  var bytes = Utilities.base64Decode(String(f.data || ''));
  if (bytes.length > 10 * 1024 * 1024) return { ok: false, message: 'Files over 10 MB are not accepted.' };
  var file = DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(bytes, f.mimeType || 'application/octet-stream', f.name || 'upload'));
  // The file inherits the configured folder's access. The CRM does not add or remove sharing.
  return addResource({ recordId: f.recordId, url: file.getUrl(), title: f.title || file.getName(), type: f.type || 'Other', description: f.description || '', fileId: file.getId() });
}

/* ------------------------------------------------------------ record details and quick actions */
function getRecordDetails(recordId) {
  var rec = v3findRecord_(recordId); if (!rec) return null;
  var sh = v3sheet_(rec.tab), head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0], vals = sh.getRange(rec.row, 1, 1, sh.getLastColumn()).getValues()[0], fields = [];
  head.forEach(function (h, i) { if (h && vals[i] !== '' && vals[i] !== null && !/Latest comment/.test(h)) fields.push([String(h), vals[i] instanceof Date ? v3fmt_(vals[i], 'Africa/Accra', 'd MMM yyyy') : String(vals[i])]); });
  var acts = v3table_('Activity log').rows.filter(function (r) { return String(r[1]) === String(recordId); }).slice(0, 10).map(function (r) { return v3fmt_(r[0], 'Africa/Accra', 'd MMM HH:mm') + ' · ' + r[4] + ' · ' + r[5]; });
  var tasks = v3objects_(V3.TASKS).filter(function (t) { return String(t['Related record ID']) === String(recordId); }).map(function (t) { return t['Task ID'] + ' · ' + t['Title'] + ' · ' + t['Status'] + ' · ' + t['Owner']; });
  var extra = {};
  if (rec.tab === 'People') {
    extra.affiliations = v3objects_(V3.AFF).filter(function (a) { return a['Person ID'] === recordId; }).map(function (a) { return (v3bool_(a['Current?']) ? 'Current: ' : 'Past: ') + (a['Organization'] || a['Organization ID']) + (a['Role / title'] ? ' · ' + a['Role / title'] : ''); });
    extra.methods = v3objects_(V3.METHODS).filter(function (m) { return m['Person ID'] === recordId; }).map(function (m) { return m['Type'] + ': ' + m['Value'] + (v3bool_(m['Primary?']) ? ' (primary)' : ''); });
  }
  return { id: recordId, tab: rec.tab, type: rec.type, name: rec.name, link: v3link_(rec.tab, rec.row), fields: fields, resources: resourcesFor(recordId), activities: acts, tasks: tasks, extra: extra };
}
function selectedRecordId_() {
  var sh = SpreadsheetApp.getActiveSheet(), row = sh.getActiveRange().getRow();
  return row >= 2 ? String(sh.getRange(row, 1).getValue() || '') : '';
}
function createTask(t) {
  t = t || {};
  if (!String(t.title || '').trim()) return { ok: false, message: 'A task needs a title.' };
  var id = v3seq_(V3.TASKS, 'K', 3);
  var row = v3append_(V3.TASKS, { 'Task ID': id, 'Title': t.title, 'Related record ID': t.recordId || '', 'Owner': t.owner || '', 'Due date': t.due ? new Date(t.due) : '',
    'Status': 'Open', 'Priority': t.priority || 'Medium', 'Created by': v3actor_(), 'Created on': v3now_() });
  if (typeof log_ === 'function') log_(id, 'Task', 'Task created: ' + t.title + (t.recordId ? ' (for ' + t.recordId + ')' : ''), 'Created', 'Open');
  if (t.owner) queueAssignment_(t.owner, V3.TASKS, row, '');
  processQueueSafe_();
  return { ok: true, id: id, message: 'Created task ' + id + '.' };
}
function linkPersonToRecord(recordId, personId) {
  var rec = v3findRecord_(recordId); if (!rec) return { ok: false, message: 'Record not found' };
  var col = { Leads: 'Person ID', Opportunities: 'Primary contact (Person ID)', Interviews: 'Person ID', Contacts: 'Person ID' }[rec.tab];
  if (!col) return { ok: false, message: 'People can be linked to leads, opportunities, interviews and contacts.' };
  v3set_(rec.tab, rec.row, col, personId);
  if (typeof log_ === 'function') log_(recordId, rec.type, 'Linked person ' + personId, 'Note', '');
  return { ok: true, message: 'Linked ' + personId + ' to ' + recordId + '.' };
}
function v3formData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return {
    selected: selectedRecordId_(), team: v3users_().map(function (u) { return u.name; }),
    orgs: v3objects_('Accounts').map(function (a) { return a['Account ID'] + ' · ' + a['Account']; }),
    records: V3_RECORD_TABS.reduce(function (acc, t) { var sh = ss.getSheetByName(t[0]); if (sh && sh.getLastRow() > 1) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues().forEach(function (r) { if (r[0]) acc.push(String(r[0])); }); return acc; }, []),
    lists: V3.lists
  };
}
function v3css_() {
  return '<style>body{font:13px Arial,sans-serif;margin:12px;color:#181818}label{display:block;margin:9px 0 3px;font-weight:bold}input,select,textarea{width:100%;box-sizing:border-box;padding:6px;border:1px solid #ccc;border-radius:6px;font:13px Arial}textarea{height:60px}' +
    'button{margin-top:12px;width:100%;padding:9px;border:0;border-radius:8px;background:#FFBE00;font-weight:bold;cursor:pointer}.muted{color:#5B5B60;font-size:12px}.card{border:1px solid #eee;border-radius:8px;padding:8px;margin:6px 0}.warn{color:#B3261E;font-weight:bold}details{margin-top:10px}summary{cursor:pointer;font-weight:bold}</style>';
}
function v3sidebar_(title, body, script) {
  var js = '<script>var D;function $(i){return document.getElementById(i)}function opt(id,a,sel,blank){var el=$(id);el.innerHTML=blank?"<option value=\\"\\"></option>":"";a.forEach(function(x){var o=document.createElement("option");o.text=x;o.value=String(x).split(" · ")[0];if(x===sel||o.value===sel)o.selected=true;el.add(o);});}' +
    'function msg(t,w){$("msg").innerHTML=(w?"<span class=warn>":"")+esc(t)+(w?"</span>":"");}function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[c];});}' +
    'google.script.run.withSuccessHandler(function(d){D=d;init();}).v3formData();' + script + '</script>';
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(v3css_() + body + '<div id="msg"></div>' + js).setTitle(title));
}
function showAddPersonForm() {
  v3sidebar_('Add person',
    '<div class="muted">External contact. Adding someone never emails them.</div><label>Full name *</label><input id="fullName"><label>Email</label><input id="email" onblur="check()"><div id="dupe"></div>' +
    '<label>Organization</label><select id="orgId"></select><label>Job title</label><input id="title"><label>CRM owner</label><select id="owner"></select>' +
    '<details><summary>More (optional)</summary><label>Preferred name</label><input id="preferredName"><label>Department</label><input id="department"><label>Stakeholder role</label><select id="role"></select>' +
    '<label>Phone</label><input id="phone"><label>Location</label><input id="location"><label>Timezone</label><select id="timezone"></select><label>Preferred contact method</label><select id="contactPref"></select>' +
    '<label>LinkedIn (https://…)</label><input id="linkedin"><label>Website (https://…)</label><input id="website"><label>Relationship source</label><input id="source"><label>Introducer</label><input id="introducer">' +
    '<label>First connected</label><input id="firstConnected" type="date"><label>Professional background</label><textarea id="background"></textarea><label>Relationship notes</label><textarea id="notes"></textarea>' +
    '<label>Communication preferences</label><input id="commsPrefs"><label><input type="checkbox" id="doNotContact" style="width:auto"> Do not contact</label></details>' +
    '<button onclick="save(false)">Save person</button><button id="force" style="display:none;background:#eee" onclick="save(true)">Create anyway</button>',
    'function init(){opt("orgId",D.orgs,"",true);opt("owner",D.team);opt("role",D.lists.StakeholderRole,"",true);opt("timezone",D.lists.Timezone,"",true);opt("contactPref",D.lists.ContactPref,"",true);}' +
    'function check(){var n=$("fullName").value,e=$("email").value;if(!n&&!e)return;google.script.run.withSuccessHandler(function(m){$("dupe").innerHTML=m.length?"<div class=warn>Possible match: "+m.map(function(x){return esc(x.name)+" ("+x.id+", "+x.match+")"}).join(", ")+"</div>":"";}).findPersonMatches(n,e);}' +
    'function save(force){var p={};["fullName","email","orgId","title","owner","preferredName","department","role","phone","location","timezone","contactPref","linkedin","website","source","introducer","firstConnected","background","notes","commsPrefs"].forEach(function(k){p[k]=$(k).value;});p.doNotContact=$("doNotContact").checked;' +
    'google.script.run.withSuccessHandler(function(r){msg(r.message,!r.ok);$("force").style.display=r.duplicate?"block":"none";}).createPerson(p,force);}');
}
function showAddOrganizationForm() {
  v3sidebar_('Add organization',
    '<label>Organization name *</label><input id="name" onblur="check()"><label>Website (https://…)</label><input id="website" onblur="check()"><div id="dupe"></div><label>Type</label><input id="type" placeholder="e.g. After-school programme">' +
    '<label>Relationship owner</label><select id="owner"></select><details><summary>More (optional)</summary><label>Sector</label><input id="sector"><label>Location</label><input id="location"><label>Operating regions</label><input id="regions">' +
    '<label>Parent organization</label><select id="parent"></select><label>Related organizations</label><input id="related"></details>' +
    '<button onclick="save(false)">Save organization</button><button id="force" style="display:none;background:#eee" onclick="save(true)">Create anyway</button>',
    'function init(){opt("owner",D.team);opt("parent",D.orgs,"",true);}' +
    'function check(){google.script.run.withSuccessHandler(function(m){$("dupe").innerHTML=m.length?"<div class=warn>Possible match: "+m.map(function(x){return esc(x.name)+" ("+x.id+")"}).join(", ")+"</div>":"";}).findOrganizationMatches($("name").value,$("website").value);}' +
    'function save(force){var o={};["name","website","type","owner","sector","location","regions","parent","related"].forEach(function(k){o[k]=$(k).value;});google.script.run.withSuccessHandler(function(r){msg(r.message,!r.ok);$("force").style.display=r.duplicate?"block":"none";}).createOrganization(o,force);}');
}
function showAddResourceForm() {
  v3sidebar_('Add link or document',
    '<div class="muted">Linking a file does not change who can open it.</div><label>Record</label><select id="recordId"></select><label>Link (https:// or mailto:)</label><input id="url"><label>Title (optional)</label><input id="title">' +
    '<label>Type</label><select id="type"></select><label>Description</label><textarea id="description"></textarea><button onclick="save(false)">Add link</button><button id="force" style="display:none;background:#eee" onclick="save(true)">Add anyway</button>' +
    '<details><summary>Upload a file instead</summary><div class="muted">Goes to the Drive folder set in Settings (uploads are off until an Admin sets it).</div><input type="file" id="file"><button onclick="upload()">Upload and link</button></details>',
    'function init(){opt("recordId",D.records,D.selected);opt("type",D.lists.ResourceType,"Website");}' +
    'function save(force){var r={recordId:$("recordId").value,url:$("url").value,title:$("title").value,type:$("type").value,description:$("description").value};google.script.run.withSuccessHandler(function(x){msg(x.message,!x.ok);$("force").style.display=x.duplicate?"block":"none";}).addResource(r,force);}' +
    'function upload(){var f=$("file").files[0];if(!f)return msg("Choose a file",true);var rd=new FileReader();rd.onload=function(){google.script.run.withSuccessHandler(function(x){msg(x.message,!x.ok);}).uploadResourceFile({recordId:$("recordId").value,name:f.name,mimeType:f.type,data:rd.result.split(",")[1],title:$("title").value,type:$("type").value,description:$("description").value});};rd.readAsDataURL(f);}');
}
function showAddTaskForm() {
  v3sidebar_('Add task',
    '<label>Task</label><input id="title" placeholder="e.g. Send costed pilot offer"><label>For record</label><select id="recordId"></select><label>Owner</label><select id="owner"></select><label>Due date</label><input id="due" type="date">' +
    '<label>Priority</label><select id="priority"><option>High</option><option selected>Medium</option><option>Low</option></select><button onclick="save()">Create task</button>',
    'function init(){opt("recordId",D.records,D.selected,true);opt("owner",D.team);}' +
    'function save(){var t={title:$("title").value,recordId:$("recordId").value,owner:$("owner").value,due:$("due").value,priority:$("priority").value};google.script.run.withSuccessHandler(function(x){msg(x.message,!x.ok);}).createTask(t);}');
}
function showRecordDetails() {
  var id = selectedRecordId_();
  v3sidebar_('Record details',
    '<div id="box">Select a row on a record tab, then open this again.</div><details><summary>Quick add a person to this record</summary><label>Full name</label><input id="pname"><label>Email</label><input id="pemail"><div id="pd"></div>' +
    '<button onclick="addP(false)">Create and link person</button><button id="pforce" style="display:none;background:#eee" onclick="addP(true)">Create anyway</button><label>…or link an existing Person ID</label><input id="pid" placeholder="P001"><button onclick="link()">Link</button></details>',
    'var ID=' + JSON.stringify(id) + ';function init(){if(!ID)return;google.script.run.withSuccessHandler(function(d){if(!d)return;var h="<h3>"+esc(d.name)+"</h3><div class=muted>"+esc(d.type)+" · "+esc(d.id)+" · <a target=_blank href=\\""+encodeURI(d.link)+"\\">go to row</a></div>";' +
    'h+="<details open><summary>Fields</summary>"+d.fields.map(function(f){return "<div><b>"+esc(f[0])+":</b> "+esc(f[1])+"</div>"}).join("")+"</details>";' +
    'h+="<details open><summary>Resources ("+d.resources.length+")</summary>"+d.resources.map(function(r){return "<div class=card><a target=_blank href=\\""+encodeURI(r.url)+"\\">"+esc(r.title)+"</a><br><span class=muted>"+esc(r.type)+" · "+esc(r.id)+" · opening needs its own access</span></div>"}).join("")+"</details>";' +
    'if(d.extra.affiliations)h+="<details open><summary>Affiliations</summary>"+d.extra.affiliations.map(esc).join("<br>")+"</details><details open><summary>Contact methods</summary>"+d.extra.methods.map(esc).join("<br>")+"</details>";' +
    'h+="<details><summary>Tasks ("+d.tasks.length+")</summary>"+d.tasks.map(esc).join("<br>")+"</details><details><summary>Recent activity</summary>"+d.activities.map(esc).join("<br>")+"</details>";$("box").innerHTML=h;}).getRecordDetails(ID);}' +
    'function addP(force){google.script.run.withSuccessHandler(function(r){if(r.ok){google.script.run.withSuccessHandler(function(x){msg(r.message+" "+x.message);}).linkPersonToRecord(ID,r.id);}else{msg(r.message,true);$("pforce").style.display=r.duplicate?"block":"none";}}).createPerson({fullName:$("pname").value,email:$("pemail").value},force);}' +
    'function link(){google.script.run.withSuccessHandler(function(x){msg(x.message,!x.ok);}).linkPersonToRecord(ID,$("pid").value);}');
}

/* ------------------------------------------------------------ setup of v3 tabs (called from setupCRM) */
function setupV3_(ss, created) {
  var keys = Object.keys(CRM.lists).concat(Object.keys(V3.lists));
  var lists = ss.getSheetByName('Lists');
  Object.keys(V3.lists).forEach(function (k) {
    var col = keys.indexOf(k) + 1, vals = [[k]].concat(V3.lists[k].map(function (v) { return [v]; }));
    lists.getRange(1, col, vals.length, 1).setValues(vals);
  });
  var lr = function (k) { return lists.getRange(2, keys.indexOf(k) + 1, V3.lists[k].length, 1); };
  var dd = function (sh, col, k, rows) { sh.getRange(2, col, rows || 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(lr(k), true).setAllowInvalid(false).build()); };
  var team = function (sh, col) { sh.getRange(2, col, 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(ss.getSheetByName('Team & roles').getRange('A2:A50'), true).setAllowInvalid(false).build()); };
  var ids = function (sh, col, src) { sh.getRange(2, col, 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(ss.getSheetByName(src).getRange('A2:A1000'), true).setAllowInvalid(true).build()); };
  var box = function (sh, col) { sh.getRange(2, col, 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build()); };
  var hdr = function (name, widths, color) { var sh = ss.getSheetByName(name); header_(sh, V3.headers[name], widths, color); return sh; };
  var lookup = function (col, src, n) { return 'ARRAYFORMULA(IF(' + col + '2:' + col + '="","",IFERROR(VLOOKUP(' + col + '2:' + col + ',' + src + ',' + n + ',FALSE),"")))'; };

  // settings rows (added once)
  var st = ss.getSheetByName('Settings'), have = st.getRange('A2:A60').getValues().map(function (r) { return r[0]; });
  V3.settings.forEach(function (s) {
    var i = have.indexOf(s[0]);
    if (i < 0) { var row = v3firstEmptyRow_(st); st.getRange(row, 1, 1, 3).setValues([[s[0], s[2], s[1]]]); i = row - 2; }
    ss.setNamedRange(s[0], st.getRange(i + 2, 2));
  });
  ['EmailEnabled', 'DryRun', 'EnrichmentEnabled'].forEach(function (k) { ss.getRangeByName(k).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build()); });

  // Team & roles: team + timezone
  var tr = ss.getSheetByName('Team & roles');
  tr.getRange(1, 13, 1, 2).setValues([['Team', 'Timezone']]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
  if (created['Team & roles'] || !tr.getRange('N2').getValue()) tr.getRange(2, 14, CRM.team.length, 1).setValues(CRM.team.map(function () { return ['Africa/Accra']; }));
  if (created['Team & roles'] || !tr.getRange('M2').getValue()) tr.getRange(2, 13, CRM.team.length, 1).setValues(CRM.team.map(function (t) { return [t[2] === 'Member' ? 'Learning' : 'Leadership']; }));
  dd(tr, 14, 'Timezone', 50);

  // Tasks
  var tk = hdr('Tasks', [70, 240, 110, 100, 105, 100, 80, 180, 130, 120, 260, 260], '#FFBE00');
  team(tk, 4); dd(tk, 6, 'TaskStatus'); tk.getRange(2, 5, 1000, 1).setNumberFormat('ddd d mmm yyyy'); tk.getRange(2, 9, 1000, 2).setNumberFormat('d mmm yyyy HH:mm');
  var trules = [];
  color_(trules, tk.getRange('F2:F1000'), 'Done', '#01C778', '#181818'); color_(trules, tk.getRange('F2:F1000'), 'Cancelled', '#E4E4E7');
  rule_(trules, tk.getRange('E2:E1000'), '=AND($A2<>"",$E2<TODAY(),$F2<>"Done",$F2<>"Cancelled")', '#FDE7E4');
  tk.setConditionalFormatRules(trules);

  // People
  var pp = hdr('People', [70, 180, 110, 150, 120, 90, 180, 100, 120, 200, 130, 120, 120, 120, 160, 160, 160, 130, 120, 110, 220, 220, 180, 90, 140, 120, 180, 120, 60, 60, 60, 60, 60, 60], '#6833D9');
  pp.getRange(1, 7).setFormula('={"Current organization";' + lookup('F', 'Accounts!A:B', 2) + '}');
  var cnt = function (c, f) { pp.getRange(1, c).setFormula('={"' + V3.headers.People[c - 1] + '";ARRAYFORMULA(IF(A2:A="","",' + f + '))}'); };
  cnt(29, 'COUNTIF(Leads!V2:V,A2:A)'); cnt(30, 'COUNTIF(Opportunities!T2:T,A2:A)'); cnt(31, 'COUNTIF(Interviews!X2:X,A2:A)');
  cnt(32, 'COUNTIF(\'Activity log\'!B2:B,A2:A)'); cnt(33, 'COUNTIF(Tasks!C2:C,A2:A)'); cnt(34, 'COUNTIF(Resources!G2:G,A2:A)');
  ids(pp, 6, 'Accounts'); team(pp, 8); dd(pp, 9, 'StakeholderRole'); dd(pp, 13, 'Timezone'); dd(pp, 14, 'ContactPref'); box(pp, 24);
  pp.getRange(2, 20, 1000, 1).setNumberFormat('d mmm yyyy'); pp.getRange(2, 26, 1000, 1).setNumberFormat('d mmm yyyy'); pp.getRange(2, 28, 1000, 1).setNumberFormat('d mmm yyyy HH:mm');
  var prules = []; rule_(prules, pp.getRange('A2:X1000'), '=$X2=TRUE', '#FDE7E4'); pp.setConditionalFormatRules(prules);
  pp.getRange(2, 15, 1000, 3).setDataValidation(SpreadsheetApp.newDataValidation().requireFormulaSatisfied('=OR(O2="",REGEXMATCH(O2,"^https://"))').setAllowInvalid(false).setHelpText('Links must start with https://').build());
  warnFormulas_(pp, ['G1:G1000', 'AC1:AH1000']);

  // Affiliations and contact methods
  var af = hdr('Affiliations', [90, 80, 100, 180, 105, 105, 80, 180, 220, 220], '#6833D9');
  af.getRange(1, 8).setFormula('={"Person";' + lookup('B', 'People!A:B', 2) + '}'); af.getRange(1, 9).setFormula('={"Organization";' + lookup('C', 'Accounts!A:B', 2) + '}');
  ids(af, 2, 'People'); ids(af, 3, 'Accounts'); box(af, 7); af.getRange(2, 5, 1000, 2).setNumberFormat('d mmm yyyy');
  var cm = hdr('Contact methods', [80, 80, 90, 230, 100, 80, 200, 180], '#6833D9');
  cm.getRange(1, 8).setFormula('={"Person";' + lookup('B', 'People!A:B', 2) + '}'); ids(cm, 2, 'People'); dd(cm, 3, 'MethodType'); box(cm, 6);

  // Resources
  var rs = hdr('Resources', [80, 220, 260, 120, 220, 110, 100, 200, 180, 130, 140, 80, 300], '#006EFB');
  var names = ['Leads!A:B', 'Opportunities!A:B', 'People!A:B', 'Accounts!A:B', 'Interviews!A:C', 'Contacts!A:B', 'Outreach!A:D', 'Tasks!A:B'], idx = [2, 2, 2, 2, 3, 2, 4, 2];
  var chain = '""'; for (var i = names.length - 1; i >= 0; i--) chain = 'IFERROR(VLOOKUP(G2:G,' + names[i] + ',' + idx[i] + ',FALSE),' + chain + ')';
  rs.getRange(1, 8).setFormula('={"Linked record";ARRAYFORMULA(IF(G2:G="","",' + chain + '))}');
  rs.getRange(1, 12).setFormula('={"Open";ARRAYFORMULA(IF(C2:C="","",HYPERLINK(C2:C,IF(B2:B="",C2:C,B2:B))))}');
  dd(rs, 4, 'ResourceType'); dd(rs, 6, 'RecordType');
  rs.getRange(2, 3, 1000, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireFormulaSatisfied('=REGEXMATCH(C2,"^(https://|mailto:)")').setAllowInvalid(false).setHelpText('Only https:// or mailto: links').build());
  rs.getRange(2, 10, 1000, 1).setNumberFormat('d mmm yyyy HH:mm');
  warnFormulas_(rs, ['H1:H1000', 'L1:L1000']);

  // New link/count columns on existing tabs
  var addCol = function (tab, col, header, formula, idTab) {
    var sh = ss.getSheetByName(tab);
    if (formula) sh.getRange(1, col).setFormula(formula); else sh.getRange(1, col).setValue(header);
    sh.getRange(1, col).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818').setWrap(true);
    if (idTab) ids(sh, col, idTab);
  };
  var resCount = '={"Resources";ARRAYFORMULA(IF(A2:A="","",COUNTIF(Resources!G2:G,A2:A)))}';
  addCol('Leads', 22, 'Person ID', null, 'People'); addCol('Leads', 23, '', resCount);
  addCol('Opportunities', 20, 'Primary contact (Person ID)', null, 'People'); addCol('Opportunities', 21, '', resCount);
  addCol('Interviews', 24, 'Person ID', null, 'People'); addCol('Interviews', 25, '', resCount);
  addCol('Contacts', 16, 'Person ID', null, 'People'); addCol('Contacts', 17, '', resCount);
  addCol('Outreach', 23, '', resCount);
  ['Sector', 'Website', 'Location', 'Operating regions', 'Parent organization ID', 'Related organizations'].forEach(function (h, i) { addCol('Accounts', 16 + i, h); });
  ids(ss.getSheetByName('Accounts'), 20, 'Accounts');
  addCol('Accounts', 22, '', '={"Key contacts";BYROW(A2:A,LAMBDA(id,IF(id="","",IFERROR(TEXTJOIN(", ",TRUE,FILTER(Affiliations!H2:H,Affiliations!C2:C=id,Affiliations!G2:G=TRUE)),""))))}');
  addCol('Accounts', 23, '', resCount);
  addCol('Accounts', 24, '', '={"Activities";ARRAYFORMULA(IF(A2:A="","",COUNTIF(\'Activity log\'!B2:B,A2:A)))}');

  // Notification tables
  var nr = hdr(V3.NR, [70, 190, 75, 95, 120, 170, 110, 380], '#181818');
  if (created[V3.NR] || nr.getLastRow() < 2) nr.getRange(2, 1, V3.rules.length, 8).setValues(V3.rules);
  box(nr, 3); dd(nr, 4, 'NotifDelivery', 100); dd(nr, 5, 'NotifRecipients', 100);
  var np = hdr(V3.NP, [110, 190, 75, 120, 120, 130, 110, 110, 90], '#181818');
  if (created[V3.NP] || np.getLastRow() < 2) np.getRange(2, 1, CRM.team.length, 9).setValues(CRM.team.map(function (t) { return [t[0], 'All', true, 'In-app + email', 'Immediate', '', 21, 7, 8]; }));
  team(np, 1); dd(np, 2, 'EventOrAll'); box(np, 3); dd(np, 4, 'NotifChannel'); dd(np, 5, 'NotifFrequency'); dd(np, 6, 'Timezone');
  np.getRange('K1').setValue('One row per person with Event = All sets their defaults. Add rows for specific events to override (e.g. MENTION → Immediate, OPP_STALE → Off). Quiet hours and digest hour use the person\'s timezone.').setWrap(true);
  np.setColumnWidth(11, 360);
  var nt = hdr(V3.NT, [110, 360, 620], '#181818');
  if (created[V3.NT] || nt.getLastRow() < 2) nt.getRange(2, 1, V3.templates.length, 3).setValues(V3.templates);
  nt.getRange('C2:C50').setWrap(true);
  nt.getRange('E1').setValue('Placeholders: {{recipient}} {{reason}} {{recordName}} {{recordId}} {{recordType}} {{owner}} {{due}} {{link}} {{period}} {{items}} {{footer}}. Never add interview notes or comment text.').setWrap(true);
  nt.setColumnWidth(5, 360);
  var nq = hdr(V3.NQ, [80, 130, 60, 150, 200, 100, 180, 110, 85, 100, 80, 180, 280, 100, 110, 120, 240, 280, 170, 70, 130, 200, 130, 60], '#181818');
  nq.getRange(2, 2, 5000, 1).setNumberFormat('d mmm HH:mm'); nq.getRange(2, 21, 5000, 1).setNumberFormat('d mmm HH:mm'); nq.getRange(2, 23, 5000, 1).setNumberFormat('d mmm HH:mm'); box(nq, 24);
  var qrules = [], qs = nq.getRange('S2:S5000');
  [['Failed', '#F2643E'], ['Retry', '#FFE0B2'], ['Held (quiet hours)', '#EEE7FF']].forEach(function (x) { color_(qrules, qs, x[0], x[1]); });
  qrules.push(SpreadsheetApp.newConditionalFormatRule().whenTextContains('sent').setBackground('#D9F7E8').setRanges([qs]).build());
  nq.setConditionalFormatRules(qrules);
  var nl = hdr(V3.NL, [140, 90, 150, 80, 140, 420, 100], '#181818');
  nl.getRange(2, 1, 5000, 1).setNumberFormat('d mmm yyyy HH:mm:ss');

  // Notification center (per user, in-app)
  var nc = ss.getSheetByName(V3.NC); nc.clear();
  nc.getRange('A1').setValue('Notifications for →').setFontWeight('bold');
  var keep = nc.getRange('B1').getValue() || CRM.team[0][0];
  nc.getRange('B1').setValue(keep).setBackground('#FFBE00').setFontWeight('bold');
  nc.getRange('B1').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInRange(ss.getSheetByName('Team & roles').getRange('A2:A50'), true).build());
  nc.getRange('C1').setValue('Unread in-app notifications, newest first. Mark them read from NBC CRM → My notifications, or tick Read in the queue.').setFontColor('#5B5B60');
  nc.getRange(3, 1, 1, 7).setValues([['When', 'Event', 'Record', 'Reason', 'Due', 'Open', 'Status']]).setFontWeight('bold').setFontColor('#FFFFFF').setBackground('#181818');
  nc.getRange('A4').setFormula("=IFERROR(SORT(FILTER({'Notification queue'!B2:B,'Notification queue'!D2:D,'Notification queue'!L2:L,'Notification queue'!M2:M,'Notification queue'!O2:O,ARRAYFORMULA(IF('Notification queue'!P2:P=\"\",\"\",HYPERLINK('Notification queue'!P2:P,\"Open record\"))),'Notification queue'!S2:S},'Notification queue'!F2:F=$B$1,REGEXMATCH('Notification queue'!H2:H&\"\",\"In-app\"),'Notification queue'!X2:X<>TRUE,NOT(REGEXMATCH('Notification queue'!S2:S&\"\",\"Cancelled\"))),1,FALSE),\"No new notifications\")");
  nc.getRange('A4:A500').setNumberFormat('ddd d MMM HH:mm');
  [130, 170, 200, 380, 120, 100, 200].forEach(function (w, i) { nc.setColumnWidth(i + 1, w); });
  nc.setFrozenRows(3); nc.setTabColor('#F2643E');
}
