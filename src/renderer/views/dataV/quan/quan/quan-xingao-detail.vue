<template>
  <div class="xingao-detail">
    <div style="
              font-size: 16px;
                    padding-left: 10px;
                    color: rgba(100, 183, 188, 0.5);
                    margin-top: 20px;
                    margin-bottom: -20px;
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                ">
      <div style="margin-left: 3vw">
        <span style="padding-right: 5px"> 全场预警 </span>/
        <span style="color: rgba(100, 183, 188, 1); padding-left: 5px">{{ active == 0 ? '新高异动' : active == 1 ? '平台突破' : active == 2 ? '强势回调': '游资股'}}</span>
      </div>
      <div style="margin-right: 3vw" @click="back"> <a-button>
          返回
        </a-button></div>
    </div>
    <div class="top-contain" :loading="true">
      <div>
        <span class="padding" :class="active == 0 ? 'active' : 'unactive'" @click="selectType(0)">新高异动</span>
        <span class="padding" :class="active == 1 ? 'active' : 'unactive'" @click="selectType(1)">平台突破</span>
        <span class="padding" :class="active == 2 ? 'active' : 'unactive'" @click="selectType(2)">强势回调</span>
        <span class="padding" :class="active == 3 ? 'active' : 'unactive'" @click="selectType(3)">游资股</span>
      </div>
    </div>
    <a-spin :spinning="spin" size="large">
      <div class="content-contain">
        <div class="table1">
          <div style="height: 20px"></div>
          <div class="gupiao-item" v-for="item in gupiaoList" :key="item.stockCode" :class="
                        selectedGupiao == item.stockCode
                            ? 'gupiao-active'
                            : 'gupiao-unactive'
                    " @click="selectgupiao(item.stockCode)">
            <div class="gupiao">{{ item.stockName }}</div>
            <div class="divider">
              <a-divider />
            </div>
          </div>
        </div>
        <div class="table2">
          <div class="table2-1 table-shadow">
            <div class="juzhong" style="padding-top: 10px">
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
                            " @click="selecttime('0')">分时</div>
              <div class="" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                            " :class="
                                timeType == '1'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selecttime('1')">日k</div>
            </div>
            <div id="charts" :class="timeType == '0' ? 'fenshi': 'rik'">
            </div>
            <div id="chartsVol" v-show="timeType == '1'" style="height: 150px">
            </div>
          </div>
          <div class="table2-2 table-shadow">
            <div class="juzhong" style="padding-top: 10px">
              <div class="" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                                margin-right: 30px;
                            " :class="
                                category == 'MACD'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selectBottom('MACD')">MACD</div>
              <div class="" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                                margin-right: 30px;
                            " :class="
                                category == 'KDJ'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selectBottom('KDJ')">KDJ</div>
              <div class="" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size:14px;
                         " :class="
                                 category == 'RSI'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selectBottom('RSI')">RSI</div>

            </div>

            <div id="charts-2" style="height: 200px; width: 100%; margin-top: 0px"></div>
          </div>
        </div>

        <div class="table3 table-shadow">
          <div class="table3-item-contain" style="padding-top: 20px;padding-bottom: 20px">
            <div style="color: white; font-size: 18px;padding-left: 30px;">{{ stockDetailItem.stockName }}</div>
            <div style="color: white; font-size: 18px;padding-right: 30px;">{{ stockDetailItem.stockCode }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">今开</div>
            <div class="table3-value">{{ stockDetailItem.open }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">最高</div>
            <div class="table3-value">{{ stockDetailItem.high }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">最低</div>
            <div class="table3-value">{{ stockDetailItem.low }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">涨幅</div>
            <div class="table3-value" :style="stockDetailItem.changepercent > 0 ? 'color: #FF5145': 'color: #1AB05D'">{{ stockDetailItem.changepercent }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">换手(%)</div>
            <div class="table3-value">{{ stockDetailItem.tun }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">成交额(亿)</div>
            <div class="table3-value">{{ stockDetailItem.amount }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">总市值(亿)</div>
            <div class="table3-value">{{ stockDetailItem.mktCap }}</div>
          </div>
          <div class="table3-item-contain">
            <div class="table3-key">流通值(亿)</div>
            <div class="table3-value">{{ stockDetailItem.nmc }}</div>
          </div>
        </div>
      </div>
    </a-spin>

  </div>
</template>

<script>
import { getLetfStocks, getStockDataLine } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import {
    table2Option,
    table2bottomOption,
    table2bottomOptionKDJ,
    table2bottomOptionRSI,
    table2Optionfen,
} from "@/views/dataV/echartsOption/xingao.js";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";
// import langZH from "echarts/dist/extension/lang/zh_CN";
// import "echarts-liquidfill";
const zh_CN = {
    tooltip: {
        item: "项",
        items: "项",
        lowest: "最低价", // 将 'low' 映射成 '最低价',
        open: "开盘价",
    },
};
echarts.registerLocale("zh_CN", zh_CN);

export default {
    data() {
        return {
            pollApi: this.getData,
            active: 0,
            gupiaoList: [],
            selectedGupiao: "",
            timeType: "0",
            stockDetail: [],
            table3: [],
            stockIndex: 0,
            closeList: [],
            changeList: [],
            timeList: [],
            resData: [],
            category: "MACD",
            stockDetailItem: {},
            spin: false,
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        console.log("mounted123");
        if (this.$route.query.refreshMounted) {
            this.active = this.$route.query.stockType;
            this.getData();
        }

        // this.active = this.$route.query.stockType;
        // this.getData();
        // this.getName();
        // console.log(this.$route.query.stockType);
        // this.getData();
        // this.active = this.$route.query.stockType;
        // console.log(this.$route.query.stockType);
        // this.getData2();
    },
    mixins: [pollMixin],
    activated() {
        this.active = this.$route.query.stockType;
        this.getData();
        // this.getData2();
        // echarts.registerTransform(
        //     "myTransform",
        //     function (params) {
        //         var data = params.data;
        //         var dims = params.dimensions;
        //         data.forEach(function (item) {
        //             var open = item[dims.indexOf("open")];
        //             var close = item[dims.indexOf("close")];
        //             var high = item[dims.indexOf("high")];
        //             var low = item[dims.indexOf("low")];
        //             item[dims.indexOf("open")] = "开盘价: " + open;
        //             item[dims.indexOf("close")] = "收盘价: " + close;
        //             item[dims.indexOf("high")] = "最高价: " + high;
        //             item[dims.indexOf("low")] = "最低价: " + low;
        //         });
        //         return { data: data };
        //     },
        //     {
        //         type: "myTransform", // 必须指定 type 属性
        //     }
        // );
    },

    methods: {
        getData2() {
            this.stockDetail = JSON.parse(localStorage.getItem("gupiao"));
            if (this.timeType === "0") {
                this.clearList();
                this.stockIndex = this.stockDetail.length - 1;
                this.stockDetail.forEach((item) => {
                    this.closeList.push(item.close);
                    this.changeList.push(item.changepercent);
                    this.timeList.push(getSecond(item.dealDate));
                });
            } else {
            }
            this.stockDetailItem =
                this.stockDetail[this.stockDetail.length - 1];

            setTimeout(() => {
                this.setCharts();
            }, 0);
            setTimeout(() => {
                this.setCharts2();
            }, 0);
        },
        back() {
            console.log("backkkkkkk");
            this.$router.go(-1);
        },
        getTitle() {
            if (this.active === 0) {
                return "新高异动";
            }
            if (this.active === 1) {
                return "平台突破";
            }
            if (this.active === 2) {
                return "强势回调";
            }
            if (this.active === 3) {
                return "游资股";
            }
        },
        getData(stockType) {
            // this.spin = true;
            getLetfStocks({
                stockType: stockType ? stockType : this.$route.query.stockType,
            }).then((res) => {
                if (res.length > 0) {
                    this.gupiaoList = res;
                    this.selectedGupiao = this.gupiaoList[0].stockCode;
                    this.getStockDetail();
                } else {
                    this.gupiaoList = res;
                    this.stockDetailItem = {};
                    this.chart.clear();
                    this.chart2.clear();
                    this.spin = false;
                }
            });
        },
        getStockDetail() {
            getStockDataLine({
                timeType: this.timeType,
                code: this.selectedGupiao,
            }).then((res) => {
                localStorage.setItem("gupiao", JSON.stringify(res));
                this.spin = false;
                this.stockDetail = res;
                if (this.timeType === "0") {
                    this.clearList();
                    this.stockIndex = this.stockDetail.length - 1;
                    this.stockDetail.forEach((item) => {
                        this.closeList.push(item.close);
                        this.changeList.push(item.changepercent);
                        this.timeList.push(getSecond(item.dealDate));
                    });
                } else {
                }
                this.stockDetailItem =
                    this.stockDetail[this.stockDetail.length - 1];

                setTimeout(() => {
                    this.setCharts();
                    this.setCharts2();
                }, 0);
                setTimeout(() => {}, 0);
            });
        },
        selectType(index) {
            this.active = index;
            this.getData(index);
        },
        selectgupiao(stockCode) {
            this.selectedGupiao = stockCode;
            this.getStockDetail();
        },
        selectBottom(category) {
            console.log("123");
            this.category = category;
            this.chart2.clear();
            setTimeout(() => {
                if (category === "MACD") {
                    this.setCharts2();
                }
                if (category === "KDJ") {
                    this.setCharts2(
                        table2bottomOptionKDJ(this.stockDetail, this.timeType)
                    );
                }
                if (category === "RSI") {
                    this.setCharts2(
                        table2bottomOptionRSI(this.stockDetail, this.timeType)
                    );
                }
            }, 100);
        },
        clearList() {
            this.closeList = [];
            this.changeList = [];
            this.timeList = [];
        },
        selecttime(time) {
            this.chart.clear();
            this.timeType = time;
            this.getStockDetail();
        },
        setCharts2(
            option = table2bottomOption(this.stockDetail, this.timeType)
        ) {
            this.chart2 = echarts.init(document.getElementById("charts-2"));
            this.chart2.setOption(option);
        },
        setCharts() {
            this.chart = echarts.init(document.getElementById("charts"), {
                locale: "zh_CN",
            });
            // const option = {
            //     tooltip: {
            //         trigger: "axis",
            //         axisPointer: {
            //             type: "cross",
            //             crossStyle: {
            //                 color: "#999",
            //             },
            //         },
            //     },
            //     legend: {
            //         data: ["close", "changepercent"],
            //         textStyle: {
            //             fontSize: 16, //字体大小
            //             color: "#ffffff", //字体颜色
            //         },
            //     },
            //     dataZoom: [
            //         {
            //             type: "inside",
            //             start: 0,
            //             end: 20,
            //         },
            //         {
            //             show: true,
            //             type: "slider",
            //             top: "90%",
            //             // show: false,
            //         },
            //     ],
            //     xAxis: [
            //         {
            //             type: "category",
            //             data: this.timeList,
            //             axisPointer: {
            //                 type: "shadow",
            //             },
            //         },
            //     ],
            //     yAxis: [
            //         {
            //             type: "value",
            //             name: "close",
            //             scale: true,
            //         },
            //         {
            //             type: "value",
            //             name: "changepercent",
            //         },
            //     ],
            //     series: [
            //         {
            //             name: "close",
            //             type: "line",
            //             yAxisIndex: 0,
            //             data: this.closeList,
            //         },
            //         {
            //             name: "changepercent",
            //             type: "line",
            //             yAxisIndex: 1,
            //             data: this.changeList,
            //         },
            //     ],
            // };
            if (this.timeType === "0") {
                setTimeout(() => {
                    this.chart.setOption(
                        table2Optionfen(
                            this.timeList,
                            this.closeList,
                            this.changeList
                        )
                    );
                }, 0);
            } else {
                setTimeout(() => {
                    this.chart.setOption(
                        table2Option(this.stockDetail),
                        "zh_CN"
                    );
                }, 0);
            }

            // const _this = this;
            // this.chart.on("mouseover", function (param) {
            //     _this.stockIndex = param.dataIndex;
            //     _this.stockDetailItem = _this.stockDetail[_this.stockIndex];
            // });

            // this.chart.getZr().on("click", function (param) {
            //     // 获取 点击的 触发点像素坐标
            //     const pointInPixel = [param.offsetX, param.offsetY];
            //     // 判断给定的点是否在指定的坐标系或者系列上
            //     if (this.chart.containPixel("grid", pointInPixel)) {
            //         // 获取到点击的 x轴 下标  转换为逻辑坐标
            //         let xIndex = this.chart.convertFromPixel(
            //             { seriesIndex: 0 },
            //             pointInPixel
            //         )[0];
            //         // 做一些其他事情
            //         console.log("xindex", xIndex);
            //     }
            // });
        },
    },
};
</script>

<style lang="scss">
.xingao-detail {
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
        overflow: scroll;
    }
    .table2 {
        width: 70%;
        height: 100%;
        margin-left: 20px;
    }
    .table3 {
        width: 15%;
        height: 100%;
        margin-left: 20px;
    }
    .table2-1 {
        width: 100%;
        height: 560px;
    }
    .table2-2 {
        width: 100%;
        height: 224px;
        margin-top: 20px;
    }
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
}
.ant-spin-container::after {
    background-color: unset;
}
.ant-spin {
    color: green;
}
.ant-spin-dot-item {
    background-color: green;
}
</style>
