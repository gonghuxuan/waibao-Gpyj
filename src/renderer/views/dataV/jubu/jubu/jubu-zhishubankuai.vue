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
            getPlateChangepercentData({}).then((res) => {
                console.log("指数板块-----", res);
                this.resData = res;
                this.setChart();
            });
        },
        setChart() {
            this.chart = echarts.init(
                document.getElementById("charts-zhishubankuai")
            );
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
                },
                series: [
                    {
                        symbolSize: 10,
                        data: [
                            [96.24, 11.35, "张三"],
                            [33.09, 85.11, "李四"],
                            [57.6, 36.61, "王五"],
                            [36.77, 27.26, "张三"],
                            [20.1, 6.72, "张三"],
                            [45.53, 36.37, "张三"],
                            [110.07, 80.13, "张三"],
                            [72.05, 20.88, "张三"],
                            [39.82, 37.15, "张三"],
                            [48.05, 70.5, "张三"],
                            [0.85, 2.57, "张三"],
                            [51.66, 63.7, "张三"],
                            [61.07, 127.13, "张三"],
                            [64.54, 33.59, "张三"],
                            [35.5, 25.01, "张三"],
                            [226.55, 664.02, "张三"],
                            [188.6, 175.31, "张三"],
                            [81.31, 108.68, "张三"],
                        ],
                        markLine: {
                            symbol: "none", //去掉警戒线最后面的箭头
                            label: {
                                position: "start", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                {
                                    silent: true, //鼠标悬停事件  true没有，false有
                                    lineStyle: {
                                        //警戒线的样式  ，虚实  颜色
                                        // type: "dashed",
                                        // color: "#5D9A9E",
                                        normal: {
                                            lineStyle: {
                                                type: "dashed",
                                                color: "#5D9A9E",
                                                // type: 'solid'  //'dotted'虚线 'solid'实线
                                            },
                                            label: {
                                                show: false,
                                                position: "center",
                                                //  formatter: '{a}',
                                            },
                                        },
                                    },
                                    yAxis: this.resData.avgChangepercent, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                                },
                            ],
                        },
                        type: "scatter",
                    },
                ],
            };
            const data = [
                [96.24, 11.35, "张三"],
                [33.09, 85.11, "李四"],
                [57.6, 36.61, "王五"],
                [36.77, 27.26, "张三"],
                [20.1, 6.72, "张三"],
                [45.53, 36.37, "张三"],
                [110.07, 80.13, "张三"],
                [72.05, 20.88, "张三"],
                [39.82, 37.15, "张三"],
                [48.05, 70.5, "张三"],
                [0.85, 2.57, "张三"],
                [51.66, 63.7, "张三"],
                [61.07, 127.13, "张三"],
                [64.54, 33.59, "张三"],
                [35.5, 25.01, "张三"],
                [226.55, 664.02, "张三"],
                [188.6, 175.31, "张三"],
                [81.31, 108.68, "张三"],
            ];

            const option2 = {
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                    },
                },
                title: {
                    text: "18 companies net profit and main business income (million)",
                    subtext: "By ecStat.regression",
                    sublink: "https://github.com/ecomfe/echarts-stat",
                    left: "center",
                    top: 16,
                },
                xAxis: {
                    type: "category",
                    min: "value",
                },
                yAxis: {
                    type: "value",
                    min: 0,
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                        },
                    },
                },
                grid: {
                    top: 90,
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
                                    color: "blue",
                                    fontSize: 16,
                                },
                            },
                        },
                        itemStyle: {
                            show: true,
                            markPoint: {
                                tooltip: {
                                    show: true,
                                    formatter: "z",
                                },
                            },
                        },
                        data: data,
                        itemStyle: {
                            normal: {
                                label: {
                                    position: [5, 9],
                                    show: true,
                                    formatter: function (params) {
                                        return params.value[2];
                                    },
                                },
                            },
                        },
                    },
                    {
                        name: "示例",
                        type: "line",
                        data: [60],
                        markLine: {
                            data: [{ type: "average", name: "平均值" }],
                        },
                    },
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: "line",
                        symbol: "pin",
                        symbolSize: 10,
                        lineStyle: {
                            normal: {
                                color: "blue",
                                width: 4,
                                type: "dashed",
                            },
                        },
                        itemStyle: { normal: { label: { show: true } } },
                    },
                ],
            };

            console.log("111111111111111111option11");
            this.chart.setOption(option2);
            console.log("111111111111111111option11222222222222");
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
