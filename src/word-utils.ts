import guessWords from './guess_words.txt';
import ansWords from './answer_words.txt';


function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * ansWords.length);

    return ansWords[randomIndex];
}