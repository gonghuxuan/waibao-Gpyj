import dayjs from "dayjs";
export function getSecond(time) {
    // return dayjs(time).hour() + ":" + dayjs(time).minute();
    return dayjs(time).format("YYYY-MM-DD HH:mm");
}

export function getDay(time) {
    return dayjs(time).month() + "-" + dayjs(time).date();
}

export function getMax(arr) {
    var max = arr[0];
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

export function getMin(arr) {
    var min = arr[0];
    var len = arr.length;
    for (var i = 1; i < len; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }
    return min;
}
