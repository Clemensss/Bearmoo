const WORD_L = 5;
const RIGHT = "V";
const WRONG = "F";
const MAYBE = "M";
const REPEAT = "R"


class Game {
    
    constructor(word_length, max_tries, words_list){
        this.words_list = words_list;
        this.game_word = selectWord(words_list);
        this.word_length = word_length;

        this.max_tries = max_tries;
        this.tries = 0;
        this.won = -1;

        this.score = [];
        this.past_words = [];
        this.score_list = [];
    }

    //GAMEPLAY;

    //play a round of the game 
    playRoundGame(user_word){
        if (!checkIfWordFull(user_word)){
            return [0, "Error: Slot not filled"];
        }
        if (!checkIfWordOnlyLetters(user_word)){
            return [0, "Error: Only letter are valid"];
        }
        if (!checkIfWordValid(user_word, this.words_list)){
            return [2, "Error: Word not valid"];
        }

        //gen score based of user word
        this.genScore(user_word);
        
        //past scores and words for rendering
        this.score_list.push(this.score);
        this.past_words.push(user_word);
        //this.game_word = selectWord();

        return [1, "Everything went chill"];
    }
    // GAME MECHANICS------

    genScore(user_word){
        if(this.tries === this.max_tries-1) this.won = 0;
        else if(user_word === this.game_word) this.won = 1;
        //empty previous score just because
        this.score = [];
        this.tries++;

        for (let i = 0; i < this.game_word.length; i++){
            this.score[i] = whatLetterIs(this.game_word, user_word[i], i);
        }
    }
}

//CHECKS
// str -> bool
function checkIfWordOnlyLetters(word){
    for(let i = 0; i < word.length; i++){
        if(!isLetter(word[i])) return false;
    }
    return true;
}

//cheks if word is in the list of word
// str, arr(words) -> bool
function checkIfWordValid(word, words_list){
    for(let i = 0; i < words_list.length; i++){
        //if first letter not in there, then fuck it
        if (word === words_list[i])
            return true;
    }
    return false;
}

//check if the user has used all of the x number of possible letters
//str -> bool
function checkIfWordFull(word){
    for(let i = 0; i < word.length; i++){
        if(word[i]=== " ") return false;
    }
    return true;
}

//what the letter is to the game
function whatLetterIs(game_word, letter, index){
    if(game_word[index] === letter) return RIGHT;
    else if (isItIn(game_word,letter)) return MAYBE;
    else return WRONG;
}
        
//picks a random word from the file
function selectWord(words_list)
{
        let randInt = max => Math.floor(Math.random() * max);
        let word = words_list[randInt(words_list.length)];
        return word;
}

let isLetter = (c) => c.toLowerCase() !== c.toUpperCase();
let isItIn = (arr, s) => {
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === s) return true
    }
    return false
}
export default Game;