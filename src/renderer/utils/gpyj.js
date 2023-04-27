import dayjs from "dayjs";
export function getSecond(time) {
    // return dayjs(time).hour() + ":" + dayjs(time).minute();
    return dayjs(time).format("YYYY-MM-DD HH:mm");
}

export function getDay(time) {
    return dayjs(time).format("YYYY-MM-DD");
}

export function getDayArr(data) {
    const newdata = [];
    data.forEach((element) => {
        newdata.push(getDay(element));
    });
    return newdata;
}

export function getSecondArr(data) {
    const newdata = [];
    data.forEach((element) => {
        newdata.push(getSecond(element));
    });
    return newdata;
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

export function splitData(rawData, key) {
    console.log(key);
    const values = [];
    if (typeof key === "string") {
        for (var i = 0; i < rawData.length; i++) {
            values.push(rawData[i][key]);
        }
    } else {
        for (var i = 0; i < rawData.length; i++) {
            const itemArr = [];
            key.forEach((item) => {
                // console.log(rawData[i][item]);
                itemArr.push(rawData[i][item]);
            });
            values.push(itemArr);
        }
    }
    return values;
}

export function getFiveDay() {
    var weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var arr = [];
    var date = new Date();
    var oneDayLong = 24 * 60 * 60 * 1000;
    var num = 0;
    for (var i = 0; i < weekday.length; i++) {
        var nowTime = date.getTime();
        nowTime = nowTime - oneDayLong * i;
        num = new Date(nowTime).getDay();
        if (num != 0 && num != 6) {
            arr.push(dayjs(nowTime).format("YYYY-MM-DD"));
        }
    }
    return arr;
}

export function get10dayago() {
    var weekday = [
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
    ];
    var arr = [];
    var date = new Date();
    var oneDayLong = 24 * 60 * 60 * 1000;
    var num = 0;
    for (var i = 0; i < weekday.length; i++) {
        var nowTime = date.getTime();
        nowTime = nowTime - oneDayLong * i;
        num = new Date(nowTime).getDay();
        if (num != 0 && num != 6) {
            arr.push(dayjs(nowTime).format("YYYY-MM-DD"));
        }
    }
    return arr[9];
}
