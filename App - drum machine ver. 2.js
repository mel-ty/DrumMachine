import React from 'react';
import './App.css';


class MyApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: defaultDisplay,
      start: false,
      buttonPressed: false
    }
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleStart = this.handleStart.bind(this);
    
  };

  updateDisplay(name=defaultDisplay, id='Q') {
    this.setState({
      display: name
    });
    //let duration = document.getElementById(id).duration* 1000;
    //time out doesn't clear out when you press another button in time that <duration of previous audio
    //const timeOut = setTimeout(() => this.setState({ display: defaultDisplay }), duration) 
  };
  
  handleStart() {
    this.setState({ 
      start: !this.state.start,
      buttonPressed: !this.state.buttonPressed
    });
    setTimeout(() => this.setState({ buttonPressed: !this.state.buttonPressed}), 500)
  };
 
  
  render() {
    
    return(
      <div id='drum-machine'>
        <Pattern animation={this.state.start}/>
        <div id="display" className="display">
          <div className={this.state.start ? "text-panel" : 'text-panel filter'}>
            <h1>{this.state.display}</h1>
            </div>
          <div className="controls">
            <button id='start-button' className={this.state.buttonPressed ? 'start pad-pressed' : 'start'} onClick={this.handleStart}>{this.state.start ? 'Pause' : 'Start'}</button>
          </div>
          </div>
        <PadBoard displayText={this.state.displayText} display={this.updateDisplay} start={this.state.start}/>
      </div>
    )
  };
  
};
const PadBoard = (props) => {
  const board = drumPads.map((pad, i) => <Pad 
    button={pad.key} 
    url={pad.url} 
    name={pad.name} 
    keyCode={pad.keyCode} 
    index={i} 
    displayText={props.displayText}
    display={props.display} 
    start={props.start}
    />)
    return(
      <div className="board-grid">{board}</div>
    )
}


class Pad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.pressPad = this.pressPad.bind(this)
    this.playSound = this.playSound.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  };
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  };
  handleKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    };
  };
  pressPad() {
    this.setState({ isActive: !this.state.isActive });
    setTimeout(() => this.setState({ isActive: !this.state.isActive }), 500);
  };
  playSound() {
    const audio = document.getElementById(this.props.button);
    audio.currentTime =0;
    audio.play();
    this.props.display(drumPads[this.props.index].name, this.props.button);
    this.pressPad()
  };

  componentDidUpdate(prevProps, prevState) {
   if (prevProps.start !== this.props.start) {
    document.getElementById(this.props.button).pause();
    document.getElementById(this.props.button).currentTime = 0;
    this.props.display();
   } 
   if (prevState.isActive !== this.state.isActive) {
     let pauseAudio = audioId.filter(id => id !== this.props.button)
     for (let elem of pauseAudio) {
       document.getElementById(elem).pause();
       document.getElementById(elem).currentTime = 0;
     }
     
   }
  };

  render() {
    let style = 'drum-pad'
    if (this.state.isActive) {
      style = style.concat(' pad-pressed')
    }
    if (!this.props.start) {
      style = style.concat(' filter')
    }
    return(
      <div 
      className={style} 
      onClick={this.props.start ? this.playSound : null}
      id={this.props.name}
      key={this.props.button}>
          <audio 
          className='clip'
          id={this.props.button}
          src={this.props.url} />
          <h2>{this.props.button}</h2>
        </div>
    )
  };

}


const Pattern = (props) => {
  const TableRow = <tr><td/><td/><td/><td/><td/><td/><td/></tr>;
  return(
    <table className={props.animation ? 'tableAnimation' : 'tableAnimation paused filter'}>
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
      {TableRow}
    </table>
  )
}
const audioId = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']
const defaultDisplay = 'Press a button';

//Music samples

const drumPads = [
  {
    key: 'Q',
    keyCode: 81,
    name: 'Keldabe kiss',
    url: 'https://soundbible.com/mp3/Metal%20Clang-SoundBible.com-19572601.mp3'
  },
  {
    key: 'W',
    keyCode: 87,
    name: 'Hop',
    url: 'https://soundbible.com/mp3/Cartoon%20Hop-SoundBible.com-553158131.mp3'
  },
  {
    key: 'E',
    keyCode: 69,
    name: 'Soon people would think only bicycles make such noise',
    url: 'https://soundbible.com/mp3/service-bell_daniel_simion.mp3'
  },
  {
    key: 'A',
    keyCode: 65,
    name: 'Fancy elevator',
    url: 'https://soundbible.com/mp3/Electronic_Chime-KevanGC-495939803.mp3'
  },
  {
    key: 'S',
    keyCode: 83,
    name: "Who doesn't like it cold?",
    url: 'https://soundbible.com/mp3/ice-cubes-glass-daniel_simon.mp3'
  },
  {
    key: 'D',
    keyCode: 68,
    name: "Boop",
    url: 'https://soundbible.com/mp3/Robot_blip-Marianne_Gagnon-120342607.mp3'
  },
  {
    key: 'Z',
    keyCode: 90,
    name: 'Rip and Tear',
    url: 'https://soundbible.com/mp3/Stretching Growing-SoundBible.com-2118870171.mp3'
  },
  {
    key: 'X',
    keyCode: 88,
    name: "YEET",
    url: 'https://soundbible.com/mp3/Slip On Banana Peel-SoundBible.com-1301716389.mp3'
  },
  {
    key: 'C',
    keyCode: 67,
    name: ":D",
    url: 'https://soundbible.com/mp3/Joke Sting-SoundBible.com-1968971319.mp3'
  },
]
 /*
 
name: "Don't you think dreams and the Internet are similar? They are both areas where the repressed conscious mind vents. [Paprika, 2006]",
    url: 'https://soundbible.com/mp3/old_movie_projector-daniel_simon.mp3'
 
 */ 

export default MyApp;