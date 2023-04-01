import {words } from './words.js';
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
   clearInterval(timer);
   timer = setInterval(() => {
       if(maxTime > 0) {
         maxTime--; // decrement maxTime by -1
         return timeText.innerText = maxTime;
       }
       clearInterval(timer);
       alert(`Timer off! ${correctWord.toUpperCase()} was the correct word`);
       initGame(); // calling initGame function, so the game restart
   }, 1000);
}

const initGame = () => {
   initTimer(30); // calling initTimer fuction with passing 30 as maxTimer value
   let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words
   let wordArray = randomObj.word.split(""); // splitting each letter of random word
   for (let i = wordArray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // getting random number
      //shuffing and swiping wordArray letters randomly
      [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
   }
   wordText.innerText = wordArray.join(""); // passing shuffled word as word text
   hintText.innerText = randomObj.hint; // passing random object hint as hint text
   correctWord = randomObj.word.toLowerCase(); //passing random word to correctWord
   inputField.value = ""; // making input field empty
   inputField.setAttribute("maxlength", correctWord.length); // setting input maxlength attr value to word length
   console.log(randomObj);
}
initGame();

const checkword = () => {
   let userWord = inputField.value.toLocaleLowerCase(); // getting user value
   if(!userWord) return alert("Please enter a word check"); // if the user didnot enter anything

   //if the user word doesn't matched with the correct word
   if(userWord !== correctWord) return alert(` Oops! ${userWord} is not correct Word`);

   // if above two if condition are failed then show congrats alert because user word is correct
   alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
   initGame()
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkword);