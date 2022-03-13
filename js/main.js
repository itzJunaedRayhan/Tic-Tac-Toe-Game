let btnRef     = document.querySelectorAll(".button-option");
let popupRef   = document.querySelector(".popup");
let newGameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef     = document.getElementById("message");



//  Winning Pattern Array
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

//  Player 'X' plays first
let xTurn = true;
let count = 0;


//  Disable All Buttons:
const disableButton = () => {
    btnRef.forEach((element) => (element.disabled = true));
    //  enable popup
    popupRef.classList.remove("hide");
}


//  Enable all buttons For New Game and Restart:
const enableButton = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled  = false;
    });
    //  disable popup
    popupRef.classList.add("hide");
}


//  New Game 
newGameBtn.addEventListener("click", () => {
    count = 0;
    enableButton();
})


//  Restart Game
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButton();
})


//  Function for Win:
const winFunction = (letter) => {
    disableButton();
    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else {
        msgRef.innerHTML = "&#x1f389; <br> 'O' Wins";
    }
}


//  Function for Draw:
const drawFunction = () => {
    disableButton();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
}


//  Win Logic
const winChecker = () => {
    //  Loop through all win Patterns
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];
        
        //  Check if elements are filled
        //  If 3 empty elements are same and would give win
        if (element1 != "" && (element2 != "") & (element3 != "")) {
            if (element1 == element2 && element2 == element3) {
                //  If all 3 buttons has same values then pass value to winFunction:
                winFunction(element1)
            }
        }
    }
}


//  Display X/0 on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //  Display X
            element.innerText = "X";
            element.disabled  = true;
        }else{
            xTurn = true;
            //  Display Y
            element.innerText = "O";
            element.disabled  = true;
        }

        //  Increment Count on each click
        count += 1;
        if (count === 9) {
            //  It's a draw since there are a total of 9 boxed
            drawFunction();
        }
        // Check for win on every click
        winChecker();
    });
});

window.onload = enableButton;