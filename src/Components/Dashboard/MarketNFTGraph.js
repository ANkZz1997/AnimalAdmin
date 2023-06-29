import React from 'react'
import ReactApexChart from 'react-apexcharts'

export default function MarketNFTGraph() {
    const series = [{
        name: 'NFT Added In Marketplace',
        data: [{
            x: "Jan",
            y: 222
          },
          {
            x: "Feb",
            y: 224
          },
          {
            x: "Mar",
            y: 229
          },
          {
            x: "Apr",
            y: 242
          },
          {
            x: "May",
            y: 248
          },
          {
            x: "June",
            y: 234
          },
          {
            x: "July",
            y: 225
          },
          {
            x: "Aug",
            y: 216
          },
          {
            x: "Sept",
            y: 218
          },
          {
            x: "Oct",
            y: 230
          },
          {
            x: "Nov",
            y: 255
          },
          {
            x: "Dec",
            y: 266
          },
        ]
      }, {
        name: 'NFT Sold From Marketplace',
        data: [
          {
            x: "Jan",
            y: 16
          },
          {
            x: "Feb",
            y: 21
          },
          {
            x: "Mar",
            y: 25
          },
          {
            x: "Apr",
            y: 36
          },
          {
            x: "May",
            y: 35
          },
          {
            x: "June",
            y: 48
          },
          {
            x: "July",
            y: 31
          },
          {
            x: "Aug",
            y: 24
          },
          {
            x: "Sept",
            y: 30
          },
          {
            x: "Oct",
            y: 61
          },
          {
            x: "Nov",
            y: 50
          },
          {
            x: "Dec",
            y: 44
          },
        ]
      }]

    const options =  {
        chart: {
          type: 'area',
          height: 350,
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
          curve: 'straight'
        },
        
        title: {
          text: 'Marketplace Status (2023)',
          align: 'left',
          style: { 
            fontSize: '14px',
            color: "grey"
          }
        },
        xaxis: {
          type: 'month',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          }
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
        
          labels: {
            style: {
              colors: '#8e8da4',
            },
            offsetY: 0,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false
          }
        },
        fill: {
          opacity: 0.5
        },
        tooltip: {
          x: {
            format: "yyyy",
          },
        },
      }
    
  return (
    <div>
         <ReactApexChart style={{"color":"black"}} options={options} series={series} type="area" height={300} />    
    </div>
  )
}
