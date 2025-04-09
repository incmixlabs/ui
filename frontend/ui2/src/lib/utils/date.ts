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

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) {
  return new Intl.DateTimeFormat("en-US", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(new Date(date))
}
export function calculateDaysRemaining(endDate: DateTime): number {
  const today = DateTime.now()
  const diff = endDate.diff(today, "days").days
  return Math.max(0, Math.ceil(diff))
}

export function calculateDaysElapsed(startDate: DateTime): number {
  const today = DateTime.now()
  const diff = today.diff(startDate, "days").days
  return Math.ceil(diff)
}

export function calculateTotalDuration(
  startDate: DateTime,
  endDate: DateTime
): number {
  const diff = endDate.diff(startDate, "days").days
  return Math.max(0, Math.ceil(diff))
}

export function calculateProgressPercentage(
  startDate: DateTime,
  endDate: DateTime
): number {
  const totalDuration = calculateTotalDuration(startDate, endDate)

  // Handle invalid date ranges
  if (totalDuration <= 0) {
    return 0 // Return 0% progress for invalid date ranges
  }

  // If start date is in the future, progress is 0%
  if (startDate > DateTime.now()) {
    return 0
  }

  const daysElapsed = calculateDaysElapsed(startDate)

  // Cap at 100%
  return Math.min(Math.round((daysElapsed / totalDuration) * 100), 100)
}

