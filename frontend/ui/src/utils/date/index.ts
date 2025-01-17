import { DateTime } from "luxon"

export const getDate = (timezone = "America/New_York") => {
  const date = DateTime.now().setZone(timezone).toISO()?.split("T")

  if (!date) {
    return {
      time: "",
      date: "",
    }
  }

  return {
    time: date[1].split(".")[0],
    date: date[0],
  }
}

export const getWeekDay = (dateTime: string | Date) => {
  const date = DateTime.fromJSDate(new Date(dateTime))
  return date.weekdayShort
}

export const getRelativeTime = (
  dateTime: string | Date,
  format = "MM/dd/yyyy, hh:mm a, ZZZ"
) => {
  // Convert the input to a DateTime object
  const dt =
    typeof dateTime === "string"
      ? DateTime.fromFormat(dateTime.replace(" UTC", ""), format, {
          zone: "utc",
        })
      : DateTime.fromJSDate(dateTime)

  // Get the current time
  const now = DateTime.now()

  // Calculate the relative time
  const relativeTime = dt.toRelative({ base: now })

  return relativeTime
}
