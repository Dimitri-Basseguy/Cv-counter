// == Import npm
import React, { useState, useEffect } from 'react';
import LineChart from 'src/components/Chart';

// == Import
import './app.scss';

// == Composant
const App = () => {
  // initialisation du localstore
  if (localStorage.getItem('Datas') === null) {
    localStorage.setItem('Datas', JSON.stringify([]));
  }

  const initialCounter = () => Number(localStorage.getItem('count') || 0);
  const [counter, setCounter] = useState(initialCounter);
  const [dayCounter, setDayCounter] = useState(0);
  /** la date du jour */
  // const startDate = '07/02/2021';
  const startDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date());
  const [timer, setTimer] = useState(startDate);
  /** les datas du localStore converties */
  const datas = JSON.parse(localStorage.getItem('Datas'));
  /** la data du jour actuel */
  const todayData = datas.find((data) => data.date === startDate);
  // console.log(todayData.count);
  useEffect(() => {
    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter);
  }, [timer]);

  const handleClicButton = (e) => {
    e.preventDefault();
    const timeStamp = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date());
    setTimer(timeStamp.toString());
    setCounter(counter + 1);
    setDayCounter(dayCounter + 1);

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
        count: dayCounter + 1,
      };
      datas.push(newData);
    }

    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter + 1);
  };

  // console.log(datasDays());
  // console.log(datasCounts());

  return (
    <div className="app">
      <h1 className="app__title">Compteur de CV envoyés</h1>
      <button type="submit" className="btn-grad" onClick={handleClicButton}>
        +1
      </button>
      <p>Total : {counter}</p>
      {/* <p>Aujourd'hui:{todayData === null ? 0 : todayData.count}</p> */}
      <LineChart dataStorage={datas} />
    </div>
  );
};

// == Export
export default App;
