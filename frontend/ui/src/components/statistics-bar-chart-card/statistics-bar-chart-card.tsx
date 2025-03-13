import StatisticsBarChartView from "./statistics-bar-chart-view"

const StatisticsBarChartCard: React.FC = () => {
  return (
    <div className="flex w-full flex-1">
      <StatisticsBarChartView
        title="Statistics"
        categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
        newTasksData={[10, 15, 8, 12]}
        inProgressData={[5, 8, 12, 10]}
      />
    </div>
  )
}

export default StatisticsBarChartCard
