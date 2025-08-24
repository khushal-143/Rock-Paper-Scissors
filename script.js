let userScore = 0;
let compScore = 0;
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const user_score = document.querySelector("#user-score");
const comp_score = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was Draw. Play again.";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin,userChoice,compChoice) => {
    if (userWin) {
        msg.innerText = `You Win! your ${userChoice} bets ${compChoice}`;
        msg.style.backgroundColor = "green";
        user_score.innerText = ++userScore;
    }
    else {
        msg.innerText = `You Lose! ${compChoice} bets your ${userChoice}`;
        msg.style.backgroundColor = "red";
        comp_score.innerText = ++compScore;
    }
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            //paper,scissors
            userWin = compChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper") {
            //scissors,rock
            userWin = compChoice === "scissors" ? false : true;
        }
        else{
            //rock,paper
            userWin=compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});