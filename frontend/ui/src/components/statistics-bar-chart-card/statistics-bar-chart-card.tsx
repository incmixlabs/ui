import ReactApexChart from "react-apexcharts"
// import { ApexOptions } from "apexcharts"

const StatisticsBarChartCard: React.FC = () => {
  const chartData = {
    series: [
      {
        name: "Sales",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        title: {
          text: "Sales ($)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: (val: number) => `$ ${val} thousands`,
        },
      },
    },
  }

  return (
    <div className="flex-2 flex-grow flex-col rounded-lg bg-white p-4 shadow">
      <h3 className="mb-4 font-semibold text-lg">Monthly Sales Statistics</h3>
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  )
}

export default StatisticsBarChartCard
