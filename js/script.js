const wordText = document.querySelector(".word"), //returns the element with the first instance of class ".word"
hintText = document.querySelector(".hint span"), 
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;
let correctGuesses = 0;
let totalAttempts = 0;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        alert(`Your current score: ${correctGuesses} out of ${totalAttempts}`);
        
        initGame(); //call initGame to get a new word, new timer
    }, 1000);
}

const initGame = () => {
    if (totalAttempts === 10) {
        alert(`You got ${correctGuesses} out of 10 questions correct.`);
        correctGuesses = 0; // Reset correct guesses for the next round
        totalAttempts = 0; // Reset total attempts for the next round
    }
    initTimer(30);
    let randomObj = wordPair[Math.floor(Math.random() * wordPair.length)]; //retrieving a random object from words
    const state = document.getElementById('hint');
    state.style.display = 'none';
    let wordArray = randomObj.word.split(""); //splitting the characters into array
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join(""); //you join array of chars together
    hintText.innerText = randomObj.hint; //hint 
    
    correctWord = randomObj.word.toLowerCase();; //correct word is
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}
document.addEventListener('dataLoaded', initGame);

const checkWord = () => {
    totalAttempts++;
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) {
        alert(`Oops! ${userWord} is not the correct word. The correct word is ${correctWord}`);
    } else {
        correctGuesses++;
        alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    }
    if(totalAttempts < 10){
        alert(`Your current score: ${correctGuesses} out of ${totalAttempts}`);
    }
    

    if (totalAttempts === 10) {
        if(correctGuesses < 3){
            alert(`You got ${correctGuesses} out of 10 questions correct. Good luck next time!`);
        } else if (correctGuesses < 7){
            alert(`You got ${correctGuesses} out of 10 questions correct. 
            You're almost there!`);
        } else {
            alert(`You got ${correctGuesses} out of 10 questions correct. Superb Job!`);
        }
       
        correctGuesses = 0; // Reset correct guesses for the next round
        totalAttempts = 0; // Reset total attempts for the next round
    }
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);




const hideHint = () => {
    const state = document.getElementById('hint');
    if(state.style.display === 'none')
        state.style.display = 'block';
    else
        state.style.display = 'none';
}