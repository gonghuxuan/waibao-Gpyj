<template>
  <div class="xingao-detail">
    <div class="top-contain">
      <div>
        <span class="padding" :class="active == 0 ? 'active' : 'unactive'" @click="selectType(0)">新高异动</span>
        <span class="padding" :class="active == 1 ? 'active' : 'unactive'" @click="selectType(1)">平台突破</span>
        <span class="padding" :class="active == 2 ? 'active' : 'unactive'" @click="selectType(2)">强势回调</span>
        <span class="padding" :class="active == 3 ? 'active' : 'unactive'" @click="selectType(3)">游资股</span>
      </div>
    </div>
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
                            " @click="selecttime('0')">分时</div>
            <div class="table-shadow" style="
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
            <div class="table-shadow" style="
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
            <div class="table-shadow" style="
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
            <div class="table-shadow" style="
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

          <div id="charts-2" style="height: 210px; width: 100%"></div>
        </div>
      </div>

      <div class="table3 table-shadow">
        <div class="table3-item-contain">
          <div style="color: white; font-size: 16px;padding-left: 30px;">{{ stockDetailItem.stockName }}</div>
          <div style="color: white; font-size: 16px;padding-right: 30px;">{{ stockDetailItem.stockCode }}</div>
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
          <div class="table3-key">换手</div>
          <div class="table3-value">{{ stockDetailItem.tun }}</div>
        </div>
        <div class="table3-item-contain">
          <div class="table3-key">成交额</div>
          <div class="table3-value">{{ stockDetailItem.amount }}</div>
        </div>
        <div class="table3-item-contain">
          <div class="table3-key">总市值</div>
          <div class="table3-value">{{ stockDetailItem.mktCap }}</div>
        </div>
        <div class="table3-item-contain">
          <div class="table3-key">流通值</div>
          <div class="table3-value">{{ stockDetailItem.nmc }}</div>
        </div>
      </div>
    </div>
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

import * as echarts from "echarts";

export default {
    data() {
        return {
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
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        // this.getName();
        // console.log(this.$route.query.stockType);
        // this.getData();
        // this.active = this.$route.query.stockType;
        // console.log(this.$route.query.stockType);
    },
    activated() {
        this.active = this.$route.query.stockType;
        this.getData();
    },

    methods: {
        getData(stockType) {
            getLetfStocks({
                stockType: stockType ? stockType : this.$route.query.stockType,
            }).then((res) => {
                this.gupiaoList = res;
                this.selectedGupiao = this.gupiaoList[0].stockCode;
                this.getStockDetail();
            });
        },
        getStockDetail() {
            getStockDataLine({
                timeType: this.timeType,
                code: this.selectedGupiao,
            }).then((res) => {
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
                }, 0);
                setTimeout(() => {
                    this.setCharts2();
                }, 0);
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
            this.category = category;
            this.chart2.clear();
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
            this.chart = echarts.init(document.getElementById("charts"));
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
                this.chart.setOption(
                    table2Optionfen(
                        this.timeList,
                        this.closeList,
                        this.changeList
                    )
                );
            } else {
                this.chart.setOption(table2Option(this.stockDetail));
            }
            const _this = this;
            this.chart.on("mouseover", function (param) {
                _this.stockIndex = param.dataIndex;
                _this.stockDetailItem = _this.stockDetail[_this.stockIndex];
            });
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
        color: #1dffff;
        box-shadow: 0px 0px 15px #1dffff inset;
    }
    .time-unactive {
        color: #64b7bc;
    }
}
</style>
