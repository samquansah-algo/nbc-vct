const {chromium}=require('playwright');const {spawn}=require('child_process');
const [,,mode,w,h,out]=process.argv;const W=+w,H=+h,FPS=60,DSF=2;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:DSF});
await p.goto(`file://${process.cwd()}/brandfilm.html?w=${W}&h=${H}&mode=${mode}`);await p.waitForTimeout(1500);
const dur=await p.evaluate(()=>window.DUR);
const ff=spawn(process.env.FF,['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','png','-i','-','-c:v','libx264','-pix_fmt','yuv420p','-profile:v','high','-level','5.2','-crf','12','-preset','slow','-tune','animation','-movflags','+faststart',out]);
const N=Math.round(dur*FPS);for(let i=0;i<N;i++){await p.evaluate(t=>render(t),i/FPS);const buf=await p.screenshot({type:'png'});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));if(i%600===0)console.log(out,i,'/',N)}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('ok',out)})();
