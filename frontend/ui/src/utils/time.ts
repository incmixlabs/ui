import { formatDistanceToNow } from 'date-fns';

export function shortFormatDistanceToNow(date: Date): string {
  try {
    const full = formatDistanceToNow(date, { addSuffix: false });

    return full
      .replace(/minutes?/, 'min')
      .replace(/hours?/, 'hrs')
      .replace(/seconds?/, 'sec')
      .replace(/days?/, 'd')
      .replace(/months?/, 'mo')
      .replace(/years?/, 'y');
  } catch (err) {
    console.error("Error formatting date:", err);
    return "";
  }
}
