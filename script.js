let wordArray = ["Trap", "Lion", "Cake", "Ship", "Bird", "Blue", "Fish", "Tree", "Desk", "Sand",
"Bear", "Fork", "Gold", "Door", "Moon", "Rust", "Leaf", "Wind", "Duck", "Palm",
"Ruby", "Tide", "Mint", "Wolf", "Drum", "Lake", "Iron", "Rose", "Star", "Pearl",
"Book", "Duck", "Flag", "Ring", "Fern", "Lamb", "Nest", "Ring", "Oak", "Silk",
"Pine", "Iris", "Jade", "Yarn", "Rust", "Pond", "Ruby", "Sofa", "Swan", "Vine"];


// Initialize score variable
let score = localStorage.getItem('score') || 0;
let tries = localStorage.getItem('tries') || 3;




const arrayNum = wordArray.length;


let randomWordPicker = () => {
    let randomIndex = Math.floor(Math.random() * wordArray.length);
    return wordArray[randomIndex];
};


let generateBoxes = () =>{
    const word = randomWordPicker();
    const wordLength = word.length;
    for(var i=0; i < wordLength; i++){
        const inputAreaEl = document.getElementById("input-boxes");
        const inputBox = document.createElement("input");
        inputBox.setAttribute("type", "text");
        inputBox.setAttribute("maxlength", "1");
        inputBox.setAttribute("class", "guess");
        inputAreaEl.appendChild(inputBox);

        if(i==1){
            inputBox.setAttribute("placeholder", "?");
        }else{
            inputBox.setAttribute("value", word[i]);
        }

    }
}

let getInputValue = () =>{
    const inputBoxes = document.getElementsByClassName("guess");
    let finalValue = "";
    for(var i=0; i < inputBoxes.length; i++){
        let inputValue = [];
        inputValue.push(inputBoxes[i].value);
        finalValue += inputValue.join("");
    }
    return finalValue;
    
}


let displayAlert = () => {
    let successMessage = "Success: Correct Word Guessed";
    let failureMessage = "Error: Wrong Word Guessed. Try again!!!";
    var alertBox = document.createElement("div");
    let button = document.getElementById("submit");
        if(checkAnswer()){
            alertBox.classList.add("alert-box-success");
            alertBox.textContent = successMessage;
        }else{
            alertBox.classList.add("alert-box-error");
            alertBox.textContent = failureMessage;
        }

    button.parentElement.appendChild(alertBox);
    
    
    setTimeout(function() {
        alertBox.remove();
    }, 2000);
}


let displayGameOver = () => {
    let gameOverMsg = "GAME OVER!!!";
    var alertBox = document.createElement("div");
    let button = document.getElementById("submit");
    
    if(tries == 0){
        alertBox.classList.add("alert-box-over");
        alertBox.textContent = gameOverMsg;
    }    
    button.parentElement.appendChild(alertBox);
    
    
    setTimeout(function() {
        alertBox.remove();
    }, 2000);
}



let checkAnswer = () =>{
    const answer = getInputValue();
    let found = false;
    for(var i =0; i < wordArray.length; i++){
        if(wordArray[i] == answer){
            found = true;
        }
    }

    return found;
}

let playAgain = () =>{
    score = 0;
    localStorage.setItem('score', score);
    location.reload();
}




document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("submit");
    var reset = document.getElementById("reset");
    const scoreEl = document.getElementById("score");
    let triesEl = document.getElementById("tries");
    scoreEl.textContent = score;
    triesEl.textContent = tries;
    generateBoxes();



    
    button.addEventListener("click", function() {
        displayAlert(checkAnswer());

        if(checkAnswer()){
            score++;
            localStorage.setItem('score', score); 
            location.reload();
        }else{
            tries--;
            localStorage.setItem('tries', tries); 
            triesEl.textContent = tries;

            if(tries == 0){
                displayGameOver();
                tries = 3;
                localStorage.setItem('tries', tries);
                triesEl.textContent = tries; 
 
                const buttonPLay = document.createElement("button");
                buttonPLay.setAttribute("id", "playAgain");
                buttonPLay.setAttribute("onclick", "playAgain()");
                buttonPLay.textContent = "Play Again"
                this.parentElement.appendChild(buttonPLay);
            }
            
        }



    });

    reset.addEventListener("click", function() {
        score = 0;
        localStorage.setItem('score', score);
        location.reload();
    })

});
