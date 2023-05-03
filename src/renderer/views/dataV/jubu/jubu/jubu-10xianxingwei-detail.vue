<template>
  <div class="jubu-10xianxingwei-detail">
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
        <span style="padding-right: 5px"> 局部预警 </span>/
        <span style="color: rgba(100, 183, 188, 1); padding-left: 5px">{{ type == 0 ? '10天线性跟踪' : '10天线性未跟踪'}}</span>
      </div>
      <div style="margin-right: 3vw" @click="back"> <a-button>
          返回
        </a-button></div>
    </div>
    <div class="top-contain">
      <div>
        <span class="padding active">10天线性未跟踪</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="table1">
        <div class="table1-1">
          <div class="space">
            <div style="font-size: 16px; color: white;padding-top: 10px; padding-bottom: 10px;padding-left: 10px;">基准日期</div>
            <a-date-picker v-model="date" @change="onChange" />
          </div>
          <hr style="border-color: rgba(2, 81, 93, 0.8);margin-top: 10px">
          <div>
            <a-row>
              <a-col :span="20" :push="1" style="color:rgba(93, 154, 158) ;font-size: 16px;margin-top: 20px;">{{option.legend.data.length}}条搜寻结果</a-col>

            </a-row>
            <div style="text-align: center">
              <a-col :span="10" :pull="1" :offset="2" class="gupiao-item shadow" v-for="(item)  in option.legend.data" :key="item" :class="
                        selectedGupiao.includes(item)
                            ? 'gupiao-active'
                            : 'gupiao-unactive'
                    " @click="selectgupiao(item)" style="margin-top: 20px;">
                <div class="gupiao">{{ item }}</div>
                <div class="divider">
                  <a-divider />
                </div>
              </a-col>
            </div>

          </div>
        </div>
      </div>

      <div class="table2 ">
        <div class="table2-1">
          <div class="juzhong" style="padding-top: 10px; padding-bottom: 20px;">
            <div class="table-shadow" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                                margin-right: 30px;
                            " :class="
                                type == '0'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="changetype('0')">突破</div>
            <div class="table-shadow" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                            " :class="
                                type == '1'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="changetype('1')">未突破</div>
          </div>
        </div>
        <div id="charts-10xianxing" style="height: 850px; width: 100%; margin-top: 0px"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { getStockThrough10Data } from "@/api/userInfo.js";
// import { sendRequestWithInterval } from "@/utils/gpyj.js";
import pollMixin from "@/utils/gpyjminix.js";

import {
    getSecond,
    getDay,
    getMax,
    getMin,
    get10dayago,
} from "@/utils/gpyj.js";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";

export default {
    data() {
        return {
            resData: [],
            sandianData: [],
            selectedGupiao: [],
            dateArr: [],
            dataObj: {},
            option: {},
            type: 1,
            date: "",
            title: "",
            pollApi: this.getData,
        };
    },
    mixins: [pollMixin],
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.date = get10dayago();
        this.getData();
        console.log(this.pollApi);
        // sendRequestWithInterval(this.getData, this);
    },
    activated() {
        // this.getData();
    },
    deactivated() {
        // console.log(
        //     "beforeDestroybeforeDestroybeforeDestroybeforeDestroybeforeDestroybeforeDestroy"
        // );
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        changetype(type) {
            this.type = type;
            this.chart.clear();
            this.dataObj = {};
            this.dateArr = [];
            this.type = type;
            this.getDataSelect(this.resData);
        },
        selectgupiao(index) {
            // this.chart.dispatchAction({
            //     type: "hideTip",
            // });
            if (this.selectedGupiao.includes(index)) {
                const xiabiao = this.selectedGupiao.findIndex((item) => {
                    return item == index;
                });
                this.selectedGupiao.splice(xiabiao, 1);
                this.chart.dispatchAction({
                    type: "legendUnSelect",
                    name: index,
                });
            } else {
                this.selectedGupiao.push(index);
                this.chart.dispatchAction({
                    type: "legendSelect",
                    name: index,
                });
            }
        },
        onChange(el) {
            console.log(el.format("YYYY-MM-DD"));
            console.log(this.date.format("YYYY-MM-DD"));
            this.chart.clear();
            this.dataObj = {};
            this.dateArr = [];
            this.date = el.format("YYYY-MM-DD");
            this.getData();
        },
        getDataSelect(res) {
            if (this.type == "0") {
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
            } else {
                res.notthroughList.forEach((element, index) => {
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
            }

            this.setChart();
        },
        getData(date) {
            getStockThrough10Data({
                // startDate: dayjs().format("YYYY-MM-DD"),
                startDate: this.date,
            }).then((res) => {
                this.resData = res;
                res.notthroughList.forEach((element, index) => {
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
                    top: "5%",
                    right: "5%",
                    bottom: "15%",
                },
                legend: {
                    data: [],
                    textStyle: {
                        fontSize: 18, //字体大小
                        color: "#64B7BC", //字体颜色
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
            console.log(this.dataObj);
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
            this.selectedGupiao = JSON.parse(
                JSON.stringify(option.legend.data)
            );
            this.option = option;
            console.log(this.option);
            console.log(option);

            this.$nextTick(() => {
                this.chart = echarts.init(
                    document.getElementById("charts-10xianxing")
                );
                this.chart.setOption(option);
                // chart.firstChild.firstChild.width = 400;
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-10xianxingwei-detail {
    .space {
        display: flex;
        justify-content: space-around;
        align-items: center;
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
        // width: 50%;
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
        // width: 90%;
        // margin-left: auto;
        // margin-right: auto;
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
        width: 20%;
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
    }
    .shadow {
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
    }
    .table1-1 {
        height: 100%;
        overflow-y: scroll;
    }
    .table1-2 {
        height: 48%;
        overflow: scroll;
        margin-top: 20px;
    }
    .table2 {
        width: 80%;
        height: 100%;
        margin-left: 20px;
        position: relative;
    }
    .time-active {
        color: #1dffff;
        box-shadow: 0px 0px 15px #1dffff inset;
    }
    .time-unactive {
        color: #64b7bc;
    }
    .ant-input {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        color: #1de2e2;
        font-size: 14px;
        line-height: 1.5;
        background-color: #082932;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
    }
}
</style>
