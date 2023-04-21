<template>
  <div class="quan-lianban-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">板块涨停个数预警</span>
      </div>
    </div>
    <div class="content-contain-detail">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
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
        <template slot="plateChangepercentLast" slot-scope="plateChangepercentLast">
          <div :class="plateChangepercentLast > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercentLast > 0"> +</span>
              {{ plateChangepercentLast }}
            </a-button>
          </div>
        </template>
        <a slot="name" slot-scope="text">{{ text }}</a> -->
        <span :slot="item" v-for="(item, index) in columnsSlot" :key="index">共 <span style="color:#FFF45C">{{ resData[index].countall }}</span> 只 晋级率 <span style="color:#FF5145">{{ resData[index].rateall }}</span></span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getContinuousStockUpstop } from "@/api/userInfo.js";
import { getFiveDay, getDay, getMax, getMin } from "@/utils/gpyj.js";

import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            fiveDateArr: [],
            columns: [
                {
                    title: "板块",
                    dataIndex: "plateName",
                    key: "plateName",
                    align: "center",
                },
                // {
                //     title: "2023-01-03",
                //     align: "center",
                //     children: [
                //         {
                //             // title: "共16只晋级率23%",
                //             align: "center",
                //             slots: { title: "title1" },
                //             scopedSlots: { customRender: "title1" },

                //             children: [
                //                 {
                //                     title: "名称",
                //                     dataIndex: "stockUpstopCountM",
                //                     key: "stockUpstopCountM",
                //                     // scopedSlots: { customRender: "mainAmount" },
                //                     align: "center",
                //                 },
                //                 {
                //                     title: "封单额",
                //                     dataIndex: "stockUpstopProportionM",
                //                     key: "stockUpstopProportionM",
                //                     // scopedSlots: {
                //                     //     customRender: "mainAmountProportion",
                //                     // },
                //                     align: "center",
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
            columnsTemplate: {
                title: "2023-01-03",
                align: "center",
                children: [
                    {
                        // title: "共16只晋级率23%",
                        align: "center",
                        slots: { title: "title" },
                        scopedSlots: { customRender: "title" },

                        children: [
                            {
                                title: "名称",
                                dataIndex: "stockUpstopCountM",
                                key: "stockUpstopCountM",
                                // scopedSlots: { customRender: "mainAmount" },
                                align: "center",
                            },
                            {
                                title: "封单额",
                                dataIndex: "stockUpstopProportionM",
                                key: "stockUpstopProportionM",
                                // scopedSlots: {
                                //     customRender: "mainAmountProportion",
                                // },
                                align: "center",
                            },
                        ],
                    },
                ],
            },
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        // this.dateColumns.children = [
        //     ...this.dateColumns.children,
        //     ...this.dateColumns.children,
        // ];
        this.fiveDateArr = getFiveDay();
        this.getData();
    },
    methods: {
        getData() {
            getContinuousStockUpstop({
                startDate: this.fiveDateArr[4],
                endDate: this.fiveDateArr[0],
            }).then((res) => {
                console.log("lianbangaodu", res);
                this.setRes(res);
                this.setColumns();
            });
        },
        setRes(res) {
            for (let key in res) {
                let countall = 0;
                let rateall = 0;
                for (let keyinner in res[key]) {
                    countall += res[key][keyinner].stockCount;
                    rateall +=
                        res[key][keyinner].stockCount *
                        res[key][keyinner].successRate;
                }
                rateall = (rateall / countall).toFixed(2);
                res[key].countall = countall;
                res[key].rateall = rateall;
            }
            console.log(res);
            const resData = [];
            for (let key in res) {
                res[key].key = key;
                resData.push(res[key]);
                this.timeData.push(key);
                this.resObj = res;
            }
            console.log(resData);
            console.log(this.timeData);
            console.log(this.resObj);
            this.resData = resData;
            console.log(this.resData[0]);
        },
        setColumns() {
            this.timeData.forEach((item, index) => {
                const copyColumns = JSON.parse(
                    JSON.stringify(this.columnsTemplate)
                );
                const indexFlag = item.substring(item.length - 2);
                copyColumns.title = item;
                copyColumns.children[0].children[0].dataIndex =
                    copyColumns.children[0].children[0].dataIndex + indexFlag;
                copyColumns.children[0].children[0].key =
                    copyColumns.children[0].children[0].key + indexFlag;

                copyColumns.children[0].children[1].dataIndex =
                    copyColumns.children[0].children[1].dataIndex + indexFlag;
                copyColumns.children[0].children[1].key =
                    copyColumns.children[0].children[1].key + indexFlag;

                copyColumns.children[0].slots.title =
                    copyColumns.children[0].slots.title + indexFlag;
                this.columnsSlot.push(copyColumns.children[0].slots.title);

                this.columns.push(copyColumns);
                console.log(this.columns);
                console.log(this.columnsSlot);
            });
        },
    },
};
</script>

<style lang="scss">
.quan-lianban-detail {
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
}
</style>
