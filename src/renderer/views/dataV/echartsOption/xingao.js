import { splitData, getDayArr, getSecondArr } from "@/utils/gpyj.js";

export function table2Optionfen(timeList, closeList, changeList) {
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "#999",
                },
            },
        },
        legend: {
            data: ["close", "changepercent"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        dataZoom: [
            {
                type: "inside",
                start: 0,
                end: 20,
            },
            {
                show: true,
                type: "slider",
                top: "90%",
                // show: false,
            },
        ],
        xAxis: [
            {
                type: "category",
                data: timeList,
                axisPointer: {
                    type: "shadow",
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "close",
                scale: true,
            },
            {
                type: "value",
                name: "changepercent",
            },
        ],
        series: [
            {
                name: "close",
                type: "line",
                yAxisIndex: 0,
                data: closeList,
            },
            {
                name: "changepercent",
                type: "line",
                yAxisIndex: 1,
                data: changeList,
            },
        ],
    };
    return option;
}

export function table2Option(data) {
    const upColor = "#ec0000";
    const upBorderColor = "#8A0000";
    const downColor = "#00da3c";
    const downBorderColor = "#008F28";
    // Each item: open，close，lowest，highest
    let data0 = getDayArr(splitData(data, "dealDate"));
    let dataMa5 = splitData(data, "ma5");
    let dataMa10 = splitData(data, "ma10");
    let dataMa20 = splitData(data, "ma20");
    let dataMa30 = splitData(data, "ma30");
    let volume = splitData(data, "volume");
    let dataK = splitData(data, ["open", "close", "low", "high"]);
    const option = {
        title: {
            text: "vol",
            left: 30,
            top: 350,
            xAxisIndex: 1,
            yAxisIndex: 1,
            textStyle: {
                fontSize: 16, //字体大小
                color: "#99CCFF", //字体颜色
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        legend: {
            data: ["日K", "MA5", "MA10", "MA20", "MA30"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        grid: [
            {
                height: "48%",
                // top: 20,
            },
            {
                height: "15%",
                bottom: 80,
            },
        ],
        // xAxis: {
        //     type: "category",
        //     data: data0,
        //     boundaryGap: false,
        //     // axisLine: { onZero: false },
        //     // splitLine: { show: false },
        //     // min: "dataMin",
        //     // max: "dataMax",
        // },
        xAxis: [
            {
                gridIndex: 0,
                type: "category",
                data: data0,
                boundaryGap: false,
            },
            {
                gridIndex: 1,
                type: "category",
                data: data0,
                boundaryGap: false,
            },
        ],
        // yAxis: {
        //     scale: true,
        //     splitArea: {
        //         show: false,
        //     },
        // },
        yAxis: [
            {
                gridIndex: 0,
                scale: true,
            },
            {
                gridIndex: 1,
                scale: true,
            },
        ],
        // dataZoom: [
        //     {
        //         type: "inside",
        //         start: 0,
        //         end: 20,
        //     },
        //     {
        //         show: true,
        //         type: "slider",
        //         top: "90%",
        //         start: 50,
        //         end: 100,
        //         gridIndex: 0,
        //         xAxisIndex: [0, 1],
        //     },
        // ],
        dataZoom: [
            {
                gridIndex: 0,
                type: "inside",
                start: 0,
                end: 20,
                // height: 10,
            },
            {
                gridIndex: 0,
                xAxisIndex: [0, 1], // 对应网格的索引
                show: true,
                start: 0,
                end: 20,
                type: "slider",
                top: "90%",
                // height: 20,
            },
            // {
            //     gridIndex: 1,
            //     type: "inside",
            //     start: 0,
            //     end: 20,
            // },
            // {
            //     gridIndex: 1,
            //     xAxisIndex: [0, 1], // 对应网格的索引
            //     show: true,
            //     type: "slider",
            //     bottom: 30,
            // },
        ],

        series: [
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: "日K",
                type: "candlestick",
                data: dataK,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor,
                },
            },
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: "MA5",
                type: "line",
                data: dataMa5,
                smooth: true,
                symbol: "none",
                lineStyle: {
                    opacity: 0.5,
                },
            },
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: "MA10",
                type: "line",
                data: dataMa10,
                smooth: true,
                symbol: "none",
                lineStyle: {
                    opacity: 0.5,
                },
            },
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: "MA20",
                type: "line",
                data: dataMa20,
                smooth: true,
                symbol: "none",
                lineStyle: {
                    opacity: 0.5,
                },
            },
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: "MA30",
                type: "line",
                data: dataMa30,
                smooth: true,
                symbol: "none",
                lineStyle: {
                    opacity: 0.5,
                },
            },
            {
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: "volume",
                type: "bar",
                data: volume,
                smooth: true,
                symbol: "none",
                lineStyle: {
                    opacity: 0.5,
                },
            },
        ],
    };
    return option;
}

export function table2bottomOption(data, timetype) {
    let data0;
    console.log(timetype);
    if (timetype == "0") {
        data0 = getSecondArr(splitData(data, "dealDate"));
    } else {
        data0 = getDayArr(splitData(data, "dealDate"));
    }
    let dif = splitData(data, "dif"); // 白
    let dea = splitData(data, "dea"); // 黄
    let macd = splitData(data, "macd");
    const option = {
        legend: {
            data: ["dif", "dea", "macd"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        xAxis: [
            {
                type: "category",
                data: data0,
            },
        ],
        yAxis: [
            {
                type: "value",
                // name: "Precipitation",
            },
            // {
            //     type: "value",
            //     name: "Temperature",
            //     min: 0,
            //     max: 25,
            //     interval: 5,
            //     axisLabel: {
            //         formatter: "{value} °C",
            //     },
            // },
        ],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        series: [
            {
                name: "dif",
                type: "line",
                data: dif,
                itemStyle: { normal: { color: "white" } },
            },
            {
                name: "dea",
                type: "line",
                data: dea,
                itemStyle: { normal: { color: "yellow" } },
            },
            {
                name: "macd",
                type: "bar",
                data: macd,
            },
        ],
    };
    return option;
}

export function table2bottomOptionKDJ(data, timetype) {
    let data0;
    if (timetype == "0") {
        data0 = getSecondArr(splitData(data, "dealDate"));
    } else {
        data0 = getDayArr(splitData(data, "dealDate"));
    }
    let k = splitData(data, "k"); // 白
    let d = splitData(data, "d"); // 黄
    let j = splitData(data, "j");
    const option = {
        legend: {
            data: ["k", "d", "j"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        xAxis: [
            {
                type: "category",
                data: data0,
            },
        ],
        yAxis: [
            {
                type: "value",
                // name: "Precipitation",
            },
            // {
            //     type: "value",
            //     name: "Temperature",
            //     min: 0,
            //     max: 25,
            //     interval: 5,
            //     axisLabel: {
            //         formatter: "{value} °C",
            //     },
            // },
        ],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        series: [
            {
                name: "k",
                type: "line",
                data: k,
            },
            {
                name: "d",
                type: "line",
                data: d,
            },
            {
                name: "j",
                type: "line",
                data: j,
            },
        ],
    };
    return option;
}

export function table2bottomOptionRSI(data, timetype) {
    let data0;
    if (timetype == "0") {
        data0 = getSecondArr(splitData(data, "dealDate"));
    } else {
        data0 = getDayArr(splitData(data, "dealDate"));
    }
    let rsi1 = splitData(data, "rsi1"); // 白
    let rsi2 = splitData(data, "rsi2"); // 黄
    let rsi3 = splitData(data, "rsi3");
    const option = {
        legend: {
            data: ["rsi1", "rsi2", "rsi3"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        xAxis: [
            {
                type: "category",
                data: data0,
            },
        ],
        yAxis: [
            {
                type: "value",
                // name: "Precipitation",
            },
            // {
            //     type: "value",
            //     name: "Temperature",
            //     min: 0,
            //     max: 25,
            //     interval: 5,
            //     axisLabel: {
            //         formatter: "{value} °C",
            //     },
            // },
        ],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                label: {
                    backgroundColor: "#6a7985",
                },
            },
        },
        series: [
            {
                name: "rsi1",
                type: "line",
                data: rsi1,
            },
            {
                name: "rsi2",
                type: "line",
                data: rsi2,
            },
            {
                name: "rsi3",
                type: "line",
                data: rsi3,
            },
        ],
    };
    return option;
}
