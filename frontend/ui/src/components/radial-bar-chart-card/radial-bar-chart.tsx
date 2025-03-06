import type React from "react"
import { useState } from "react"
import Chart from "react-apexcharts"

const RadialBarChart: React.FC = () => {
  const [_series, _setSeries] = useState<number[]>([44, 55, 13, 33])

  const _options: ApexCharts.ApexOptions = {
    chart: {
      width: 100,
      type: "donut",
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 10,
      colors: ["#fff"], // ✅ White stroke around segments
    },
    fill: {
      colors: ["#f4a77d", "#4361ee", "#ffd166"],
      opacity: 1,
      type: "solid",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              fontFamily: "Poppins",
              color: "#4361ee",
            },
            value: {
              show: true,
              fontSize: "24px",
              fontFamily: "Poppins",
              color: "#4361ee",
              formatter: (val) => `${val}%`,
            },
          },
        },
      },
    },
    labels: ["Apple", "Mango", "Banana", "Orange"], // ✅ Custom labels instead of "series1"
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 20,
          },
        },
      },
    ],
  }

  return (
    <div className="flex flex-col items-center">
      <div className="absolute inset-0 rounded-full" />

      <div className="custom-chart-container">
        <Chart options={_options} series={_series} type="donut" />
      </div>

      <style>
        {`
    .custom-chart-container .apexcharts-datalabels text {
      font-size: 16px !important;
      font-weight: bold;
      fill: #fff !important;
    }

    .custom-chart-container .apexcharts-tooltip {
      background: #000 !important;
      color: white !important;
      border-radius: 8px !important;
    }
  `}
      </style>
    </div>
  )
}

export default RadialBarChart
