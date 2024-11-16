let morpion = ["e"];
const X = "X";
const O = "O";
let player1Turn = true; //Alterne entre J1 (true) et J2 (false)
let stopGame = false;
let displayRestart = false;
const lineChecked = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boxes = document.querySelectorAll(".box");

const startGame = () => {
  boxes.forEach((box) => (box.innerHTML = ""));
  morpion = [];
  displayRestart = false;
  stopGame = false;
  for (let i = 0; i < 9; i++) {
    morpion.push("e");
  }
};

const alternPlayer = () => {
  player1Turn = !player1Turn;
};

const checkGameStop = () => {
  if (!stopGame) {
    for (let i = 0; i < 9; i++) {
      if (morpion[i] == "e") {
        stopGame = false;
        break;
      } else {
        stopGame = true;
      }
    }
    //Si aucun "e" n'a été détecté dans l'array, la partie s'arrête.
    if (stopGame) {
      console.log("Partie terminée ! Restart :");
      boxes.forEach((box) => (box.innerHTML = ""));
      startGame();
    } else {
      console.log("La partie continue.");
    }
  } else {
    if (player1Turn) console.log("J1 GAGNE !");
    else console.log("J2 GAGNE !");
    stopGame = false;
    displayRestart = true;
    startGame();
  }
};

const detectPlayerWinning = () => {
  //Lorsque joueur a fait une ligne ou une diagonale
  //8 possibilités, tant pis on a pas ltemps on fait avec des ifs
  for (let i = 0; i < lineChecked.length; i++) {
    let checking = "";
    for (let j = 0; j < 3; j++) {
      checking += morpion[lineChecked[i][j]];
      console.log(checking);
    }
    if (checking == "XXX" || checking == "OOO") {
      console.log("UNE LIGNE EST REMPLIE !");
      stopGame = true;
      checkGameStop();
      break;
    }
  }
};

const displayPlaying = (boxChecked) => {
  if (player1Turn) {
    boxChecked.innerHTML = "X";
  } else {
    boxChecked.innerHTML = "O";
  }
  if (stopGame || displayRestart) {
    console.log("DISPLAY RESTART");
    displayRestart = false;
    stopGame = false;
    startGame();
  }
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (morpion[index] == "e") {
      if (player1Turn) morpion[index] = "X";
      else morpion[index] = "O";
      displayPlaying(box);
      console.log(morpion);
    } else {
      console.log("Case déjà jouée, veuillez en jouer une autre.");
    }
    detectPlayerWinning();
    alternPlayer();
    checkGameStop();
  });
});

startGame();
