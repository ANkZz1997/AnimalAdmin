import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function NftCreatedVsSold() {
    const series = [{
        name: 'NFT Sold',
        type: 'column',
        data: [15,33,62,23,56,23,34,43,42,54,33,19],
      }, {
        name: 'NFT Created',
        type: 'column',
        data: [115,133,167,123,156,123,134,143,142,154,133,119]
      }, {
        name: 'Revenue (Lacs)',
        type: 'line',
        data: [30, 66, 124, 46, 112, 46, 68, 86, 84, 108, 66, 38]
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
          width: [1, 1, 4]
        },
        title: {
          text: 'Animal NFT Analysis (2022)',
          align: 'left',
          offsetX: 110,
        },
        xaxis: {
          categories: ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sept","Oct","Nov","Dec"],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            title: {
              text: "NFT Sold",
              style: {
                color: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            },
            title: {
              text: "NFT Created By Users",
              style: {
                color: '#00E396',
              }
            },
          },
          {
            seriesName: 'Revenue',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#FEB019'
            },
            labels: {
              style: {
                colors: '#FEB019',
              },
            },
            title: {
              text: "Revenue (In Lacs)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40,
        }
      }


  return (
    <div style={{"color":"black"}}><ReactApexChart options={options} series={series} type="line" height={300} /></div>
  )
}
