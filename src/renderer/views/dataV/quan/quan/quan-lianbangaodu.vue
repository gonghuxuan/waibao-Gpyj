<template>
  <div class="jubu-xingao">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" />
    </div>
    <div class="table-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="close" slot-scope="close">
          <div>{{
                        close  | fixedTwo 
                    }}</div>
        </template>
        <template slot="changepercent" slot-scope="changepercent">
          <div>

            {{ changepercent | fixedTwo  }}
          </div>
        </template>
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
import { getFiveDay, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            fiveDateArr: [],
            columns: [
                {
                    title: "名称",
                    dataIndex: "stockName",
                    key: "stockName",
                    align: "center",
                },
                {
                    title: "封单额(万)",
                    dataIndex: "stopAmount",
                    key: "stopAmount",
                    width: 200,
                    scopedSlots: { customRender: "close" },
                    sorter: (a, b) => b.stopAmount - a.stopAmount,

                    align: "center",
                },
                {
                    title: "连板数",
                    dataIndex: "conNum",
                    key: "conNum",
                    align: "center",
                    scopedSlots: { customRender: "changepercent" },
                    sorter: (a, b) => b.conNum - a.conNum,
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
        this.fiveDateArr = getFiveDay();
        this.getData();
    },
    methods: {
        getData() {
            getContinuousStockUpstop({
                startDate: this.fiveDateArr[4],
                endDate: this.fiveDateArr[0],
            }).then((res) => {
                let dataArr = [];
                if (res) {
                    for (let key in res) {
                        for (let i in res[key]) {
                            dataArr = [
                                ...dataArr,
                                ...res[key][i].stockUpstopList,
                            ];
                        }
                    }
                }
                this.resData = dataArr.filter((i) => i.conNum === "1") || [];
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-lianbangaodu-detail",
                query: {
                    stockType: 0,
                    title1: "全场预警",
                    title2: "连板高度",
                },
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-xingao {
    padding: 7px 5px;
    .ant-table-thead > tr > th {
        padding-right: 8px;
        padding-left: 8px;
    }
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
