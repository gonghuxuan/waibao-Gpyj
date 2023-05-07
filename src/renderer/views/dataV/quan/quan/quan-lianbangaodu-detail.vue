<template>
  <div class="quan-lianban-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">个股连扳高度预警</span>
      </div>
    </div>
    <div class="content-contain-detail">
      <div style="color: #64B7BC; font-size: 16px; padding-left: 20px; padding-bottom: 20px;">自定义时间
        <a-range-picker style="margin-left: 20px;" :disabled-date="disabledDate" v-model="rangeTime" @change="changetime" @calendarChange="calendarPriceRangeChange" format="YYYY-MM-DD" />
      </div>
      <a-table bordered :columns="columns" :data-source="datasource" :pagination="false" class="table">
        <!-- <template slot="plateChangepercent" slot-scope="plateChangepercent">
          <div :class="plateChangepercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent > 0"> +</span>
              {{ plateChangepercent }}
            </a-button>
          </div>
        </template>
        <template slot="plateChangepercentM" slot-scope="plateChangepercentM">
          <div :class="plateChangepercentM > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercentM > 0"> +</span>
              {{ plateChangepercentM }}
            </a-button>
          </div>
        </template>

        <a slot="name" slot-scope="text">{{ text }}</a> -->
        <template slot="stockName" slot-scope="stockName">
          <div class="stockNaame" v-if="typeof stockName == 'string'">
            {{ stockName }}
          </div>
          <div v-if="typeof stockName == 'object'">
            共<span style="color: #FFF45C">{{stockName.stockCount}}</span>只晋级率 <span style="color:#FF5145">{{ stockName.successRate }} %</span>
          </div>
        </template>
        <span :slot="item" v-for="(item, index) in columnsSlot" :key="index">共
          <span style="color:#FFF45C">{{  resData[index].countall }}</span> 只 晋级率
          <span style="color:#FF5145">{{  resData[index].rateall }}</span>
        </span>
      </a-table>
      <div style="padding-bottom: 150px"></div>
    </div>
  </div>
</template>

<script>
import { getContinuousStockUpstop } from "@/api/userInfo.js";
import { getFiveDay, getDay, getMax, getMin } from "@/utils/gpyj.js";
import cloneDeep from "lodash/cloneDeep";
import moment from "moment";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";
import { get } from "http";
import { chownSync } from "fs";

export default {
    data() {
        return {
            pollApi: this.getData,
            fiveDateArr: [],
            columnscopy: [],
            realColumns: [],
            rangeTime: [],
            selectPriceDate: "",
            offsetDays: 2592000 * 1000,
            show: false,
            columns: [
                {
                    title: "板块",
                    dataIndex: "bankuai",
                    key: "bankuai",
                    align: "center",
                    customRender: (value, row, index) => {
                        const obj = {
                            children: value,
                            attrs: {},
                        };
                        if (row.col) {
                            obj.attrs.rowSpan = row.col + 1;
                        } else {
                            obj.attrs.rowSpan = 0;
                        }
                        return obj;
                    },
                },
                // {
                //     title: "2023-01-03",
                //     align: "center",
                //     children: [
                //         {
                //             // title: "共16只晋级率23%",
                //             align: "center",
                //             slots: { title: "title" },
                //             scopedSlots: { customRender: "title" },

                //             children: [
                //                 {
                //                     title: "名称",
                //                     dataIndex: "stockName",
                //                     key: "stockName",
                //                     scopedSlots: { customRender: "stockName" },
                //                     align: "center",
                //                     customRender: () => 123,
                //                 },
                //                 {
                //                     title: "封单额",
                //                     dataIndex: "stopAmount",
                //                     key: "stopAmount",
                //                     // scopedSlots: {
                //                     //     customRender: "mainAmountProportion",
                //                     // },
                //                     align: "center",
                //                     customRender: (value, row, index) => {
                //                         // this.render();
                //                     },
                //                 },
                //             ],
                //         },
                //     ],
                // },
            ],
            resObj: [],
            resData: [],
            timeData: [],
            columnsSlot: [],
            datasource: [],
            columnsTemplate: {
                title: "2023-01-03",
                align: "center",
                children: [
                    {
                        // title: "共16只晋级率23%",
                        align: "center",
                        slots: { title: "title" },
                        scopedSlots: { customRender: "title" },
                        width: 300,
                        children: [
                            {
                                title: "名称",
                                dataIndex: "stockName",
                                key: "stockName",
                                scopedSlots: { customRender: "stockName" },
                                align: "center",
                                customRender: (value, row, index) => {
                                    const obj = {
                                        children: value,
                                        attrs: {},
                                    };
                                    if (index === 4) {
                                        obj.attrs.colSpan = 0;
                                    }
                                    return obj;
                                },
                            },
                            {
                                title: "封单额(万)",
                                dataIndex: "stopAmount",
                                key: "stopAmount",
                                // scopedSlots: {
                                //     customRender: "mainAmountProportion",
                                // },
                                align: "center",
                                customRender: (value, row, index) => {
                                    this.render();
                                },
                            },
                        ],
                    },
                ],
            },
        };
    },
    watch: {
        columns(val, oldVal) {
            this.copyColumns = val;
        },
    },
    mixins: [pollMixin],
    components: {},
    computed: {
        getColumns() {
            return this.columns;
            // await this.getData();
            // return this.columns;
        },
    },
    created() {},
    mounted() {
        // this.dateColumns.children = [
        //     ...this.dateColumns.children,
        //     ...this.dateColumns.children,
        // ];
        this.fiveDateArr = getFiveDay();
        this.rangeTime = [this.fiveDateArr[4], this.fiveDateArr[0]];
        this.getData();
    },
    methods: {
        calendarPriceRangeChange(date) {
            this.selectPriceDate = date[0];
        },
        changetime() {
            this.getData(
                this.rangeTime[0].format("YYYY-MM-DD"),
                this.rangeTime[1].format("YYYY-MM-DD")
            );
        },
        disabledDate(current) {
            // Can not select days before today and today
            if (this.selectPriceDate) {
                let selectV = moment(
                    this.selectPriceDate,
                    "YYYY-MM-DD"
                ).valueOf();
                return (
                    current >
                        moment(
                            this.formatDate(
                                new Date(selectV + this.offsetDays).getTime(),
                                "Y-m-d"
                            )
                        ) ||
                    current <
                        moment(
                            this.formatDate(
                                new Date(selectV - this.offsetDays).getTime(),
                                "Y-m-d"
                            )
                        ) ||
                    current > moment().endOf("day")
                );
            } else {
                return current > moment().endOf("day");
            }
        },
        formatDate: (timestamp, formatLayout = "Y-m-d H:i:s") => {
            let formatDate = "";
            formatLayout = formatLayout.toUpperCase();
            timestamp =
                (timestamp + "").length > 11 ? timestamp : timestamp * 1000;
            let time = new Date(timestamp);
            for (let i in formatLayout) {
                if (
                    ["Y", "M", "D", "W", "H", "I", "S"].indexOf(
                        formatLayout[i]
                    ) >= 0
                ) {
                    switch (formatLayout[i]) {
                        case "Y":
                            formatDate += time.getFullYear();
                            break;
                        case "M":
                            formatDate +=
                                time.getMonth() >= 9
                                    ? time.getMonth() + 1
                                    : "0" + (time.getMonth() + 1);
                            break;
                        case "D":
                            formatDate +=
                                time.getDate() > 9
                                    ? time.getDate()
                                    : "0" + time.getDate();
                            break;
                        case "W":
                            formatDate +=
                                time.getDay() == 0 ? 7 : time.getDay();
                            break;
                        case "H":
                            formatDate +=
                                time.getHours() > 9
                                    ? time.getHours()
                                    : "0" + time.getHours();
                            break;
                        case "I":
                            formatDate +=
                                time.getMinutes() > 9
                                    ? time.getMinutes()
                                    : "0" + time.getMinutes();
                            break;
                        case "S":
                            formatDate +=
                                time.getSeconds() > 9
                                    ? time.getSeconds()
                                    : "0" + time.getSeconds();
                            break;
                    }
                } else {
                    formatDate += formatLayout[i];
                }
            }

            return formatDate;
        },
        render() {},
        customCell(record, index) {},
        getData(start, end) {
            getContinuousStockUpstop({
                startDate: start ? start : this.rangeTime[0],
                endDate: end ? end : this.rangeTime[1],
            }).then((res) => {
                this.datasource = [];
                this.resObj = [];
                this.resData = [];
                this.timeData = [];
                this.columns.length = 1;
                this.columnsSlot = [];

                this.setRes(res);
                this.setColumns();
                this.show = true;
            });
        },
        setRes(res) {
            for (let key in res) {
                let countall = 0;
                let rateall = 0;
                // console.log(res[key]);
                for (let keyinner in res[key]) {
                    countall += res[key][keyinner].stockCount;
                    rateall +=
                        res[key][keyinner].stockCount *
                        res[key][keyinner].successRate;
                }
                // console.log(res[key]);
                // console.log("alllllllllllll", countall);

                rateall = (rateall / countall).toFixed(2);
                res[key].countall = countall;
                res[key].rateall = rateall;
                // console.log(res);
            }
            // console.log(res);
            const resData = [];
            for (let key in res) {
                res[key].key = key;
                resData.push(res[key]);
                this.timeData.push(key);
                this.resObj = res;
            }
            // console.log(resData);
            // console.log(this.timeData);
            // console.log(this.resObj);
            this.resData = resData;
            this.setResContent(res);
            // console.log(this.resData);
        },
        setResContent(res) {
            const resDataChange = [];
            console.log(this.fiveDateArr);
            console.log(res);
            const cunzai = Object.keys(res)[0];
            console.log(cunzai);
            const arr = Object.keys(res[cunzai]).splice(0, 8); // 本来是1
            arr.reverse();
            const arrmax = [];
            // console.log(arr);
            arr.forEach((item) => {
                const maxnum = { [item]: 0 };
                for (let key in res) {
                    if (res[key][item].stockCount > maxnum[item]) {
                        maxnum[item] = res[key][item].stockCount;
                    }
                }
                arrmax.push(maxnum);
            });
            const datasource = [];
            const reskeyArr = Object.keys(res);
            // arr =  ["1", "2", "3", "4", "5", "6", "7", "8+"]
            // arrmax = [0: {1: 36}
            // 1: {2: 5}
            // 2: {3: 1}
            // 3: {4: 0}
            // 4: {5: 0}
            // 5: {6: 0}
            // 6: {7: 0}
            // 7: {8+: 0}]

            // reskeyArr =  ["2023-04-21", "2023-04-20", "2023-04-19", "2023-04-18", "2023-04-17"]
            // console.log(reskeyArr);
            const paramtitleobj = {};
            arr.forEach((item) => {
                paramtitleobj[item] = false;
            });
            arr.forEach((item, index) => {
                const paramtitle = {
                    bankuai: item,
                };
                // console.log(arrmax[index][item]);
                for (let i = 0; i < arrmax[index][item]; i++) {
                    const param = {};
                    reskeyArr.forEach((itemdate, index) => {
                        param.bankuai = item;
                        // console.log(res[itemdate][item]?.stockUpstopList);
                        // console.log(typeof res[itemdate][item].stockUpstopList);
                        if (
                            typeof res[itemdate][item].stockUpstopList ===
                            "object"
                        ) {
                            // if (
                            //     res[itemdate][item].stockUpstopList[i] ==
                            //     undefined
                            // ) {
                            //     // console.log(
                            //     //     res[itemdate][item].stockUpstopList
                            //     // );
                            //     // console.log(i);
                            //     // console.log(itemdate);
                            // }
                            if (i === 0) {
                                paramtitle["stockName" + index] = {
                                    stockCount: res[itemdate][item].stockCount,
                                    successRate:
                                        res[itemdate][item].successRate,
                                };
                            }

                            param["stockName" + index] =
                                res[itemdate][item].stockUpstopList[
                                    i
                                ]?.stockName;
                            param["stopAmount" + index] =
                                res[itemdate][item].stockUpstopList[
                                    i
                                ]?.stopAmount.toFixed(2);
                            // console.log(
                            //     res[itemdate][item].stockUpstopList[i].stockName
                            // );
                        }
                    });
                    if (i === 0) {
                        paramtitle.col = arrmax[index][item];
                        datasource.push(paramtitle);
                    }
                    datasource.push(param);
                }
            });
            this.datasource = datasource;
            // // const paramtitleobj = {};
            // // arr.forEach((item) => {
            // //     paramtitleobj[item] = false;
            // // });
            // console.log(paramtitleobj);
            // // this.datasource.forEach(item) {
            // //     if(!paramtitleobj[item].bankuai) {

            // //     }
            // // }
            // const resArr = [];
            // for (let key in res) {
            //     resArr.push(res[key]);
            // }
            // console.log(resArr);
            // arr.forEach((item, index) => {
            //     const paramtitle = {}
            //     paramtitle.bankuai = item
            //     reskeyArr.forEach((itemdate,index) => {
            //         if(typeof res[itemdate][item].stockUpstopList === 'object') {
            //             paramtitle['stockName' + index] =
            //         }
            //     })
            // });
            // for (let key in res) {
            //     for (let num in res[key]) {
            //         if (typeof res[key][num] === "object") {
            //             // console.log(typeof res[key][num].stockUpstopList);
            //             if (typeof res[key][num].stockUpstopList === "object") {
            //                 // console.log(res[key][num].stockUpstopList);
            //                 // console.log(res[key].key);
            //                 // console.log(res[key][num]);
            //             }
            //         }
            //     }
            // }
            // console.log(arrmax);
            // console.log(datasource);

            // console.log(arrmax);
            // for (let key in res) {
            //     let num = 0;
            //     console.log(res[key]);
            //     arr.forEach((item) => {
            //         console.log(res[key][item].stockCount);
            //     });
            // }
        },
        setColumns() {
            this.timeData.forEach((item, index) => {
                const copyColumns = JSON.parse(
                    JSON.stringify(this.columnsTemplate)
                );
                const indexFlag = item.substring(item.length - 2);
                copyColumns.title = item;
                console.log(item);
                copyColumns.children[0].children[0].dataIndex =
                    copyColumns.children[0].children[0].dataIndex + index;
                copyColumns.children[0].children[0].key =
                    copyColumns.children[0].children[0].key + index;

                copyColumns.children[0].children[1].dataIndex =
                    copyColumns.children[0].children[1].dataIndex + index;
                copyColumns.children[0].children[1].key =
                    copyColumns.children[0].children[1].key + index;

                copyColumns.children[0].slots.title =
                    copyColumns.children[0].slots.title + index;
                this.columnsSlot.push(copyColumns.children[0].slots.title);

                this.columns.push(copyColumns);

                // console.log(this.columns);
                // console.log(this.columnsSlot);
            });
            // console.log(this.columns);
            // console.log(this.columnsSlot);
            // console.log(this.datasource);
            // console.log(this.resData);
            this.realColumns = cloneDeep(this.columns);
        },
    },
};
</script>

<style lang="scss">
.quan-lianban-detail {
    td {
        min-width: 200px;
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
        color: rgba(93, 154, 158, 0.5);
        font-size: 14px;
        line-height: 1.5;
        background-color: #082932;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
    }
    .table {
        overflow: scroll;
        width: 100%;
        height: 790px;
    }
    .stockNaame {
        border-color: green;
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
    .content-contain-detail {
        // display: flex;
        padding: 10px;
        overflow: scroll;
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
    .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td {
        background-color: #082d37;
    }
    .ant-calendar th {
        min-width: unset;
    }
}
.ant-calendar th {
    min-width: unset;
}
</style>
