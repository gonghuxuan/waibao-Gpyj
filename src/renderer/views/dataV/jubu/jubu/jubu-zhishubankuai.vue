<template>
  <div class="jubu-zhishubankuai">
    <div class="juzhong">
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px; cursor: pointer" />
    </div>
    <div class="table-contain">
      <div id="charts-zhishubankuai" style="height: 500px; width: 100%; margin-top: 0px"></div>
    </div>
  </div>
</template>

<script>
import { getPlateChangepercentData } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            sandianData: [],
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
            getPlateChangepercentData({}).then((res) => {
                this.resData = res;
                this.resData.aboveAvgChangepercentPlates.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.plateChangepercent;
                    dataItem[2] = item.plateName;
                    this.sandianData.push(dataItem);
                });
                this.resData.belowAvgChangepercentPlates.forEach((item) => {
                    const dataItem = [];
                    dataItem[0] = Math.random();
                    dataItem[1] = item.plateChangepercent;
                    dataItem[2] = item.plateName;
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
                        const data = params[0].data[1].toFixed(2);
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
                path: "/jubu-chengjiaoeyidong-detail",
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
    // .table-contain {
    //     width: 100%;
    //     height: 100%;
    //     overflow: scroll;
    //     margin-top: 5px;
    // }
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
