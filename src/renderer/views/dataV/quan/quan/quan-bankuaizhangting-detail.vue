<template>
  <div class="quan-zhangting-detail">
    <div class="top-contain">
      <div>
        <span class="padding " :class="active == 0 ? 'active' : 'unactive'">个股连扳高度预警</span>
        <span class="padding " :class="active == 1 ? 'active' : 'unactive'">板块涨停个数预警</span>
      </div>
    </div>
    <div class="content-contain-detail">
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="plateChangepercent" slot-scope="plateChangepercent">
          <div :class="plateChangepercent > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent > 0"> +</span>
              {{ plateChangepercent }}
            </a-button>
          </div>
        </template>
        <template slot="plateChangepercent2" slot-scope="plateChangepercent2">
          <div :class="plateChangepercent2 > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent2 > 0"> +</span>
              {{ plateChangepercent2 }}
            </a-button>
          </div>
        </template>
        <template slot="plateChangepercent3" slot-scope="plateChangepercent3">
          <div :class="plateChangepercent3 > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent3 > 0"> +</span>
              {{ plateChangepercent3 }}
            </a-button>
          </div>
        </template>
        <template slot="plateChangepercent4" slot-scope="plateChangepercent4">
          <div :class="plateChangepercent4 > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent4 > 0"> +</span>
              {{ plateChangepercent4 }}
            </a-button>
          </div>
        </template>
        <template slot="plateChangepercent5" slot-scope="plateChangepercent5">
          <div :class="plateChangepercent5 > 0 ? 'red' : 'green'">
            <a-button type="primary">
              <span v-if="plateChangepercent5 > 0"> +</span>
              {{ plateChangepercent5 }}
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
import dayjs from "dayjs";
export default {
    data() {
        return {
            active: 0,
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
                    title: "2023-01-05",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount",
                            key: "stockUpstopCount",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount - a.stockUpstopCount,
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion",
                            key: "stockUpstopProportion",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopProportion -
                                a.stockUpstopProportion,
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent",
                            key: "plateChangepercent",
                            align: "center",
                            scopedSlots: {
                                customRender: "plateChangepercent",
                            },
                            sorter: (a, b) =>
                                b.plateChangepercent - a.plateChangepercent,
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum",
                            key: "highestConNum",
                            align: "center",
                            sorter: (a, b) => b.highestConNum - a.highestConNum,
                        },
                    ],
                },
                {
                    title: "2023-01-04",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount2",
                            key: "stockUpstopCount2",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount2 - a.stockUpstopCount2,
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion2",
                            key: "stockUpstopProportion2",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopProportion2 -
                                a.stockUpstopProportion2,
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent2",
                            key: "plateChangepercent2",
                            align: "center",
                            scopedSlots: {
                                customRender: "plateChangepercent2",
                            },
                            sorter: (a, b) =>
                                b.plateChangepercent2 - a.plateChangepercent2,
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum2",
                            key: "highestConNum2",
                            align: "center",
                            sorter: (a, b) =>
                                b.highestConNum2 - a.highestConNum2,
                        },
                    ],
                },
                {
                    title: "2023-01-03",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount3",
                            key: "stockUpstopCount3",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount3 - a.stockUpstopCount3,
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion3",
                            key: "stockUpstopProportion3",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopProportion3 -
                                a.stockUpstopProportion3,
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent3",
                            key: "plateChangepercent3",
                            align: "center",
                            scopedSlots: {
                                customRender: "plateChangepercent3",
                            },
                            sorter: (a, b) =>
                                b.plateChangepercent3 - a.plateChangepercent3,
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum3",
                            key: "highestConNum3",
                            align: "center",
                            sorter: (a, b) =>
                                b.highestConNum3 - a.highestConNum3,
                        },
                    ],
                },
                {
                    title: "2023-01-02",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount4",
                            key: "stockUpstopCount4",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount4 - a.stockUpstopCount4,
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion4",
                            key: "stockUpstopProportion4",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount4 - a.stockUpstopCount4,
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent4",
                            key: "plateChangepercent4",
                            align: "center",
                            scopedSlots: {
                                customRender: "plateChangepercent4",
                            },
                            sorter: (a, b) =>
                                b.plateChangepercent4 - a.plateChangepercent4,
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum4",
                            key: "highestConNum4",
                            align: "center",
                            sorter: (a, b) =>
                                b.highestConNum4 - a.highestConNum4,
                        },
                    ],
                },
                {
                    title: "2023-01-01",
                    align: "center",
                    children: [
                        {
                            title: "涨停数",
                            dataIndex: "stockUpstopCount5",
                            key: "stockUpstopCount5",
                            // scopedSlots: { customRender: "mainAmount" },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopCount5 - a.stockUpstopCount5,
                        },
                        {
                            title: "占比",
                            dataIndex: "stockUpstopProportion5",
                            key: "stockUpstopProportion5",
                            // scopedSlots: {
                            //     customRender: "mainAmountProportion",
                            // },
                            align: "center",
                            sorter: (a, b) =>
                                b.stockUpstopProportion5 -
                                a.stockUpstopProportion5,
                        },
                        {
                            title: "涨幅",
                            dataIndex: "plateChangepercent5",
                            key: "plateChangepercent5",
                            align: "center",
                            scopedSlots: {
                                customRender: "plateChangepercent5",
                            },
                            sorter: (a, b) =>
                                b.plateChangepercent5 - a.plateChangepercent5,
                        },
                        {
                            title: "连板高度",
                            dataIndex: "highestConNum5",
                            key: "highestConNum5",
                            align: "center",
                            sorter: (a, b) =>
                                b.highestConNum5 - a.highestConNum5,
                        },
                    ],
                },
            ],
            resData: [],
            arr: [],
            startTime: "",
            endtime: "",
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getFiveDay();
        this.getData();
    },
    methods: {
        sorter(a, b, key) {
            return b[key] - a[key];
        },
        getData() {
            getPlateStockUpstop({
                startDate: this.startTime,
                endDate: this.endtime,
            }).then((res) => {
                console.log("板块涨停个股", res);
                let dataArr = [];
                const resList = [];

                if (res) {
                    let objkeys = Object.keys(res);
                    console.log(objkeys);
                    console.log(res);
                    this.columns[2].title = objkeys[0];
                    this.columns[3].title = objkeys[1];
                    this.columns[4].title = objkeys[2];
                    this.columns[5].title = objkeys[3];
                    this.columns[6].title = objkeys[4];
                    // dataArr = [...res[objkeys[0]]];
                    const resArr = [
                        "stockUpstopCount",
                        "stockUpstopProportion",
                        "plateChangepercent",
                        "highestConNum",
                    ];
                    objkeys.forEach((item) => {
                        console.log(item);
                        resList.push(res[item]);
                    });
                    console.log(resList);
                    console.log(res);
                    resList[0].forEach((item, index) => {
                        resArr.forEach((key) => {
                            item[key + "2"] = resList[1][index][key];
                            item[key + "3"] = resList[2][index][key];
                            item[key + "4"] = resList[3][index][key];
                            console.log();
                            if (resList[4]) {
                                item[key + "5"] = resList[4][index][key];
                            }
                            // console.log(resList[1][index]);
                            // console.log(resList[2][index]);

                            // console.log();
                        });
                        // console.log(item);
                        // res[objkeys[1]].forEach((val) => {
                        //     console.log(val);
                        //     if (item.plateName === val.plateName) {
                        //         item.stockUpstopCount2 = val.stockUpstopCount;
                        //         item.stockUpstopProportion2 =
                        //             val.stockUpstopProportion;
                        //         item.plateChangepercent2 =
                        //             val.plateChangepercent;
                        //         item.highestConNum2 = val.highestConNum;
                        //     }
                        // });
                        // res[objkeys[2]].forEach((val) => {
                        //     if (item.plateName === val.plateName) {
                        //         item.stockUpstopCountLast =
                        //             val.stockUpstopCount;
                        //         item.stockUpstopProportionLast =
                        //             val.stockUpstopProportion;
                        //         item.plateChangepercentLast =
                        //             val.plateChangepercent;
                        //         item.highestConNumLast = val.highestConNum;
                        //     }
                        // });
                    });
                    console.log(resList[0]);
                }
                this.resData = resList[0];
                console.log(this.resData);
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
            console.log(arr);
            this.startTime = arr[4];
            this.endtime = arr[0];
            this.arr = arr;
        },
    },
};
</script>

<style lang="scss">
.quan-zhangting-detail {
    .unactive {
        color: rgba(29, 255, 255, 0.5);
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
