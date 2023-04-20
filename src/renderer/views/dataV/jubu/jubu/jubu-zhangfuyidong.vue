<template>
    <div class="jubu-zhangfuyidong">
        <div class="juzhong"
            >{{ title }}
            <img
                @click="toDetail"
                src="@/assets/img/detail.svg"
                alt=""
                class="detail"
                style="width: 20px; cursor: pointer"
            />
        </div>
        <div class="table-contain">
            <a-select
                label-in-value
                :default-value="{ key: 'qian' }"
                style="width: 320px"
                @change="handleChange"
            >
                <a-select-option value="qian"> 前部异动 </a-select-option>
                <a-select-option value="zhong"> 中部异动 </a-select-option>
                <a-select-option value="hou"> 后部异动 </a-select-option>
                <!-- <a-select-option v-for="item in items" :key="item" :value="item">
            {{ item }}
            </a-select-option> -->
            </a-select>
            <a-table
                bordered
                :columns="columns"
                :data-source="resData"
                :pagination="false"
            >
                <template slot="close" slot-scope="close, record">
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
                </template>
            </a-table>
        </div>
    </div>
</template>

<script>
import { getStockChangePercentAction } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            resDataQianbu: [],
            resDataZhongbu: [],
            resDataHoubu: [],
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
                },
                {
                    title: "涨跌幅",
                    dataIndex: "changepercent",
                    key: "changepercent",
                    align: "center",
                    scopedSlots: { customRender: "changepercent" },
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
            getStockChangePercentAction().then((res) => {
                console.log("涨幅异动-----", res);
                this.resData = res.前部异动;
                this.resDataQianbu = res.前部异动;
                this.resDataZhongbu = res.中部异动;
                this.resDataHoubu = res.后部异动;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-bankuaizhangting-detail",
            });
        },
        handleChange(v) {
            if (v.key === "qian") {
                this.resData = this.resDataQianbu;
            } else if (v.key === "zhong") {
                this.resData = this.resDataZhongbu;
            } else if (v.key === "hou") {
                this.resData = this.resDataHoubu;
            }
        },
    },
};
</script>

<style lang="scss">
.jubu-zhangfuyidong {
    padding: 7px 5px;
    .ant-btn {
        color: white;
        border-color: #5d9a9e;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        // width: 310px;
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
