import React from 'react';
import styled from 'styled-components';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

function NftTransactionChart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Gas Fees Generated',
      },
    },
  };

  const labels = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Centerlised',
        data: [
          13, 34, 34, 23, 22, 20, 3, 56, 55, 34, 32, 3, 45, 66, 76, 11, 12, 12,
          3, 30, 23, 3, 45, 67, 5, 4, 34, 40, 34, 54,
        ],
        backgroundColor: '#2e93f0',
      },
    ],
  };

  return (
    <Root>
      <div className="user_graph">
        <Bar options={options} data={data} />
      </div>
    </Root>
  );
}

export default NftTransactionChart;

const Root = styled.section`
  .user_graph {
    background-color: #fff;
  }
`;
