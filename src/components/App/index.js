// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
import './styles.scss';

// == Composant
const App = () => {
  // initialisation du localstore
  if (localStorage.getItem('Date') === null) {
    localStorage.setItem('Date', JSON.stringify([]));
  }

  const initialCounter = () => Number(localStorage.getItem('count') || 0);
  /** Nombre d'envoi */
  const [counter, setCounter] = useState(initialCounter);
  /** Stamp Timer */
  const startDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
  const [timer, setTimer] = useState(startDate);
  const dateStorage = localStorage.getItem('Date');
  const dates = JSON.parse(dateStorage);

  useEffect(() => {
    localStorage.setItem('Date', JSON.stringify(dates));
    localStorage.setItem('count', counter);
  }, [timer]);

  const handleClicButton = (e) => {
    e.preventDefault();
    const timeStamp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date());
    setTimer(timeStamp.toString());

    const ids = dates.map((date) => date.id);
    let idMax = 0;
    if (ids.length > 0) {
      idMax = Math.max(...ids);
    }

    const newDate = {
      id: idMax + 1,
      date: timer,
    };

    dates.push(newDate);
    setCounter(dates.length);
    localStorage.setItem('Date', JSON.stringify(dates));
    localStorage.setItem('count', counter);
  };

  return (
    <div className="app">
      <h1>Compteur de CV envoyés</h1>
      <button type="submit" className="btn-grad" onClick={handleClicButton}>
        +1
      </button>
      <p>Total : {dates.length}</p>
      {/* {dates.map((date) => (
        <p key={date.id}> Id: {date.id} Date : {date.date} </p>
      ))} */}
    </div>
  );
};

// == Export
export default App;
