import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';


class App extends Component {
  constructor(props) {
  super(props);
  this.state = {
    points: 5,
    game: 'Pay to Play'
  }
}

// Function to handle basic userside logic.
  playGame = () => {
    if (this.state.points <= 0) {
      this.setState({
        points: 20,
        game: 'Pay to Play'
      });
    } else if (this.state.points === 1) {
      this.setState({
        points: this.state.points - 1,
        game: 'You have lost! Continue?'
      });
    } else {
      this.setState({points: this.state.points - 1});
    }
  }
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {this.state.points}
        </h1>
        
        <Button variant="contained" color="secondary" onClick={this.playGame}>
          {this.state.game}
        </Button>
      </header>
    </div>
  );
  }
}

export default App;
