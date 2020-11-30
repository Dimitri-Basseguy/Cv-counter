// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
import './styles.scss';

const dateFormat = require('dateformat');

// mon tableau de dates
const allDate = [];

// == Composant
const App = () => {
  /** Nombre d'envoi */
  const [counter, setCounter] = useState(0);
  /** Stamp Timer */
  const [timer, setTimer] = useState('');

  useEffect(() => {
    allDate.push(dateFormat(timer, 'dddd, mmmm dS, yyyy, h:MM:ss TT'));
  }, [timer]);

  const handleClicButton = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    setTimer(new Date());
  };

  return (
    <div className="app">
      <h1>Combien de cv as-tu envoyé aujourd'hui ?</h1>
      <button className="btn-big" onClick={handleClicButton}>
        +1
      </button>
      <p>Total : {counter}</p>
      {allDate.map((gDate) => (
        <p> Date : {gDate} </p>
      ))}
    </div>
  );
};

// == Export
export default App;
