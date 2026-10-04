(function(){
var d=document,$=function(s,r){return(r||d).querySelector(s)},$$=function(s,r){return[].slice.call((r||d).querySelectorAll(s))};
var calm=d.documentElement.classList.contains('calm'),mob=function(){return innerWidth<760};
var cl=function(v,a,b){return v<a?a:v>b?b:v},ez=function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2},lp=function(a,b,t){return a+(b-a)*t};
var NS='http://www.w3.org/2000/svg';
var pre=$('#pre');function ready(){d.body.classList.add('ready');pre.classList.add('gone');setTimeout(function(){pre.remove()},1300)}
if(calm)ready();else{var t0=performance.now();(function s(t){var k=cl((t-t0)/1500,0,1);$('#pn').textContent=Math.round(ez(k)*100)+'%';$('#pbar').style.transform='scaleX('+ez(k)+')';if(k<1)requestAnimationFrame(s);else setTimeout(ready,250)})(t0)}
function el(t,a,p,x){var e=d.createElementNS(NS,t);for(var k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;if(p)p.appendChild(e);return e}
/* ---------- data (one source drives form, scoring, table) ---------- */
var FT=[["age","Age group",[["Under 30",0],["30 – 44",1],["45 – 59",2],["60 or above",3]],3],
["activity","Physical activity",[["Active (most days)",0],["Some activity (1–3 days a week)",1],["Little or none",2]],2],
["family","Family history of diabetes",[["None known",0],["Grandparent, aunt or uncle",1],["Parent or sibling",3]],3],
["bp","High blood pressure history",[["No",0],["Yes",2]],2],
["smoke","Smoking status",[["Never smoked",0],["Former smoker",1],["Current smoker",2]],2],
["diet","Sugary food or drinks",[["Rarely",0],["A few times a week",1],["Daily",2]],2]];
var MAXP=17;
var VIVA=[["What is AI?","Making machines do tasks that normally need human intelligence, like learning, reasoning and decision-making."],
["Why is this project AI?","It takes input data, analyses features and classifies the result: the basic prediction workflow of AI."],
["What is classification?","Putting data into predefined classes. Here: Lower, Moderate or Higher risk."],
["What features do you use?","Age group, BMI (from height and weight), physical activity, family history, blood pressure, smoking and sugary food."],
["How does the assessment work?","Each answer gives points, the points are added, and the total is compared with thresholds."],
["What is data preprocessing?","Cleaning and preparing data: range checks, BMI calculation and converting choices into numbers."],
["Is this machine learning?","No. It is rule-based. Machine learning would learn the rules from large datasets."],
["Why is it not a diagnosis?","Diagnosis needs blood tests by a doctor. We use a few self-reported answers and an unvalidated score."],
["What is a false positive?","The tool says higher risk but the person is actually fine."],
["What is a false negative?","The tool says lower risk but the person actually has a problem. It can delay care."],
["What are the limitations?","Few features, hand-made rules, no real training data, self-reported inputs, possible bias."],
["How did you handle privacy?","No identity questions, no server, no storage. The calculation runs in the browser."],
["What is responsible AI?","Using AI fairly, safely and transparently, protecting privacy and keeping humans in control."],
["How can it be improved?","Train a model on a proper public dataset, validate it with doctors and test it for fairness."]];
var EX=[["Problem statement","Many people have limited awareness about diabetes and its risk factors. This project shows how an AI-style classifier can use basic health and lifestyle features to give an educational risk category."],
["Objectives","Spread awareness, demonstrate AI concepts, classification and data processing, and promote responsible use of AI."],
["AI concept","Prediction and classification with a rule-based model on structured data. It is not machine learning."],
["Data / features","8 answers become 7 features: age, BMI, activity, family history, blood pressure, smoking, sugary food."],
["Data processing","Validate ranges, calculate BMI from height and weight, convert each choice to points."],
["Classification","Total 0–5 = Lower, 6–10 = Moderate, 11–17 = Higher educational risk."],
["Output","A risk category, a score out of 17 and the factors that added points."],
["Limitations","Simplified and not clinically validated. It cannot diagnose diabetes."],
["Responsible AI","Privacy by design, awareness of bias and errors, and a doctor always makes the final decision."],
["Future scope","Train on a public dataset, validate with doctors, test fairness and add more languages."]];
/* ---------- build content ---------- */
var links=[["home","Home"],["diabetes","Diabetes"],["risk","Risk Factors"],["ai","AI"],["assessment","Assessment"],["responsible","Responsible AI"],["sources","Sources"]];
$('#links').innerHTML=links.map(function(l){return'<a href="#'+l[0]+'">'+l[1]+'</a>'}).join('');
$('#vq').innerHTML=VIVA.map(function(v,i){return'<details><summary>'+(i+1)+'. '+v[0]+'</summary><p>'+v[1]+'</p></details>'}).join('');
$('#ex').innerHTML=EX.map(function(x,i){return'<div class="card rv" data-d="'+(i%3*40)+'"><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>'}).join('');
$('#stats').innerHTML=[[8,'inputs'],[7,'features'],[17,'max points'],[3,'risk classes']].map(function(s){return'<div class="card rv"><b data-count="'+s[0]+'">0</b>'+s[1]+'</div>'}).join('');
$('#tbl').innerHTML='<tr><th>Feature</th><th>Points</th><th>Max</th></tr>'+[['Age group',FT[0]]].concat([['Physical activity',FT[1]],['Family history',FT[2]],['High blood pressure',FT[3]],['Smoking',FT[4]],['Sugary food/drinks',FT[5]]]).map(function(r,i){var f=r[1];return'<tr><td>'+r[0]+'</td><td>'+f[2].map(function(o){return o[0]+' = '+o[1]}).join('; ')+'</td><td>'+f[3]+'</td></tr>'}).join('').replace('</tr><tr><td>Physical','</tr><tr><td>BMI</td><td>Below 23 = 0; 23–27.4 = 2; 27.5+ = 3</td><td>3</td></tr><tr><td>Physical');
function fld(id,l,o){return'<div><label for="'+id+'">'+l+'</label><select id="'+id+'"><option value="">Choose…</option>'+o.map(function(x){return'<option value="'+x[1]+'">'+x[0]+'</option>'}).join('')+'</select><div class="err" id="'+id+'Err"></div></div>'}
function num(id,l,ph){return'<div><label for="'+id+'">'+l+'</label><input id="'+id+'" type="number" inputmode="decimal" placeholder="'+ph+'"><div class="err" id="'+id+'Err"></div></div>'}
$('#fields').innerHTML=fld(FT[0][0],FT[0][1],FT[0][2])+num('height','Height (cm)','e.g. 165')+num('weight','Weight (kg)','e.g. 60')+FT.slice(1).map(function(f){return fld(f[0],f[1],f[2])}).join('');
$('#steps').innerHTML=['Collecting inputs…','Processing features…','Analysing patterns…','Generating educational result…'].map(function(s){return'<div class="stp"><span>◆</span>'+s+'</div>'}).join('');
/* vertical step-by-step diagrams (one builder drives every diagram) */
var FL={
diabetes:{e:'Understanding the basics',t:'What is diabetes?',b:'Diabetes changes how the body handles sugar. Follow the chain from food to energy.',art:'<svg class="orb art" viewBox="0 0 200 200" data-in=".04,.22" data-out=".94,1" aria-hidden="true"><path pathLength="1" d="M100 18C100 18 40 92 40 134a60 60 0 0 0 120 0C160 92 100 18 100 18Z"/><text x="100" y="140" style="font-size:16px;fill:#e6f0f5">glucose</text></svg>',s:[['Blood glucose','Sugar from food travels in the blood. It is the main fuel.'],['Insulin','A hormone from the pancreas that works like a key for cells.'],['Body cells','Cells need glucose. If insulin fails, glucose stays in the blood.'],['Energy','Glucose entering cells becomes energy for movement and thinking.']]},
types:{e:'Three main kinds',t:'Types of diabetes',b:'Each type has a different cause, but all affect blood glucose.',s:[['Type 1','Immune system damages insulin cells. Daily insulin is needed.','','<svg viewBox="0 0 60 60" fill="none" stroke="#2dd4bf" stroke-width="3" aria-hidden="true"><circle class="a1" cx="30" cy="30" r="22" stroke-dasharray="6 8"/><circle cx="30" cy="30" r="8"/></svg>'],['Type 2','Body resists insulin or makes too little. Most common type.','','<svg viewBox="0 0 60 60" fill="#2dd4bf" aria-hidden="true"><g class="a2"><rect x="10" y="12" width="10" height="38" rx="3"/><rect x="25" y="12" width="10" height="38" rx="3"/><rect x="40" y="12" width="10" height="38" rx="3"/></g></svg>'],['Gestational','High glucose first found in pregnancy. Usually goes after birth.','','<svg viewBox="0 0 60 60" fill="none" stroke="#2dd4bf" stroke-width="3" aria-hidden="true"><circle class="a3" cx="30" cy="30" r="16"/><circle cx="30" cy="30" r="25" stroke-opacity=".4"/></svg>']]},
risk:{e:'Features of the model',t:'What influences risk?',b:'Each factor adds points. All the points are added into one score.',s:[['Age','Risk rises with age.','up to 3 pts'],['BMI','Weight for height.','up to 3 pts'],['Physical activity','Less activity, higher risk.','up to 2 pts'],['Family history','Parent or sibling counts most.','up to 3 pts'],['Blood pressure','High blood pressure adds risk.','up to 2 pts'],['Lifestyle','Smoking and sugary food.','up to 4 pts'],['Risk score','All points added.','max 17','Σ']]},
ai:{e:'Input → Processing → Output',t:'How does AI help?',b:'Follow one answer sheet as it travels through the system.',s:[['USER DATA','The 8 answers typed by the user are the input.'],['PROCESSING','Values are checked and height and weight become BMI.'],['FEATURES','Each answer becomes points for 7 features.'],['CLASSIFICATION','The total score is compared with set thresholds.'],['RISK CATEGORY','Output: Lower, Moderate or Higher educational risk.']]},
responsible:{e:'Be careful',t:'AI has limits',b:'AI can assist decision-making. It should not replace qualified healthcare professionals.',s:[['Bias','Rules can suit some groups better than others.'],['False positives','Says higher risk when the person is fine. Causes worry.'],['False negatives','Says lower risk when there is a problem. Can delay care.'],['Privacy','Health data is sensitive. The assessment sends nothing to a server.'],['Human oversight','Only a doctor can diagnose. A prediction is never a diagnosis.']]},
privacy:{e:'Privacy by design',t:'Your data stays with you',b:'The risk assessment runs in your browser and sends nothing anywhere. Only chat messages can go to an AI service.',art:'<svg class="shield art" viewBox="0 0 100 110" data-in=".04,.22" data-out=".94,1" aria-hidden="true"><path pathLength="1" d="M50 6L90 22V54C90 78 72 96 50 104C28 96 10 78 10 54V22Z"/></svg>',s:[['INPUT','You type answers on this page.'],['PROCESS','Your browser calculates the score. No server is used.'],['RESULT','The category appears on your screen only.'],['DATA CLEARED','Nothing is saved. Answers vanish on Clear or refresh.']]}};
$$('[data-flow]').forEach(function(st){var f=FL[st.dataset.flow],n=f.s.length,step=.8/n,h='';
f.s.forEach(function(x,i){var a=.08+i*step,b=a+step*.8;
h+='<div class="vn pop" data-in="'+a.toFixed(3)+','+b.toFixed(3)+'" data-out=".94,1"><span class="ic">'+(x[3]||(i+1))+'</span><div><h3>'+x[0]+'</h3><p>'+x[1]+'</p></div>'+(x[2]?'<em>'+x[2]+'</em>':'')+'</div>';
if(i<n-1)h+='<div class="vc" data-in="'+(a+step*.55).toFixed(3)+','+(a+step*.98).toFixed(3)+'" data-out=".94,1"></div>'});
st.innerHTML='<div class="lt"><p class="eyebrow sc" data-in="0,.06" data-out=".94,1">'+f.e+'</p><h2 class="wds" data-in="0,.1" data-out=".94,1">'+f.t+'</h2><p class="sc bl" data-in=".03,.13" data-out=".94,1">'+f.b+'</p>'+(f.art||'')+'</div><div class="vf"><i class="pk"></i>'+h+'</div>'});
$$('.wds').forEach(function(e){var w=e.textContent.trim().split(/\s+/);e.setAttribute('aria-label',e.textContent.trim());e.innerHTML=w.map(function(x,i){return'<span class="wd" aria-hidden="true" style="--i:'+i+';--n:'+w.length+'">'+x+'</span>'}).join(' ')});
$$('.tf').forEach(function(e){var w=e.textContent.trim().split(/\s+/);e.setAttribute('aria-label',e.textContent.trim());e.innerHTML=w.map(function(x,i){return'<span class="w" aria-hidden="true" style="--i:'+i+';--n:'+w.length+'">'+x+'</span>'}).join(' ')});
/* ---------- engine ---------- */
var scenes=$$('.scene').map(function(s){s.style.setProperty('--h',s.dataset.h);return{el:s,items:[],p:0,lp:-1,top:0,hh:0}});
scenes.forEach(function(s){var vf=$('.vf',s.el);if(!vf)return;var pk=$('.pk',vf);s.fn=function(p){var b=cl((p-.08)/.82,0,1);pk.style.opacity=b>.01&&b<.99?1:0;pk.style.transform='translateY('+(b*(vf.offsetHeight-14)).toFixed(1)+'px)'}});
scenes.forEach(function(s){s.items=$$('[data-in],[data-out]',s.el).map(function(e){var A=e.getAttribute('data-in'),B=e.getAttribute('data-out');return{e:e,a:A&&A.split(',').map(Number),o:B&&B.split(',').map(Number),ce:-1,cx:-1,pop:e.classList.contains('pop')}})});
var rvs=$$('.rv').map(function(e){return{e:e,d:+e.dataset.d||0,off:0,ce:-1}}),bgs=$$('[data-bg]').map(function(e){var h=e.dataset.bg;return{e:e,c:[1,3,5].map(function(i){return parseInt(h.substr(i,2),16)}),top:0}});
var navT=links.map(function(l){return{id:l[0],e:$('#'+l[0]),a:$('#links a[href="#'+l[0]+'"]'),top:0,pin:0}});
var mqs=$$('.mq').map(function(m,i){var u='<span>'+m.dataset.t+'</span>',x=u+u+u;m.firstChild.innerHTML=x+x;return{t:m.firstChild,x:0,h:1,dir:i%2?1:-1,sk:0}}),py=0,vel=0;
var vh=innerHeight,cur=scrollY,tar=cur,smooth=!calm&&matchMedia('(pointer:fine)').matches,S={hero:0,g:0},lastY=-1;
function mx(){return Math.max(0,d.documentElement.scrollHeight-innerHeight)}
function measure(){vh=innerHeight;scenes.forEach(function(s){s.top=s.el.getBoundingClientRect().top+scrollY;s.hh=s.el.offsetHeight});
bgs.forEach(function(b){b.top=b.e.getBoundingClientRect().top+scrollY});rvs.forEach(function(r){r.off=r.e.getBoundingClientRect().top+scrollY});
mqs.forEach(function(m){m.h=m.t.scrollWidth/2});navT.forEach(function(n){var s=scenes.filter(function(x){return x.el===n.e})[0];n.top=n.e.getBoundingClientRect().top+scrollY;n.pin=s?s.hh-vh:0});lastY=-1}
function goTo(y){y=cl(y,0,mx());if(smooth)tar=y;else scrollTo({top:y,behavior:calm?'auto':'smooth'})}
$$('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var n=navT.filter(function(x){return'#'+x.id===a.getAttribute('href')})[0],t=a.getAttribute('href').slice(1);
if(!n){var o=$('#'+t);if(!o)return;n={top:o.getBoundingClientRect().top+scrollY,pin:0}}e.preventDefault();goTo(n.id==='home'?0:n.top+(n.pin?n.pin*.05:-10))})});
if(smooth)addEventListener('wheel',function(e){if(e.ctrlKey||d.body.classList.contains('vo')||(e.target.closest&&e.target.closest('select,.vp,.cb-panel')))return;e.preventDefault();var k=e.deltaMode===1?16:e.deltaMode===2?innerHeight:1;tar=cl(tar+e.deltaY*k,0,mx())},{passive:false});
function bk(t){return 1+2.70158*Math.pow(t-1,3)+1.70158*Math.pow(t-1,2)}
function apply(s){var p=s.p;s.items.forEach(function(it){var E=it.a?(it.pop?bk(cl((p-it.a[0])/(it.a[1]-it.a[0]),0,1)):ez(cl((p-it.a[0])/(it.a[1]-it.a[0]),0,1))):1,X=it.o?ez(cl((p-it.o[0])/(it.o[1]-it.o[0]),0,1)):0;
if(E!==it.ce){it.e.style.setProperty('--e',E.toFixed(3));it.ce=E}if(X!==it.cx){it.e.style.setProperty('--x',X.toFixed(3));it.cx=X}});if(s.fn)s.fn(p)}
/* background particles */
var cv=$('#bg'),cx=cv.getContext('2d'),W=1,H=1,dpr=1,P=[];
function size(){dpr=Math.min(devicePixelRatio||1,2);W=cv.width=innerWidth*dpr;H=cv.height=innerHeight*dpr;var n=mob()?34:70,cols=Math.ceil(Math.sqrt(n*innerWidth/innerHeight)),rows=Math.ceil(n/cols);P=[];
for(var i=0;i<n;i++)P.push({a:Math.random()*6.283,r:.15+Math.random()*.85,ph:Math.random()*6.283,gx:((i%cols)+.5)/cols,gy:(Math.floor(i/cols)+.5)/rows})}
function draw(t){cx.clearRect(0,0,W,H);var h=S.hero,m=ez(cl(h*1.3-.25,0,1)),settle=cl((S.g-.93)/.07,0,1),dr=calm?0:1-settle*.85,R=Math.min(W,H)*.42,c=[W/2,H/2],q=[];
cx.strokeStyle='rgba(45,212,191,'+(.05*(1-h))+')';cx.lineWidth=1;var gs=60*dpr;for(var x=0;x<W;x+=gs){cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke()}for(var y=0;y<H;y+=gs){cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke()}
var gr=cx.createRadialGradient(c[0],c[1],0,c[0],c[1],(120+h*520)*dpr);gr.addColorStop(0,'rgba(45,212,191,'+(.32*(1-h*.7))+')');gr.addColorStop(1,'rgba(45,212,191,0)');cx.fillStyle=gr;cx.fillRect(0,0,W,H);
P.forEach(function(p){var rr=p.r*R*(1+h*1.1),ox=c[0]+Math.cos(p.a)*rr,oy=c[1]+Math.sin(p.a)*rr*.8,gx=p.gx*W,gy=p.gy*H,sx=lp(ox,gx,m)+Math.sin(t/1700+p.ph)*14*dpr*dr,sy=lp(oy,gy,m)+Math.cos(t/1900+p.ph)*14*dpr*dr;q.push([sx,sy])});
var L=130*dpr;for(var i=0;i<q.length;i++){for(var j=i+1;j<q.length;j++){var dx=q[i][0]-q[j][0],dy=q[i][1]-q[j][1],dd=Math.sqrt(dx*dx+dy*dy);if(dd<L){cx.strokeStyle='rgba(45,212,191,'+((1-dd/L)*.28*(1-settle*.5))+')';cx.beginPath();cx.moveTo(q[i][0],q[i][1]);cx.lineTo(q[j][0],q[j][1]);cx.stroke()}}}
cx.fillStyle='rgba(120,235,220,.8)';q.forEach(function(p){cx.beginPath();cx.arc(p[0],p[1],1.7*dpr,0,6.283);cx.fill()})}
var fn=$('#fn');
function frame(t){var y=scrollY;
if(smooth){if(Math.abs(y-cur)>3){cur=tar=y}cur+=(tar-cur)*.11;if(Math.abs(tar-cur)<.4)cur=tar;if(Math.abs(cur-y)>.3)scrollTo(0,cur);y=cur}else cur=y;
if(!calm&&(y!==lastY||scenes.some(function(s){return Math.abs(s.p-s.tp)>.0006}))){
 scenes.forEach(function(s){var raw=cl((y-s.top)/Math.max(1,s.hh-vh),0,1),near=y>s.top-vh*1.3&&y<s.top+s.hh+vh*.3;s.tp=raw;
  if(!near)s.p=raw;else{s.p+=(raw-s.p)*.14;if(Math.abs(s.p-raw)<.0006)s.p=raw}
  if(Math.abs(s.p-s.lp)>.0004||s.lp<0){apply(s);s.lp=s.p}});
 rvs.forEach(function(r){var E=ez(cl((vh*.98-(r.off-y)-r.d)/(vh*.45),0,1));if(Math.abs(E-r.ce)>.002){r.e.style.setProperty('--e',E.toFixed(3));r.ce=E;var c=$('[data-count]',r.e);if(c)c.textContent=Math.round(E*c.dataset.count)}});
 S.hero=scenes[0].p;lastY=y}
S.g=mx()?y/mx():0;
var m=y+vh*.5,i=0;bgs.forEach(function(b,k){if(b.top<=m)i=k});var c1=bgs[i].c,c0=i?bgs[i-1].c:c1,k=ez(cl((m-bgs[i].top)/(vh*.7),0,1)),col=c1.map(function(v,j){return Math.round(lp(c0[j],v,k))});d.body.style.backgroundColor='rgb('+col+')';
fn.classList.toggle('on',y>60);var cu=null;navT.forEach(function(n){if(n.top<=y+vh*.4)cu=n});navT.forEach(function(n){var on=n===cu;n.a.classList.toggle('cur',on);if(on)n.a.setAttribute('aria-current','true');else n.a.removeAttribute('aria-current')});
vel+=((y-py)-vel)*.12;py=y;if(!calm)mqs.forEach(function(m){m.x+=m.dir*(.7+Math.min(Math.abs(vel),70)*.3);m.x%=m.h;if(m.x>0)m.x-=m.h;m.sk+=(cl(-vel*.18,-9,9)-m.sk)*.1;m.t.style.transform='translate3d('+m.x+'px,0,0) skewX('+m.sk.toFixed(2)+'deg)'});
draw(t);requestAnimationFrame(frame)}
function init(){size();measure();if(calm){rvs.forEach(function(r){r.e.style.setProperty('--e',1);var c=$('[data-count]',r.e);if(c)c.textContent=c.dataset.count})}requestAnimationFrame(frame)}
addEventListener('resize',function(){size();measure()});if(window.ResizeObserver)new ResizeObserver(measure).observe(d.body);addEventListener('load',measure);init();
/* ---------- assessment ---------- */
var form=$('#rform'),fm=$('#fm'),an=$('#an'),res=$('#res');
function show(e){e.hidden=false;void e.offsetWidth;e.classList.add('in')}
function hide(e,cb){e.classList.remove('in');setTimeout(function(){e.hidden=true;if(cb)cb()},calm?0:550)}
function count(e,to,ms){if(calm){e.textContent=to;return}var t0=performance.now();(function s(t){var k=cl((t-t0)/ms,0,1);e.textContent=Math.round(ez(k)*to);if(k<1)requestAnimationFrame(s)})(t0)}
form.addEventListener('submit',function(ev){ev.preventDefault();var ok=1,h=parseFloat($('#height').value),w=parseFloat($('#weight').value);
function er(i,m){$('#'+i+'Err').textContent=m;if(m)ok=0}
er('height',h>=100&&h<=230?'':'Enter height between 100 and 230 cm.');er('weight',w>=20&&w<=250?'':'Enter weight between 20 and 250 kg.');
FT.forEach(function(f){er(f[0],$('#'+f[0]).value===''?'Please choose an option.':'')});
if(!ok){var x=$('.err:not(:empty)',form);if(x)x.previousElementSibling.focus();return}
var b=w/Math.pow(h/100,2),bp=b<23?0:b<27.5?2:3,rows=FT.map(function(f){return[f[1],+$('#'+f[0]).value,f[3]]});rows.splice(1,0,['BMI '+b.toFixed(1),bp,3]);
var sc=rows.reduce(function(s,r){return s+r[1]},0),cat=sc<=5?['Lower Risk','lower','#15803d']:sc<=10?['Moderate Risk','moderate','#f59e0b']:['Higher Risk','higher','#ef4444'],
msg={lower:'Your responses indicate a lower educational risk category. Keep up healthy habits.',moderate:'Your responses indicate a moderate educational risk category. Small lifestyle changes can help, and a routine check-up is a good idea.',higher:'Your responses indicate a higher educational risk category. This does not mean that you have diabetes. Consider talking to a qualified doctor, who can do proper blood tests.'}[cat[1]];
var why=rows.filter(function(r){return r[1]>0}).map(function(r,i){return'<li class="fi2" style="transition-delay:'+(.9+i*.2)+'s">✓ '+r[0]+' <b>+'+r[1]+'</b></li>'}).join('')||'<li class="fi2">No risk-increasing factors were selected.</li>';
goTo($('#assessment').getBoundingClientRect().top+scrollY-10);
hide(fm,function(){show(an);var st=$$('.stp',an),pb=$('#pbi');st.forEach(function(s){s.classList.remove('on')});pb.style.width='0';
 st.forEach(function(s,i){setTimeout(function(){s.classList.add('on');pb.style.width=((i+1)*25)+'%'},calm?0:i*750)});
 setTimeout(function(){hide(an,function(){
  res.innerHTML='<div class="rs"><div><svg viewBox="0 0 160 160" role="img" aria-label="Score '+sc+' out of '+MAXP+'"><circle class="rb" cx="80" cy="80" r="70"/><circle class="rg" id="ring" cx="80" cy="80" r="70" stroke="'+cat[2]+'" transform="rotate(-90 80 80)"/><text id="num" x="80" y="88" style="font-size:42px;font-weight:800">0</text><text x="80" y="112" class="s">out of '+MAXP+'</text></svg></div><div><span class="badge '+cat[1]+'">'+cat[0]+'</span><p style="color:#e6f0f5">'+msg+'</p><h3>Factors that added points</h3><ul class="ck">'+why+'</ul></div></div>'+
  '<h3 style="margin-top:14px">Healthy-lifestyle tips</h3><p>Be active (about 150 minutes of moderate activity a week is commonly advised for adults), choose whole grains, vegetables and pulses, limit sugary drinks, keep a healthy weight, avoid tobacco and have regular check-ups.</p><p class="note">Educational risk assessment only. This is a simplified model, not a clinically validated test and not a diagnosis. Only a doctor can diagnose diabetes using blood tests.</p><button class="btn ghost" id="again" type="button">Try again</button>';
  show(res);setTimeout(function(){$('#ring').style.strokeDashoffset=440*(1-sc/MAXP);count($('#num'),sc,1400);$$('.fi2',res).forEach(function(l){l.classList.add('in')})},calm?0:200);
  $('#again').onclick=function(){hide(res,function(){form.reset();show(fm)})};})},calm?100:3300)})});
form.addEventListener('reset',function(){$$('.err',form).forEach(function(e){e.textContent=''})});
/* ---------- viva ---------- */
var vb=$('#vbtn'),vx=$('#vx');
function vopen(o){d.body.classList.toggle('vo',o);if(o)setTimeout(function(){vx.focus()},50);else vb.focus()}
vb.onclick=function(){vopen(1)};vx.onclick=function(){vopen(0)};$('#vm').onclick=function(){vopen(0)};
d.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.body.classList.contains('vo'))vopen(0)});
})();
