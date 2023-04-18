<template>
  <div class="quan-zijin-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">板块涨停个数预警</span>
      </div>
    </div>
    <div class="content-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="plateChangepercent" slot-scope="plateChangepercent">
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
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getPlateStockUpstop } from "@/api/userInfo.js";

import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            columns: [
                {
                    title: "板块",
                    dataIndex: "plateName",
                    key: "plateName",
                    align: "center",
                    // customRender: (text, record, index) => `${index + 1}`, //此处为重点
                },
                {
                    title: "总数",
                    dataIndex: "stockCount",
                    key: "stockCount",
                    align: "center",
                },
                {
                    title: "2023-01-03",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount",
                            key: "stockUpstopCount",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion",
                            key: "stockUpstopProportion",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent",
                            key: "plateChangepercent",
                            align: "center",
                            scopedSlots: { customRender: "plateChangepercent" },
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum",
                            key: "highestConNum",
                            align: "center",
                        },
                    ],
                },
                {
                    title: "2023-01-02",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCountM",
                            key: "stockUpstopCountM",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportionM",
                            key: "stockUpstopProportionM",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercentM",
                            key: "plateChangepercentM",
                            align: "center",
                            scopedSlots: { customRender: "plateChangepercentM" },
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNumM",
                            key: "highestConNumM",
                            align: "center",
                        },
                    ],
                },
                {
                    title: "2023-01-01",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCountLast",
                            key: "stockUpstopCountLast",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportionLast",
                            key: "stockUpstopProportionLast",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercentLast",
                            key: "plateChangepercentLast",
                            align: "center",
                            scopedSlots: { customRender: "plateChangepercentLast" },
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNumLast",
                            key: "highestConNumLast",
                            align: "center",
                        },
                    ],
                },
            ],
            resData: [],
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getPlateStockUpstop({
                startDate: "2023-04-12",
                endDate: "2023-04-16",
            }).then((res) => {
                console.log("板块涨停个股", res);
                let dataArr = [];
                if (res) {
                    let objkeys = Object.keys(res);
                    console.log(objkeys)
                    this.columns[2].title = objkeys[0];
                    this.columns[3].title = objkeys[1];
                    this.columns[4].title = objkeys[2];
                    dataArr = [...res[objkeys[0]]];
                    dataArr.forEach(item=>{
                        res[objkeys[1]].forEach(val=>{
                            if(item.plateName === val.plateName) {
                                item.stockUpstopCountM = val.stockUpstopCount;
                                item.stockUpstopProportionM = val.stockUpstopProportion;
                                item.plateChangepercentM = val.plateChangepercent;
                                item.highestConNumM = val.highestConNum;
                            }
                        })
                        res[objkeys[2]].forEach(val=>{
                            if(item.plateName === val.plateName) {
                                item.stockUpstopCountLast = val.stockUpstopCount;
                                item.stockUpstopProportionLast = val.stockUpstopProportion;
                                item.plateChangepercentLast = val.plateChangepercent;
                                item.highestConNumLast = val.highestConNum;
                            }
                        })
                    })
                }
                this.resData = dataArr;
            });
        },
    },
};
</script>

<style lang="scss">
.quan-zijin-detail {
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
