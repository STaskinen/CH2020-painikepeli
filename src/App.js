import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    points: 20,
    game: 'Pay to Play',
    counter: 0,
    message: ''
  }
}

// Function to handle basic userside logic.
  playGame = () => {
    this.setState({
      counter: this.state.counter + 1,
      points: this.state.points - 1
    });
    if (this.state.points <= 0) {
      this.setState({
        points: 20,
        game: 'Pay to Play',
        message: 'Welcome back'
      });
    } else if (this.state.points-1 === 0) {
      this.setState({
        message: 'Game Over',
        game: 'Continue?'
      });
    } else {
      if ((this.state.counter+1)%500 === 0 && this.state.counter !== 0) {
        this.setState({
          message: 'Congratulations! You won 250 points',
          points: this.state.points + 250
      });
      } else if ((this.state.counter+1)%100 === 0 && this.state.counter !== 0) {
        this.setState({
          message: 'Congratulations! You won 40 points',
        points: this.state.points + 40
      });
      } else if ((this.state.counter+1)%10 === 0 && this.state.counter !== 0) {
        this.setState({
          message: 'Congratulations! You won 5 points',
        points: this.state.points + 5
      });
      } else {
        this.setState({
          message: 'Sorry! No win this time',
        });
      }
    }
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
  <h1>{this.state.message}</h1>
      <h1>
          Points: {this.state.points}
        </h1>
        <h1>
          Counter: {this.state.counter}</h1>
        
        <Button variant="contained" color="secondary" onClick={this.playGame}>
          {this.state.game}
        </Button>
      </header>
    </div>
  );
  }
}

export default App;
