export const minutesToHoursFormatter = (minutes: number) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const minutesValue = String(minutes % 60).padStart(2, '0');
    return `${hours}:${minutesValue}`;
}
