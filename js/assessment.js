(function(){
var form=document.getElementById("riskForm");if(!form)return;
var MAX=17;
function bmiPts(b){return b<23?0:b<27.5?2:3}
function bmiLabel(b){return b<18.5?"below 18.5":b<23?"18.5 – 22.9":b<27.5?"23 – 27.4":"27.5 or above"}
function val(id){return document.getElementById(id).value}
function setErr(id,m){document.getElementById(id+"Err").textContent=m}
form.addEventListener("submit",function(e){
 e.preventDefault();
 var ok=true;["age","height","weight","activity","family","bp","smoke","diet"].forEach(function(i){setErr(i,"")});
 var h=parseFloat(val("height")),w=parseFloat(val("weight"));
 if(!val("age")){setErr("age","Please choose an age group.");ok=false}
 if(!(h>=100&&h<=230)){setErr("height","Enter height between 100 and 230 cm.");ok=false}
 if(!(w>=20&&w<=250)){setErr("weight","Enter weight between 20 and 250 kg.");ok=false}
 ["activity","family","bp","smoke","diet"].forEach(function(i){if(!val(i)){setErr(i,"Please choose an option.");ok=false}});
 if(!ok){var first=form.querySelector(".err:not(:empty)");if(first)first.previousElementSibling.focus();return}
 var bmi=w/Math.pow(h/100,2);
 var F=[
  ["Age group",+val("age"),3,"Risk generally rises with age"],
  ["BMI "+bmi.toFixed(1)+" ("+bmiLabel(bmi)+")",bmiPts(bmi),3,"Higher body weight for height is a known risk factor"],
  ["Physical activity",+val("activity"),2,"Regular activity helps the body use glucose"],
  ["Family history",+val("family"),3,"Close relatives with diabetes raise risk"],
  ["High blood pressure",+val("bp"),2,"Often occurs together with Type 2 diabetes risk"],
  ["Smoking",+val("smoke"),2,"Smoking is linked to higher risk"],
  ["Sugary food/drinks",+val("diet"),2,"Frequent sugary items can affect weight and glucose"]];
 var score=F.reduce(function(s,x){return s+x[1]},0);
 var cat=score<=5?["Lower Risk","lower","#15803d"]:score<=10?["Moderate Risk","moderate","#b45309"]:["Higher Risk","higher","#b42318"];
 var msg={lower:"Your responses indicate a lower educational risk category. Keep up healthy habits.",
  moderate:"Your responses indicate a moderate educational risk category. Small lifestyle changes can help, and a routine check-up is a good idea.",
  higher:"Your responses indicate a higher educational risk category. This does not mean that you have diabetes. Please consider talking to a qualified doctor, who can do proper blood tests."}[cat[1]];
 var rows=F.map(function(x){return '<div class="bar"><span>'+x[0]+'</span><div class="meter" role="img" aria-label="'+x[1]+' of '+x[2]+' points"><i style="width:'+(x[2]?x[1]/x[2]*100:0)+'%"></i></div><b>'+x[1]+'/'+x[2]+'</b></div>'}).join("");
 var why=F.filter(function(x){return x[1]>0}).map(function(x){return "<li><strong>"+x[0]+":</strong> +"+x[1]+" — "+x[3]+".</li>"}).join("")||"<li>No risk-increasing factors were selected.</li>";
 var r=document.getElementById("result");
 r.hidden=false;
 r.innerHTML='<div class="card"><h2>Your educational result</h2><span class="badge '+cat[1]+'">'+cat[0]+'</span>'+
 '<p><strong>Score: '+score+' out of '+MAX+'</strong></p><div class="meter" role="img" aria-label="Score '+score+' of '+MAX+'"><i id="mt" style="background:'+cat[2]+'"></i></div>'+
 '<p>'+msg+'</p><h3>How each factor contributed</h3>'+rows+
 '<h3>Factors that added points</h3><ul>'+why+'</ul>'+
 '<h3>General healthy-lifestyle tips</h3><ul><li>Be active: around 150 minutes of moderate activity per week is commonly advised for adults.</li><li>Choose whole grains, vegetables, fruit and pulses; limit sugary drinks and sweets.</li><li>Maintain a healthy weight and avoid tobacco.</li><li>Get regular check-ups, especially with a family history or high blood pressure.</li></ul>'+
 '<p class="note"><strong>Disclaimer:</strong> This is a simplified educational model, not a clinically validated test. It cannot diagnose diabetes. Only a doctor can diagnose diabetes using blood tests.</p></div>';
 setTimeout(function(){document.getElementById("mt").style.width=(score/MAX*100)+"%"},50);
 r.scrollIntoView({behavior:"smooth",block:"start"});
});
form.addEventListener("reset",function(){document.getElementById("result").hidden=true;document.getElementById("result").innerHTML=""});
})();
