import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);
// dayjs.extend(isBetween);
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

export function sendRequestWithInterval(func, vm) {
    let timer = null;
    // 定义一个内部函数来设置定时器
    function setTimer() {
        console.log("created");
        timer = setInterval(() => {
            if (inTime()) {
                func();
            }
        }, 30000);
    }
    function inTime() {
        let flag = true;
        const zaoStart = dayjs().hour(9).minute(15);
        const zaoend = dayjs().hour(11).minute(31);
        const wanStart = dayjs().hour(13).minute(0);
        const wanend = dayjs().hour(15).minute(1);
        const now = dayjs();
        if (
            now.isBetween(zaoStart, zaoend) ||
            now.isBetween(wanStart, wanend)
        ) {
            flag = true;
        } else {
            flag = false;
        }
        return flag;
    }
    // 在组件的created生命周期中调用函数，设置定时器
    setTimer();
    // 在组件的beforeDestroy生命周期中清除定时器
    vm.$once("hook:deactivated", () => {
        console.log("deactivatedggggggggggggggggg");
        clearInterval(timer);
    });
    vm.$once("hook:beforeDestroy", () => {
        console.log("beforeDestroyggggggggggggggggggggggggggggggggggggggg");
        clearInterval(timer);
    });
    vm.$once("hook:activated", () => {
        console.log("activegggggggggggggggggggggggg");
    });
}
