import React, { useState } from 'react';
import './App.css';
import winSound from './assets/song.mp3';

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const newWinner = calculateWinner(nextSquares);
    if (newWinner) {
      setWinner(newWinner);
      setTimeout(() => {
        new Audio(winSound).play(); // تشغيل الصوت عند الفوز
      }, 10);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => handleClick(i)} />
        ))}
      </div>
      {winner && <p className="winner">Winner: {winner}</p>}
      {!winner && !squares.includes(null) && <p className="winner">It's a draw!</p>}
      <button className="reset-btn" onClick={resetGame}>Restart</button>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App = () => {
  return (
    <div className="game">
      <Board />
    </div>
  );
};

export default App;
