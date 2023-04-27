<template>
  <div class="jubu-10xianxing">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px; cursor: pointer" />
    </div>
    <div class="table-contain">
      <div id="charts-10xianxing" style="height: 200px; width: 100%; margin-top: 0px"></div>
    </div>
  </div>
</template>

<script>
import { getStockThrough10Data } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, get10dayago } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { mapGetters } from "vuex";

export default {
    data() {
        return {
            resData: [],
            dateArr: [],
            dataObj: {},
            option: {},
        };
    },
    props: {
        title: {
            type: String,
            default: 0,
        },
    },
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getStockThrough10Data({
                // startDate: dayjs().format("YYYY-MM-DD"),
                startDate: get10dayago(),
            }).then((res) => {
                console.log("10TIAN-----", res);
                res.throughList.forEach((element, index) => {
                    if (!this.dataObj.hasOwnProperty(element.stockName)) {
                        this.dataObj[element.stockName] = [];
                        this.dataObj[element.stockName].push(
                            element.changepercent
                        );
                    } else {
                        this.dataObj[element.stockName].push(
                            element.changepercent
                        );
                    }
                    if (index < 10) {
                        this.dateArr.push(getDay(element.dealDate));
                    }
                });
                console.log(this.dateArr);
                console.log(this.dataObj);
                this.setChart();
            });
        },
        setChart() {
            // const data = this.resData;
            const option = {
                tooltip: {
                    trigger: "axis",
                    // axisPointer: {
                    //     type: "cross",
                    //     crossStyle: {
                    //         color: "#999",
                    //     },
                    // },
                },
                legend: {
                    data: [""],
                    textStyle: {
                        fontSize: 16, //字体大小
                        color: "#ffffff", //字体颜色
                    },
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.dateArr,
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "",
                        scale: true,
                    },
                ],
                grid: {
                    left: "5%",
                    top: "25%",
                    right: "5%",
                    bottom: "15%",
                },
                legend: {
                    data: [],
                    textStyle: {
                        fontSize: 14, //字体大小
                        color: "#ffffff", //字体颜色
                    },
                },
                series: [
                    // {
                    //     name: "close",
                    //     type: "line",
                    //     yAxisIndex: 0,
                    //     data: closeList,
                    // },
                    // {
                    //     name: "changepercent",
                    //     type: "line",
                    //     yAxisIndex: 1,
                    //     data: changeList,
                    // },
                ],
            };

            for (let key in this.dataObj) {
                const seriesItem = {
                    name: key,
                    type: "line",
                    yAxisIndex: 0,
                    data: this.dataObj[key],
                };
                option.series.push(seriesItem);
                option.legend.data.push(key);
            }

            this.option = option;
            this.$nextTick(() => {
                this.chart = echarts.init(
                    document.getElementById("charts-10xianxing")
                );
                this.chart.setOption(option);
                // chart.firstChild.firstChild.width = 400;
                console.log(chart.firstChild.firstChild.width);
            });
        },
        toDetail() {
            this.$router.push({
                path: "/jubu-10xianxing-detail",
                query: {
                    title1: "局部预警",
                    title2: "10天线性跟踪",
                },
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-10xianxing {
    padding: 7px 5px;
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
        width: 400px;
        height: 195px;
        background-color: rgba(2, 81, 93, 1);
        margin-top: 5px;
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
