import React from 'react'
import Bearmoo from './Bearmoo';
import * as portuguese from '../portuguese.json'
import * as english from '../english.json'
import * as german from '../german.json'
const MAX_TRIES = 7;
const WORD_LENGTH = 5;
const WON = 1;
const LOST = 0;
const UNDEF_WON = -1;


// languages
// portuguese : 0, english : 1, german 2 

const PORTUGUESE = 0;
const ENGLISH = 1;
const GERMAN = 2;

const CONGRATS = 0;
const LOST_MESSAGE = 1;
const PLAY_AGAIN = 2;
const NOT_IN_LIST = 3;
const MESSAGES = 
[
    ["Parabens! Você ganhou, quer jogar de novo?",
            "Você perdeu!:( Quer jogar de novo?",
            "Jogar novamente!",
            "Palavra nao está na lista!"],
    ["Congrats! Seems like you won! Wanna play again?", 
            "Looks like you lost, buddy! Wanna play again?",
            "Play again!",
            "Word not in list!"],
    ["Herzlichen Glueck du Wichser! Willst du NOCHMAL spielen? Hast du keinen Job?",
            "AHAHAHAHAHA du bist ECHT scheisse, willst du wirklich NOCHMAL spielen?", 
            "Nochmal!",
            "Dieses Wort gibt's NICHT AHAHAHAHAHA!"]
]
class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lang : 'Portugues',
            won : -1,
            bearmoo : null,
            update: false,
            words_list : portuguese,
            play_messages : MESSAGES[PORTUGUESE]
        }
    }

    makeBearmoo = (words_list, update) =>{
        return (<Bearmoo 
                    max_tries = {MAX_TRIES} 
                    word_length = {WORD_LENGTH}
                    words_list = {words_list}
                    update = {update} 
                    not_in_list = {MESSAGES[NOT_IN_LIST]}
                    sendValue = {(b) => this.sendValue(b)}
                /> );
    }
    sendValue(b){
        console.log('WON OR NOT');
        console.log(b);
        this.setState({won : b});
    }
    componentDidMount(){
        this.setState({bearmoo: this.makeBearmoo(this.state.words_list,this.state.update)});
    }

    playAgain = () =>{
        this.setState({won : -1,update: !this.state.update,
                     bearmoo: this.makeBearmoo(this.state.words_list,!this.state.update)});
        this.forceUpdate();
        console.log('WORKS')
    }

    selectLanguage = (e) => {
        let lang = e.target.value;
        console.log('lang');
        console.log(lang);
        if (Number(lang) === PORTUGUESE){
            this.setState({lang : "Portugues",
                        words_list : portuguese,
                        bearmoo : this.makeBearmoo(portuguese, this.state.update),
                        play_messages : MESSAGES[PORTUGUESE]});
        }
        else if (Number(lang) === ENGLISH){
            this.setState({lang : "English", 
                        words_list : english,
                        bearmoo : this.makeBearmoo(english, this.state.update),
                        play_messages : MESSAGES[ENGLISH]});
        }
        else if (Number(lang) === GERMAN){
            this.setState({lang : "Deutsch",
                        words_list : german,
                        bearmoo : this.makeBearmoo(german, this.state.update),
                        play_messages : MESSAGES[GERMAN]});
        }
        this.forceUpdate();
    }
    wonOrNot = () => {
        if(this.state.won === WON){
            return (
            <div className='SCORE WON'>
                <div className='message'> {this.state.play_messages[CONGRATS]} </div>
                <button type="button" className='BPlay' 
                    onClick={this.playAgain}>
                    {this.state.play_messages[PLAY_AGAIN]}</button> 
            </div>);
        }
        else if(this.state.won === LOST){
            return ( 
                <div className='SCORE LOST'>
                <div className='message'> {this.state.play_messages[LOST_MESSAGE]} </div>
                <div className='playAgain'>{this.state.play_messages[PLAY_AGAIN]} </div>
                <button type="button" className='BPlay'
                    onClick={this.playAgain}>
                    {this.state.play_messages[PLAY_AGAIN]}</button> 
            </div>);
        }
        else return '';
    }
    render() {
        let message = this.wonOrNot();
        let choice =
            <div>
                <label for="langChoice">lingua/languages/Sprachen</label>
                <select onChange={(e) => this.selectLanguage(e)}
                    id="langChoice">
                    <option value={PORTUGUESE}>Portugues</option>
                    <option value={ENGLISH}>English</option>
                    <option value={GERMAN}>Deutsch</option>
                </select>
            </div>
         
        return (
            <h1 id='bearmoo'>
                <div id='choice'>{choice}</div>
                <div className='wonMessage'>
                    {message}
                </div>
                <div id='Bearmoo'>{ this.state.bearmoo}</div>
            </h1>       
            );
    }
}

export default Menu;
            