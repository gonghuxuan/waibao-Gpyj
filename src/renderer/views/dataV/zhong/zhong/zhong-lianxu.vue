<template>
  <div class="zhong-zhishubankuai">
    <div class="juzhong">
      {{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px; cursor: pointer" />
    </div>
    <div class="table-contain">
      <div style="margin-bottom: 50px">
        <div class="text-date" v-for="item in dateArr" :key="item"> {{ item }}</div>
      </div>
      <div id="charts-lianxu" style="height: 300px; width: 320px; margin-top: -42px;margin-left: -20px;"></div>
      <div style="margin-bottom: 50px;margin-left: -10px;">
        <div class="text-ji" :style="{'color' : item.color}" v-for="item in jiArr" :key="item.color"> {{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getConsecutiveUpStocks } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            dateArr: [],
            jiArr: [
                { name: "5级", color: "#FFF45C" },
                { name: "4级", color: "#1AB05D" },
                { name: "3级", color: "#D93DD2" },
                { name: "2级", color: "#1E8BFF" },
                { name: "1级", color: "#DE5858" },
            ],
        };
    },
    props: {
        title: {
            type: String,
            default: 0,
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
    },
    methods: {
        getData() {
            getConsecutiveUpStocks({}).then((res) => {
                const keys = Object.keys(res);
                this.dateArr = keys;
                keys.reverse().forEach((item, index) => {
                    res[item].forEach((itemDay) => {
                        const datasan = [];
                        datasan[0] = Math.random();
                        datasan[1] = Math.random() + index;
                        datasan[2] = itemDay.changepercent;
                        datasan[3] = itemDay.close;
                        datasan[4] = itemDay.stockName;
                        this.sandianData.push(datasan);
                    });
                });
                console.log(this.sandianData);
                this.setChart();
            });
        },
        setChart() {
            this.chart = echarts.init(document.getElementById("charts-lianxu"));
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
                        show: true,
                    },

                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: true,
                        alignWithLabel: false,
                    },
                    nameTextStyle: {
                        verticalAlign: "bottom",
                    },
                    min: 0,
                    max: 5,
                },
                axisLabel: {
                    // 自定义y轴刻度信息
                    formatter: function (value) {
                        var texts = [];
                        if (value == 0) {
                        } else if (value == 1) {
                            texts.push("");
                        } else if (value == 2) {
                            texts.push("");
                        } else if (value == 3) {
                            texts.push("");
                        } else if (value == 4) {
                            texts.push("");
                        } else {
                            texts.push("");
                        }
                        return texts;
                    },
                    inside: false,
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
                            param.value[4]
                        }<div><span>股票价格</span>: <span style="color: ${
                            param.value[3] > 0 ? "red" : "green"
                        }">${param.value[3]}</span></div>
                        <div><span>股票涨幅</span>: <span style="color: ${
                            param.value[3] > 0 ? "red" : "green"
                        }">${param.value[2]}</span></div>
                        </div>`;
                        // prettier-ignore
                    },
                },
                series: [
                    {
                        name: "scatter",
                        type: "scatter",
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
                            normal: {
                                color: "green",
                            },
                        },
                        grid: {
                            top: "0%",
                            left: "0%",
                            right: "0%",
                        },
                        data: this.sandianData,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    console.log(param.value[1]);
                                    if (param.value[1] < 1) {
                                        return "#DE5858";
                                    }
                                    if (param.value[1] < 2) {
                                        return "#1E8BFF";
                                    }
                                    if (param.value[1] < 3) {
                                        return "#D93DD2";
                                    }
                                    if (param.value[1] < 4) {
                                        return "#1AB05D";
                                    }
                                    if (param.value[1] < 5) {
                                        return "#FFF45C";
                                    }
                                },

                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[4];
                                    },
                                    textStyle: {
                                        color: "white",
                                        fontSize: 10,
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
                path: "/zhong-lianxu-detail",
                query: {
                    title1: "重点预警",
                    title2: "连续性检测",
                },
            });
        },
    },
};
</script>
  
  <style lang="scss">
.zhong-zhishubankuai {
    width: 900px;
    height: 500px;
    padding: 7px 5px;
    .text-date {
        font-size: 12px;
        width: 65px;
        padding-bottom: 10px;
        color: rgba(93, 154, 158, 0.5);
    }
    .text-ji {
        font-size: 13px;
        width: 30px;
        padding-bottom: 10px;
    }
    .table-contain {
        width: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
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
  