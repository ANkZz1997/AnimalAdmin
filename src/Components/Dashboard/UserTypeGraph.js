import React from 'react'
import 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2'
import styled from 'styled-components';
Chart.register(ChartDataLabels);

export default function UserTypeGraph() {

    const totalUsers = 200;

    const data = {
        labels: ["Gmail Users", "FB Users", "MetaMast User", "CoinBase Users", "Animal Users"],
        datasets: [
          {
            data: [30,25,45,10,90],
            backgroundColor: [
              "#eb4d56",
              "#5574ff",
              "#e27625",
              "#3ebed9",
              "#66b924"
            ],
            hoverBackgroundColor: [
              "#eb4d56",
              "#5574ff",
              "#e27625",
              "#3ebed9",
              "#66b924"
            ],
            hoverBorderWidth: 6,
            offset: 2,
            borderRadius: 2
          }
        ]
      };

      const options = {
        cutoutPercentage: 50,
        responsive: true,
        layout: {
          padding: 0
        },
        legend: {
          display: true,
          position: "right",
          align: "middle",
          labels: {
            boxWidth: 30,
            padding: 20,
          }
        },
        plugins: {
          datalabels: {
            color: "#000",
            font: {
              // weight: "bold",
              size: 14
            },
            padding: 4,
            formatter: (value)=>{
              return value/totalUsers*100 + "%";
            }
          },
        }
      };

  return (
    <Root>
    <div className="content">
      <Doughnut data={data} options={options}/>
      <div className="doughnut-title">
        <div className="donuttitle">Total</div>
        <div className="donutsubtitle">{`${totalUsers} Users`}</div>
      </div>
    </div>
  </Root>
  )
}

const Root = styled.section`
text-align: center;
border: 1px solid grey;

`
