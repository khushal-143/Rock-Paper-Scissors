// Rock Paper Scissors Pro
const choices=document.querySelectorAll(".choice");
const userChoiceImg=document.getElementById("userChoice");
const computerChoiceImg=document.getElementById("computerChoice");
const status=document.getElementById("status");
const roundInfo=document.getElementById("roundInfo");
const historyList=document.getElementById("historyList");
const resetBtn=document.getElementById("resetMatch");
const matchSelect=document.getElementById("matchSelect");
const toast=document.getElementById("toast");
const themeBtn=document.getElementById("themeToggle");

const userScoreEl=document.getElementById("userScore");
const compScoreEl=document.getElementById("computerScore");
const drawScoreEl=document.getElementById("drawScore");

const clickSound=document.getElementById("clickSound");
const winSound=document.getElementById("winSound");
const loseSound=document.getElementById("loseSound");
const drawSound=document.getElementById("drawSound");

const rules={rock:"scissors",paper:"rock",scissors:"paper"};

let state={
 user:0,
 comp:0,
 draw:0,
 round:1,
 bestOf:Number(matchSelect.value)
};

let gameOver = false;

const icons={
 rock:"images/rock.png",
 paper:"images/paper.png",
 scissors:"images/scissors.png"
};

const savedTheme=localStorage.getItem("rps-theme");
if(savedTheme==="light"){
 document.body.classList.add("light");
 themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
}

function play(audio){
 if(audio){audio.currentTime=0;audio.play().catch(()=>{});}
}
function toastMsg(t){
 toast.textContent=t;
 toast.classList.add("show");
 setTimeout(()=>toast.classList.remove("show"),1800);
}
function updateUI(){
 userScoreEl.textContent=state.user;
 compScoreEl.textContent=state.comp;
 drawScoreEl.textContent=state.draw;
 roundInfo.textContent=`Round ${state.round} / ${state.bestOf}`;
}
function reset() {

    state.user = 0;
    state.comp = 0;
    state.draw = 0;
    state.round = 1;

    gameOver = false;

    historyList.innerHTML = "";

    userChoiceImg.src = "images/question.png";
    computerChoiceImg.src = "images/question.png";

    status.textContent = "Choose your move...";

    choices.forEach(btn => {
        btn.disabled = false;
    });

    updateUI();
}
function randomChoice(){
 const arr=["rock","paper","scissors"];
 return arr[Math.floor(Math.random()*3)];
}
function celebrate(){
 if(window.confetti){
   confetti({particleCount:180,spread:80});
 }
}
function finishMatch() {

    const target = Math.ceil(state.bestOf / 2);

    if (state.user >= target) {

        status.textContent = "🏆 You won the match!";

        play(winSound);

        celebrate();

        gameOver = true;

    }

    else if (state.comp >= target) {

        status.textContent = "💀 Computer won the match!";

        play(loseSound);

        gameOver = true;

    }

    if (gameOver) {

        choices.forEach(btn => {
            btn.disabled = true;
        });

    }

}
choices.forEach(btn=>{
 btn.addEventListener("click",()=>{
   if (gameOver) return;

   play(clickSound);

   const user=btn.dataset.choice;
   const comp=randomChoice();

   userChoiceImg.src=icons[user];
   computerChoiceImg.src="images/question.png";
   status.textContent="🤖 Computer is thinking...";

   setTimeout(()=>{
     computerChoiceImg.src=icons[comp];

     let result;

     if(user===comp){
       state.draw++;
       result="Draw";
       status.textContent="🤝 It's a draw!";
       play(drawSound);
     }else if(rules[user]===comp){
       state.user++;
       result="Win";
       status.textContent=`🎉 ${user} beats ${comp}`;
       play(winSound);
     }else{
       state.comp++;
       result="Lose";
       status.textContent=`😢 ${comp} beats ${user}`;
       play(loseSound);
     }

     const li=document.createElement("li");
     li.textContent=`Round ${state.round}: ${user} vs ${comp} — ${result}`;
     historyList.prepend(li);

     finishMatch();

if (!gameOver) {
    state.round++;
}

updateUI();
   },700);

 });
});

resetBtn.addEventListener("click",reset);

matchSelect.addEventListener("change",()=>{
 state.bestOf=Number(matchSelect.value);
 reset();
});

themeBtn.addEventListener("click",()=>{
 document.body.classList.toggle("light");
 const light=document.body.classList.contains("light");
 themeBtn.innerHTML=light?'<i class="fa-solid fa-sun"></i>':'<i class="fa-solid fa-moon"></i>';
 localStorage.setItem("rps-theme",light?"light":"dark");
 toastMsg(light?"Light mode":"Dark mode");
});

updateUI();
