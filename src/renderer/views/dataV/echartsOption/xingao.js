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
            formatter: (params) => {
                // console.log(params[0]);
                var res = "时间: " + params[0].axisValue;
                res += "<br/>价格: " + params[0].data;
                res +=
                    "<br/>涨幅: " + changeList[params[0].dataIndex].toFixed(2);
                return res;
            },
        },
        legend: {
            data: ["价格", "涨幅"],
            textStyle: {
                fontSize: 16, //字体大小
                color: "#ffffff", //字体颜色
            },
        },
        // dataZoom: [
        //     {
        //         type: "inside",
        //         start: 80,
        //         end: 100,
        //     },
        //     {
        //         show: true,
        //         type: "slider",
        //         top: "90%",
        //         // show: false,
        //     },
        // ],
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
                name: "价格",
                scale: true,
            },
            // {
            //     type: "value",
            //     name: "涨幅",
            // },
        ],
        series: [
            {
                name: "价格",
                type: "line",
                data: closeList,
            },
            // {
            //     name: "涨幅",
            //     type: "line",
            //     data: changeList,
            //     show: false,
            //     itemStyle: {
            //         color: "red",
            //     },
            // },
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
            data: ["日K", "MA5", "MA10", "MA20", "MA30"],
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            // itemFormatter: function (params) {
            //     // 获取当前数据的各项信息
            //     var seriesName = params.seriesName;
            //     var open = params.data[0];
            //     var close = params.data[1];
            //     var lowest = params.data[2];
            //     var highest = params.data[3];
            //     var timestamp = params.data[4];

            //     // 将最低价修改为中文“最低价”
            //     var formattedLowest = "最低价: " + lowest;

            //     // 返回修改后的 tooltip 文本
            //     return [
            //         "日期: " + new Date(timestamp).toLocaleDateString(),
            //         "名称: " + seriesName,
            //         "开盘价: " + open,
            //         "收盘价: " + close,
            //         formattedLowest,
            //         "最高价: " + highest,
            //     ].join("<br>");
            // },
            locale: "zh_CN",
            // formatter: "{b0}: {c0}<br />{b1}: {c1}",

            // formatter: function (params) {
            //     console.log(params[1].data);
            //     var res = "时间: " + params[0].name;
            //     res += "<br/>开盘价: " + params[0].data[1].toFixed(2);
            //     res += "<br/>收盘价: " + params[0].data[2].toFixed(2);
            //     res += "<br/>最低价: " + params[0].data[3].toFixed(2);
            //     res += "<br/>最高价: " + params[0].data[4].toFixed(2);
            //     res += "<br/>MA5: " + params[1].data.toFixed(2);
            //     res += "<br/>MA10: " + params[2].data.toFixed(2);
            //     res += "<br/>MA20: " + params[3].data.toFixed(2);
            //     res += "<br/>MA30: " + params[4].data.toFixed(2);

            //     return res;
            // },
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
                start: 80,
                end: 100,
                // height: 10,
            },
            {
                gridIndex: 0,
                xAxisIndex: [0, 1], // 对应网格的索引
                show: true,
                start: 80,
                end: 100,
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
                // dimensions: {
                //     open: 0,
                //     close: 1,
                //     high: 2,
                //     low: 3,
                // },
                // encode: {
                //     x: -1,
                //     y: [0, 1, 2, 3],
                // },
                // seriesLayoutBy: "row",
                // transform: {
                //     type: "myTransform", // 使用自定义数据变换器
                // },
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
            padding: [0, 0, 0, 0],
            top: 5,
        },
        xAxis: [
            {
                type: "category",
                data: data0,
            },
        ],
        grid: {
            bottom: "50%",
            top: "15%",
        },
        yAxis: [
            {
                type: "value",
                // name: "Precipitation",
            },
            // {
            //     type: "value",
            //     name: "Temperature",
            //     min: 0,
            //     max: 25,table2bottomOption
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
        dataZoom: [
            {
                gridIndex: 0,
                type: "inside",
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                // height: 10,
            },
            {
                gridIndex: 0,
                xAxisIndex: [0, 1], // 对应网格的索引
                show: timetype == "0" ? false : true,
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                type: "slider",
                top: "60%",
                // height: 20,
            },
        ],
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
            padding: [0, 0, 0, 0],
            top: 5,
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
        grid: {
            bottom: "50%",
            top: "15%",
        },
        dataZoom: [
            {
                gridIndex: 0,
                type: "inside",
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                // height: 10,
            },
            {
                gridIndex: 0,
                xAxisIndex: [0, 1], // 对应网格的索引
                show: timetype == "0" ? false : true,
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                type: "slider",
                top: "60%",
                // height: 20,
            },
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
            padding: [0, 0, 0, 0],
            top: 5,
        },
        xAxis: [
            {
                type: "category",
                data: data0,
            },
        ],
        grid: {
            bottom: "50%",
            top: "15%",
        },
        dataZoom: [
            {
                gridIndex: 0,
                type: "inside",
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                // height: 10,
            },
            {
                gridIndex: 0,
                xAxisIndex: [0, 1], // 对应网格的索引
                show: timetype == "0" ? false : true,
                start: timetype == "0" ? null : 80,
                end: timetype == "0" ? null : 100,
                type: "slider",
                top: "60%",
                // height: 20,
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
