import React from 'react';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';

import './chart.scss';

const Chart = ({ dataStorage }) => {
  /** Valeurs du nbrs de jours
   * @return array
  */
  const datasDays = () => {
    const days = [];

    dataStorage.forEach((data) => {
      days.push(data.date);
    });
    return (days);
  };

  /** Valeurs cv envoyés
   * @return array
  */
  const datasCounts = () => {
    const counts = [];

    dataStorage.forEach((data) => {
      counts.push(data.count);
    });
    return (counts);
  };

  const data = {
    labels: datasDays(),
    datasets: [
      {
        label: 'CV',
        data: datasCounts(),
        borderColor: ['#0072ff'],
        backgroundColor: ['#0072ff'],
        pointBackgroundColor: ['#00c6ff'],
        pointBorderColor: ['#0072ff'],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Statistiques',
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
          // max: 20,
          stepSize: 2,
        },
      }],
    },
  };

  return (
    <div className="chart">
      <Line data={data} options={options} />
    </div>
  );
};

Chart.propTypes = {
  dataStorage: PropTypes.array.isRequired,
};

export default Chart;
