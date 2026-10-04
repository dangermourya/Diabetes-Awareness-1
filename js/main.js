(function(){
var pages=[["index.html","Home"],["about.html","About Diabetes"],["assessment.html","Risk Assessment"],["ai.html","AI Behind This"],["team.html","Team"],["precautions.html","Precautions"],["demo.html","Visual Explainer"],["project.html","Project &amp; Viva"]];
var cur=location.pathname.split("/").pop()||"index.html";
var n=document.getElementById("nav");
if(n){n.className="nav";n.innerHTML='<div class="wrap"><a class="brand" href="index.html">🩺 Diabetes Awareness &amp; Risk Assessment</a><nav aria-label="Main">'+
pages.map(function(p){return '<a href="'+p[0]+'"'+(p[0]===cur?' class="on" aria-current="page"':'')+'>'+p[1]+'</a>'}).join("")+'</nav></div>';}
var f=document.getElementById("foot");
if(f)f.innerHTML='<div class="wrap"><p><strong>Educational school project (Class 12 AI).</strong> This website does not diagnose diabetes and is not medical advice. The risk assessment collects and stores no personal data. Consult a qualified doctor for any health concern.</p></div>';
})();
(function(){
var calm=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
var bar=document.createElement("div");bar.id="sp";bar.setAttribute("aria-hidden","true");document.body.appendChild(bar);
var hero=document.querySelector(".hero .wrap"),wave=document.querySelector(".hero svg"),tick=false;
function upd(){
 var y=window.scrollY||0,max=document.documentElement.scrollHeight-window.innerHeight;
 bar.style.transform="scaleX("+(max>0?y/max:0)+")";
 if(!calm&&hero&&y<900){hero.style.transform="translateY("+y*0.3+"px)";hero.style.opacity=Math.max(0,1-y/520);}
 if(!calm&&wave&&y<900)wave.style.transform="translateX("+(-y*0.35)+"px) scaleX(1.4)";
 tick=false;}
window.addEventListener("scroll",function(){if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
window.addEventListener("resize",upd);upd();
if(calm||!("IntersectionObserver" in window))return;
var els=[].slice.call(document.querySelectorAll("main section h2,main .card,.flow div,.flow span,main table,main details,main .note")).filter(function(e){return !e.closest("#result")&&!e.closest(".hero")});
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12,rootMargin:"0px 0px -40px 0px"});
els.forEach(function(e){var sib=e.parentElement?[].indexOf.call(e.parentElement.children,e):0;e.style.transitionDelay=Math.min(sib,5)*90+"ms";e.classList.add("rv");io.observe(e)});
})();
