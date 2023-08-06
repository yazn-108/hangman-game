"use strict";
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");
lettersArray.forEach(letter => {
    let button = document.createElement("button");
    button.className = "letter-box";
    button.textContent = letter;
    lettersContainer.appendChild(button);
});
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    people: ["yazn","Mohammed","Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words),
randomNumber = Math.floor(Math.random() * allKeys.length),
randomKey = allKeys[randomNumber],
randomName = words[randomKey],
randomWords = Math.floor(Math.random() * randomName.length),
randomValue = randomName[randomWords];
let lettersAndSpace = Array.from(randomValue);
document.querySelector(".game-info .from").innerHTML = randomKey;
let lettersGuess = document.querySelector(".letters-guess");
lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");
    letter === ' '? span.className = "space": false;
    lettersGuess.appendChild(span);
});
let keysArray = [];
let wrongAttempts = 0;
let draw = document.querySelector(".hangman-draw")
let guessSpan = document.querySelectorAll(".letters-guess span");
Array.from(document.querySelectorAll(".letter-box")).forEach((e) => {
    e.addEventListener("click",(e) => {
        let Status = false;
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        keysArray.push(clickedLetter)
        let theChosenWord  = Array.from(randomValue.toLowerCase())
        theChosenWord.forEach((wordLetter,WordIndex) => {
            if (wordLetter == clickedLetter) {
                Status = true;
                guessSpan.forEach((span,spanIndex) => {
                    if (WordIndex === spanIndex) {
                        span.innerHTML = clickedLetter;
                    };
                });
            };
        });
        if (Status === false) {
            wrongAttempts++;
            draw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === 9) {
                lettersContainer.classList.add("finished");
                let lossMessage = document.createElement("div");
                lossMessage.className = "message";
                let p = document.createElement("p");
                p.textContent = 'game over, the word is:'
                let span = document.createElement("span");
                span.textContent = randomValue
                let button = document.createElement("button");
                button.textContent = "next";
                button.className = "next";
                lossMessage.appendChild(p);
                lossMessage.appendChild(span);
                lossMessage.appendChild(button);
                setTimeout(() => {
                    document.body.appendChild(lossMessage);
                }, 500);
            };
        };
        let allLettersGuessed = true;
        guessSpan.forEach((span) => {
            if (span.innerHTML === "") {
            allLettersGuessed = false;
            };
        });
        if (allLettersGuessed === true) {
            let winMessage = document.createElement("div");
            winMessage.className = "message";
            let p = document.createElement("p");
            p.textContent = "Congratulations, you won!";
            winMessage.appendChild(p);
            let wrong = document.createElement("p");
            wrong.textContent = `wrong attempts: ${wrongAttempts}`;
            winMessage.appendChild(wrong);
            let button = document.createElement("button");
            button.textContent = "next";
            button.className = "next"
            winMessage.appendChild(button);
            document.body.appendChild(winMessage);
        };
    });
});
document.addEventListener('keypress', function(event) {
    event.key === 'Enter'?event.preventDefault():"";
    let found = false;
    for (let i = 0; i < keysArray.length; i++) {
        if (keysArray[i] === event.key.toLowerCase()){
            found = true;
        };
    };
    if (found === false){
        keysArray.push(event.key);
        let Status = false;
        var pressedKey = event.key.toLowerCase();
        Array.from(document.querySelectorAll(".letter-box")).forEach(function(letter) {
            if (pressedKey === letter.innerHTML.toLowerCase()) {
                letter.classList.add("clicked");
                let clickedLetter = letter.innerHTML.toLowerCase();
                let theChosenWord  = Array.from(randomValue.toLowerCase())
                theChosenWord.forEach((wordLetter,WordIndex) => {
                    if (wordLetter == clickedLetter) {
                        Status = true;
                        guessSpan.forEach((span,spanIndex) => {
                            if (WordIndex === spanIndex) {
                                span.innerHTML = clickedLetter;
                            };
                        });
                    };
                });
                if (Status === false) {
                    wrongAttempts++;
                    draw.classList.add(`wrong-${wrongAttempts}`);
                    if (wrongAttempts === 9) {
                        lettersContainer.classList.add("finished");
                        let lossMessage = document.createElement("div");
                        lossMessage.className = "message";
                        let p = document.createElement("p");
                        p.textContent = 'game over, the word is:'
                        let span = document.createElement("span");
                        span.textContent = randomValue
                        let button = document.createElement("button");
                        button.textContent = "next";
                        button.className = "next";
                        lossMessage.appendChild(p);
                        lossMessage.appendChild(span);
                        lossMessage.appendChild(button);
                        setTimeout(() => {
                            document.body.appendChild(lossMessage);
                        }, 500);
                    };
                };
            };
        });
        let allLettersGuessed = true;
        guessSpan.forEach((span) => {
            if (span.innerHTML === "") {
                allLettersGuessed = false;
            };
        });
        if (allLettersGuessed === true && event.key !== "Enter") {
            let winMessage = document.createElement("div");
            winMessage.className = "message";
            let p = document.createElement("p");
            p.textContent = "Congratulations, you won!";
            winMessage.appendChild(p);
            let wrong = document.createElement("p");
            wrong.textContent = `wrong attempts: ${wrongAttempts}`;
            winMessage.appendChild(wrong);
            let button = document.createElement("button");
            button.textContent = "next";
            button.className = "next"
            winMessage.appendChild(button);
            document.body.appendChild(winMessage);
        };
    };
});
document.addEventListener("click",(e) =>{
    e.target.classList.contains("next")?
        window.location.reload():""; 
});
