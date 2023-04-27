<template>
  <div class="quan-zijin-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">打板</span>
      </div>
    </div>
    <div class="content-contain">
      <div style="display: flex;">
        <div class="table1">
          <div class="active padding"><span style="color: white">成交额递增</span></div>
          <a-table bordered :columns="columns" :data-source="resDatadizeng" :pagination="false" class="table-hei">
            <template slot="close" slot-scope="close, record">
              <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close
                    }}</div>
            </template>
            <template slot="amount" slot-scope="amount, record">
              <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        amount
                    }}</div>
            </template>
            <template slot="changepercent" slot-scope="changepercent">
              <div :class="changepercent > 0 ? 'red' : 'green'">
                {{ changepercent }}
              </div>
            </template>
            <template slot="changepercent" slot-scope="changepercent">
              <div :class="changepercent > 0 ? 'red' : 'green'">
                <a-button type="primary">
                  <span v-if="changepercent > 0"> +</span>
                  {{ changepercent }}
                </a-button>
              </div>
            </template>
            <template slot="changepercent3" slot-scope="changepercent3">
              <div :class="changepercent3 > 0 ? 'red' : 'green'">
                <a-button type="primary">
                  <span v-if="changepercent3 > 0"> +</span>
                  {{ changepercent3 }}
                </a-button>
              </div>
            </template>
          </a-table>
        </div>
        <div class="table2">
          <div class="active padding"><span style="color: white">成交额异动</span></div>
          <a-table bordered :columns="columns" :data-source="resDatayidong" :pagination="false" class="table-hei">
            <template slot="close" slot-scope="close, record">
              <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close
                    }}</div>
            </template>
            <template slot="amount" slot-scope="amount, record">
              <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        amount
                    }}</div>
            </template>
            <template slot="changepercent" slot-scope="changepercent">
              <div :class="changepercent > 0 ? 'red' : 'green'">
                {{ changepercent }}
              </div>
            </template>
            <template slot="changepercent" slot-scope="changepercent">
              <div :class="changepercent > 0 ? 'red' : 'green'">
                <a-button type="primary">
                  <span v-if="changepercent > 0"> +</span>
                  {{ changepercent }}
                </a-button>
              </div>
            </template>
            <template slot="changepercent3" slot-scope="changepercent3">
              <div :class="changepercent3 > 0 ? 'red' : 'green'">
                <a-button type="primary">
                  <span v-if="changepercent3 > 0"> +</span>
                  {{ changepercent3 }}
                </a-button>
              </div>
            </template>
          </a-table>
        </div>

      </div>
      <div class="table-3">
        <div class="active padding"><span style="color: white">机构票监测</span></div>
        <a-table bordered :columns="columns" :data-source="resDatajigou" :pagination="false" class="table-hei">
          <template slot="close" slot-scope="close, record">
            <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close
                    }}</div>
          </template>
          <template slot="amount" slot-scope="amount, record">
            <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        amount
                    }}</div>
          </template>
          <template slot="changepercent" slot-scope="changepercent">
            <div :class="changepercent > 0 ? 'red' : 'green'">
              {{ changepercent }}
            </div>
          </template>
          <template slot="changepercent" slot-scope="changepercent">
            <div :class="changepercent > 0 ? 'red' : 'green'">
              <a-button type="primary">
                <span v-if="changepercent > 0"> +</span>
                {{ changepercent }}
              </a-button>
            </div>
          </template>
          <template slot="changepercent3" slot-scope="changepercent3">
            <div :class="changepercent3 > 0 ? 'red' : 'green'">
              <a-button type="primary">
                <span v-if="changepercent3 > 0"> +</span>
                {{ changepercent3 }}
              </a-button>
            </div>
          </template>
        </a-table>
        <div style="padding-bottom: 100px;"></div>
      </div>

    </div>
  </div>
</template>

  <script>
import { getHitStocks } from "@/api/userInfo.js";
import { getStockAmountAction } from "@/api/userInfo.js";
import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            highestConNum: "",
            avgSuccessRate: "",
            resData: [],
            resDatadizeng: [],
            resDatayidong: [],
            resDatajigou: [],
            columns: [
                {
                    title: "名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                    // customRender: (text, record, index) => `${index + 1}`, //此处为重点
                },
                {
                    title: "价格",
                    dataIndex: "close",
                    key: "close",
                    align: "center",
                    scopedSlots: { customRender: "close" },
                    sorter: (a, b) => b.close - a.close,
                },
                {
                    title: "涨跌幅",
                    dataIndex: "changepercent",
                    key: "changepercent",
                    align: "center",
                    scopedSlots: { customRender: "changepercent" },
                    sorter: (a, b) => b.changepercent - a.changepercent,
                },
                {
                    title: "3日涨跌幅",
                    dataIndex: "changepercent3",
                    key: "changepercent3",
                    align: "center",
                    scopedSlots: { customRender: "changepercent3" },
                    sorter: (a, b) => b.changepercent3 - a.changepercent3,
                },
                {
                    title: "成交额(亿)",
                    dataIndex: "amount",
                    key: "amount",
                    align: "center",
                    scopedSlots: { customRender: "amount" },
                    sorter: (a, b) => b.amount - a.amount,
                },
            ],
            columns2: [
                {
                    title: "名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                    // customRender: (text, record, index) => `${index + 1}`, //此处为重点
                },
                {
                    title: "委托金额(万)",
                    dataIndex: "value",
                    key: "value",
                    align: "center",
                    scopedSlots: { customRender: "value" },
                },
            ],
            resData1: [],
            resData2: [],
            resData3: [],
            lianbantianti: {},
            pagination: {
                showQuickJumper: true,
            },
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
            getStockAmountAction().then((res) => {
                this.resData = res.成交额递增;
                this.resDatadizeng = res.成交额递增;
                this.resDatajigou = res.机构票监测;
                this.resDatayidong = res.成交额异动;
            });
        },
    },
};
</script>

  <style lang="scss">
.quan-zijin-detail {
    .daban-1 {
        background: url(../../../../assets/img/daban-1.png) no-repeat;
        background-size: cover;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .table1 {
        width: 980px;
        margin-right: 30px;
        // height: 400px;
        // overflow: scroll;
    }
    .table2 {
        width: 980px;
    }
    .table-3 {
        height: 400px;
        margin-top: 20px;
    }
    .table-hei {
        height: 360px;
        overflow: scroll;
    }
    .active {
        height: 40px;
        background-image: linear-gradient(
            to right,
            rgba(29, 255, 255, 0.1),
            rgba(29, 255, 255, 0.3),
            rgba(29, 255, 255, 0.1)
        );
        border-top: 2px solid rgba(12, 220, 226, 0.3);
        border-bottom: 2px solid rgba(12, 220, 226, 0.3);
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #1dffff;
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
    .content-contain {
        margin-top: 20px;
        // display: flex;
        // flex-direction: column;
        // padding: 10px;
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
    // .ant-table-tbody > tr > td {
    //     color: #64b7bc;
    //     border-color: #5f9ea0;
    // }
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
.ant-table-tbody > tr > td {
    color: #64b7bc;
    border-color: #5f9ea0;
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
</style>
