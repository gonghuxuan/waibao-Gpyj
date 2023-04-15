<template>
  <div class="jubu-zijin">
    <div class="juzhong">资金流向
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px" />
    </div>
    <div class="table-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">

        <template slot="changepercent" slot-scope="changepercent">
          <div :class="changepercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="changepercent > 0"> +</span>
              {{ changepercent }}
            </a-button>
          </div>
        </template>
        <template slot="mainAmount" slot-scope="mainAmount, record">
          <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        mainAmount
                    }}</div>
        </template>
        <template slot="mainAmountProportion" slot-scope="mainAmountProportion, record">
          <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        mainAmountProportion
                    }}</div>
        </template>
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
  </div>
</template>
  <!-- :class="
  record[index].changepercent > 0 ? 'red' : 'green'
  " -->
  <script>
import { getAmountDirection, getLetfStocks } from "@/api/userInfo.js";
import dayjs from "dayjs";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
export default {
    data() {
        return {
            columns: [
                {
                    title: "股票名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                },
                {
                    title: "涨跌幅",
                    dataIndex: "changepercent",
                    key: "changepercent",
                    scopedSlots: { customRender: "changepercent" },
                    align: "center",
                },
                {
                    title: "主力净流入",
                    align: "center",
                    children: [
                        {
                            title: "净额",
                            dataIndex: "mainAmount",
                            key: "mainAmount",
                            scopedSlots: { customRender: "mainAmount" },
                        },
                        {
                            title: "净占比",
                            dataIndex: "mainAmountProportion",
                            key: "mainAmountProportion",
                            scopedSlots: {
                                customRender: "mainAmountProportion",
                            },
                        },
                    ],
                },
            ],
            resData: [
                {
                    amount: 1136690.0, //成交额
                    changepercent: -2.7, //涨跌幅
                    close: 17.97, //价格
                    largeAmount: 820.0, //大单净流入额
                    largeAmountProportion: 0.07200000000000001, //大单净流入占比（%）
                    mainAmount: 11461.0, //主力净流入额
                    mainAmountProportion: 1.008, //主力净流入占比（%）
                    stockCode: "601360", //股票代码
                    stockName: "三六零", //股票名称
                    superLargeAmount: 10641.0, //超大单净流入额
                    superLargeAmountProportion: 0.936, //超大单净流入占比（%）
                },
                {
                    amount: 1136690.0, //成交额
                    changepercent: 7.09, //涨跌幅
                    close: 17.97, //价格
                    largeAmount: 820.0, //大单净流入额
                    largeAmountProportion: 0.07200000000000001, //大单净流入占比（%）
                    mainAmount: 11461.0, //主力净流入额
                    mainAmountProportion: 1.008, //主力净流入占比（%）
                    stockCode: "601361", //股票代码
                    stockName: "三六零2", //股票名称
                    superLargeAmount: 10641.0, //超大单净流入额
                    superLargeAmountProportion: 0.936, //超大单净流入占比（%）
                },
                {
                    amount: 1136690.0, //成交额
                    changepercent: 7.09, //涨跌幅
                    close: 17.97, //价格
                    largeAmount: 820.0, //大单净流入额
                    largeAmountProportion: 0.07200000000000001, //大单净流入占比（%）
                    mainAmount: 11461.0, //主力净流入额
                    mainAmountProportion: 1.008, //主力净流入占比（%）
                    stockCode: "601362", //股票代码
                    stockName: "三六零3", //股票名称
                    superLargeAmount: 10641.0, //超大单净流入额
                    superLargeAmountProportion: 0.936, //超大单净流入占比（%）
                },
            ],
        };
    },
    props: {
        stockType: {
            type: String,
            default: 0,
        },
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
            getAmountDirection({ dealDate: dayjs().format("YYYY-MM-DD") }).then(
                (res) => {
                    console.log(res);
                    // this.resData = res;
                }
            );
        },
        toDetail() {
            this.$router.push({
                path: "/quan-zijin-detail",
                query: {
                    stockType: 0,
                    title1: "全场预警",
                    title2: "资金流向",
                },
            });
        },
    },
};
</script>
  
  <style lang="scss">
.jubu-zijin {
    width: 100%;
    height: 100%;
    padding: 7px 5px;

    .ant-btn {
        color: white;
        border-color: #5d9a9e;
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
</style>
  