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
import { getPlateStockUpstop } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            columns: [
                {
                    title: "板块",
                    dataIndex: "plateName",
                    key: "plateName",
                    align: "center",
                },
                {
                    title: "总数",
                    dataIndex: "stockCount",
                    key: "stockCount",
                    // scopedSlots: { customRender: "stockCount" },
                    align: "center",
                },
                {
                    title: "涨停数",
                    dataIndex: "stockUpstopCount",
                    key: "stockUpstopCount",
                    align: "center",
                    // scopedSlots: { customRender: "stockUpstopCount" },
                },
                {
                    title: "占比",
                    dataIndex: "stockUpstopProportion",
                    key: "stockUpstopProportion",
                    align: "center",
                    // scopedSlots: { customRender: "stockUpstopProportion" },
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
        // let today = new Date();
        //     let date =
        //         today.getFullYear() +
        //         "." +
        //         this.twoDigits(today.getMonth() + 1) +
        //         "." +
        //         this.twoDigits(today.getDate());
        //     let time =
        //         this.twoDigits(today.getHours()) +
        //         ":" +
        //         this.twoDigits(today.getMinutes()) +
        //         ":" +
        //         this.twoDigits(today.getSeconds());
        //     return date + " " + time + " " + this.getDay(dayjs(today).day());
        // startDate: dayjs().format("YYYY-MM-DD")
        getData() {
            getPlateStockUpstop({
                startDate: "2023-04-12",
                endDate: "2023-04-16",
            }).then((res) => {
                console.log("板块涨停个股", res);
                let dataArr = [];
                if (res) {
                    for (let key in res) {
                        dataArr = [...dataArr, ...res[key]];
                    }
                }
                this.resData = dataArr;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-bankuaizhangting-detail",
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
