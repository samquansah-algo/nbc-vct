// Acceptance tests for NBC CRM v3 (notifications, profiles, resources). Run: node acceptance.test.js
const vm = require('vm'), fs = require('fs'), assert = require('assert');
const { makeWorld } = require('./fake.js');
let W, results = [];
function load() {
  W = makeWorld();
  vm.runInThisContext(fs.readFileSync(__dirname + '/../NBC_CRM.gs', 'utf8'));
  global.v3now_ = () => W.now || new Date();
  seed();
}
const D = (s) => new Date(s);
function sheet(name, head, rows) { const sh = SpreadsheetApp.getActiveSpreadsheet().insertSheet(name); sh.getRange(1, 1, 1, head.length).setValues([head]); (rows || []).forEach((r, i) => sh.getRange(i + 2, 1, 1, r.length).setValues([r])); return sh; }
function seed() {
  sheet('Team & roles', ['Name', 'Email', 'CRM role', 'Job title', 'Active?', 'Email me when assigned', 'Daily reminders', 'Weekly summary', 'Manager', 'Open items', 'Overdue', 'Access', 'Team', 'Timezone'], [
    ['Sam', 'sam@nbc.test', 'Admin', 'Founder', true, true, true, true, '', '', '', '', 'Leadership', 'Africa/Accra'],
    ['Deborah', 'deb@nbc.test', 'Manager', 'Sales lead', true, true, true, true, 'Sam', '', '', '', 'Leadership', 'Africa/Accra'],
    ['Vera', 'vera@nbc.test', 'Member', 'Learning Designer', true, true, true, true, 'Deborah', '', '', '', 'Learning', 'Africa/Accra'],
    ['Nana Adwoa', 'nana@nbc.test', 'Member', 'LX Designer', true, true, true, true, 'Deborah', '', '', '', 'Learning', 'Asia/Tokyo']]);
  const st = sheet('Settings', ['Setting', 'Value', 'What'], [['EmailEnabled', false], ['DryRun', true], ['MaxAttempts', 3], ['EmailDailyCap', 80], ['UploadFolderId', 'FOLDER1'], ['FollowUpDays', 5]]);
  ['EmailEnabled', 'DryRun', 'MaxAttempts', 'EmailDailyCap', 'UploadFolderId', 'FollowUpDays'].forEach((k, i) => W.named[k] = ['Settings', i + 2, 2]);
  sheet(V3.NR, V3.headers[V3.NR], V3.rules.map(r => r.slice()));
  sheet(V3.NP, V3.headers[V3.NP], ['Sam', 'Deborah', 'Vera', 'Nana Adwoa'].map(n => [n, 'All', true, 'In-app + email', 'Immediate', '', 21, 7, 8]));
  sheet(V3.NT, V3.headers[V3.NT], V3.templates);
  [V3.NQ, V3.NL, V3.PEOPLE, V3.AFF, V3.METHODS, V3.RES, V3.TASKS].forEach(n => sheet(n, V3.headers[n]));
  const leadHead = Array(23).fill('').map((_, i) => 'c' + (i + 1)); leadHead[0] = 'Lead ID'; leadHead[1] = 'Prospect'; leadHead[21] = 'Person ID'; leadHead[22] = 'Resources';
  sheet('Leads', leadHead, [['L01', 'Club owner (GRAF network)', 'G2', '', 'Email outreach', 'Buyer', 'Vera', 'New', 'Unknown', 'Unknown', '', 'Unknown', '', '', 'Discovery interview', D('2026-10-01T00:00:00Z')],
    ['L02', 'After-school owner, Cape Coast', 'CC', '', 'In-person canvass', 'Buyer', 'Deborah', 'New', '', '', '', '', '', '', 'Discovery interview', D('2026-10-05T00:00:00Z')]]);
  const oppHead = Array(21).fill('').map((_, i) => 'o' + (i + 1)); oppHead[0] = 'Opp ID'; oppHead[1] = 'Opportunity'; oppHead[19] = 'Primary contact (Person ID)';
  sheet('Opportunities', oppHead, [['O01', 'GRAF · Learning Worlds pilot', 'G2', '', 'L01', 'Vera', 'Qualification', '', 3600, '', '', '', '', '', 'Send offer', D('2026-10-03T00:00:00Z')]]);
  const accHead = Array(24).fill('').map((_, i) => 'a' + (i + 1)); accHead[0] = 'Account ID'; accHead[1] = 'Account'; accHead[16] = 'Website';
  sheet('Accounts', accHead, [['G2', 'Ghana Robotics Academy Foundation'], ['G5', 'The MakersPlace (Accra)'], ['CC', 'Cape Coast programme owners']]);
  const ivHead = Array(25).fill('').map((_, i) => 'i' + (i + 1)); ivHead[0] = 'Interview ID'; ivHead[23] = 'Person ID';
  sheet('Interviews', ivHead, [['I01', 'C01', 'Owner 1', 'G2', 'Vera', 'Buyer', D('2026-09-27T09:00:00Z'), 'Done', '', true, ''],
    ['I02', 'C02', 'Owner 2', 'CC', 'Deborah', 'Buyer', D('2026-09-30T09:00:00Z'), 'Scheduled', '', false, '']]);
  sheet('Contacts', ['Contact ID', 'Role (no names)'], [['C01', 'Owner 1']]);
  sheet('Outreach', ['ID', 'Version', 'Account ID', 'Account'], [['P1', 'v1', 'G2', 'GRAF']]);
  sheet('Activity log', ['When', 'Record ID', 'Record type', 'By', 'Type', 'Update / comment', 'Stage or status after']);
}
function queue() { return v3objects_(V3.NQ); }
function test(name, fn) { try { load(); fn(); results.push(['PASS', name]); } catch (e) { results.push(['FAIL', name, e.stack.split('\n').slice(0, 3).join(' | ')]); } }
function enableEmail(dry) { W.sheets['Settings'].getRange(2, 2).setValue(true); W.sheets['Settings'].getRange(3, 2).setValue(!!dry); W.props.confirmedRecipients = JSON.stringify(['sam@nbc.test', 'deb@nbc.test', 'vera@nbc.test', 'nana@nbc.test']); }

test('1. Creating a person with an existing email produces a duplicate warning', () => {
  const a = createPerson({ fullName: 'Ama Mensah', email: 'ama@partner.org', orgId: 'G2' });
  assert.ok(a.ok, a.message);
  const b = createPerson({ fullName: 'A. Mensah', email: 'AMA@partner.org' });
  assert.strictEqual(b.ok, false); assert.strictEqual(b.duplicate, true); assert.ok(/already exists/.test(b.message));
  assert.strictEqual(v3objects_(V3.PEOPLE).length, 1, 'no second person created without override');
  const c = createPerson({ fullName: 'A. Mensah', email: 'ama@partner.org' }, true);
  assert.ok(c.ok, 'explicit override still allowed');
});

test('2. A person can have multiple affiliations and contact methods', () => {
  const p = createPerson({ fullName: 'Kofi Boateng', emails: ['kofi@graf.org', 'kofi.b@mail.com'], phones: ['+233 20 000 0000'], orgId: 'G2', title: 'Club coach' });
  assert.ok(p.ok);
  changeAffiliation(p.id, 'G5', 'Programme lead', '2026-10-01');
  const aff = v3objects_(V3.AFF).filter(a => a['Person ID'] === p.id);
  assert.strictEqual(aff.length, 2);
  assert.strictEqual(aff.filter(a => v3bool_(a['Current?'])).length, 1, 'one current affiliation');
  assert.ok(aff.some(a => a['Organization ID'] === 'G2' && !v3bool_(a['Current?']) && a['End date'] instanceof Date), 'old job kept as history');
  const m = v3objects_(V3.METHODS).filter(x => x['Person ID'] === p.id);
  assert.strictEqual(m.length, 3);
  assert.strictEqual(m.filter(x => x['Type'] === 'Email' && v3bool_(x['Primary?'])).length, 1, 'exactly one primary email');
  addContactMethod(p.id, 'Email', 'kofi@makersplace.org', 'Work', true);
  const m2 = v3objects_(V3.METHODS).filter(x => x['Person ID'] === p.id && x['Type'] === 'Email');
  assert.strictEqual(m2.filter(x => v3bool_(x['Primary?'])).length, 1, 'new primary replaces old primary');
  assert.strictEqual(v3objects_(V3.PEOPLE)[0]['Primary email'], 'kofi@makersplace.org');
  const withoutOrg = createPerson({ fullName: 'Independent Researcher' });
  assert.ok(withoutOrg.ok, 'contacts without an organization are allowed');
});

test('3. A linked resource appears on the correct record without changing sharing', () => {
  const r = addResource({ recordId: 'L01', url: 'https://docs.google.com/document/d/abc/edit', type: 'Proposal', description: 'Costed pilot offer' });
  assert.ok(r.ok, r.message);
  assert.strictEqual(resourcesFor('L01').length, 1); assert.strictEqual(resourcesFor('L02').length, 0);
  assert.strictEqual(resourcesFor('L01')[0].title, 'Google document file', 'readable title');
  assert.strictEqual(addResource({ recordId: 'L01', url: 'javascript:alert(1)' }).ok, false, 'unsafe protocol rejected');
  assert.strictEqual(addResource({ recordId: 'L01', url: 'http://example.org' }).ok, false, 'plain http rejected');
  assert.strictEqual(addResource({ recordId: 'L01', url: 'https://docs.google.com/document/d/abc/edit' }).duplicate, true, 'duplicate link warned');
  const up = uploadResourceFile({ recordId: 'O01', name: 'offer.pdf', data: Buffer.from('pdf').toString('base64'), type: 'Proposal' });
  assert.ok(up.ok, up.message);
  assert.strictEqual(resourcesFor('O01')[0].url, 'https://drive.google.com/file/d/F1/view');
  assert.strictEqual(v3objects_(V3.RES).filter(x => x['Drive file ID'] === 'F1').length, 1, 'file ID kept');
  assert.deepStrictEqual(W.sharing, [], 'no sharing calls on files or the spreadsheet');
});

test('4. An assignment creates one notification despite retries', () => {
  queueAssignment_('Vera', 'Leads', 2, ''); queueAssignment_('Vera', 'Leads', 2, ''); queueAssignment_('Vera', 'Leads', 2, '');
  const q = queue().filter(n => n['Event'] === 'LEAD_ASSIGNED' && n['Record ID'] === 'L01' && n['Recipient'] === 'Vera');
  assert.strictEqual(q.length, 1);
  assert.ok(/L01|Club owner/.test(q[0]['Record name'])); assert.strictEqual(q[0]['Owner'], 'Vera'); assert.ok(q[0]['Due']); assert.ok(q[0]['Link'].indexOf('#gid=') > 0);
  processNotificationQueue({ now: D('2026-09-29T12:00:00Z') }); processNotificationQueue({ now: D('2026-09-29T12:05:00Z') });
  assert.strictEqual(queue().filter(n => n['Event'] === 'LEAD_ASSIGNED').length, 1, 'processing twice does not duplicate');
});

test('5. Reminders follow the recipient\'s timezone and preferences', () => {
  const now = D('2026-09-29T14:00:00Z');  // 14:00 in Accra, 23:00 in Tokyo
  W.now = now;
  v3enqueue_('MENTION', { mentioned: ['Vera', 'Nana Adwoa'], recordId: 'L01', recordName: 'Club owner', recordType: 'Lead', reason: 'You were mentioned.', link: 'x' });
  processNotificationQueue({ now });
  const q = queue();
  assert.ok(/Delivered in-app/.test(q.find(n => n['Recipient'] === 'Vera')['Status']), 'Accra user gets it now');
  const nana = q.find(n => n['Recipient'] === 'Nana Adwoa');
  assert.strictEqual(nana['Status'], 'Held (quiet hours)', 'Tokyo user is in quiet hours');
  assert.strictEqual(nana['Next attempt'].toISOString(), D('2026-09-29T22:00:00Z').toISOString(), 'released at 07:00 Tokyo');
  processNotificationQueue({ now: D('2026-09-29T22:30:00Z') });
  assert.ok(/Delivered in-app/.test(queue().find(n => n['Recipient'] === 'Nana Adwoa')['Status']), 'delivered after quiet hours');
  // frequency preference: Deborah wants a daily digest
  W.sheets[V3.NP].getRange(3, 5).setValue('Daily digest');
  v3enqueue_('OPP_ASSIGNED', { assignee: 'Deborah', recordId: 'O01', recordName: 'GRAF pilot', recordType: 'Opportunity', reason: 'Assigned', link: 'x' });
  assert.strictEqual(queue().find(n => n['Recipient'] === 'Deborah')['Delivery'], 'Digest');
  // digest runs at the recipient's local digest hour (08:00 Accra = 08:00 UTC)
  assert.strictEqual(v3digest_(D('2026-09-30T07:00:00Z'), false), 0, 'not before digest hour');
  assert.ok(v3digest_(D('2026-09-30T08:00:00Z'), false) >= 1, 'digest at 08:00 local');
});

test('6. Completing a task prevents pending overdue reminders', () => {
  enableEmail(false);
  W.sheets[V3.NP].getRange(4, 7).setValue(0); W.sheets[V3.NP].getRange(4, 8).setValue(0); // Vera: no quiet hours
  const t = createTask({ title: 'Send costed offer', recordId: 'O01', owner: 'Vera', due: '2026-09-27' });
  const now = D('2026-09-29T12:00:00Z'); W.now = now;
  v3scan_(now);
  assert.ok(queue().some(n => n['Event'] === 'FOLLOWUP_OVERDUE' && n['Record ID'] === t.id), 'overdue reminder queued');
  const row = v3objects_(V3.TASKS).find(x => x['Task ID'] === t.id)._row;
  W.sheets[V3.TASKS].getRange(row, 6).setValue('Done'); onTaskCompleted_(t.id);
  const before = W.mail.length;
  processNotificationQueue({ now });
  assert.ok(queue().filter(n => n['Record ID'] === t.id && n['Event'] === 'FOLLOWUP_OVERDUE').every(n => /Cancelled/.test(n['Status'])));
  assert.strictEqual(W.mail.filter(m => /overdue/i.test(m.subject)).length, 0, 'no overdue email after completion');
  // even if cancellation were missed, re-validation blocks it
  v3sheet_(V3.NQ).getRange(queue().find(n => n['Event'] === 'FOLLOWUP_OVERDUE')._row, 19).setValue('Pending');
  processNotificationQueue({ now: D('2026-09-29T13:00:00Z') });
  assert.ok(/Cancelled/.test(queue().find(n => n['Event'] === 'FOLLOWUP_OVERDUE')['Status']));
});

test('7. Notification links open the correct record and still enforce access', () => {
  queueAssignment_('Deborah', 'Leads', 3, '');
  const n = queue().find(x => x['Record ID'] === 'L02');
  assert.strictEqual(n['Link'], 'https://docs.google.com/spreadsheets/d/TEST/edit#gid=' + W.sheets['Leads'].getSheetId() + '&range=A3');
  assert.ok(/access to the CRM/.test(n['Body']), 'email tells the reader access is required');
  assert.deepStrictEqual(W.sharing, [], 'notifications never grant access');
});

test('8. Dry-run mode sends no emails', () => {
  enableEmail(true);   // email switched on BUT dry run on
  W.sheets[V3.NP].getRange(4, 7).setValue(0); W.sheets[V3.NP].getRange(4, 8).setValue(0);
  queueAssignment_('Vera', 'Leads', 2, '');
  processNotificationQueue({ now: D('2026-09-29T12:00:00Z') });
  assert.strictEqual(W.mail.length, 0);
  assert.ok(/Email not sent \(email off\)/.test(queue()[0]['Status']));
  W.now = D('2026-09-29T12:00:00Z');
  const n = previewNotifications();
  assert.ok(n >= 1, 'preview lists messages and recipients'); assert.strictEqual(W.mail.length, 0, 'preview sends nothing');
  // positive control: dry run off → exactly one email to the confirmed internal recipient
  enableEmail(false); v3sheet_(V3.NQ).getRange(2, 19).setValue('Pending');
  processNotificationQueue({ now: D('2026-09-29T12:10:00Z') });
  assert.strictEqual(W.mail.length, 1); assert.strictEqual(W.mail[0].to, 'vera@nbc.test');
});

test('9. Disabling a notification rule prevents future deliveries under that rule', () => {
  const rulesRow = V3.rules.findIndex(r => r[1] === 'MENTION') + 2;
  W.sheets[V3.NR].getRange(rulesRow, 3).setValue(false);
  assert.strictEqual(queueMentions_('Leads', 2, 'Can @Vera check this?'), 0);
  assert.strictEqual(queue().length, 0);
  W.sheets[V3.NR].getRange(rulesRow, 3).setValue(true);
  assert.strictEqual(queueMentions_('Leads', 2, 'Can @Vera check this?'), 1, 're-enabling works');
});

test('10. External contacts receive no automated messages', () => {
  enableEmail(false);
  const p = createPerson({ fullName: 'External Partner', email: 'partner@external.org', orgId: 'G5' });
  linkPersonToRecord('L01', p.id);
  W.sheets['Leads'].getRange(2, 8).setValue('Qualified');
  W.now = D('2026-10-10T12:00:00Z'); hourlyTick();
  assert.strictEqual(W.mail.filter(m => /external\.org/.test(m.to)).length, 0);
  assert.strictEqual(v3emailAllowed_('partner@external.org'), 'not an internal user');
  // even a hand-edited queue row pointing at an external address is blocked
  v3append_(V3.NQ, { 'Notification ID': 'N99999', 'Event': 'MENTION', 'Recipient': 'Vera', 'Recipient email': 'partner@external.org', 'Channel': 'Email', 'Delivery': 'Immediate', 'Record ID': 'L01', 'Status': 'Pending', 'Subject': 's', 'Body': 'b' });
  processNotificationQueue({ now: D('2026-10-10T12:00:00Z') });
  assert.strictEqual(W.mail.filter(m => /external\.org/.test(m.to)).length, 0);
});

test('11. Emails never include interview notes or comment text', () => {
  enableEmail(false);
  W.sheets['Interviews'].getRange(2, 12).setValue('SECRET workaround detail');
  W.now = D('2026-09-29T12:00:00Z'); v3scan_(W.now);
  const nm = queue().find(n => n['Event'] === 'INTERVIEW_NOTES_MISSING');
  assert.ok(nm, 'missing notes reminder queued'); assert.strictEqual(nm['Record name'], 'I01 · Owner 1');
  queueMentions_('Leads', 2, '@Vera the price they quoted was 900 cedis');
  assert.ok(queue().every(n => !/SECRET|900 cedis/.test(n['Body'] + n['Subject'])));
});

test('12. Delivery failures retry up to the limit without breaking the CRM', () => {
  enableEmail(false); W.mailThrows = 5;
  W.sheets[V3.NP].getRange(4, 7).setValue(0); W.sheets[V3.NP].getRange(4, 8).setValue(0);
  queueAssignment_('Vera', 'Leads', 2, '');
  let t = D('2026-09-29T12:00:00Z').getTime();
  for (let i = 0; i < 5; i++) { processNotificationQueue({ now: new Date(t) }); t += 3600000; }
  const n = queue()[0];
  assert.strictEqual(n['Status'], 'Failed'); assert.strictEqual(Number(n['Attempts']), 3);
  assert.ok(v3objects_(V3.NL).filter(l => /Failed attempt/.test(l['Result'])).length === 3, 'each attempt logged');
});

results.forEach(r => console.log(r[0] + '  ' + r[1] + (r[2] ? '\n      ' + r[2] : '')));
const failed = results.filter(r => r[0] === 'FAIL').length;
console.log('\n' + (results.length - failed) + ' of ' + results.length + ' passed');
process.exit(failed ? 1 : 0);
