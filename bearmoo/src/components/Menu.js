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

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            lang : 'portuguese',
            won : -1,
            bearmoo : null,
            update: false,
            words_list : portuguese
        }
    }

    makeBearmoo = (words_list, update) =>{
        return (<Bearmoo 
                    max_tries = {MAX_TRIES} 
                    word_length = {WORD_LENGTH}
                    words_list = {words_list}
                    update = {update} 
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
            this.setState({lang : PORTUGUESE,
                        words_list : portuguese,
                        bearmoo : this.makeBearmoo(portuguese, this.state.update)});
        }
        else if (Number(lang) === ENGLISH){
            this.setState({lang : ENGLISH, 
                        words_list : english,
                        bearmoo : this.makeBearmoo(english, this.state.update)});
        }
        else if (Number(lang) === GERMAN){
            this.setState({lang : GERMAN,
                        words_list : german,
                        bearmoo : this.makeBearmoo(german, this.state.update)});
        }
        this.forceUpdate();
    }

    render() {
        let message = ''
        if(this.state.won === WON){
            message = (
            <div className='SCORE WON'>
                <div className='message'> CONGRATSSSS </div>
                <div className='playAgain'>PLAY AGAIN COmE wiTh me</div>
                <button type="button" className='BPlay' 
                    onClick={this.playAgain}>
                    PlaY</button> 
            </div>);
        }
        else if(this.state.won === LOST){
            message =( 
                <div className='SCORE LOST'>
                <div className='message'> LOOKS LIKE YOU LOST BUDDY </div>
                <div className='playAgain'>PLAY AGAIN COmE wiTh me</div>
                <button type="button" className='BPlay'
                    onClick={this.playAgain}>
                    PlaY</button> 
            </div>);
        }
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
                {choice}
                {this.state.lang}
                <div className='wonMessage'>
                    {message}
                </div>
                <div id='Bearmoo'>{ this.state.bearmoo}</div>
            </h1>       
            );
    }
}

export default Menu;
            