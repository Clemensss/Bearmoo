import React from 'react';
import Game from './Game';

const EMPTY = "E"
const UNK   = "?"
const NOT_IN_LIST = "word not in list :("
let isLetter = (c) => {
    if(c.toLowerCase() !== c.toUpperCase() && c.length === 1)
        return true;
    return false;
}

class Bearmoo extends React.Component
{
    constructor(props){
        super(props);
        this.state = {
            game_message : '',
            user_word : new Array(this.props.word_length).fill(UNK),
            game : 
                new Game(this.props.word_length, this.props.max_tries, this.props.words_list)
        };
        }
        componentDidUpdate(prevProps){
            if (this.props.words_list !== prevProps.words_list){
                this.setState({game :
                    new Game(this.props.word_length, this.props.max_tries, this.props.words_list)});
            }
            if(this.props.update !== prevProps.update){
                this.setState({game :
                    new Game(this.props.word_length, this.props.max_tries, this.props.words_list)});
            }
        } 
        catchKeyPress = (e) =>{
            let word = this.state.user_word;

            if(e.key === "Enter"){
                this.setState({game_message : ''});
                console.log("enter");
                let game = this.state.game;

                console.log(word.join(''));

                let answer = game.playRoundGame(word.join(''));
                
                if (answer[0] === 2){
                    this.setState({user_word : new Array(this.props.word_length).fill(UNK)});
                    this.setState({game_message : NOT_IN_LIST});
                }

                console.log(answer[1]);
                console.log(game.score);
                console.log(game.game_word);

                word =  new Array(word.length).fill(UNK);

                this.setState({user_word : word});
                this.setState(
                    {tries : this.state.tries + 1,
                    game : game});
                this.sendValue(this.state.game.won)    
            }

            //this is bad change it
            else if (e.key === 'Backspace'){
                let i = word.length -1;
                for(i; i >=0; i--)
                    if(word[i]!== UNK){
                        word[i] = UNK;
                        break;
                    }

                this.setState({user_word : word});
            }

            else if(isLetter(e.key))
            {
                let i = 0;
                while(word[i]!== UNK && i < word.length-1) 
                    i++;

                console.log(i);
                word[i] = e.key;
                this.setState({user_word : word});
            }

        };
        sendValue(b) {
            this.props.sendValue(b);
        }
        render(){
            const board = (
            <GenBoard 
                field_num={this.props.max_tries} 
                word_length = {this.props.word_length}
                input_index={this.state.game.tries}  
                user_word = {this.state.user_word}
                game={this.state.game}  
            />
            );
            let message = "BEARMOO";
            let game_message = <div 
                                className='gameMessage'> {this.state.game_message} 
                            </div> 
            let game = 
                <div onKeyDown={e => this.catchKeyPress(e)} 
                    tabIndex='0'
                    className='game'>
                    {board}
                </div> ;

            return (
            <h2>
                {message}
                {game_message}
                {game}
            </h2>);
        }

    }

//gen board of the game, both input and word on the screen
//props: game, num, input_index, func: catchletters and submitword
function GenBoard(props) {
        let board_objs = [];
        for (let i = 0; i < props.field_num; i++){
            let piece = null;

            // if the index is the input, gen input

            if (props.input_index === i)
                piece = (
                        <GenInput 
                            word_length = {props.word_length}
                            user_word = {props.user_word}
                            key = {i} />
                        );

            //else do previous and next words

            else if(i >= props.game.past_words.length) 
                piece = <GenEmptWord 
                        word_length = {props.word_length}
                        key = {i} 
                        index = {i}/>

            else piece = (<GenWord 
                            word = {props.game.past_words[i]}
                            score = {props.game.score_list[i]}
                            key = {i} 
                            index = {i}/>
                        );

            board_objs.push(piece);
        }

        const board = 
            <h2 className="Board">
                    {board_objs}
            </h2>

        return board;
}

function GenEmptWord(props){
    let eword = [];
    for (let i = 0; i < props.word_length; i++)
    {
        eword.push((
            <div 
                className={EMPTY}
               key ={i}>{UNK}</div>

        ));
    }

    return (<div
        className={'wordField'}> 
            {eword}
            </div>);
}

//props: score_index, empty (for empty word)
function GenWord(props) {
    let word = [];
    for (let i = 0; i < props.word.length; i++){
        word.push(
            (<div 
            className={props.score[i]}
            key={i}>
                    {props.word[i]}
            </div>)
        );
    }
    return (<div
        className={'wordField'}> 
            {word}
            </div>);
}
//props: word_length, user_word 
function GenInput(props){
    let input = [];

    let word =  (props.user_word === undefined) ?
            new Array(props.word_length).fill(UNK)
            : props.user_word;

    for (let i = 0; i < props.word_length; i++){
        input.push(<div 
            key = {i}
            className={"input "+
                    (word[i] === UNK ? 'Empt': 'Full')}> {word[i]}
        </div>);
    }

    return (<div
        className='wordField'> 
            {input}
            </div>);
}

export default Bearmoo;