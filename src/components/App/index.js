// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
import './styles.css';

// mon tableau de dates
let allDate = [];

// == Composant
const App = () => {
  /** Nombre d'envoi */
  const [counter, setCounter] = useState(0);
  /** Date */
  const [timer, setTimer] = useState('');

  useEffect(() => {
    allDate.push(timer);
  }, [timer]);

  const handleClicButton = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    setTimer(new Date().toLocaleDateString());
  };

  // tableau vide à chaque fois...
  console.log(allDate);

  return (
    <div className="app">
      <h1>Combien de cv as-tu envoyé aujourd'hui ?</h1>
      <button className="" onClick={handleClicButton}>
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
