import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';

const xhr = new XMLHttpRequest();

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    points: 20,
    game: 'Pay to Play',
    counter: 0,
    message: '',
    playerID: '',
    username: '',
    loggedIn: false
  }
}

  CUALI = (e) => {
    e.preventDefault();
    if (!this.state.username) {
      this.setStage({message: 'Bad Data. Try Again'})
    } else {
      const playerName = this.state.username;

      xhr.addEventListener('load', () => {
        const responseData = JSON.parse(xhr.responseText)
        if(!responseData.error){
          this.setState({playerID: responseData.username})
        } else {
          this.setState({message:responseData.error})
        }
  
      })
  
      xhr.open('POST', 'http://localhost:5000/api/players/', true)
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send('username='+playerName)
      
    this.setState({
      loggedIn: true
    
    })

    }
  }

  setCounter = (counterScore) => {
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

// Function to handle basic userside logic.
  playGame = () => {
    const pid = this.state.playerID;

    xhr.addEventListener('load', () => {
      const responseData = JSON.parse(xhr.responseText)
      if(!responseData.error){
      this.setCounter(responseData.counter);
      this.setState({points: responseData.player.score})
      } else {
        this.setState({message:responseData.error})
      }

    })

    xhr.open('POST', 'http://localhost:5000/api/player/', true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send('id='+pid+'&score='+this.state.points)

}


  render() {
    const loggedIn = this.state.loggedIn;
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
        
        <Button variant="contained" color="secondary" onClick={this.playGame}>
          {this.state.game}
        </Button>
      </header>
    </div>
  );
    } else {
      return (
        <div className="App">
      <header className="App-header">
        <form>
          <input placeholder='Your Username' value={this.state.username} onChange={e => this.setState({username: e.target.value})} />
          <button onClick={this.CUALI}>LEts roll</button>
        </form>
      </header>
    </div>
      )
    }
  }
}

export default App;
