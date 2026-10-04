(function(){
var calm=matchMedia('(prefers-reduced-motion: reduce)').matches;
var STOP={};'a an the is are was what how do does did of in on for to and or my me i you your it this that can be about tell with please who why when where which should would could there their them they we us am will just also very really'.split(' ').forEach(function(w){STOP[w]=1});
var ASK='index.html#assessment';
/* [keywords ("!" = strong), answer, optional link]. Order matters: first best match wins ties. */
var I=[
['greet',['hi','hello','hey','namaste','morning','evening'],'Hello! Ask me about diabetes basics, symptoms, risk factors, prevention, or how this project and its risk score work.'],
['thanks',['thank','thanks','bye','goodbye','ok'],'You are welcome! Remember: this website is educational. For health concerns, please talk to a doctor.'],
['help',['!help','!option','!topic','!menu'],'I can explain: what diabetes is, the types, symptoms, risk factors, prevention, blood sugar ranges, how the risk score works, the AI used here, privacy, bias and errors, the sources, the team and viva preparation.'],
['type1',['!typeone','autoimmune','juvenile'],'Type 1: the immune system damages the cells that make insulin, so the body makes little or no insulin. It often starts in children and young adults and needs daily insulin treatment from a doctor.'],
['type2',['!typetwo'],'Type 2: the body does not use insulin well or does not make enough. It is the most common type and is linked to weight, inactivity, age and family history. It often develops slowly.'],
['gest',['!gestational','!pregnan'],'Gestational diabetes is high blood glucose first found during pregnancy. It usually goes away after birth but raises the mother\'s later risk of Type 2 diabetes. Pregnant women should follow their doctor\'s advice.'],
['types',['!type','kind'],'There are three main kinds: Type 1 (little or no insulin), Type 2 (insulin does not work well or is not enough) and gestational (found during pregnancy).','about.html|Read more on the About page'],
['symptoms',['!symptom','!sign','thirst','urinat','tired','blurred','hungry'],'Common symptoms include frequent urination, increased thirst and hunger, tiredness, blurred vision, slow-healing wounds and unexplained weight loss. Some people, especially with Type 2, have no early symptoms, so check-ups matter. Only a doctor can tell what is causing symptoms.','about.html|About diabetes'],
['factors',['!factor','!cause','genetic','family','heredit','obes','overweight','bmi','age'],'Known risk factors for Type 2 diabetes include overweight or obesity, physical inactivity, family history, increasing age, high blood pressure and a history of gestational diabetes.'],
['prevent',['!prevent','!diet','!exercise','!eat','!food','!lifestyle','!healthy','!precaution','!avoid','!tip','activity','weight','walk','sleep'],'Lifestyle changes can prevent or delay Type 2 diabetes: stay active, eat vegetables, fruit, whole grains and pulses, limit sugary drinks and sweets, keep a healthy weight, avoid tobacco and have regular check-ups.','precautions.html|See the Precautions page'],
['sugar',['!level','!range','!normal','!reading','!mg'],'Health organisations commonly use fasting blood glucose: below 100 mg/dL is typical, 100–125 is the prediabetes range and 126 or above is in the diabetes range (confirmed by repeat tests). Only a doctor can interpret your results.'],
['dx',['!diagnos','!test','detect','hba1c','!a1c','screening','confirm'],'This website cannot diagnose diabetes. Doctors use blood tests such as fasting glucose or HbA1c. If you are worried, please see a qualified doctor.'],
['medicine',['!medicin','!dose','!dosage','!tablet','!drug','!treatment','!cure','!metformin','!pill','!inject','!therapy','!prescri'],'I cannot give medicine, insulin or treatment advice. Treatment must be decided by a doctor who knows your health. Never start, stop or change medicines on your own.'],
['score',['!assessment','!score','!calculat','!point','!threshold','!classif','risk','category','categories'],'Seven features (age group, BMI, physical activity, family history, blood pressure, smoking and sugary food) each give points. The points are added (maximum 17): 0–5 Lower, 6–10 Moderate, 11–17 Higher educational risk. It is a simplified rule-based model, not a medical test.',ASK+'|Try the risk assessment'],
['privacy',['!privacy','!private','!store','!safe','!secure','!personal','!server','!collect','!save'],'The risk assessment asks no name, phone or email. Its answers are calculated in your browser, sent nowhere and not saved; they disappear when you press Clear or refresh. Chat is different: in AI mode your chat messages go to an AI service, so never type personal details here.'],
['features',['!feature','!input','!attribute','!preprocess','!variable','data'],'Input data: 8 answers (age group, height, weight, activity, family history, blood pressure, smoking, sugary food). Preprocessing checks the ranges and turns height and weight into BMI. Each answer then becomes points (a feature).','index.html#ai|See the AI flow'],
['ai',['!machine','!ml','!ai','!artificial','!algorithm','!rule','!model','!chatbot','!nlp','!intellig'],'The risk score is simple rule-based AI, not machine learning. This chatbot is rule-based too: it splits your message into words, removes common words, matches keywords to topics and gives a prepared answer. It is not like ChatGPT and it can be wrong.','index.html#ai|How the AI works'],
['errors',['!positive','!negative','!error','!mistake','!wrong','!accura','!reliab'],'False positive: the tool says higher risk but the person is fine (worry, extra tests). False negative: it says lower risk but the person has a problem (delayed care, the more dangerous mistake).'],
['bias',['!bias','!fair','!unfair'],'Bias means results can be unfair to some groups. For example BMI cut-offs and risk differ between populations, so a simple rule may suit some people less well.'],
['limits',['!limit','!limitation','!drawback','!weak'],'Limitations: only a few features, hand-made rules, no real patient data, self-reported answers, possible bias, and no clinical validation. It cannot diagnose diabetes.'],
['resp',['!responsible','!ethic','!oversight','!replace','!doctor','!human','!trust'],'Responsible AI means fair, safe and transparent use, protecting privacy and keeping humans in control. AI can assist decisions but should not replace qualified healthcare professionals. Only a doctor can diagnose.'],
['sources',['!source','!reference','!cdc','!niddk','!organi','!credit'],'Health information comes from WHO, CDC and NIDDK. The scoring system is this project\'s own simplified logic.','index.html#sources|See the sources'],
['team',['!team','!made','!built','!creator','!develop','!member','!rishabh','!avikshit','!sunny','!mudit','!arjun','!student','!role'],'Rishabh Mourya built the website (Coding). Avikshit Garg is Head of Project, Sunny is Video Editor, Mudit is Process Documentation Lead and Arjun Goswami did the Cookbook compilation.','team.html|Meet the team'],
['viva',['!viva','!question','!teacher','!exam','!cbse','!class','!curriculum','!syllabus','!project','!objective'],'For viva practice open the Project & Viva page, or tap VIVA MODE on the home page for 14 short questions and answers.','project.html|Project & Viva'],
['whatis',['!diabet','sugar','glucose','insulin','mean','definition','explain'],'Diabetes is a long-term condition in which the body cannot control blood glucose (sugar) properly because it makes too little insulin or cannot use it well. Over many years high glucose can damage the heart, kidneys, eyes and nerves.','about.html|About diabetes']];
function norm(s){return s.toLowerCase().replace(/lower (my|the|your) (chance|risk)/g,'reduce risk').replace(/high(?!er)\s*-?\s*risk/g,'higher risk').replace(/\b(i|you) get\b/g,'$1 receive').replace(/\b(pee|peeing)\b/g,'urination').replace(/\bchances?\b/g,'risk').replace(/\binfo\b/g,'information').replace(/\b(give|share|put)\b/g,'enter').replace(/type\s*(1|one|i)\b/g,' typeone ').replace(/type\s*(2|two|ii)\b/g,' typetwo ').replace(/[^a-z0-9\s]/g,' ')}
function stem(w){return w.length>4?w.replace(/(ing|es|s|ed)$/,'').replace(/e$/,''):w}
function toks(s){return norm(s).split(/\s+/).filter(function(w){return w&&!STOP[w]}).map(stem)}
I.forEach(function(x){x.k=x[1].map(function(k){var st=k.charAt(0)==='!';k=stem(k.replace('!',''));return[k,st?3:1]})});
function match(t,k){return t===k||(k.length>=4&&t.indexOf(k)===0)||(t.length>=4&&k.indexOf(t)===0)}
function safe(q){var raw=q.toLowerCase();
if(/suicid|kill myself|self.?harm|hurt myself/.test(raw))return{t:'I am sorry you are feeling this way. Please talk to a trusted adult right now, or call your local emergency number or a helpline (in India, Tele-MANAS: 14416). You deserve support.'};
if(/faint|unconscious|confus|seizure|vomit|trouble breathing|can.?t breathe|chest pain|emergency|very sick/.test(raw))return{t:'These can be warning signs that need urgent care. Please contact a doctor or emergency services right away, or ask an adult nearby for help. I cannot assess emergencies.'};
return null}
function dx(q){return /do i have|am i diabetic|have i got|i have diabetes|my sugar is/.test(q.toLowerCase())?{t:'I cannot tell whether you have diabetes. Only a doctor can, using blood tests. You can try the educational risk assessment, but it is not a diagnosis.',l:[ASK,'Try the risk assessment']}:null}
function uniq(a){return a.filter(function(v,i){return a.indexOf(v)===i})}
var FQ=(window.FAQ||[]).map(function(x){return{q:x[0],a:x[1],qt:uniq(toks(x[0])),at:uniq(toks(x[1]))}}),DF={};
FQ.forEach(function(f){uniq(f.qt.concat(f.at)).forEach(function(t){DF[t]=(DF[t]||0)+1})});
function idf(t){return Math.log(1+FQ.length/(1+(DF[t]||0)))}
function faq(q){var qt=uniq(toks(q));if(!qt.length||!FQ.length)return null;var best=null,bs=0;
FQ.forEach(function(f){var inter=0,ans=0,tot=0,un=0;qt.forEach(function(t){var w=idf(t);tot+=w;if(f.qt.indexOf(t)>-1)inter+=w;else if(f.at.indexOf(t)>-1)ans+=w});
f.qt.forEach(function(t){if(qt.indexOf(t)<0)un+=idf(t)});var s=(inter+.3*ans)/(tot+un*.7);if(s>bs){bs=s;best=f}});
return bs>=.45?best:null}
function reply(q){var s=safe(q);if(s)return s;var f=faq(q);if(f)return{t:f.a};var x=dx(q);if(x)return x;var T=toks(q),best=null,bs=0;
I.forEach(function(x){var s=0;T.forEach(function(t){var m=0;x.k.forEach(function(k){if(match(t,k[0])&&k[1]>m)m=k[1]});s+=m});if(s>bs){bs=s;best=x}});
if(!best)return{t:'I am not sure about that. I can answer questions about diabetes basics, symptoms, risk factors, prevention, the risk score, privacy, bias, sources and the project. For personal health questions please ask a doctor.'};
var l=best[3]&&best[3].split('|');return{t:best[2],l:l}}
/* ---------- interface ---------- */
var b=document.createElement('button');b.className='cb-btn';b.type='button';b.textContent='💬 ASK THE AI';b.setAttribute('aria-haspopup','dialog');
var p=document.createElement('div');p.className='cb-panel';p.setAttribute('role','dialog');p.setAttribute('aria-label','Diabetes information chatbot');
p.innerHTML='<div class="cb-head"><b>Diabetes × AI helper<small id="cbm">Rule-based mode · educational only</small></b><button class="cb-x" type="button" aria-label="Close chat">✕</button></div><div class="cb-list" id="cbl" aria-live="polite"></div><div class="cb-chips" id="cbc"></div><p class="cb-note">Not medical advice. Do not type personal details. In AI mode, chat messages are processed by an AI service.</p><form class="cb-form" id="cbf"><input id="cbi" type="text" maxlength="200" autocomplete="off" placeholder="Ask a question…" aria-label="Type your question"><button type="submit">Send</button></form>';
document.body.appendChild(b);document.body.appendChild(p);
var L=p.querySelector('#cbl'),F=p.querySelector('#cbf'),Inp=p.querySelector('#cbi'),C=p.querySelector('#cbc'),X=p.querySelector('.cb-x'),first=1,busy=0;
function add(cls,node){var m=document.createElement('div');m.className='cb-m '+cls;m.appendChild(node);L.appendChild(m);requestAnimationFrame(function(){requestAnimationFrame(function(){m.classList.add('in')})});L.scrollTo({top:L.scrollHeight,behavior:calm?'auto':'smooth'});return m}
function txt(s){return document.createTextNode(s)}
function bot(r){var n=document.createElement('span');n.appendChild(txt(r.t));if(r.l){n.appendChild(document.createElement('br'));var a=document.createElement('a');a.href=r.l[0];a.textContent=r.l[1]+' →';n.appendChild(a)}add('bot',n)}
var online=location.protocol.indexOf('http')===0,hist=[],MODE=p.querySelector('#cbm');
function mode(ai){MODE.textContent=ai?'AI mode · educational only':'Rule-based mode · educational only'}mode(false);
function askAI(q){var c=new AbortController(),t=setTimeout(function(){c.abort()},20000);
return fetch('/.netlify/functions/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:hist.concat([{role:'user',content:q}]).slice(-6)}),signal:c.signal}).then(function(r){clearTimeout(t);if(!r.ok)throw 0;return r.json()}).then(function(j){if(!j.reply)throw 0;return j.reply})}
function send(q){q=q.trim();if(!q||busy)return;busy=1;add('me',txt(q));var d=document.createElement('span');d.className='cb-dots';d.innerHTML='<span></span><span></span><span></span>';var tm=add('bot',d),sf=safe(q);
function local(){var r=reply(q);setTimeout(function(){tm.remove();bot(r);busy=0},calm?0:Math.min(450+r.t.length*4,1400))}
if(sf||!online||dead)return local();
askAI(q).then(function(a){tm.remove();bot({t:a});hist.push({role:'user',content:q},{role:'assistant',content:a});mode(true);busy=0}).catch(function(){dead=1;mode(false);local()})}
var dead=0;
['What is diabetes?','Symptoms','How does the risk score work?','Is this AI?','Is my data safe?'].forEach(function(q){var c=document.createElement('button');c.type='button';c.textContent=q;c.onclick=function(){send(q)};C.appendChild(c)});
F.addEventListener('submit',function(e){e.preventDefault();var v=Inp.value;Inp.value='';send(v)});
function open(o){p.classList.toggle('open',o);if(o){if(first){first=0;bot({t:'Hi! I am the Diabetes × AI helper, a simple rule-based chatbot. Ask me about diabetes basics or how this project works. I cannot diagnose or give medical advice.'})}setTimeout(function(){Inp.focus()},120)}else b.focus()}
b.onclick=function(){open(!p.classList.contains('open'))};X.onclick=function(){open(false)};
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&p.classList.contains('open'))open(false)});
})();
