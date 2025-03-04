interface SingleTaskViewProps {
  count: number
  label: string
  backgroundColor: string
  icon: React.ReactNode
}

export function SingleTaskView({
  count,
  label,
  backgroundColor,
  icon,
}: SingleTaskViewProps) {
  return (
    <div className="flex w-[160px] flex-col items-center justify-center rounded-[20px] rounded-lg bg-white p-4">
      <div className="mb-2 rounded-[14px] p-4" style={{ backgroundColor }}>
        {icon}
      </div>
      <div className="text-center font-medium font-poppins text-[32px] text-[hsla(218,8%,27%,1)] leading-[48px] tracking-[0px]">
        {count}
      </div>
      <div className="text-center font-normal font-poppins text-[14px] text-[hsla(216,7%,57%,1)] leading-[21px] tracking-[0px]">
        {label}
      </div>
    </div>
  )
}
