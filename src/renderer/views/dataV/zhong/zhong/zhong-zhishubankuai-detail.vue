<template>
  <div class="zhong-zhishubankuai-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">个股与指数的得到关系</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="table1">
        <div class="table1-1">
          <div style="font-size: 16px; color: white;padding-top: 10px; padding-bottom: 10px;padding-left: 10px;">大于平均涨幅</div>
          <div class="gupiao-item" v-for="(item, index)  in resData.aboveAvgChangepercentStocks" :key="item.stockName" :class="
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
        <div class="table1-2">
          <div style="font-size: 16px; color: white;padding-top: 10px; padding-bottom: 10px;padding-left: 10px;">大于平均涨幅</div>
          <div class="gupiao-item" v-for="(item, index)  in resData.belowAvgChangepercentStocks" :key="item.stockName" :class="
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
      </div>

      <div class="table2 table-shadow">
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
      </div>

    </div>
  </div>
</template>

<script>
import { getStocksChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";

import * as echarts from "echarts";

export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            timeType: 0,
            avgChangepercent: "",
            selectedGupiao: "",
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
        selecttime(index) {
            this.timeType = index;
            this.chart.clear();
            this.sandianData = [];
            this.getData();
        },
        selectgupiao(index) {
            // this.chart.dispatchAction({
            //     type: "hideTip",
            // });
            this.selectedGupiao = index;
            let tipindex = 0;
            this.sandianData.forEach((item, indexsandian) => {
                if (item[2] === index) {
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
        getData() {
            getStocksChangepercentData({}).then((res) => {
                console.log(res);
                this.resData = this.timeType == "0" ? res.同步性 : res.抗跌性;
                console.log(this.timeType == "0");
                this.resData.aboveAvgChangepercentStocks.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.changepercent;
                    dataItem[2] = item.stockName;
                    this.sandianData.push(dataItem);
                });
                this.resData.belowAvgChangepercentStocks.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.changepercent;
                    dataItem[2] = item.stockName;
                    this.sandianData.push(dataItem);
                });
                this.setChart();
            });
        },
        setChart() {
            this.chart = echarts.init(
                document.getElementById("charts-zhishubankuai")
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
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                    formatter: function (params) {
                        const data = params[0].data[1].toFixed(2);
                        return params[0].data[2] + ": " + data;
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
                                        color: "white",
                                    },
                                    yAxis: this.resData.avgChangepercent, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
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
                        data: this.sandianData,
                        itemStyle: {
                            normal: {
                                color: "rgba(255, 52, 38, 1)",

                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[2];
                                    },
                                    textStyle: {
                                        color: "white",
                                        fontSize: 14,
                                    },
                                },
                            },
                        },
                    },
                ],
            };

            this.chart.setOption(option);
        },
    },
};
</script>

<style lang="scss">
.zhong-zhishubankuai-detail {
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
            top: 80px;
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
            top: 190px;
            background-image: linear-gradient(
                to right,
                rgba(255, 81, 69, 0.3),
                rgba(255, 81, 69, 0.05),
                rgba(255, 81, 69, 0.05),
                rgba(255, 81, 69, 0.3)
            );
            border: 1px rgba(255, 81, 69, 1) solid;
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
        width: 15%;
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
    }
    .table1-1 {
        height: 48%;
        overflow: scroll;
    }
    .table1-2 {
        height: 48%;
        overflow: scroll;
        margin-top: 20px;
    }
    .table2 {
        width: 85%;
        height: 100%;
        margin-left: 20px;
        position: relative;
        background: url(../../../../assets/img/quanqiu.png) no-repeat;
        background-repeat: no-repeat;
        background-position: center center;
        background-origin: content-box;
        background-size: 85% 85%;
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
