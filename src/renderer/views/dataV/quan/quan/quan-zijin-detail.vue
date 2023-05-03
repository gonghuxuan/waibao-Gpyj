<template>
  <div class="quan-zijin-detail">
    <div class="top-contain">
      <div>
        <span class="padding">资金流向</span>
      </div>
    </div>
    <div class="content-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="pagination">

        <template slot="changePercent" slot-scope="changePercent">
          <div :class="changePercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="changePercent > 0"> +</span>
              {{ changePercent | fixedTwo }}
            </a-button>
          </div>
        </template>
        <template slot="mainAmount" slot-scope="mainAmount, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          mainAmount | fixedTwo
                      }}</div>
        </template>
        <template slot="mainAmountProportion" slot-scope="mainAmountProportion, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          mainAmountProportion | fixedTwo
                      }}</div>
        </template>
        <template slot="superLargeAmount" slot-scope="superLargeAmount, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          superLargeAmount | fixedTwo
                      }}</div>
        </template>
        <template slot="superLargeAmountProportion" slot-scope="superLargeAmountProportion, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          superLargeAmountProportion | fixedTwo
                      }}</div>
        </template>
        <template slot="largeAmount" slot-scope="largeAmount, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          largeAmount | fixedTwo
                      }}</div>
        </template>
        <template slot="largeAmountProportion" slot-scope="largeAmountProportion, record">
          <div :class="record.changePercent > 0 ? 'red' : 'green'">{{
                          largeAmountProportion | fixedTwo
                      }}</div>
        </template>
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAmountDirection, getLetfStocks } from "@/api/userInfo.js";
import dayjs from "dayjs";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            pagination: {
                showQuickJumper: true,
            },
            columns: [
                {
                    title: "序号",
                    dataIndex: "key",
                    key: "key",
                    align: "center",
                    customRender: (text, record, index) => `${index + 1}`, //此处为重点
                },
                {
                    title: "代码",
                    dataIndex: "stockCode",
                    key: "stockCode",
                    align: "center",
                },
                {
                    title: "名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                },
                {
                    title: "涨跌幅",
                    dataIndex: "changePercent",
                    key: "changePercent",
                    scopedSlots: { customRender: "changePercent" },
                    align: "center",
                    sorter: (a, b) => b.changePercent - a.changePercent,
                },
                {
                    title: "今日主力净流入",
                    align: "center",
                    children: [
                        {
                            title: "净额",
                            dataIndex: "mainAmount",
                            key: "mainAmount",
                            scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) => b.mainAmount - a.mainAmount,
                        },
                        {
                            title: "净占比",
                            dataIndex: "mainAmountProportion",
                            key: "mainAmountProportion",
                            scopedSlots: {
                                customRender: "mainAmountProportion",
                            },
                            align: "center",
                            sorter: (a, b) =>
                                b.mainAmountProportion - a.mainAmountProportion,
                        },
                    ],
                },
                {
                    title: "今日超大单净流入",
                    align: "center",
                    children: [
                        {
                            title: "净额",
                            dataIndex: "superLargeAmount",
                            key: "superLargeAmount",
                            scopedSlots: { customRender: "superLargeAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.superLargeAmount - a.superLargeAmount,
                        },
                        {
                            title: "净占比",
                            dataIndex: "superLargeAmountProportion",
                            key: "superLargeAmountProportion",
                            scopedSlots: {
                                customRender: "superLargeAmountProportion",
                            },
                            align: "center",
                            sorter: (a, b) =>
                                b.superLargeAmountProportion -
                                a.superLargeAmountProportion,
                        },
                    ],
                },
                {
                    title: "今日大单净流入",
                    align: "center",
                    children: [
                        {
                            title: "净额",
                            dataIndex: "largeAmount",
                            key: "largeAmount",
                            scopedSlots: { customRender: "largeAmount" },
                            align: "center",
                            sorter: (a, b) => b.largeAmount - a.largeAmount,
                        },
                        {
                            title: "净占比",
                            dataIndex: "largeAmountProportion",
                            key: "largeAmountProportion",
                            scopedSlots: {
                                customRender: "largeAmountProportion",
                            },
                            align: "center",
                            sorter: (a, b) =>
                                b.largeAmountProportion -
                                a.largeAmountProportion,
                        },
                    ],
                },
            ],
            resData: [],
            pollApi: this.getData,
        };
    },
    components: {},
    computed: {},
    created() {},
    mixins: [pollMixin],
    mounted() {
        // this.getName();
        this.getData();
    },
    methods: {
        getData() {
            getAmountDirection({ dealDate: dayjs().format("YYYY-MM-DD") }).then(
                (res) => {
                    // console.log("资金流向", res);
                    // this.resData = res;
                    this.resData = res;
                }
            );
        },
        getStockDetail() {
            getStockDataLine({
                timeType: this.timeType,
                code: this.selectedGupiao,
            }).then((res) => {
                console.log(res);
                this.stockDetail = res;
            });
        },
        selectgupiao(stockCode) {
            this.selectedGupiao = stockCode;
        },
        selecttime(time) {
            this.timeType = time;
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
    .ant-pagination-options-quick-jumper {
        color: white;
    }
    .ant-pagination-item-container {
        color: white;
    }
    .ant-pagination-jump-next
        .ant-pagination-item-container
        .ant-pagination-item-ellipsis {
        color: white;
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
