import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import URLS from '../../utils/urls'

export default function NftCreatedVsSold() {
  const [analysisData, setAnalysisData] = useState([]);
  const [sold, setSold] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [created, setCreated] = useState([]);
  const [maxVal, setMaxVal] = useState('');


  const analysisApi = async()=>{
    try{

      const res = await axios.get(`${URLS.EXCHANGE.ADMIN.NFT_DATA_ANALYSIS}`)
      console.log("res_analysis",res);
      setAnalysisData(res?.data?.data)

    }catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    analysisApi()
  },[])

  useEffect(()=>{
    if(analysisData?.length>0){

      const nftCreated = analysisData.map((i)=>{
        return Object.values(i)[0].created
      })
      setCreated(nftCreated);

      const soldData = analysisData.map((i)=>{
        return Object.values(i)[0].sold
      })
      setSold(soldData);

      const revenueData = analysisData.map((i)=>{
        return Object.values(i)[0].platformFee
      })
      setRevenue(revenueData);

      const maxSold = Math.max(...soldData)
      const maxCreate = Math.max(...nftCreated)
      setMaxVal(Math.max(maxSold, maxCreate))

    }

  },[analysisData])


  console.log("sold_revenue_created", sold, revenue, created)
    const series = [{
        name: 'NFT Sold',
        type: 'column',
        data: sold,
      }, {
        name: 'NFT Created',
        type: 'column',
        data: created
      }, {
        name: 'Revenue (Eths)',
        type: 'line',
        data: revenue
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
          text: 'NFT Analysis (2023)',
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
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              },
              formatter: function (value) {
                return value.toFixed(0);
              },
              
            },
            max: maxVal,
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
              },
              formatter: function (value) {
                return value.toFixed(0);
              },
            },
            max: maxVal,
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
              formatter: function (value) {
                return value.toFixed(6);
              },
            },
            title: {
              text: "Revenue (In Eths)",
              style: {
                color: '#FEB019',
              }
            }
          },
        ],
        tooltip: {
          // fixed: {
          //   enabled: true,
          //   position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
          //   offsetY: 30,
          //   offsetX: 60,
          // },
          fillSeriesColor: true,
          x: {
            show: false,
            // format: "yyyy",
            // labels :{
            //   color : "black"
            // }
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
