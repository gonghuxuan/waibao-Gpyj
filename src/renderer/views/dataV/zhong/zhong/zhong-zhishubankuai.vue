<template>
  <div class="jubu-zhishubankuai">
    <div class="juzhong">
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px; cursor: pointer;margin-top: -40px" />
    </div>
    <div class="table-contain">
      <div class="juzhong" style="">
        <div class="" style="
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
        <div class="" style="
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
      <div v-if="show" id="charts-zhishubankuai-zhong" style="height: 500px; width: 100%; margin-top: 0px"></div>
    </div>
  </div>
</template>

<script>
import { getStocksChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import pollMixin from "@/utils/gpyjminix.js";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            timeType: 0,
            avgChangepercent: "",
            pollApi: this.getData,
            show: true,
        };
    },
    mixins: [pollMixin],
    props: {
        title: {
            type: String,
            default: 0,
        },
    },
    watch: {
        "$store.state.App.swiper"(newval, oldval) {
            // 代码实现
            if (newval === 2) {
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
    },
    // watch: {
    //     "$store.state.App.swiper"(newval, oldval) {
    //         // 代码实现
    //         console.warn("32222222222", newval);
    //         if (newval === 1) {
    //             this.chart.clear();
    //             console.warn("iiiiiiiiiiiiiiiiiiii");
    //             setTimeout(() => {
    //                 this.$nextTick(() => {
    //                     this.setChart();
    //                 });
    //             }, 1000);
    //         }
    //     },
    // },
    computed: {},
    created() {},
    mounted() {
        this.getData();
        console.log("mounted");
    },
    methods: {
        selecttime(index) {
            this.timeType = index;
            this.chart.clear();
            this.sandianData = [];
            this.getData();
        },
        getData() {
            getStocksChangepercentData({}).then((res) => {
                this.sandianData = [];
                this.resData = this.timeType == "0" ? res.同步性 : res.抗跌性;
                console.log(this.timeType == "0");
                this.resData.aboveAvgChangepercentStocks.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.changepercent;
                    dataItem[2] = item.stockName;
                    dataItem[3] = "up";
                    this.sandianData.push(dataItem);
                });
                this.resData.belowAvgChangepercentStocks.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.changepercent;
                    dataItem[2] = item.stockName;
                    dataItem[3] = "down";
                    this.sandianData.push(dataItem);
                });
                this.setChart();
            });
        },
        setChart() {
            this.chart = echarts.init(
                document.getElementById("charts-zhishubankuai-zhong")
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
                    splitLine: {
                        show: false,
                    },

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
                        const data = params[0].data[1];
                        return params[0].data[2] + ": " + data;
                    },
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
                            fontSize: 16,
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
                                color: function (param) {
                                    if (param.value[3] == "up") {
                                        return "rgba(255, 52, 38, 1)";
                                    } else {
                                        return "rgba(26, 176, 93, 1)";
                                    }
                                },

                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[2];
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
        toDetail() {
            this.$router.push({
                path: "/zhong-zhishubankuai-detail",
                query: {
                    title1: "重点预警",
                    title2: "个股与指数的关系",
                },
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-zhishubankuai {
    width: 900px;
    height: 500px;
    padding: 7px 5px;
    .time-active {
        // color: #fff45c;
        background-color: rgba(246, 211, 34, 0.7);
        color: white;
        // box-shadow: 0px 0px 15px #fff45c inset;
    }
    .time-unactive {
        color: white;
        background-color: rgba(246, 211, 34, 0.4);
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
            top: 110px;
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
            top: 220px;
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
    .ant-select-selection {
        background-color: rgba(5, 49, 58, 0.5);
        color: #09b8bc;
        // border-color: rgba(5, 49, 58, 1);
        height: 35px;
    }
    .anticon {
        color: #09b8bc;
    }
    .ant-btn {
        color: white;
        border-color: #5d9a9e;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        background: url(../../../../assets/img/quanqiu.png) no-repeat;
        background-repeat: no-repeat;
        background-position: left top;
        background-origin: content-box;
        background-size: 100% 100%;
        width: 100%;
        height: 480px;
        margin-left: -20px;
        margin-top: 10px;
    }
    .ant-table-thead > tr > th {
        background-color: rgba(2, 81, 93, 1);
        color: white;
        font-size: 14px;
        text-align: center;
    }
    .ant-table-tbody > tr > td {
        color: #64b7bc;
        border-color: #5f9ea0;
    }
    .detail {
        position: absolute;
        right: 20px;
    }
    .green {
        color: #1ab05d;
        .ant-btn {
            background-color: #1ab05d;
        }
    }
    .red {
        color: #ff5145;
        .ant-btn {
            background-color: #ff5145;
        }
    }
    .ant-table-tbody > tr > td {
        text-align: cenetr;
    }
}
.ant-select-dropdown-menu {
    background-color: rgba(5, 49, 58, 0.7);
    color: #09b8bc;
}
.ant-select-dropdown-menu-item-selected {
    background-color: #082d37;
    color: #09b8bc;
}
.ant-select-dropdown-menu-item:hover:not(
        .ant-select-dropdown-menu-item-disabled
    ) {
    background-color: #082d37;
}
.ant-select-dropdown-menu-item {
    color: #09b8bc;
}
</style>
