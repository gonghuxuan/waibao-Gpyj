<template>
  <div class="zhong-zhangfuyidong-detail">
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
      <div id="chart-yuan" style="width: 810px;height: 810px;pointer-events: auto"></div>
    </div>
  </div>
</template>

<script>
// import { getPlateChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import { getStockChangePercentActionZhong } from "@/api/userInfo.js";

import * as echarts from "echarts";

export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            selectedGupiao: 0,
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    activated() {
        // this.getData();
    },

    methods: {
        getData() {
            getStockChangePercentActionZhong().then((res) => {
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
                    const item = this.randomPointInAnnulus(1.1, 1.9);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    item.push("中部异动");
                    this.sandianData.push(item);
                });
                res.后部异动.forEach((element) => {
                    const item = this.randomPointInAnnulus(2.1, 2.9);
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
                        symbolSize: 20,
                        zlevel: 1,
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
                            {
                                value: [0, 0, false, "前部异动"],
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
                                value: [0, 0, false, "中部异动"],
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
                                value: [0, 0, false, "后部异动"],
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
                                console.log(param);
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
            console.log(this.sandianData);
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
.zhong-zhangfuyidong-detail {
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
