import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={ () => this.props.onClick() }
//       >
//         { this.props.value }
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class ResetButton extends React.Component {
  render() {
    return (
      <button
        id="reset-button"
        onClick={ () => this.props.onClick() }
      >
        Reset Board
      </button>

    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null), 
      xIsNext: true,
      gameOver: false,
      winner: null,
    };
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => {this.handleClick(i)} }
      />
    );
  }

  renderResetButton() {
    return (
      <ResetButton 
        onClick = { () => {this.resetBoard()} }
      />
    );
  }

  winner(i) {
    // check down vertical, up vertical
    // left horizontal, right horizontal
    // down diagonal right, down diagonal left
    // up diagonal right, up diagonal left
    let winner = false;
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
      const[a,b,c] = lines[i];
      if(squares[a] && 
         squares[a] === squares[b] &&
         squares[b] === squares[c]){
          console.log('winner found : ' + this.state.xIsNext ? 'X' : 'O');
          winner = true;
      } 
      //else console.log('winner not found at ' +
      //String(lines[i][0]) + ', ' + String(lines[i][1]) +
     // ', ' + String(lines[i][0]) );
    }

    if (winner) return [true, this.state.xIsNext ? 'X' : 'O'];
    else return [false, 'X'];
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if(squares[i] != null) return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    let winner = this.winner(i);
    console.log('winner[0,1]: ' + String(winner[0]) + ' ' + String(winner[1]) );
    this.setState({
        xIsNext: !this.state.xIsNext,
        squares: squares,
        gameOver: winner[0],
        winner: winner[0] ? winner[1] : null,
    });
  }

  resetBoard () {
    const squares = this.state.squares.slice();
    for(let i = 0; i < squares.length; i++)
      squares[i] = null;
    this.setState({
      xIsNext: true,
      squares: squares,
      gameOver: false,
      winner: null,
    });
  }

  render() {
    const status = 'Next player: ' +
                   (this.state.xIsNext ? 'X' : 'O');
    
    const winner = (this.state.gameOver ? 'Winner is: ' + 
    this.state.winner +'!!!!' : '');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="status">{winner}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        {this.renderResetButton()}
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
