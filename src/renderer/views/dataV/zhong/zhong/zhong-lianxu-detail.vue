<template>
  <div class="zhong-lianxu-detail">
    <div class="top-contain">
      <div>
        <span class="padding ">连续性检测</span>
      </div>
    </div>
    <div class="content-contain">
      <div style="margin-bottom: -115px; margin-right: -150px;">
        <div class="text-date" v-for="item in dateArr" :key="item"> {{ item }}</div>
      </div>
      <div id="charts-lianxu" style="height: 800px; width: 1800px; margin-top: 0px;margin-left: -20px;"></div>
      <div style="margin-bottom: -90px; margin-left: -100px;">
        <div class="text-ji" :style="{'color' : item.color}" v-for="item in jiArr" :key="item.color"> {{ item.name }}<span><img width="50" style="margin-left: 10px" :src="item.src" /></span></div>
      </div>
    </div>
  </div>
</template>

    <script>
import { getHitStocks } from "@/api/userInfo.js";
import { getConsecutiveUpStocks } from "@/api/userInfo.js";

import * as echarts from "echarts";
import pollMixin from "@/utils/gpyjminix.js";

// console.log(echarts);
export default {
    data() {
        return {
            pollApi: this.getData,
            highestConNum: "",
            avgSuccessRate: "",
            resData: [],
            resDatadizeng: [],
            resDatayidong: [],
            resDatajigou: [],
            resData1: [],
            resData2: [],
            resData3: [],
            lianbantianti: {},
            pagination: {
                showQuickJumper: true,
            },

            sandianData: [],
            dateArr: [],
            jiArr: [
                {
                    name: "5级",
                    color: "#FFF45C",
                    src: require("../../../../assets/images/5ji.svg"),
                },
                {
                    name: "4级",
                    color: "#1AB05D",
                    src: require("../../../../assets/images/4ji.svg"),
                },
                {
                    name: "3级",
                    color: "#D93DD2",
                    src: require("../../../../assets/images/3ji.svg"),
                },
                {
                    name: "2级",
                    color: "#1E8BFF",
                    src: require("../../../../assets/images/2ji.svg"),
                },
                {
                    name: "1级",
                    color: "#DE5858",
                    src: require("../../../../assets/images/1ji.svg"),
                },
            ],
        };
    },
    mixins: [pollMixin],
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getConsecutiveUpStocks({}).then((res) => {
                this.sandianData = [];
                const keys = Object.keys(res);
                this.dateArr = JSON.parse(JSON.stringify(keys));
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
                // console.log(this.sandianData);
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
                        }">${param.value[2]}</span></div>
                        <div><span>股票涨幅</span>: <span style="color: ${
                            param.value[3] > 0 ? "red" : "green"
                        }">${param.value[3]}</span></div>
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
                        symbolSize: 16,
                        itemStyle: {
                            normal: {
                                color: function (param) {
                                    // console.log(param.value[1]);
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
                                    position: [18, 5],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[4];
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
.zhong-lianxu-detail {
    .text-date {
        font-size: 14px;
        width: 85px;
        padding-bottom: 114px;
        color: rgba(93, 154, 158, 0.5);
    }
    .text-ji {
        font-size: 14px;
        width: 85px;
        padding-bottom: 85px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .daban-1 {
        background: url(../../../../assets/img/daban-1.png) no-repeat;
        background-size: cover;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .table1 {
        width: 980px;
        margin-right: 30px;
        // height: 400px;
        // overflow: scroll;
    }
    .table2 {
        width: 980px;
    }
    .table-3 {
        height: 400px;
        margin-top: 20px;
    }
    .table-hei {
        height: 360px;
        overflow: scroll;
    }
    .active {
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
    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }
    .content-contain {
        margin-top: 20px;
        // display: flex;
        // flex-direction: column;
        // padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        background: url(../../../../assets/img/jinzita.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
    }
    .table-contain {
        width: 100%;
        height: 100%;
        margin-top: 5px;
    }
    .detail {
        position: absolute;
        right: 20px;
    }
    .title-contain {
        height: 100px;
        width: 100%;
        background-image: linear-gradient(
            to right,
            rgba(255, 244, 92, 0.01),
            rgba(255, 244, 92, 0.05),
            rgba(255, 244, 92, 0.01)
        );
        font-size: 22px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .ant-btn {
        color: white;
        border-color: #5d9a9e;
        min-width: 70px;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        width: 92%;
        height: 195px;
        overflow: scroll;
        background-color: rgba(2, 81, 93, 1);
        margin: 0 auto;
        margin-top: 5px;
    }
    .ant-table-thead > tr > th {
        background-color: rgba(2, 81, 93, 0);
        color: white;
        font-size: 14px;
        text-align: center;
    }
    // .ant-table-tbody > tr > td {
    //     color: #64b7bc;
    //     border-color: #5f9ea0;
    // }
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
    .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td {
        background-color: #082d37;
    }
}
.ant-table-tbody > tr > td {
    color: #64b7bc;
    border-color: #5f9ea0;
}
.ant-pagination-options-quick-jumper {
    color: white;
}
.ant-pagination-item-container {
    color: white;
}
.ant-pagination-jump-next
    .ant-pagination-item-container
    .ant-pagination-item-ellipsis {
    color: white;
}
</style>
