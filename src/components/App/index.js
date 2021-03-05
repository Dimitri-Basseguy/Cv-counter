// == Import npm
import React, { useState, useEffect } from 'react';
import LineChart from 'src/components/Chart';
import Form from 'src/components/Form';
import List from 'src/components/List';

// == Import
import './app.scss';
/** Data des site de jobs */
import jobBoards from 'src/datas/jobboards';

// == Composant
const App = () => {
  // initialisation du localstore
  if (localStorage.getItem('Datas') === null) {
    localStorage.setItem('Datas', JSON.stringify([]));
  }

  const initialCounter = () => Number(localStorage.getItem('count') || 0);
  const [counter, setCounter] = useState(initialCounter);
  const [dayCounter, setDayCounter] = useState(0);
  const [link, setLink] = useState({ title: '', url: '' });
  /** la date du jour */
  // const startDate = '22/02/2021';
  const startDate = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'short' }).format(new Date());
  const [timer, setTimer] = useState(startDate);
  /** les datas du localStore converties */
  const datas = JSON.parse(localStorage.getItem('Datas'));
  /** les datas du localStore converties et inversé */
  const datasReverse = datas.slice().reverse();
  /** la data du jour actuel */
  const todayData = datas.find((data) => data.date === startDate);

  useEffect(() => {
    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter);
    // if (todayData != null) {
    //   todayData.links.push(link);
    // }
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

    if (todayData != null) {
      todayData.count += 1;
      todayData.links.push(link);
      setLink({ title: '', url: '' });
    }
    else {
      const newData = {
        id: idMax + 1,
        date: timer,
        count: dayCounter + 1,
        links: [link],
      };
      datas.push(newData);
      setLink({ title: '', url: '' });
    }

    localStorage.setItem('Datas', JSON.stringify(datas));
    localStorage.setItem('count', counter + 1);
  };

  /**
   * Renvoi le bon logo aux liens d'annonces
   * @return string
   */
  const findLogo = (param) => {
    let url = '';
    jobBoards.forEach((jobBoard) => {
      if (param.includes(jobBoard.board) === true) {
        url = jobBoard.img;
      }
    });

    return url;
  };

  const todayCounts = () => {
    if (todayData != null) {
      const todaysCount = todayData.count;
      return todaysCount;
    }
    return (
      0
    );
  };

  return (
    <>
      <div className="bg-image" />
      <div className="app">
        <div className="app__title">
          <h1>Compteur de CV envoyés</h1>
          <div className="count">
            <p className="count__total">Total : {counter}</p>
            <p>Aujourd'hui : {todayCounts()}</p>
          </div>
        </div>
        <Form handleClicButton={handleClicButton} link={link} setLink={setLink} />
        <LineChart dataStorage={datas} />
        <List datasReverse={datasReverse} findLogo={findLogo} />
      </div>
    </>
  );
};

// == Export
export default App;
