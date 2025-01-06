const words = ["programmering", "javascript", "hangman", "utveckling"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctGuesses = [];
let wrongGuesses = [];

const wordContainer = document.getElementById("word-container");
const wrongLetters = document.getElementById("wrong-letters");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess-input");

const parts = ['head', 'body', 'arms', 'legs', 'scaffold'];

function displayWord() {
    wordContainer.innerHTML = selectedWord
        .split("")
        .map(letter => (correctGuesses.includes(letter) ? `<span style="color: green;">${letter}</span>` : "<span>_</span>"))
        .join(" ");
}

function showPart(index) {
    if (index < parts.length) {
        document.getElementById(parts[index]).style.display = 'block';
    }
}

function checkGuess(guess) {
    if (selectedWord.includes(guess)) {
        correctGuesses.push(guess);
        showCorrectGuessMessage(); // Visa meddelande för rätt gissning
    } else {
        wrongGuesses.push(guess);
        showPart(wrongGuesses.length - 1);
    }
    updateGame();
}

function showCorrectGuessMessage() {
    const messageBox = document.createElement("div");
    messageBox.textContent = "Rätt gissat!";
    messageBox.style.color = "green";
    messageBox.style.fontWeight = "bold";
    messageBox.style.fontSize = "20px";
    messageBox.style.marginTop = "10px";
    document.body.appendChild(messageBox);

    // Ta bort meddelandet efter 2 sekunder
    setTimeout(() => {
        document.body.removeChild(messageBox);
    }, 2000);
}

function updateGame() {
    displayWord();
    wrongLetters.textContent = `Fel bokstäver: ${wrongGuesses.join(", ")}`;
    
    // Ge felaktiga bokstäver en bakgrundsfärg
    wrongLetters.style.backgroundColor = 'lightcoral';

    // Kontrollera om användaren har förlorat
    if (wrongGuesses.length >= parts.length) {
        message.textContent = `Du förlorade! Ordet var: ${selectedWord}`;
        askToPlayAgain(); // Fråga om användaren vill spela igen
        guessInput.disabled = true; // Inaktivera inputfältet när spelet är slut
    } 
    // Kontrollera om användaren har vunnit
    else if (selectedWord.split("").every(letter => correctGuesses.includes(letter))) {
        message.textContent = "Du vann!";
        askToPlayAgain(); // Fråga om användaren vill spela igen
        guessInput.disabled = true; // Inaktivera inputfältet när spelet är slut
    }
}

function askToPlayAgain() {
    // Fråga om användaren vill spela igen
    setTimeout(() => {
        const playAgain = confirm("Vill du spela igen?");
        if (playAgain) {
            resetGame(); // Starta om spelet om användaren vill spela igen
        } else {
            message.textContent = "Tack för att du spelade!";
        }
    }, 1000); // Vänta 1 sekund innan frågan ställs
}

function resetGame() {
    correctGuesses = [];
    wrongGuesses = [];
    selectedWord = words[Math.floor(Math.random() * words.length)]; // Nytt slumpat ord varje gång
    
    message.textContent = "";
    displayWord();
    wrongLetters.textContent = "";
    
    // Dölja alla delar av hangman
    parts.forEach(part => document.getElementById(part).style.display = 'none');
    
    guessInput.disabled = false; // Aktivera inputfältet när spelet återställs
}

guessInput.addEventListener("keyup", event => {
    const guess = event.target.value.toLowerCase();
    if (guess.match(/[a-zåäö]/i) && guess.length === 1) {
        checkGuess(guess);
        guessInput.value = "";
    }
});

displayWord();