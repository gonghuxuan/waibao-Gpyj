<template>
  <div class="jubu-zhishu-detail">
    <div>
      <div class="top1">
        <timecom />
        <usercom />
      </div>
      <div style="
              font-size: 16px;
                    padding-left: 10px;
                    color: rgba(100, 183, 188, 0.5);
                    margin-top: 20px;
                    margin-bottom: -20px;
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                " @click="toDetail">
        <div style="margin-left: 3vw">
          <span style="padding-right: 5px">全市场预警</span>/
          <span style="color: rgba(100, 183, 188, 1); padding-left: 5px">指数背离</span>
        </div>
        <div style="margin-right: 3vw" @click="back"> <a-button>
            返回
          </a-button></div>
      </div>
      <div class="top-contain">指数背离</div>
      <div class="content-contain">
        <a-dropdown class="dropdown" :trigger="['click']">
          <a-menu slot="overlay" @click="handleMenuClick($event)">
            <a-menu-item v-for="item in exponentNameList" :key="item">{{ item }}</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            {{ exponentName }}
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <a-dropdown class="dropdown" :trigger="['click']">
          <a-menu slot="overlay" @click="handleMenuClick2($event)">
            <a-menu-item key="0">分时</a-menu-item>
            <a-menu-item key="1">日线</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            {{ timeType == "0" ? "分时" : "日线" }}
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
        <div v-show="timeType == '0'" id="charts" style="height: 750px; width: 100%; margin-top: 0px"></div>
        <div v-show="timeType == '1'" id="chart2" style="
                        height: 750px;
                        width: 100%;
                        margin-top: 0px;
                        margin-left: -5px;
                    "></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExponentNames } from "@/api/userInfo.js";
import { getExponentDivergeSignal } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin, splitData } from "@/utils/gpyj.js";
import * as echarts from "echarts";
import timecom from "@/views/dataV/components/time.vue";
import usercom from "@/views/dataV/components/user.vue";
import pollMixin from "@/utils/gpyjminix.js";

console.log(echarts);
export default {
    data() {
        return {
            exponentName: "上证指数",
            exponentNameList: [],
            timeType: "0",
            resData: [],
            closeList: [],
            timeList: [],
            pointList: [],
            max: 0,
            min: 0,
            kHigh: [],
            kLow: [],
            kOpen: [],
            kClose: [],
            dataK: [],
            pollApi: this.getData,
        };
    },
    components: {
        timecom,
        usercom,
    },
    mixins: [pollMixin],
    computed: {},
    created() {},
    mounted() {
        this.getName();
        this.getData();
    },
    methods: {
        back() {
            console.log(123);
            this.$router.go(-1);
        },
        toDetail() {
            console.log("tiaozhuan");
            this.$router.push({
                path: "/quan-zhishu-detail",
            });
        },
        handleMenuClick(el) {
            console.log(el);
            this.exponentName = el.key;
            this.getData();
        },
        handleMenuClick2(el) {
            console.log(el.key);
            this.timeType = el.key;
            this.getData();
        },
        getName() {
            getExponentNames().then((res) => {
                console.log(res);
                this.exponentNameList = res;
            });
        },
        getData() {
            getExponentDivergeSignal({
                timeType: this.timeType,
                exponentName: this.exponentName,
            }).then((res) => {
                console.log(res);
                this.resData = res;
                this.closeList = [];
                this.timeList = [];
                this.pointList = [];
                this.max = 0;
                this.min = 0;
                this.kHigh = [];
                this.kLow = [];
                this.kOpen = [];
                this.kClose = [];
                this.dataK = [];
                this.dataK = splitData(this.resData.exponentList, [
                    "open",
                    "close",
                    "low",
                    "high",
                ]);
                this.resData.exponentList.forEach((item) => {
                    if (item.close > this.max) {
                        this.max = item.close;
                    }
                    if (item.close)
                        item.timeX =
                            this.timeType == "0"
                                ? getSecond(item.dealDate)
                                : getDay(item.dealDate);
                    if (this.timeType == "1") {
                        this.kHigh.push(item.high);
                        this.kLow.push(item.low);
                        this.kOpen.push(item.open);
                        this.kClose.push(item.close);
                    } else {
                        this.closeList.push(item.close);
                    }
                    this.timeList.push(item.timeX);
                });
                res?.signalList?.forEach((item) => {
                    item.timeX =
                        this.timeType == "0"
                            ? getSecond(item.dealDate)
                            : getDay(item.dealDate);
                    const index = this.timeList.findIndex(
                        (timeItem) => timeItem === item.timeX
                    );
                    if (this.timeType == "0") {
                        this.pointList.push({
                            name: item.timeX,
                            value: item.typeName,
                            xAxis: item.timeX,
                            yAxis: this.closeList[index],
                        });
                    } else {
                        this.pointList.push({
                            name: item.timeX,
                            value: item.typeName,
                            xAxis: item.timeX,
                            yAxis: this.kClose[index],
                        });
                    }
                });
                if (this.timeType == "0") {
                    this.max = getMax(this.closeList);
                    if (this.max < this.resData.preClose) {
                        this.max = this.resData.preClose;
                    }
                    this.min = getMin(this.closeList);
                    if (this.min > this.resData.preClose) {
                        this.min = this.resData.preClose;
                    }
                } else {
                    this.max = getMax(this.kHigh);
                    if (this.max < this.resData.preClose) {
                        this.max = this.resData.preClose;
                    }
                    this.min = getMin(this.kLow);
                    if (this.min > this.resData.preClose) {
                        this.min = this.resData.preClose;
                    }
                }
                this.setCharts();
            });
        },
        setCharts() {
            console.log(this.closeList);
            if (this.timeType == "0") {
                this.chart = echarts.init(document.getElementById("charts"));
            } else {
                this.chart2 = echarts.init(document.getElementById("chart2"));
            }
            console.log(this.pointList);
            const option1 = {
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.timeList,
                },
                yAxis: {
                    type: "value",
                    // scale: true,
                    max: this.max,
                    min: this.min,
                },

                // dataZoom: [
                //     {
                //         // 开启数据平移
                //         type: "inside", // 滑动条单独显示
                //         show: true, // 是否显示滑动条
                //         startValue: 0, // 展示区域内容的起始数值
                //         endValue: 15, // 展示区域内容的结束数值 当前展示x坐标下标为0-16
                //         height: 10, // 滑动条组件高度
                //         bottom: 0, // 距离图表区域下边的距离
                //         showDetail: false, // 拖拽时是否显示详情
                //         showDataShadow: false,
                //         fillerColor: "#D4D4D4", // 平移条的填充颜色
                //         borderColor: "transparent", // 边框颜色
                //         zoomLock: true, // 锁定视图
                //         brushSelect: false, // 不可缩放 滑动条默认是有手柄可以进行展示的内容区域缩放的，不太美观
                //         // 通过该属性可以只滑动，不显示缩放功能
                //         handleStyle: {
                //             opacity: 0,
                //         },
                //         lineStyle: {
                //             opacity: 0,
                //         },
                //         textStyle: {
                //             fontSize: 0,
                //         },
                //         filterMode: "none",
                //     },
                //     // {
                //     //     type: "inside", //这个dataZoom组件是inside型dataZoom组件
                //     //     xAxisIndex: 0, //dataZoom-inslide组件控制第一个XAxis
                //     //     start: 10, //左边在10%的位置
                //     //     end: 60, //右边在60%的位置
                //     // },
                // ],

                // dataZoom: [
                //     {
                //         type: "slider", //这个dataZoom组件是slider型dataZoom组件
                //         xAxisIndex: 0, //dataZoom-slider组件控制第一个XAxis
                //         start: 70, //左边在10%位置
                //         end: 100, //右边在60%位置
                //     },
                //     {
                //         type: "inside", //这个dataZoom组件是inside型dataZoom组件
                //         xAxisIndex: 0, //dataZoom-inslide组件控制第一个XAxis
                //         start: 70, //左边在10%的位置
                //         end: 100, //右边在60%的位置
                //     },
                // ],
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
                        data: this.closeList,
                        type: "line",
                        markPoint: {
                            data: this.pointList,
                            symbolSize: 100,
                        },
                        markLine: {
                            symbol: "none", //去掉警戒线最后面的箭头
                            label: {
                                position: "end", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                {
                                    silent: false, //鼠标悬停事件  true没有，false有
                                    lineStyle: {
                                        //警戒线的样式  ，虚实  颜色
                                        type: "dashed",
                                        color: "#5D9A9E",
                                    },
                                    yAxis: this.resData.preClose, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                                },
                            ],
                        },

                        areaStyle: {
                            //区域填充渐变颜色
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(29,226,226,0.7)", // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(29,226,226,0)", // 100% 处的颜色
                                    },
                                ],
                                global: false, // 缺省为 false
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: "#1DE2E2", //改变折线点的颜色
                                lineStyle: {
                                    color: "#1DE2E2", //改变折线颜色
                                },
                            },
                        },
                    },
                ],
            };
            const option3 = {
                // dataZoom: {
                //     // 开启数据平移
                //     type: "inside", // 滑动条单独显示
                //     show: true, // 是否显示滑动条
                //     startValue: 0, // 展示区域内容的起始数值
                //     endValue: 5, // 展示区域内容的结束数值 当前展示x坐标下标为0-16
                //     height: 10, // 滑动条组件高度
                //     bottom: 0, // 距离图表区域下边的距离
                //     showDetail: false, // 拖拽时是否显示详情
                //     showDataShadow: false,
                //     fillerColor: "#D4D4D4", // 平移条的填充颜色
                //     borderColor: "transparent", // 边框颜色
                //     zoomLock: true, // 锁定视图
                //     brushSelect: false, // 不可缩放 滑动条默认是有手柄可以进行展示的内容区域缩放的，不太美观
                //     // 通过该属性可以只滑动，不显示缩放功能
                //     handleStyle: {
                //         opacity: 0,
                //     },
                //     lineStyle: {
                //         opacity: 0,
                //     },
                //     textStyle: {
                //         fontSize: 0,
                //     },
                //     filterMode: "none",
                // },
                dataZoom: [
                    {
                        type: "slider", //这个dataZoom组件是slider型dataZoom组件
                        xAxisIndex: 0, //dataZoom-slider组件控制第一个XAxis
                        start: 60, //左边在10%位置
                        end: 100, //右边在60%位置
                        bottom: 0, // 距离图表区域下边的距离
                    },
                    {
                        type: "inside", //这个dataZoom组件是inside型dataZoom组件
                        xAxisIndex: 0, //dataZoom-inslide组件控制第一个XAxis
                        start: 70, //左边在10%的位置
                        end: 100, //右边在60%的位置
                        bottom: 100, // 距离图表区域下边的距离
                    },
                ],
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "cross",
                        label: {
                            backgroundColor: "#6a7985",
                        },
                    },
                    formatter: function (params) {
                        console.log(params);
                        var res = "时间: " + params[0].name;
                        res += "<br/>开盘价: " + params[0].data[1].toFixed(2);
                        res += "<br/>收盘价: " + params[0].data[2].toFixed(2);
                        res += "<br/>最低价: " + params[0].data[3].toFixed(2);
                        res += "<br/>最高价: " + params[0].data[4].toFixed(2);
                        return res;
                    },
                },
                title: {
                    // text: "Stacked Line",
                },
                legend: {
                    data: ["日k", "CLOSE", "OPEN", "HIGH"],
                    textStyle: {
                        fontSize: 12, //字体大小
                        color: "#ffffff", //字体颜色
                    },
                },
                grid: {
                    // left: "3%",
                    // right: "4%",
                    // bottom: "3%",
                    containLabel: true,
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.timeList,
                },
                yAxis: {
                    type: "value",
                    max: parseInt(this.max),
                    min: parseInt(this.min),
                },
                series: [
                    {
                        name: "日k",
                        type: "candlestick",
                        data: this.dataK,
                        markLine: {
                            symbol: "none", //去掉警戒线最后面的箭头
                            label: {
                                position: "middle", //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            },
                            data: [
                                {
                                    silent: false, //鼠标悬停事件  true没有，false有
                                    lineStyle: {
                                        //警戒线的样式  ，虚实  颜色
                                        type: "dashed",
                                        color: "#5D9A9E",
                                    },
                                    yAxis: this.resData.preClose, // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值
                                },
                            ],
                        },
                        markPoint: {
                            data: this.pointList,
                            symbolSize: 70,
                        },
                    },
                    // {
                    //     name: "CLOSE",
                    //     type: "line",
                    //     data: this.kClose,
                    // },
                    // {
                    //     name: "OPEN",
                    //     type: "line",
                    //     data: this.kOpen,
                    // },
                    // {
                    //     name: "HIGH",
                    //     type: "line",
                    //     data: this.kHigh,
                    // },
                ],
            };
            if (this.timeType == "0") {
                this.chart.setOption(option1);
            } else {
                this.chart2.setOption(option3);
            }
        },
    },
};
</script>

<style lang="scss">
.jubu-zhishu-detail {
    padding: 7px 5px;
    z-index: 999;
    .top1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
    }
    .ant-btn {
        background-color: #082932;
        border-color: #5d9a9e;
        color: #1de2e2;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .top-contain {
        border: 2px solid rgba(12, 220, 226, 0.3);
        background-image: linear-gradient(
            to right,
            rgba(29, 255, 255, 0.1),
            rgba(29, 255, 255, 0.3),
            rgba(29, 255, 255, 0.1)
        );
        margin-top: 40px;
        width: 96%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-size: 18px;
        color: rgba(29, 255, 255, 1);
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content-contain {
        border: 1px solid rgba(12, 220, 226, 0.1);
        height: 825px;
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
    .dropdown {
        margin-top: 20px;
    }
}
</style>
