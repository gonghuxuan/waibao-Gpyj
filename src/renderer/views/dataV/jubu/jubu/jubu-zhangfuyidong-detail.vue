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
      <div id="chart-yuan" style="width: 800px;height: 800px;"></div>
    </div>
  </div>
</template>

<script>
// import { getPlateChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import { getStockChangePercentAction } from "@/api/userInfo.js";

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
        setTimeout(() => {
            this.setChart();
        }, 1000);
    },
    activated() {
        // this.getData();
    },

    methods: {
        getData() {
            getStockChangePercentAction().then((res) => {
                console.log("涨幅异动-----", res);
                this.resData = res.前部异动;
                this.resDataQianbu = res.前部异动;
                this.resDataZhongbu = res.中部异动;
                this.resDataHoubu = res.后部异动;
                res.前部异动.forEach((element) => {
                    const item = this.randomPointInCircle(1);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    this.sandianData.push(item);
                });
                res.中部异动.forEach((element) => {
                    const item = this.randomPointInAnnulus(1, 2);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    this.sandianData.push(item);
                });
                res.后部异动.forEach((element) => {
                    const item = this.randomPointInAnnulus(2, 3);
                    item.push(element.close);
                    item.push(element.changepercent);
                    item.push(element.stockName);
                    this.sandianData.push(item);
                });
                console.log(this.sandianData);
                const flag = this.sandianData.some((item) => {
                    return item[0] * item[0] + item[1] * item[1] >= 9;
                });
            });
        },
        setChart() {
            console.log(document.getElementById("chart-yuan"));
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
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                },
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
                            value: [6, 6],
                            symbolSize: 250,
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
            this.chart.setOption(option);
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
.jubu-zhangfuyidong-detail {
    .padding {
        padding-left: 20px;
        padding-right: 20px;
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
