import { parse, addMinutes, format } from "date-fns";

export function addMinutesToTime(initialTime: string, addTime: string): string {
    let baseTime;

    try {
        baseTime = parse(initialTime, "HH:mm", new Date());
        const [addHours, addMinutesValue] = addTime.split(":").map(Number);
        const newTime = addMinutes(baseTime, addHours * 60 + addMinutesValue);
        return format(newTime, "HH:mm");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        baseTime = parse(initialTime, "HH:mm:ss", new Date());
        const [addHours, addMinutesValue] = addTime.split(":").map(Number);
        const newTime = addMinutes(baseTime, addHours * 60 + addMinutesValue);
        return format(newTime, "HH:mm:ss");
    }
}

