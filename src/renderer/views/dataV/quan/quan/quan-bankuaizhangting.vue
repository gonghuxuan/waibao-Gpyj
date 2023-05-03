<template>
  <div class="jubu-xingao">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" />
    </div>
    <div class="table-contain">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="stockUpstopCount" slot-scope="stockUpstopCount">
          <div :class="stockUpstopCount > 0 ? 'red' : 'green'">{{
                        stockUpstopCount | fixedTwo
                    }}</div>
        </template>
        <template slot="stockUpstopProportion" slot-scope="stockUpstopProportion">
          <div :class="stockUpstopProportion > 0 ? 'red' : 'green'">
            {{ stockUpstopProportion | fixedTwo }}
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
import { getPlateStockUpstop } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";
export default {
    data() {
        return {
            pollApi: this.getData,
            resData: [],
            startTime: "",
            endtime: "",
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
                    sorter: (a, b) => b.stockCount - a.stockCount,
                    align: "center",
                },
                {
                    title: "涨停数",
                    dataIndex: "stockUpstopCount",
                    key: "stockUpstopCount",
                    align: "center",
                    scopedSlots: { customRender: "stockUpstopCount" },
                    sorter: (a, b) => b.stockUpstopCount - a.stockUpstopCount,
                },
                {
                    title: "占比",
                    dataIndex: "stockUpstopProportion",
                    key: "stockUpstopProportion",
                    align: "center",
                    scopedSlots: { customRender: "stockUpstopProportion" },
                    sorter: (a, b) =>
                        b.stockUpstopProportion - a.stockUpstopProportion,
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
    mixins: [pollMixin],
    computed: {},
    created() {},
    mounted() {
        this.getFiveDay();
        this.getData();
        // console.log(this.getFiveDay());
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
                startDate: this.startTime,
                endDate: this.endtime,
            }).then((res) => {
                // let dataArr = [];
                // if (res) {
                //     for (let key in res) {
                //         dataArr = [...dataArr, ...res[key]];
                //     }
                // }
                // this.resData = dataArr;
                this.resData = res[this.endtime];
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-bankuaizhangting-detail",
                title1: "全场预警",
                title2: "板块涨停",
            });
        },
        getFiveDay() {
            var weekday = [
                "周日",
                "周一",
                "周二",
                "周三",
                "周四",
                "周五",
                "周六",
            ];
            var arr = [];
            var date = new Date();
            var oneDayLong = 24 * 60 * 60 * 1000;
            var num = 0;
            for (var i = 0; i < weekday.length; i++) {
                var nowTime = date.getTime();
                nowTime = nowTime - oneDayLong * i;
                num = new Date(nowTime).getDay();
                if (num != 0 && num != 6) {
                    arr.push(dayjs(nowTime).format("YYYY-MM-DD"));
                }
            }
            this.startTime = arr[4];
            this.endtime = arr[0];
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
