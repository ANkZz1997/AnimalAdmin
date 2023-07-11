import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function UserCount() {

  const series = [{
    name: 'User Joined',
    type: 'column',
    data: [500,600,400,400,700,600,700,600,600,300,200,400],
    color : "#506fe1"
  },
  {
    name: 'Total Users',
    type: 'line',
    data: [500,1100,1500,1900,2600,3200,3900,4500,5100,5400,5600,6000],
    color : "#ff555f"
  }]
  const options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show : true,
        tools: {
            download : false,
            zoom: false,
            zoomin: true,
            zoomout: true,
            pan: false,
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 4, 4]
    },
    title: {
      text: 'User Count (2023)',
      align: 'left',
      offsetX: 0,
      style: {
        fontSize: '14px',
        color: "#fff"
      }
    },
    xaxis: {
      categories: ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"],
      labels: {
        style :{
          colors : '#fff'
        }
      }
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#506fe1'
        },
        labels: {
          style: {
            colors: '#506fe1',
          }
        },
        title: {
          text: "User Joined",
          style: {
            color: '#506fe1',
          }
        },
        tooltip: {
          enabled: true
        }
      },
      {
        seriesName: 'Total Users',
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#ff555f'
        },
        labels: {
          style: {
            colors: '#ff555f',
          }
        },
        title: {
          text: "Total Users Count",
          style: {
            color: '#ff555f',
          }
        },
      },
    ],
    tooltip: {
      fillSeriesColor: true,
      x: {
        show: false,
      },
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40,
        labels :{
          colors :["white", "white", "white"]
        }
    },
    grid: {
      borderColor: 'grey',
        row: {
          colors: ['transparent', 'transparent'],
          opacity: 0.5
        },
      },
  }
  return (
    <div style={{"color":"#fff"}}><ReactApexChart options={options} series={series} type="line" height={300} /></div>

  )
}
