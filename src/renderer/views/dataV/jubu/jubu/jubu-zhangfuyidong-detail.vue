<template>
  <div class="jubu-zhangfuyidong-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">涨幅异动</span>
      </div>
    </div>
    <div class="content-contain juzhong">
      <!-- <div class="contain-inner">
        <div class="yuan-hou">
          <div class="yuan-zhong">
            <div class="yuan-qian"></div>
          </div>
        </div>
      </div> -->
      <!-- <div class="qian">前部异动</div> -->
      <div id="chart-yuan" class="charts-yuan"></div>
    </div>
  </div>
</template>

<script>
// import { getPlateChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import { getStockChangePercentAction } from "@/api/userInfo.js";

import * as echarts from "echarts";
import pollMixin from "@/utils/gpyjminix.js";

export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            selectedGupiao: 0,
            pollApi: this.getData,
        };
    },
    components: {},
    computed: {},
    created() {},
    mixins: [pollMixin],
    mounted() {
        // this.getData();
        // this.getData2();
        // console.log(123);
        if (this.$route.query.refreshMounted) {
            this.getData();
        }
    },
    activated() {
        this.getData();
    },

    methods: {
        getData2() {
            let res = localStorage.getItem("sandian");
            res = JSON.parse(res);
            this.resData = res.前部异动;
            this.resDataQianbu = res.前部异动;
            this.resDataZhongbu = res.中部异动;
            this.resDataHoubu = res.后部异动;
            res.前部异动.forEach((element) => {
                const item = this.randomPointInCircle(0.9);
                item.push(element.close);
                item.push(element.changepercent);
                item.push(element.stockName);
                item.push("前部异动");
                this.sandianData.push(item);
            });
            res.中部异动.forEach((element) => {
                const item = this.getRandomPoint(1.45, 1.75, 2);
                item.push(element.close);
                item.push(element.changepercent);
                item.push(element.stockName);
                item.push("中部异动");
                this.sandianData.push(item);
            });
            res.后部异动.forEach((element) => {
                const item = this.getRandomPoint(2.45, 2.75, 2);
                item.push(element.close);
                item.push(element.changepercent);
                item.push(element.stockName);
                item.push("后部异动");
                this.sandianData.push(item);
            });
            const flag = this.sandianData.some((item) => {
                return item[0] * item[0] + item[1] * item[1] >= 9;
            });
            setTimeout(() => {
                this.setChart();
            }, 0);
        },
        getData() {
            getStockChangePercentAction().then((res) => {
                this.sandianData = [];
                // localStorage.setItem("sandian", JSON.stringify(res));
                this.resData = res.前部异动;
                this.resDataQianbu = res.前部异动;
                this.resDataZhongbu = res.中部异动;
                this.resDataHoubu = res.后部异动;
                res.前部异动.forEach((element) => {
                    const item = this.randomPointInCircle(0.9);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    item.push("前部异动");
                    this.sandianData.push(item);
                });
                res.中部异动.forEach((element) => {
                    const item = this.getRandomPoint(1.45, 1.75, 2);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    item.push("中部异动");
                    this.sandianData.push(item);
                });
                res.后部异动.forEach((element) => {
                    const item = this.getRandomPoint(2.45, 2.75, 2);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    item.push("后部异动");
                    this.sandianData.push(item);
                });
                const flag = this.sandianData.some((item) => {
                    return item[0] * item[0] + item[1] * item[1] >= 9;
                });
                setTimeout(() => {
                    this.setChart();
                }, 0);
            });
        },
        setChart() {
            this.chart = echarts.init(document.getElementById("chart-yuan"));
            const option = {
                xAxis: {
                    max: 3,
                    min: -3,
                },
                yAxis: {
                    max: 3,
                    min: -3,
                },
                tooltip: {
                    backgroundColor: "rgba(255,255,255,0.7)",
                    formatter: function (param) {
                        // prettier-ignore
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + param.seriesName + ' ' + value[0] + '日：'
                + value[7]
                + '</div>'
                +value[1] + '<br>'
                +  value[2] + '<br>'
                +  value[3] + '<br>'
                +  value[4] + '<br>'
                +  value[5] + '<br>'
                +  value[6] + '<br>';
                    },
                },
                // `<div style="color: white;">${
                //             params[0].data[4]
                //         }<div><span>股票价格</span>: <span style="color: ${
                //             params[0].data[3] > 0 ? "red" : "green"
                //         }">${params[0].data[2]}</span></div></div>`;
                grid: {
                    bottom: "0%",
                    right: "0%",
                    top: "0%",
                    left: "0%",
                },
                series: {
                    type: "scatter",
                    symbolSize: 20,
                    hoverAnimation: false,
                    data: [
                        ...this.sandianData,
                        {
                            value: [0, 0],
                            symbolSize: 270,
                            itemStyle: {
                                color: "rgba(1,1,1,0)",
                                borderColor: "rgba(6, 100, 117, 1)",
                                borderWidth: 10,
                                shadowColor: "rgba(6, 100, 117, 1)",
                                shadowBlur: 30,
                                shadowType: "inset",
                            },
                        },
                        {
                            value: [0, 0],
                            symbolSize: 540,
                            itemStyle: {
                                color: "rgba(1,1,1,0)",
                                borderColor: "rgba(6, 100, 117, 1)",
                                borderWidth: 10,
                                shadowColor: "rgba(6, 100, 117, 1)",
                                shadowBlur: 30,
                                shadowType: "inset",
                            },
                        },
                        {
                            value: [0, 0],
                            symbolSize: 810,
                            itemStyle: {
                                color: "rgba(1,1,1,0)",
                                borderColor: "rgba(6, 100, 117, 1)",
                                borderWidth: 10,
                                shadowColor: "rgba(6, 100, 117, 1)",
                                shadowBlur: 30,
                                shadowType: "inset",
                            },
                        },
                    ],
                },
            };
            const dataBJ = [
                [1, 55, 9, 56, 0.46, 18, 6, "良"],
                [2, 25, 11, 21, 0.65, 34, 9, "优"],
                [3, 56, 7, 63, 0.3, 14, 5, "良"],
                [4, 33, 7, 29, 0.33, 16, 6, "优"],
                [5, 42, 24, 44, 0.76, 40, 16, "优"],
                [6, 82, 58, 90, 1.77, 68, 33, "良"],
                [7, 74, 49, 77, 1.46, 48, 27, "良"],
                [8, 78, 55, 80, 1.29, 59, 29, "良"],
                [9, 267, 216, 280, 4.8, 108, 64, "重度污染"],
                [10, 185, 127, 216, 2.52, 61, 27, "中度污染"],
                [11, 39, 19, 38, 0.57, 31, 15, "优"],
                [12, 41, 11, 40, 0.43, 21, 7, "优"],
                [13, 64, 38, 74, 1.04, 46, 22, "良"],
                [14, 108, 79, 120, 1.7, 75, 41, "轻度污染"],
                [15, 108, 63, 116, 1.48, 44, 26, "轻度污染"],
                [16, 33, 6, 29, 0.34, 13, 5, "优"],
                [17, 94, 66, 110, 1.54, 62, 31, "良"],
                [18, 186, 142, 192, 3.88, 93, 79, "中度污染"],
                [19, 57, 31, 54, 0.96, 32, 14, "良"],
                [20, 22, 8, 17, 0.48, 23, 10, "优"],
                [21, 39, 15, 36, 0.61, 29, 13, "优"],
                [22, 94, 69, 114, 2.08, 73, 39, "良"],
                [23, 99, 73, 110, 2.43, 76, 48, "良"],
                [24, 31, 12, 30, 0.5, 32, 16, "优"],
                [25, 42, 27, 43, 1, 53, 22, "优"],
                [26, 154, 117, 157, 3.05, 92, 58, "中度污染"],
                [27, 234, 185, 230, 4.09, 123, 69, "重度污染"],
                [28, 160, 120, 186, 2.77, 91, 50, "中度污染"],
                [29, 134, 96, 165, 2.76, 83, 41, "轻度污染"],
                [30, 52, 24, 60, 1.03, 50, 21, "良"],
                [31, 46, 5, 49, 0.28, 10, 6, "优"],
            ];
            const dataGZ = [
                [1, 26, 37, 27, 1.163, 27, 13, "优"],
                [2, 85, 62, 71, 1.195, 60, 8, "良"],
                [3, 78, 38, 74, 1.363, 37, 7, "良"],
                [4, 21, 21, 36, 0.634, 40, 9, "优"],
                [5, 41, 42, 46, 0.915, 81, 13, "优"],
                [6, 56, 52, 69, 1.067, 92, 16, "良"],
                [7, 64, 30, 28, 0.924, 51, 2, "良"],
                [8, 55, 48, 74, 1.236, 75, 26, "良"],
                [9, 76, 85, 113, 1.237, 114, 27, "良"],
                [10, 91, 81, 104, 1.041, 56, 40, "良"],
                [11, 84, 39, 60, 0.964, 25, 11, "良"],
                [12, 64, 51, 101, 0.862, 58, 23, "良"],
                [13, 70, 69, 120, 1.198, 65, 36, "良"],
                [14, 77, 105, 178, 2.549, 64, 16, "良"],
                [15, 109, 68, 87, 0.996, 74, 29, "轻度污染"],
                [16, 73, 68, 97, 0.905, 51, 34, "良"],
                [17, 54, 27, 47, 0.592, 53, 12, "良"],
                [18, 51, 61, 97, 0.811, 65, 19, "良"],
                [19, 91, 71, 121, 1.374, 43, 18, "良"],
                [20, 73, 102, 182, 2.787, 44, 19, "良"],
                [21, 73, 50, 76, 0.717, 31, 20, "良"],
                [22, 84, 94, 140, 2.238, 68, 18, "良"],
                [23, 93, 77, 104, 1.165, 53, 7, "良"],
                [24, 99, 130, 227, 3.97, 55, 15, "良"],
                [25, 146, 84, 139, 1.094, 40, 17, "轻度污染"],
                [26, 113, 108, 137, 1.481, 48, 15, "轻度污染"],
                [27, 81, 48, 62, 1.619, 26, 3, "良"],
                [28, 56, 48, 68, 1.336, 37, 9, "良"],
                [29, 82, 92, 174, 3.29, 0, 13, "良"],
                [30, 106, 116, 188, 3.628, 101, 16, "轻度污染"],
                [31, 118, 50, 0, 1.383, 76, 11, "轻度污染"],
            ];
            const dataSH = [
                [1, 91, 45, 125, 0.82, 34, 23, "良"],
                [2, 65, 27, 78, 0.86, 45, 29, "良"],
                [3, 83, 60, 84, 1.09, 73, 27, "良"],
                [4, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
                [5, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
                [6, 109, 81, 121, 1.28, 68, 51, "轻度污染"],
                [7, 106, 77, 114, 1.07, 55, 51, "轻度污染"],
                [8, 89, 65, 78, 0.86, 51, 26, "良"],
                [9, 53, 33, 47, 0.64, 50, 17, "良"],
                [10, 80, 55, 80, 1.01, 75, 24, "良"],
                [11, 117, 81, 124, 1.03, 45, 24, "轻度污染"],
                [12, 99, 71, 142, 1.1, 62, 42, "良"],
                [13, 95, 69, 130, 1.28, 74, 50, "良"],
                [14, 116, 87, 131, 1.47, 84, 40, "轻度污染"],
                [15, 108, 80, 121, 1.3, 85, 37, "轻度污染"],
                [16, 134, 83, 167, 1.16, 57, 43, "轻度污染"],
                [17, 79, 43, 107, 1.05, 59, 37, "良"],
                [18, 71, 46, 89, 0.86, 64, 25, "良"],
                [19, 97, 71, 113, 1.17, 88, 31, "良"],
                [20, 84, 57, 91, 0.85, 55, 31, "良"],
                [21, 87, 63, 101, 0.9, 56, 41, "良"],
                [22, 104, 77, 119, 1.09, 73, 48, "轻度污染"],
                [23, 87, 62, 100, 1, 72, 28, "良"],
                [24, 168, 128, 172, 1.49, 97, 56, "中度污染"],
                [25, 65, 45, 51, 0.74, 39, 17, "良"],
                [26, 39, 24, 38, 0.61, 47, 17, "优"],
                [27, 39, 24, 39, 0.59, 50, 19, "优"],
                [28, 93, 68, 96, 1.05, 79, 29, "良"],
                [29, 188, 143, 197, 1.66, 99, 51, "中度污染"],
                [30, 174, 131, 174, 1.55, 108, 50, "中度污染"],
                [31, 187, 143, 201, 1.39, 89, 53, "中度污染"],
            ];
            const schema = [
                { name: "date", index: 0, text: "日" },
                { name: "AQIindex", index: 1, text: "AQI指数" },
                { name: "PM25", index: 2, text: "PM2.5" },
                { name: "PM10", index: 3, text: "PM10" },
                { name: "CO", index: 4, text: "一氧化碳（CO）" },
                { name: "NO2", index: 5, text: "二氧化氮（NO2）" },
                { name: "SO2", index: 6, text: "二氧化硫（SO2）" },
            ];
            const itemStyle = {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: "rgba(0,0,0,0.3)",
            };
            const option2 = {
                grid: {
                    bottom: "0%",
                    right: "0%",
                    top: "0%",
                    left: "0%",
                },
                tooltip: {
                    formatter: function (param) {
                        if(param.value[2] === false) {
                            return false
                        } else {
                            return `<div style="color: black;">${
                            param.value[4]
                        }<div><span>股票价格</span>: <span style="color: ${
                            param.value[3] > 0 ? "red" : "green"
                        }">${param.value[2]}</span></div>
                        <div><span>股票涨幅</span>: <span style="color: ${
                            param.value[3] > 0 ? "red" : "green"
                        }">${param.value[3]}</span></div>
                        <div>${param.value[5]}</div>
                        </div>`;
                        }
                        // prettier-ignore
                    },
                },
                xAxis: [
                    {
                        max: 3,
                        min: -3,
                        zlevel: 2,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                    {
                        max: 3,
                        min: -3,
                        zlevel: 1,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                ],
                yAxis: [
                    {
                        max: 3,
                        min: -3,
                        zlevel: 2,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                    {
                        max: 3,
                        min: -3,
                        zlevel: 1,
                        splitLine: {
                            show: false,
                        },
                        axisTick: {
                            //y轴刻度线
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                    },
                ],
                series: [
                    {
                        name: "涨幅",
                        type: "scatter",
                        data: this.sandianData,
                        yAxisIndex: 0,
                        xAxisIndex: 0,
                        symbolSize: 15,
                        zlevel: 1,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    if (param.value[5] == "前部异动") {
                                        return "rgba(255, 194, 27, 1)";
                                    }
                                    if (param.value[5] == "中部异动") {
                                        return "rgba(26, 176, 93, 1)";
                                    }
                                    if (param.value[5] == "后部异动") {
                                        return "rgba(255, 52, 38, 1)";
                                    }
                                    // if (param.value[1] < 1) {
                                    //     return "#DE5858";
                                    // }
                                    // if (param.value[1] < 2) {
                                    //     return "#1E8BFF";
                                    // }
                                    // if (param.value[1] < 3) {
                                    //     return "#D93DD2";
                                    // }
                                    // if (param.value[1] < 4) {
                                    //     return "#1AB05D";
                                    // }
                                    // if (param.value[1] < 5) {
                                    //     return "#FFF45C";
                                    // }
                                },
                                label: {
                                    position: [15, 5],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[4];
                                    },
                                    textStyle: {
                                        color: "white",
                                        fontSize: 12,
                                    },
                                },
                            },
                        },
                    },
                    {
                        name: "涨幅",
                        type: "scatter",
                        hoverAnimation: false,
                        yAxisIndex: 1,
                        xAxisIndex: 1,
                        zlevel: 0,
                        tooltip: false,
                        data: [
                            // {
                            //     value: [0, 0, false, "前部异动"],
                            //     symbolSize: 270,
                            //     itemStyle: {
                            //         color: "rgba(1,1,1,0)",
                            //         borderColor: "rgba(6, 100, 117, 1)",
                            //         borderWidth: 10,
                            //         shadowColor: "rgba(6, 100, 117, 1)",
                            //         shadowBlur: 30,
                            //         shadowType: "inset",
                            //     },
                            // },
                            // {
                            //     value: [0, 0, false, "中部异动"],
                            //     symbolSize: 540,
                            //     itemStyle: {
                            //         color: "rgba(1,1,1,0)",
                            //         borderColor: "rgba(6, 100, 117, 1)",
                            //         borderWidth: 10,
                            //         shadowColor: "rgba(6, 100, 117, 1)",
                            //         shadowBlur: 30,
                            //         shadowType: "inset",
                            //     },
                            // },
                            // {
                            //     value: [0, 0, false, "后部异动"],
                            //     symbolSize: 810,
                            //     itemStyle: {
                            //         color: "rgba(1,1,1,0)",
                            //         borderColor: "rgba(6, 100, 117, 1)",
                            //         borderWidth: 10,
                            //         shadowColor: "rgba(6, 100, 117, 1)",
                            //         shadowBlur: 30,
                            //         shadowType: "inset",
                            //     },
                            // },
                        ],
                        symbolSize: 20,
                        labelLayout: {
                            y: 20,
                            align: "center",
                            hideOverlap: true,
                            moveOverlap: "shiftX",
                        },
                        labelLine: {
                            show: true,
                            length2: 5,
                            lineStyle: {
                                color: "#bbb",
                            },
                        },
                        label: {
                            show: true,
                            formatter: function (param) {
                                // console.log(param);
                                return param.value[3];
                            },
                            minMargin: 200,
                            position: "top",
                            color: "white",
                            fontSize: 16,
                            zlevel: 101,
                        },
                    },
                ],
            };
            // console.log(this.sandianData);
            this.chart.setOption(option2);
        },
        randomPointInAnnulus(innerRadius, outerRadius) {
            const randomDistance = Math.sqrt(
                Math.random() *
                    (outerRadius * outerRadius - innerRadius * innerRadius) +
                    innerRadius * innerRadius
            );
            const randomAngle = Math.random() * Math.PI * 2;
            const x = Math.cos(randomAngle) * randomDistance;
            const y = Math.sin(randomAngle) * randomDistance;
            return [x, y];
        },
        getRandomPoint(innerRadius, outerRadius, heightLimit) {
            // 生成随机高度
            const height = Math.random() * (2 * heightLimit) - heightLimit;
            const flag = Math.random() < 0.5 ? -1 : 1;
            const yheight = heightLimit * Math.random() * flag;
            // console.log("height:", yheight);
            // 生成随机极角
            const angle = Math.atan2(height, outerRadius);
            // 生成随机距离
            const distance =
                Math.random() * (outerRadius - innerRadius) + innerRadius;
            // 计算x、y坐标
            let x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            x = Math.random() < 0.5 ? -x : x;
            // 返回结果
            return [x, yheight];
        },
        randomPointInCircle(radius) {
            // 随机生成一个点在圆内
            const randomRadius = Math.sqrt(Math.random()) * radius;
            const randomAngle = Math.random() * 2 * Math.PI;

            // 计算x和y坐标
            const x = randomRadius * Math.cos(randomAngle);
            const y = randomRadius * Math.sin(randomAngle);

            return [x, y];
        },
    },
};
</script>

<style lang="scss">
.jubu-zhangfuyidong-detail {
    .charts-yuan {
        width: 1800px;
        height: 810px;
        pointer-events: auto;
    }
    .content-contain {
        background: url(../../../../assets/img/baohan.png) no-repeat;
        background-size: contain;
        background-position: 100% 100%;
        width: 1800px;
        height: 784px;
        // border: 1px red solid;
        margin-top: 40px;
    }
    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }
    .qian {
        position: absolute;
        color: white;
        // z-index: 100;
        font-size: 14px;
    }
    .contain-inner {
        width: 1780px;
        height: 780px;
        border: 1px solid rgba(4, 179, 182, 0.5);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
        margin: 0 auto;
        margin-top: 25px;
    }
    .yuan-hou {
        height: 750px;
        width: 750px;
        border: 1px solid rgba(4, 179, 182, 0.5);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
        border-radius: 50%;
        margin: 15px auto;
    }
    .yuan-zhong {
        height: 500px;
        width: 500px;
        border: 1px solid rgba(4, 179, 182, 0.5);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
        border-radius: 50%;
        margin: 125px auto;
    }
    .yuan-qian {
        height: 250px;
        width: 250px;
        border: 1px solid rgba(4, 179, 182, 0.5);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
        border-radius: 50%;
        margin: 125px auto;
    }
    .shadow {
        box-shadow: 4px 4px 4px red;
    }
}
</style>
