<template>
  <div class="zhong-zhishubankuai-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">个股与指数的得到关系</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="table1">
        <div class="active2 padding juzhong"><span style="color: white">早盘（09:30~10:00）</span></div>
        <div class="table-2">
          <div class="table-shuiwei table-shuiwei-2">
            <div style="text-align: center">
              <div style=" font-size: 20px;">{{zaoline   | fixedTwo}}%</div>
              <div style="color:#64B7BC;font-size: 16px;padding-top: 3px;">平均振幅</div>
            </div>
          </div>
          <div class="table1-1">
            <div style="font-size: 16px; color: white;padding-top: 10px; padding-bottom: 10px;padding-left: 10px;">大于平均涨幅</div>
            <div class="gupiao-item" v-for="(item, index)  in reszaobig" :key="item.stockName" :class="
                          selectedGupiao == item.stockName
                              ? 'gupiao-active'
                              : 'gupiao-unactive'
                      " @click="selectgupiao(item.stockName)">
              <div class="gupiao">{{ item.stockName }}</div>
              <div class="divider">
                <a-divider />
              </div>
            </div>
          </div>
          <div class="table2-2" id="charts-zhengfu-1" style="height: 100%; width: 85%; margin-top: 0px"></div>
        </div>
        <div class="active2 padding juzhong"><span style="color: white">尾盘（14:30~15:00）</span></div>
        <div class="table-2">
          <div class="table-shuiwei table-shuiwei-1">
            <div style="text-align: center">
              <div style="color: #1AB05D; font-size: 20px;">{{weiline   | fixedTwo}}%</div>
              <div style="color:#64B7BC;font-size: 16px;padding-top: 3px;">平均振幅</div>
            </div>
          </div>
          <div class="table1-2">
            <div style="font-size: 16px; color: white;padding-top: 10px; padding-bottom: 10px;padding-left: 10px;">大于平均涨幅</div>
            <div class="gupiao-item" v-for="(item, index)  in resweibig" :key="item.stockName" :class="
                          selectedGupiao == item.stockName
                              ? 'gupiao-active'
                              : 'gupiao-unactive'
                      " @click="selectgupiao2(item.stockName)">
              <div class="gupiao">{{ item.stockName }}</div>
              <div class="divider">
                <a-divider />
              </div>
            </div>
          </div>
          <div class="table2-2" id="charts-zhengfu-2" style="height: 100%; width: 100%; margin-top: 0px"></div>

        </div>

      </div>

      <!-- <div class="table2 table-shadow">
        <div class="juzhong" style="">
          <div class="table-shadow" style="
                                  width: 70px;
                                  padding: 5px;
                                  text-align: center;
                                  font-size: 14px;
                                  margin-right: 30px;
                              " :class="
                                  timeType == '0'
                                      ? 'time-active'
                                      : 'time-unactive'
                              " @click="selecttime('0')">同步性</div>
          <div class="table-shadow" style="
                                  width: 70px;
                                  padding: 5px;
                                  text-align: center;
                                  font-size: 14px;
                              " :class="
                                  timeType == '1'
                                      ? 'time-active'
                                      : 'time-unactive'
                              " @click="selecttime('1')">抗跌性</div>
        </div>
        <div class="table-shuiwei table-shuiwei-1">
          <div style="text-align: center">
            <div style="color: #1AB05D; font-size: 20px;">{{resData.exponentChangepercent   | fixedTwo}}%</div>
            <div style="color:#64B7BC;font-size: 16px;padding-top: 3px;">指数涨幅</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-2">
          <div style="text-align: center">
            <div style="color: #FF5145; font-size: 20px;">{{resData.avgChangepercent | fixedTwo}}%</div>
            <div style="color:#64B7BC;font-size: 16px;padding-top: 3px;">个股平均涨幅</div>
          </div>
        </div>
        <div id="charts-zhishubankuai" style="height: 100%; width: 100%; margin-top: 0px"></div>
      </div> -->

    </div>
  </div>
</template>
  
  <script>
import { getAmplitudeStocks } from "@/api/userInfo.js";

import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";

import * as echarts from "echarts";

export default {
    data() {
        return {
            resData: [],
            resDatazao: [],
            resDatawei: [],
            reszaobig: [],
            resweibig: [],
            sandianData1: [],
            sandianData2: [],
            zaoline: "",
            weiline: "",
            selectedGupiao: "",
            selectedGupiao2: "",
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
            getAmplitudeStocks().then((res) => {
                console.log("重点预警成交额异动-----", res);

                res["早盘（09:30~10:00）"].aboveAvgAmplitudeStocks.forEach(
                    (item) => {
                        const dataItem = [];
                        dataItem[0] = Math.random();
                        dataItem[1] = item.amplitude;
                        dataItem[2] = item.close;
                        dataItem[3] = item.stockName;
                        dataItem[4] = "up";

                        this.sandianData1.push(dataItem);
                    }
                );
                res["早盘（09:30~10:00）"].belowAvgAmplitudeStocks.forEach(
                    (item) => {
                        const dataItem = [];
                        dataItem[0] = Math.random();
                        dataItem[1] = item.amplitude;
                        dataItem[2] = item.close;
                        dataItem[3] = item.stockName;
                        dataItem[4] = "down";

                        this.sandianData1.push(dataItem);
                    }
                );
                res["尾盘（14:30~15:00）"].aboveAvgAmplitudeStocks.forEach(
                    (item) => {
                        const dataItem = [];
                        dataItem[0] = Math.random();
                        dataItem[1] = item.amplitude;
                        dataItem[2] = item.close;
                        dataItem[3] = item.stockName;
                        dataItem[4] = "up";

                        this.sandianData2.push(dataItem);
                    }
                );
                res["尾盘（14:30~15:00）"].belowAvgAmplitudeStocks.forEach(
                    (item) => {
                        const dataItem = [];
                        dataItem[0] = Math.random();
                        dataItem[1] = item.amplitude;
                        dataItem[2] = item.close;
                        dataItem[3] = item.stockName;
                        dataItem[4] = "down";

                        this.sandianData2.push(dataItem);
                    }
                );
                this.reszaobig =
                    res["早盘（09:30~10:00）"].aboveAvgAmplitudeStocks;
                this.resweibig =
                    res["尾盘（14:30~15:00）"].aboveAvgAmplitudeStocks;

                this.zaoline = res["早盘（09:30~10:00）"].avgAmplitude;
                this.weiline = res["尾盘（14:30~15:00）"].avgAmplitude;

                this.resData = this.resDatazao;
                console.log(this.zaoline);
                console.log(this.zaoline);

                // this.resData = res.成交额递增;
                // this.resDataQianbu = res.成交额递增;
                // this.resDataZhongbu = res.机构票监测;
                // this.resDataHoubu = res.成交额异动;
                this.setChart();
                this.setChart2();
            });
        },
        setChart() {
            this.chart = echarts.init(
                document.getElementById("charts-zhengfu-1")
            );
            // const data = this.resData;
            const option = {
                xAxis: {
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
                    show: false,
                },
                yAxis: {
                    // splitLine: {
                    //     show: false,
                    // },

                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                tooltip: {
                    // trigger: "axis",
                    // axisPointer: {
                    //     type: "cross",
                    //     label: {
                    //         backgroundColor: "#6a7985",
                    //     },
                    // },
                    formatter: function (param) {
                        return `<div style="color: black;">${
                            param.value[3]
                        }<div><span>股票价格</span>: <span style="color: red">${param.value[2]}</span></div>
                        <div><span>股票振幅</span>: <span style="color:red">${param.value[1]}</span></div>
                        </div>`;
                        // prettier-ignore
                    },
                },
                grid: {
                    left: "5%",
                },
                series: [
                    {
                        name: "scatter",
                        type: "scatter",
                        markLine: {
                            symbol: "none", //去掉警戒线最后面的箭头
                            label: {
                                position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                {
                                    silent: false, //鼠标悬停事件  true没有，false有
                                    lineStyle: {
                                        //警戒线的样式  ，虚实  颜色
                                        type: "dashed",
                                        color: "#5D9A9E",
                                    },
                                    yAxis: this.zaoline, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                                },
                            ],
                        },
                        label: {
                            emphasis: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    color: "white",
                                    fontSize: 16,
                                },
                            },
                        },
                        itemStyle: {
                            show: true,
                            color: "white",
                            markPoint: {
                                tooltip: {
                                    show: true,
                                    formatter: "z",
                                },
                            },
                        },
                        data: this.sandianData1,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    // console.log(param);
                                    if (param.value[4] === "up") {
                                        return "#DE5858";
                                    } else {
                                        return "#1E8BFF";
                                    }
                                },
                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[3];
                                    },
                                    textStyle: {
                                        color: "white",
                                        fontSize: 12,
                                    },
                                },
                            },
                        },
                    },
                ],
            };

            this.chart.setOption(option);
        },
        setChart2() {
            this.chart2 = echarts.init(
                document.getElementById("charts-zhengfu-2")
            );
            // const data = this.resData;
            const option = {
                xAxis: {
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
                    show: false,
                },
                yAxis: {
                    // splitLine: {
                    //     show: false,
                    // },

                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: false,
                    },
                },
                tooltip: {
                    // trigger: "axis",
                    // axisPointer: {
                    //     type: "cross",
                    //     label: {
                    //         backgroundColor: "#6a7985",
                    //     },
                    // },
                    formatter: function (param) {
                        return `<div style="color: black;">${
                            param.value[3]
                        }<div><span>股票价格</span>: <span style="color: red">${param.value[2]}</span></div>
                        <div><span>股票振幅</span>: <span style="color:red">${param.value[1]}</span></div>
                        </div>`;
                        // prettier-ignore
                    },
                },
                grid: {
                    left: "5%",
                },
                series: [
                    {
                        name: "scatter",
                        type: "scatter",
                        markLine: {
                            symbol: "none", //去掉警戒线最后面的箭头
                            label: {
                                position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                {
                                    silent: false, //鼠标悬停事件  true没有，false有
                                    lineStyle: {
                                        //警戒线的样式  ，虚实  颜色
                                        type: "dashed",
                                        color: "#5D9A9E",
                                    },
                                    yAxis: this.weiline, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                                },
                            ],
                        },
                        label: {
                            emphasis: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    color: "white",
                                    fontSize: 16,
                                },
                            },
                        },
                        itemStyle: {
                            show: true,
                            color: "white",
                            markPoint: {
                                tooltip: {
                                    show: true,
                                    formatter: "z",
                                },
                            },
                        },
                        data: this.sandianData2,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    // console.log(param);
                                    if (param.value[4] === "up") {
                                        return "#DE5858";
                                    } else {
                                        return "#1E8BFF";
                                    }
                                },
                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[3];
                                    },
                                    textStyle: {
                                        color: "white",
                                        fontSize: 12,
                                    },
                                },
                            },
                        },
                    },
                ],
            };

            this.chart2.setOption(option);
        },
        selectgupiao(index) {
            // this.chart.dispatchAction({
            //     type: "hideTip",
            // });
            this.selectedGupiao = index;
            let tipindex = 0;
            this.sandianData1.forEach((item, indexsandian) => {
                if (item[3] === index) {
                    tipindex = indexsandian;
                }
            });
            setTimeout(() => {
                this.chart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0, // 显示第几个series
                    dataIndex: tipindex, // 显示第几个数据
                });
            });
        },
        selectgupiao2(index) {
            // this.chart.dispatchAction({
            //     type: "hideTip",
            // });
            this.selectedGupiao2 = index;
            let tipindex = 0;
            this.sandianData2.forEach((item, indexsandian) => {
                if (item[3] === index) {
                    tipindex = indexsandian;
                }
            });
            setTimeout(() => {
                this.chart2.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0, // 显示第几个series
                    dataIndex: tipindex, // 显示第几个数据
                });
            });
        },
    },
};
</script>
  
  <style lang="scss">
.zhong-zhishubankuai-detail {
    .table-2 {
        height: 43%;
        display: flex;
        width: 100%;
        position: relative;
    }
    .table2-2 {
        width: 85%;
    }
    .table1-1 {
        height: 100%;
        overflow-y: scroll;
        width: 220px;
    }
    .table1-2 {
        height: 100%;
        width: 250px;
        overflow-y: scroll;
        margin-top: 20px;
    }
    .table2 {
        width: 85%;
        height: 100%;
        margin-left: 20px;
        position: relative;
        // background: url(../../../../assets/img/quanqiu.png) no-repeat;
        // background-repeat: no-repeat;
        // background-position: center center;
        // background-origin: content-box;
        // background-size: 85% 85%;
    }
    .active2 {
        height: 40px;
        background-image: linear-gradient(
            to right,
            rgba(29, 255, 255, 0.1),
            rgba(29, 255, 255, 0.3),
            rgba(29, 255, 255, 0.1)
        );
        border-top: 2px solid rgba(12, 220, 226, 0.3);
        border-bottom: 2px solid rgba(12, 220, 226, 0.3);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #1dffff;
    }
    .table-shuiwei {
        position: absolute;
        width: 150px;
        height: 90px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        margin-top: 10px;
        &-1 {
            right: 30px;
            top: 30px;
            background-image: linear-gradient(
                to right,
                rgba(26, 176, 93, 0.3),
                rgba(26, 176, 93, 0.05),
                rgba(26, 176, 93, 0.05),
                rgba(26, 176, 93, 0.3)
            );
            border: 1px rgba(26, 176, 93, 1) solid;
        }
        &-2 {
            right: 30px;
            top: 30px;
            background-image: linear-gradient(
                to right,
                rgba(255, 244, 92, 0.3),
                rgba(255, 244, 92, 0.08),
                rgba(255, 244, 92, 0.08),
                rgba(255, 244, 92, 0.3)
            );
            border: 1px rgba(255, 244, 92, 1) solid;
            color: rgba(255, 244, 92, 1);
        }
        &-3 {
            background-image: linear-gradient(
                to right,
                rgba(29, 255, 255, 0.02),
                rgba(29, 255, 255, 0.06),
                rgba(29, 255, 255, 0.12)
            );
            border: 1px rgba(29, 255, 255, 0.2) solid;
        }
    }
    .table3-item-contain {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .fenshi {
        // style="height: 500px; width: 100%; margin-top: 0px"
        height: 500px;
        width: 100%;
        margin-top: 0px;
    }
    .rik {
        height: 500px;
        width: 100%;
        margin-top: 0px;
    }
    .table3-key {
        color: rgba(93, 154, 158, 0.7);
        padding: 10px;
        padding-left: 20px;
        font-size: 14px;
    }
    .table3-value {
        color: white;
        padding: 10px;

        padding-right: 20px;
        font-size: 14px;
    }
    .gupiao-item {
        font-size: 16px;
        text-align: left;
        height: 40px;
        position: relative;
    }
    .ant-divider-horizontal {
        margin: 0px;
    }
    .gupiao {
        padding-left: 10%;
        display: flex;
        align-items: center;
        height: 38px;
    }
    .gupiao-active {
        color: #1dffff;
        background-color: rgba(2, 81, 93, 1);
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .gupiao-unactive {
        color: #64b7bc;
    }
    .ant-divider {
        // color: rgba(2, 81, 93, 0.5);
        background-color: rgba(2, 81, 93, 1);
    }
    .divider {
        width: 90%;
        position: absolute;
        bottom: 0;
        left: 5%;
    }
    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }
    .unactive {
        color: rgba(29, 255, 255, 0.5);
    }
    .content-contain {
        display: flex;
        padding: 10px;
    }
    .table1 {
        height: 100%;
        width: 100%;
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
    }

    .time-active {
        color: #1dffff;
        box-shadow: 0px 0px 15px #1dffff inset;
    }
    .time-unactive {
        color: #64b7bc;
    }
}
</style>
  