<template>
  <div class="quan-zijin-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">打板</span>
      </div>
    </div>
    <div class="content-contain">
        <div style="display: flex;">
            <a-table bordered :columns="columns" :data-source="resData1" :pagination="false" :scroll="{ y: 240 }">
                <template slot="value" slot-scope="value">
                <div :class="value > 0 ? 'red' : 'green'">
                    <a-button type="primary">
                    <span v-if="value > 0"> +</span>
                    {{ value }}
                    </a-button>
                </div>
                </template>
            </a-table>
            <a-table bordered :columns="columns" :data-source="resData2" :pagination="false" :scroll="{ y: 240 }">
                <template slot="value" slot-scope="value">
                <div :class="value > 0 ? 'red' : 'green'">
                    <a-button type="primary">
                    <span v-if="value > 0"> +</span>
                    {{ value }}
                    </a-button>
                </div>
                </template>
            </a-table>
        </div>
        <a-table bordered :columns="columns" :data-source="resData3" :pagination="false" :scroll="{ y: 240 }">
            <template slot="value" slot-scope="value">
            <div :class="value > 0 ? 'red' : 'green'">
                <a-button type="primary">
                <span v-if="value > 0"> +</span>
                {{ value }}
                </a-button>
            </div>
            </template>
        </a-table>
    </div>
  </div>
</template>

<script>
import { getHitStocks } from "@/api/userInfo.js";
import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
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
                },
                {
                    title: "涨跌幅",
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
            getHitStocks().then((res) => {
                console.log("打板", res);
                this.resData1 = res.涨速预警;
                this.resData2 = res.开板提醒;
                this.resData3 = res.隔夜委托量;
                this.lianbantianti = res.连板天梯;
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
        display: flex;
        flex-direction: column;
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
</style>
