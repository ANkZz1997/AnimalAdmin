import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import URLS from "../../utils/urls";

export default function UserCount() {
  const [userData, setUserData] = useState("");
  const [userCount, setUserCount] = useState([]);
  const [totalCount, setTotalCount] = useState("");

  const userCountApi = async (req, res) => {
    try {
      const res = await axios.get(
        `${URLS.EXCHANGE.ADMIN.USER_COUNT_PER_MONTH}`
      );
      console.log("setUserData", res);
      setUserData(res?.data?.data);
      // setTotalCount(res?.data?.data?.totalCount)
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    userCountApi();
  }, []);

  useEffect(() => {
    if (userData?.length > 0) {
      const getUserCount = userData.map((i) => {
        const val = Object.values(i)[0];
        return val?.count;
      });
      setUserCount(getUserCount);
      const newArray = [];
      let sum = 0;
      for (let i = 0; i < getUserCount.length; i++) {
        sum += getUserCount[i];
        newArray.push(sum);
      }

      setTotalCount(newArray)
    }
  }, [userData]);

  console.log("setUserData", totalCount);

  const series = [
    {
      name: "User Joined",
      type: "column",
      data: userCount,
      color: "#506fe1",
    },
    {
      name: "Total Users",
      type: "line",
      data: totalCount,
      color: "#ff555f",
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: false,
          zoom: false,
          zoomin: true,
          zoomout: true,
          pan: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 4, 4],
    },
    title: {
      text: "User Count (2023)",
      align: "left",
      offsetX: 0,
      style: {
        fontSize: "14px",
        color: "#fff",
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "#fff",
        },
      },
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#506fe1",
        },
        labels: {
          style: {
            colors: "#506fe1",
          },
        },
        title: {
          text: "User Joined",
          style: {
            color: "#506fe1",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Total Users",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#ff555f",
        },
        labels: {
          style: {
            colors: "#ff555f",
          },
        },
        title: {
          text: "Total Users Count",
          style: {
            color: "#ff555f",
          },
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
      horizontalAlign: "left",
      offsetX: 40,
      labels: {
        colors: ["white", "white", "white"],
      },
    },
    grid: {
      borderColor: "grey",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
  };
  return (
    <div style={{ color: "#fff" }}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={300}
      />
    </div>
  );
}
