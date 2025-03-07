import { parse, addMinutes, format } from "date-fns";

export function addMinutesToTime(initialTime: string, addTime: string): string {
    const baseTime = parse(initialTime, "HH:mm", new Date());
    const [addHours, addMinutesValue] = addTime.split(":").map(Number);
    const newTime = addMinutes(baseTime, addHours * 60 + addMinutesValue);
    return format(newTime, "HH:mm");
}

