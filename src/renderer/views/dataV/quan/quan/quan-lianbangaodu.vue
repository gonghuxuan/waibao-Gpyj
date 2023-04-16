<template>
  <div class="jubu-xingao">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px" />
    </div>
    <div class="table-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <!-- <template slot="close" slot-scope="close, record">
          <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close
                    }}</div>
        </template>
        <template slot="changepercent" slot-scope="changepercent">
          <div :class="changepercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="changepercent > 0"> +</span>
              {{ changepercent }}
            </a-button>
          </div>
        </template> -->
        <!-- <a slot="name" slot-scope="text">{{ text }}</a> -->
      </a-table>
    </div>
  </div>
</template>
<!-- :class="
record[index].changepercent > 0 ? 'red' : 'green'
" -->
<script>
import { getContinuousStockUpstop } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
export default {
    data() {
        return {
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
                    dataIndex: "stopAmount",
                    key: "stopAmount",
                    // scopedSlots: { customRender: "close" },
                    align: "center",
                },
                {
                    title: "涨跌幅",
                    dataIndex: "changepercent",
                    key: "changepercent",
                    align: "center",
                    // scopedSlots: { customRender: "changepercent" },
                },
                {
                    title: "股票代码",
                    dataIndex: "stockCode",
                    key: "stockCode",
                    align: "center",
                    // scopedSlots: { customRender: "changepercent" },
                },
            ],
        };
    },
    props: {
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
            getContinuousStockUpstop({ startDate: '2023-04-10',endDate: '2023-04-16'}).then((res) => {
                console.log('个股连板',res);
                let dataArr = [];
                if(res){
                    for(let key in res) {
                        for( let i in res[key]) {
                            dataArr = [...dataArr,...res[key][i].stockUpstopList]
                        }
                    }
                }
                this.resData = dataArr;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-xingao-detail",
                query: {
                    stockType: 0,
                    title1: "全场预警",
                    title2: "新高异动",
                },
            });
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
