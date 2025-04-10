// import { SmartDatetimeInput } from "@components/datetime-picker"
// import { Box, CardContainer, Flex, Heading, StatisticsBarChartView } from "@incmix/ui"
// import React, { useState } from "react"

// export  function StatisticWidgets() {
//   const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

//   const handleDateChange = (date: Date) => {
//     setSelectedDate(date)
//   }

//   return (
//     <CardContainer>
//       <Flex justify={"between"}>
//         <Heading size="5" className="pb-4">
//           Statistics
//         </Heading>
//         <Box className="w-40">
//           <SmartDatetimeInput
//             className="bg-gray-2"
//             showTimePicker={false}
//             value={selectedDate}
//             onValueChange={handleDateChange}
//             placeholder="Enter a date"
//           />
//         </Box>
//       </Flex>
//       <StatisticsBarChartView />
//     </CardContainer>
//    )
// }

export { StatisticWidgets } from "./statistics"
export { StatisticWidgets2 } from "./statistics2"
