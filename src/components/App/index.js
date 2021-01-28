// == Import npm
import React, { useState, useEffect } from 'react';

// == Import
import './styles.scss';

// == Composant
const App = () => {
  // initialisation du localstore
  if (localStorage.getItem('Datas') === null) {
    localStorage.setItem('Datas', JSON.stringify([]));
  }

  const initialCounter = () => Number(localStorage.getItem('count') || 0);
  const [counter, setCounter] = useState(initialCounter);
  /** la date du jour */
  const startDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date());
  const [timer, setTimer] = useState(startDate);
  /** les datas du localStore converties */
  const datas = JSON.parse(localStorage.getItem('Datas'));
  /** la data du jour */
  const todayData = datas.find((data) => data.date === startDate);

  useEffect(() => {
    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter);
  }, [timer]);

  const handleClicButton = (e) => {
    e.preventDefault();
    const timeStamp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date());
    setTimer(timeStamp.toString());

    const ids = datas.map((date) => date.id);
    let idMax = 0;
    if (ids.length > 0) {
      idMax = Math.max(...ids);
    }

    if (todayData) {
      todayData.count += 1;
    }
    else {
      const newData = {
        id: idMax + 1,
        date: timer,
        count: datas.length + 1,
      };
      datas.push(newData);
    }

    setCounter(counter + 1);
    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter + 1);
  };

  return (
    <div className="app">
      <h1>Compteur de CV envoyés</h1>
      <button type="submit" className="btn-grad" onClick={handleClicButton}>
        +1
      </button>
      <p>Total : {counter}</p>
      <p>Aujourd'hui: {!datas ? todayData.count : 0}</p>
    </div>
  );
};

// == Export
export default App;
