// In-memory Google Sheets fake that really stores values (formulas are stored, not evaluated).
const fs = require('fs');
function colNum(s){let n=0;for(const ch of s)n=n*26+ch.charCodeAt(0)-64;return n;}
function parseA1(a1){const m=a1.match(/^([A-Z]+)(\d+)?(?::([A-Z]+)(\d+)?)?$/);if(!m)throw new Error('bad a1 '+a1);
  const c1=colNum(m[1]),r1=m[2]?+m[2]:1,c2=m[3]?colNum(m[3]):c1,r2=m[4]?+m[4]:(m[3]?5000:r1);return [r1,c1,r2-r1+1,c2-c1+1];}
function makeWorld(){
  const W={sheets:{},named:{},props:{},mail:[],sharing:[],mailThrows:0,activeEmail:'sam@nbc.test',now:null,alerts:[],nextId:1};
  function chainNoop(ret){return new Proxy(function(){},{get(t,p){if(p==='then')return undefined;return (...a)=>ret||chainNoop(ret);}});}
  function Sheet(name){this.name=name;this.id=W.nextId++;this.grid=[];}
  Sheet.prototype={
    getName(){return this.name},getSheetId(){return this.id},getMaxRows(){return 5000},
    getLastRow(){for(let r=this.grid.length-1;r>=0;r--){if((this.grid[r]||[]).some(v=>v!==''&&v!==null&&v!==undefined))return r+1;}return 0},
    getLastColumn(){let m=0;this.grid.forEach(r=>{(r||[]).forEach((v,i)=>{if(v!==''&&v!==null&&v!==undefined)m=Math.max(m,i+1)})});return m},
    insertRowAfter(r){this.grid.splice(r,0,[]);},
    getRange(a,b,c,d){let r,cc,nr,nc;if(typeof a==='string')[r,cc,nr,nc]=parseA1(a);else{r=a;cc=b;nr=c||1;nc=d||1;}return new Range(this,r,cc,nr,nc);},
    getActiveRange(){return new Range(this,W.activeRow||2,1,1,1)},
    setActiveRange(){},clear(){this.grid=[];},hideSheet(){},setTabColor(){},setFrozenRows(){},setFrozenColumns(){},setColumnWidth(){},setRowHeight(){},
    getFilter(){return {}},protect(){return chainNoop()},getProtections(){return []},setConditionalFormatRules(){},getCharts(){return []},
  };
  function Range(sh,r,c,nr,nc){this.sh=sh;this.r=r;this.c=c;this.nr=nr;this.nc=nc;}
  Range.prototype={
    getValues(){const out=[];for(let i=0;i<this.nr;i++){const row=[];for(let j=0;j<this.nc;j++){const v=((this.sh.grid[this.r-1+i]||[])[this.c-1+j]);row.push(v===undefined||v===null?'':v);}out.push(row);}return out;},
    getDisplayValues(){return this.getValues().map(r=>r.map(String))},
    getValue(){return this.getValues()[0][0]},
    setValues(v){v.forEach((row,i)=>row.forEach((x,j)=>{const g=this.sh.grid;while(g.length<this.r+i)g.push([]);g[this.r-1+i]=g[this.r-1+i]||[];g[this.r-1+i][this.c-1+j]=x;}));return this;},
    setValue(x){return this.setValues([[x]]);},setFormula(f){return this.setValue(f)},setFormulas(f){return this.setValues(f)},
    getRow(){return this.r},getColumn(){return this.c},getNumRows(){return this.nr},getNumColumns(){return this.nc},getSheet(){return this.sh},
    setNumberFormat(){return this},setFontWeight(){return this},setFontColor(){return this},setBackground(){return this},setWrap(){return this},setDataValidation(){return this},
    setVerticalAlignment(){return this},setHorizontalAlignment(){return this},setFontSize(){return this},protect(){return chainNoop()},createFilter(){return this}
  };
  const ss={
    getSheetByName(n){return W.sheets[n]||null},insertSheet(n){return W.sheets[n]=new Sheet(n)},getUrl(){return 'https://docs.google.com/spreadsheets/d/TEST/edit'},
    getRangeByName(n){const x=W.named[n];return x?W.sheets[x[0]].getRange(x[1],x[2]):null},setNamedRange(n,rg){W.named[n]=[rg.sh.name,rg.r,rg.c]},
    getSpreadsheetTimeZone(){return 'Africa/Accra'},getOwner(){return {getEmail:()=> 'sam@nbc.test'}},
    addViewer(e){W.sharing.push(['ss.addViewer',e])},addEditor(e){W.sharing.push(['ss.addEditor',e])},toast(){},setActiveSheet(){},
  };
  global.SpreadsheetApp={getActiveSpreadsheet:()=>ss,getActiveSheet:()=>W.activeSheet||W.sheets['Leads'],newDataValidation:()=>chainNoop(),newConditionalFormatRule:()=>chainNoop(),
    getUi:()=>({alert:(...a)=>{W.alerts.push(a);return 'YES'},ButtonSet:{YES_NO:1,OK_CANCEL:2},Button:{YES:'YES',OK:'OK'},showSidebar(){}}),ProtectionType:{RANGE:1,SHEET:2}};
  global.MailApp={sendEmail(o){if(W.mailThrows>0){W.mailThrows--;throw new Error('Service invoked too many times');}W.mail.push(o)},getRemainingDailyQuota:()=>100};
  global.LockService={getDocumentLock:()=>({waitLock(){},tryLock:()=>true,releaseLock(){}})};
  global.PropertiesService={getDocumentProperties:()=>({getProperty:k=>W.props[k]===undefined?null:W.props[k],setProperty:(k,v)=>{W.props[k]=String(v)}})};
  global.Session={getActiveUser:()=>({getEmail:()=>W.activeEmail}),getEffectiveUser:()=>({getEmail:()=> 'sam@nbc.test'})};
  global.ScriptApp={getProjectTriggers:()=>[],newTrigger:()=>chainNoop(),deleteTrigger(){},WeekDay:{TUESDAY:'TUESDAY'}};
  global.HtmlService={createHtmlOutput:()=>chainNoop()};
  const file={getUrl:()=> 'https://drive.google.com/file/d/F1/view',getId:()=> 'F1',getName:()=> 'offer.pdf',setSharing(){W.sharing.push(['file.setSharing'])},addViewer(){W.sharing.push(['file.addViewer'])},addEditor(){W.sharing.push(['file.addEditor'])}};
  global.DriveApp={getFolderById:()=>({createFile:()=>file}),getFileById:()=>file};
  global.Utilities={
    formatDate(d,tz,f){d=new Date(d);const p={};new Intl.DateTimeFormat('en-GB',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23',weekday:'long'}).formatToParts(d).forEach(x=>p[x.type]=x.value);
      const mon=new Intl.DateTimeFormat('en-GB',{timeZone:tz,month:'short'}).format(d);
      return f.replace(/yyyy|MMM|MM|dd|d|HH|H|mm|EEEE|EEE|ww/g,t=>({yyyy:p.year,MMM:mon,MM:p.month,dd:p.day,d:String(+p.day),HH:p.hour,H:String(+p.hour),mm:p.minute,EEEE:p.weekday,EEE:p.weekday.slice(0,3),ww:'40'})[t]);},
    base64Encode:s=>Buffer.from(String(s)).toString('base64'),base64Decode:s=>Buffer.from(s,'base64'),newBlob:()=>({})};
  return W;
}
module.exports={makeWorld};
