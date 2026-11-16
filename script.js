const dashboardButton=document.getElementById("dashboard");
const analyseButton=document.getElementById("analyse");
const container=document.getElementById("container");
let var1 = parseInt(localStorage.getItem("var1")) || 0;
let var2 = parseInt(localStorage.getItem("var2")) || 0;
let var3 = parseInt(localStorage.getItem("var3")) || 0;
let var4 = parseInt(localStorage.getItem("var4")) || 0;
let skillBar11 = document.querySelector(".skill-per-11");
let skillBar12 = document.querySelector(".skill-per-12");
let skillBar21 = document.querySelector(".skill-per-21");
let skillBar22 = document.querySelector(".skill-per-22");
let skillBar31 = document.querySelector(".skill-per-31");
let skillBar32 = document.querySelector(".skill-per-32");
const Tms=document.getElementById("tms");
const Sm=document.getElementById("sm");
const Wm=document.getElementById("wm");
const Pm=document.getElementById("pm");
Tms.textContent=var1;
Sm.textContent=var2;
Wm.textContent=var3;
Pm.textContent=var4;
let progressbar1=document.querySelector('.circular-progress-1');
let percent1=document.querySelector('.value-container-1');
let progressbar2=document.querySelector('.circular-progress-2');
let percent2=document.querySelector('.value-container-2');
let emailBox = document.getElementById("email");
let DangerBox = document.getElementById("danger");
let safeBox = document.getElementById("safe");
let moderateBox = document.getElementById("moderate");
let Analyser = document.getElementById("analyser");
let progress1;
let progress2;

let progressvalue1=0;
let progressvalue2=0;
let speed=15;
progress1=setInterval( () => {
    progressbar1.style.background = `conic-gradient(
    #ffa500 ${progressvalue1 * 3.6}deg,
    #f3cb80 ${progressvalue1 * 3.6}deg   )`
    percent1.textContent=`${progressvalue1}%`;
    progressvalue1++;
    if(progressvalue1==33) {
        clearInterval(progress1);
    }
},speed)
progress2=setInterval( () => {
    progressbar2.style.background = `conic-gradient(
    #ffa500 ${progressvalue2 * 3.6}deg,
    #f3cb80 ${progressvalue2 * 3.6}deg   )`
    percent2.textContent=`${progressvalue2}%`;
    progressvalue2++;
    if(progressvalue2==69) {
        clearInterval(progress2);
    }
},speed)


analyseButton.addEventListener('click',()=>{
    container.classList.add("right-panel-active");
})
dashboardButton.addEventListener('click',()=>{
    container.classList.remove("right-panel-active");
})





document.getElementById("analyser").onclick = async function(){


percent1.textContent = "0%";
percent2.textContent = "0%";

progressbar1.style.background = "#f3cb80";
progressbar2.style.background = "#f3cb80";

safeBox.style.display = "none";
moderateBox.style.display = "none";
DangerBox.style.display = "none";

let emailText = document.getElementById("email").value;

let response = await fetch("http://127.0.0.1:5000/predict",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
email: emailText
})
})

let data = await response.json()
let phishingPercentage1 = data.phishing;
let phishingPercentage2 = 100-phishingPercentage1;
console.log(phishingPercentage1);
console.log(phishingPercentage2);
var1++;
localStorage.setItem("var1",var1);
Tms.textContent=var1;


  if(phishingPercentage1 <= 40) {
    emailBox.style.height='45%';
    safeBox.style.display='flex';
    moderateBox.style.display='none';
    DangerBox.style.display='none';
    var2++;
    localStorage.setItem("var2",var2);
    Sm.textContent=var2;
    //skillBar11.setAttribute("per", phishingPercentage2 + "%");
    //skillBar11.style.maxWidth = phishingPercentage2 + "%";
    //skillBar12.setAttribute("per", phishingPercentage1 + "%");
    //skillBar12.style.maxWidth = phishingPercentage1 + "%";
    console.log("Bar widths:", skillBar11.style.maxWidth, skillBar12.style.maxWidth);
}
    else if(phishingPercentage1 > 40 && phishingPercentage1 <= 80) {
    emailBox.style.height='45%';
    moderateBox.style.display='flex';
    safeBox.style.display='none';
    DangerBox.style.display='none';
    var3++;
    localStorage.setItem("var3",var3);
    Wm.textContent=var3;
    //skillBar21.setAttribute("per", phishingPercentage2 + "%");
    //skillBar21.style.maxWidth = phishingPercentage2 + "%";
    //skillBar22.setAttribute("per", phishingPercentage1 + "%");
    //skillBar22.style.maxWidth = phishingPercentage1 + "%";
    console.log("Bar widths:", skillBar21.style.maxWidth, skillBar22.style.maxWidth);
}
    else {
    emailBox.style.height='45%';
    DangerBox.style.display='flex';
    moderateBox.style.display='none';
    safeBox.style.display='none';
    var4++;
    localStorage.setItem("var4",var4);
    Pm.textContent=var4;
    //skillBar31.setAttribute("per", phishingPercentage2 + "%");
    //skillBar31.style.maxWidth = phishingPercentage2 + "%";
    //skillBar32.setAttribute("per", phishingPercentage1 + "%");
    //skillBar32.style.maxWidth = phishingPercentage1 + "%";
    console.log("Bar widths:", skillBar31.style.maxWidth, skillBar32.style.maxWidth);
    console.log(
skillBar11.style.maxWidth,
skillBar12.style.maxWidth,
skillBar21.style.maxWidth,
skillBar22.style.maxWidth,
skillBar31.style.maxWidth,
skillBar32.style.maxWidth
);
}
console.log(phishingPercentage1);
progressvalue1=0;
progressvalue2=0;
progress1=setInterval( () => {
    progressbar1.style.background = `conic-gradient(
    #ffa500 ${progressvalue1 * 3.6}deg,
    #f3cb80 ${progressvalue1 * 3.6}deg   )`
    percent1.textContent=`${progressvalue1}%`;
    progressvalue1++;
    if(progressvalue1==(phishingPercentage2+1)) {
        clearInterval(progress1);
    }
},speed)
progress2=setInterval( () => {
    progressbar2.style.background = `conic-gradient(
    #ffa500 ${progressvalue2 * 3.6}deg,
    #f3cb80 ${progressvalue2 * 3.6}deg   )`
    percent2.textContent=`${progressvalue2}%`;
    progressvalue2++;
    if(progressvalue2==(phishingPercentage1+1)) {
        clearInterval(progress2);
    }
},speed)
}
    
