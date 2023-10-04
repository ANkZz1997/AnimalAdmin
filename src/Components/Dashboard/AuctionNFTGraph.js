import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import URLS from '../../utils/urls';

export default function AuctionNFTGraph() {
  const [auctionData, setAuctionData] = useState([]);
  const [nftAddedData, setNftAddedData] = useState();
  const [nftSoldData, setNftSoldData] = useState()


  const auctionApi = async() => {
    try {
      const res = await axios.get(
        `${URLS.EXCHANGE.ADMIN.AUCTION_STATUS_GRAPH}`
      );
      if (res?.status === 200) {
        setAuctionData(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log("auctionData",auctionData)

  useEffect(() => {
    auctionApi();
  }, []);

  
  useEffect(()=>{
    if(auctionData?.length >0){
      const dataFormat = [
        {
          x: "Jan",
          y: 0, 
        },
        {
          x: "Feb",
          y: 0,
        },
        {
          x: "Mar",
          y: 0,
        },
        {
          x: "Apr",
          y: 0,
        },
        {
          x: "May",
          y: 0,
        },
        {
          x: "June",
          y: 0,
        },
        {
          x: "July",
          y: 0,
        },
        {
          x: "Aug",
          y: 0,
        },
        {
          x: "Sept",
          y: 0,
        },
        {
          x: "Oct",
          y: 0,
        },
        {
          x: "Nov",
          y: 0,
        },
        {
          x: "Dec",
          y: 0,
        },
      ];
  
      const nftAdded = dataFormat?.map((i, ix) => {
        const count = Object.values(auctionData[ix])[0].count
        return { ...i, y: count };
      });
  
      setNftAddedData(nftAdded);
    
      const nftSold = dataFormat?.map((i, ix) => {
        const complete = Object.values(auctionData[ix])[0].complete
        return { ...i, y: complete};
      });
      console.log("marketData", nftAddedData)
      setNftSoldData(nftSold);
    }

  },[auctionData])

    const series = [{
        name: 'NFT Added In Auction',
        color : "#fba150",
        data: nftAddedData,
      }, {
        name: 'NFT Sold From Auction',
        color : "#19e1f7",
        data: nftSoldData,
        
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
          text: 'Auction Status (2023)',
          align: 'left',
          style: {
            fontSize: '14px',
            color: "#fff"
          }
        },
        xaxis: {
          type: 'month',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          labels: {
            style :{
              colors : '#fff'
            }
          }
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
        
          labels: {
            style: {
              colors: '#fff',
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
          fillSeriesColor: true,
          x: {
            show: false,
            // format: "yyyy",
            // labels :{
            //   color : "black"
            // }
          },
        },
        legend :{
          labels :{
            colors :["#fff", "#fff"]
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
    <div>
         <ReactApexChart options={options} series={series} type="area" height={300} />    
    </div>
  )
}
