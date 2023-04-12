import dayjs from "dayjs";
export function getSecond(time) {
    return dayjs(time).hour() + ":" + dayjs(time).minute();
}

export function getDay(time) {
    return dayjs().month() + "-" + dayjs(time).date();
}
