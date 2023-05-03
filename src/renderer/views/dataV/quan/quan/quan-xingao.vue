<template>
  <div class="jubu-xingao">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" />
    </div>
    <div class="table-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="close" slot-scope="close, record">
          <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close | fixedTwo
                    }}</div>
        </template>
        <template slot="changepercent" slot-scope="changepercent">
          <div :class="changepercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="changepercent > 0"> +</span>
              {{ changepercent | fixedTwo }}
            </a-button>
          </div>
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
import { getLetfStocks } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
import pollMixin from "@/utils/gpyjminix.js";

export default {
    data() {
        return {
            pollApi: this.getData,
            resData: [],
            columns: [
                {
                    title: "名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                },
                {
                    title: "价格",
                    dataIndex: "close",
                    key: "close",
                    scopedSlots: { customRender: "close" },
                    align: "center",
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
            ],
        };
    },
    mixins: [pollMixin],
    props: {
        title: {
            type: String,
            default: 0,
        },
        stockType: {
            type: String,
            default: 0,
        },
    },
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    activated() {},
    methods: {
        getData() {
            getLetfStocks({ stockType: this.stockType }).then((res) => {
                this.resData = res;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-xingao-detail",
                query: {
                    stockType: this.stockType,
                    title1: "全场预警",
                    title2: this.getTitle(),
                },
            });
        },
        getTitle() {
            if (this.stockType == "0") {
                return "新高异动";
            }
            if (this.stockType == "1") {
                return "平台突破";
            }
            if (this.stockType == "3") {
                return "游资股预警";
            }
        },
    },
};
</script>

<style lang="scss">
.jubu-xingao {
    padding: 7px 5px;
    .ant-btn {
        color: white;
        border-color: #5d9a9e;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        width: 310px;
        height: 195px;
        overflow: scroll;
        background-color: rgba(2, 81, 93, 1);
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
