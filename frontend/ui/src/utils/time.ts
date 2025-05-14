import { formatDistanceToNow } from 'date-fns';
export function shortFormatDistanceToNow(date: Date): string {
    const full = formatDistanceToNow(date, { addSuffix: false });
  
    return full
      .replace(/minutes?/, 'min')
      .replace(/hours?/, 'hrs')
      .replace(/seconds?/, 'sec')
      .replace(/days?/, 'd')
      .replace(/months?/, 'mo')
      .replace(/years?/, 'y');
  }