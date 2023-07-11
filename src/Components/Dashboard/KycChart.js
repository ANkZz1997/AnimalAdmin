import React from 'react'
import ReactApexChart from 'react-apexcharts'
import styled from 'styled-components'

export default function KycChart() {
    const appUsers = 3900;
    const penUsers = 1200;
    const rejUsers = 600;
    const totalUsers = appUsers + penUsers + rejUsers;
    const appPer = appUsers/totalUsers*100;
    const perPer = penUsers/totalUsers*100;
    const rejPer = rejUsers/totalUsers*100;

    const series = [appPer.toFixed(1), perPer.toFixed(1), rejPer.toFixed(1)]
    const options = {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  offsetY: 0,
                  offsetX: 30,
                  startAngle: 0,
                  endAngle: 270,
                  startAngle : 0,
                  hollow: {
                    margin: 5,
                    size: '30%',
                    background: 'transparent',
                    image: undefined,
                  },
                  dataLabels: {
                    name: {
                      show: false,
                    },
                    value: {
                      show: false,
                    }
                  }
                }
              },
              colors: ['#3e8109', '#f5dc15', '#fb1919',],
              labels: ['Approved', 'Pending', 'Rejected'],
              legend: {
                show: true,
                floating: true,
                fontSize: '14px',
                position: 'left',
                offsetX: -10,
                offsetY: 0,
                labels: {
                  useSeriesColors: true,
                },
                markers: {
                  size: 0
                },
                formatter: function(seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]+"%"
                },
                itemMargin: {
                  vertical: 3
                }
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  legend: {
                      show: false
                  }
                }
              }]
            }
  return (
    <Root><ReactApexChart options={options} series={series} type="radialBar" height={250} />
    <p>KYC Status Of Total {totalUsers} Users</p>
    </Root>
  ) 
}

const Root = styled.section`
text-align: center;
border: 1px solid grey;
padding : 2px;

`
