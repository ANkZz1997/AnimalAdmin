import React, { useEffect, useState } from 'react'
import 'chart.js/auto';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Doughnut} from 'react-chartjs-2'
import styled from 'styled-components';
import axios from 'axios';
import URLS from '../../utils/urls';
Chart.register(ChartDataLabels);

export default function UserTypeGraph() {
  const [typeObject, setTypeObject] = useState('');
  const [totalUsers, setTotalUsers] = useState('');

  const getUserWithSocialType = async() =>{
    try{
      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.ALL_USERS_SOCIAL_TYPE}`);
      if(res.status===200){
        setTypeObject(res?.data?.data?.object);
        setTotalUsers(res?.data?.data?.totalCount)
      }

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    getUserWithSocialType()
  },[])

  console.log("=====>>data", Object.keys(typeObject) )


    const data = {
        labels: Object.keys(typeObject),
        datasets: [
          {
            data: Object.values(typeObject),
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
            color:"white"
          }
        },
        plugins: {
          datalabels: {
            color: "white",
            font: {
              weight: "bold",
              size: 15,
            },
            padding: 4,
            formatter: (value)=>{
              return (value/totalUsers*100).toFixed(2) + "%";
            }
          },
        }
      };
      
      Chart.defaults.plugins.legend.labels.color = "white";

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
