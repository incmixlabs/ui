import { ThreeDots } from "./icons/clipboard"
import RadialBarChart from "./radial-bar-chart"

export const RadialBarChartCard: React.FC = () => {
  // Project stats
  const ongoingProjects = 420
  const onHoldProjects = 210
  const completedProjects = 200

  // Colors for the chart segments
  const ongoingColor = "#f4a77d"
  const onHoldColor = "#4361ee"
  const completedColor = "#ffd166"

  return (
    <div
      className={
        "flex max-w-[350px] flex-col gap-6 rounded-[20px] bg-white p-6 shadow-sm"
      }
    >
      <div className="flex w-full items-center justify-between font-bold font-poppins text-[hsla(218,8%,27%,1)] ">
        <h2 className="text-[20px]">projects</h2>
        <ThreeDots />
      </div>
      <RadialBarChart />
      <div className="flex items-center justify-center gap-4 text-center">
        <div className="flex flex-col items-center ">
          <div
            className="mb-2 h-[6px] w-[6px] rounded-sm"
            style={{ backgroundColor: ongoingColor }}
          />
          <span className="font-medium font-poppins text-[32px] text-[hsla(218,8%,27%,1)] leading-[48px] tracking-[0px]">
            {ongoingProjects}
          </span>
          <span className="text-[14px] text-[hsla(216,7%,57%,1)] ">
            Ongoing
          </span>
        </div>
        <div className="h-[75px] w-[1px] bg-[#E8E9EB]" />
        <div className="flex flex-col items-center ">
          <div
            className="mb-2 h-[6px] w-[6px] rounded-sm"
            style={{ backgroundColor: onHoldColor }}
          />
          <span className="font-medium font-poppins text-[32px] text-[hsla(218,8%,27%,1)] leading-[48px] tracking-[0px]">
            {onHoldProjects}
          </span>
          <span className="text-[14px] text-[hsla(216,7%,57%,1)] ">Hold</span>
        </div>
        <div className="h-[75px] w-[1px] bg-[#E8E9EB]" />

        <div className="flex flex-col items-center">
          <div
            className="mb-2 h-[6px] w-[6px] rounded-sm"
            style={{ backgroundColor: completedColor }}
          />
          <span className="font-medium font-poppins text-[32px] text-[hsla(218,8%,27%,1)] leading-[48px] tracking-[0px]">
            {completedProjects}
          </span>
          <span className="text-[14px] text-[hsla(216,7%,57%,1)] ">Done</span>
        </div>
      </div>
    </div>
  )
}

export default RadialBarChartCard
