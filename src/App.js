import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './App.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
const serverUrl = 'https://painikepeli-backend.herokuapp.com/api';

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    points: 20,
    game: true,
    counter: 0,
    message: '',
    playerID: '',
    username: '',
    loggedIn: false
  }
}

setCounter = () => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    const counterData = JSON.parse(xhr.responseText)
    if(!counterData.error) {
      const counterScore = counterData.counter;
      const count10 = 10-counterScore%10;
      const count100 = 100-counterScore%100;
      const count500 = 500-counterScore%500;
      if(count500 === count10) {
        this.setState({counter: count10});
      } else if (count10 === count100) {
        this.setState({counter: count10});
      } else {
        this.setState({counter: count10});
      }
    }
  })

  xhr.open('GET', serverUrl + '/counter/', true)
  xhr.send();
}

//Create User and Log In
  CUALI = () => {
    if (!this.state.username) {
      this.setStage({message: 'Bad Data. Try Again'})
    } else {
      const xhr = new XMLHttpRequest();
      const playerName = this.state.username;

      xhr.addEventListener('load', () => {
        const creationData = JSON.parse(xhr.responseText)
        if(!creationData.error){
          cookies.set('myID', creationData._id)
          this.setState({playerID: creationData._id})
        } else {
          this.setState({message: creationData.error})
        }
  
      })
  
      xhr.open('POST', serverUrl + '/players/', true)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send('username='+playerName)
      
    this.setState({
      loggedIn: true
    
    })

    }
  }


// Function to handle basic userside logic.
  playGame = () => {
    const xhr = new XMLHttpRequest();
    const pid = this.state.playerID;

    xhr.addEventListener('load', () => {
      const responseData = JSON.parse(xhr.responseText)
      if(!responseData.error){
        if(responseData.gameState !== this.state.game) {
          this.setState({game: responseData.gameState})
        }
      this.setCounter();
      this.setState({
        message: responseData.message,
        points: responseData.body.player.score
      })
      } else {
        this.setState({message:responseData.error})
      }
      

    })

    xhr.open('POST', serverUrl + '/player/', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('id='+pid+'&score='+this.state.points)

}

reqReset = () => {
  const xhr = new XMLHttpRequest();
  const pid = this.state.playerID;

  xhr.addEventListener('load', () => {
    const responseData = JSON.parse(xhr.responseText)
    if(!responseData.error){
      if(responseData.gameState !== this.state.game) {
        this.setState({game: responseData.gameState})
      }
    this.setCounter();
    this.setState({
      message: responseData.message,
      points: responseData.body.player.score
    })
    } else {
      this.setState({message:responseData.error})
    }

  })
  
  xhr.open('POST', serverUrl + '/reset/', true)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send('id='+pid)
  
}


componentDidMount(){
  this.setCounter();
  if(cookies.get('myID')) {
    const id = cookies.get('myID');
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      const responseData = JSON.parse(xhr.responseText);
      if(!responseData.error){
        let gameState;
        if (responseData.score > 0) {
          gameState = true;
        } else {
          gameState = false;
        }
        this.setState({
          message: 'Welcome back ' + responseData.username,
          playerID: responseData._id,
          username: responseData.username,
          points: responseData.score,
          loggedIn: true,
          game: gameState
        })
      }
    })

    xhr.open('GET', serverUrl + '/playerinfo/' + id, true)
    xhr.send();
  }
}

  render() {
    const loggedIn = this.state.loggedIn;
    let playButton;

    if (this.state.game === false) {
      playButton = 
        <Button variant="contained" color="secondary"  onClick={this.reqReset}>
        Plead      
        </Button>
      
    } else {
      playButton = 
        <Button variant="contained" color="secondary"  onClick={this.playGame}>
        Play      
        </Button>
    }
    
    if (loggedIn){
  return (
    <div className="App">
      <header className="App-header">
  <h1>{this.state.message}</h1>
      <h1>
          Points: {this.state.points}
        </h1>
        <h1>
          To win: {this.state.counter}</h1>
        
        {playButton}
      </header>
    </div>
  );
    } else {
      return (
        <div className="App">
      <header className="App-header">
        <form>
          <TextField id="username" label="Username" variant="filled" onChange={e => this.setState({username: e.target.value})} />
          <Button variant="contained" color="secondary"  onClick={this.CUALI}>
            Lets roll
          </Button>
        </form>
      </header>
    </div>
      )
    }
  }
}

export default App;
