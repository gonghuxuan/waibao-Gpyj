<template>
  <div class="zhong-zhegfu">
    <div class="juzhong">{{ title }}
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px; cursor: pointer" />
    </div>
    <div class="table-contain">
      <a-select label-in-value :default-value="{ key: 'zao' }" style="width: 400px;min-height: 30px; margin-bottom: 10px;" @change="handleChange">
        <a-select-option value="zao"> 早盘 </a-select-option>
        <a-select-option value="wei"> 尾盘 </a-select-option>
        <!-- <a-select-option v-for="item in items" :key="item" :value="item">
            {{ item }}
            </a-select-option> -->
      </a-select>
      <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
        <template slot="close" slot-scope="close, record">
          <div :class="record.changepercent > 0 ? 'red' : 'green'">{{
                        close  | fixedTwo
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
      </a-table>
    </div>
  </div>
</template>

<script>
import { getAmplitudeStocks } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import dayjs from "dayjs";
import * as echarts from "echarts";
import pollMixin from "@/utils/gpyjminix.js";
export default {
    data() {
        return {
            pollApi: this.getData,
            resData: [],
            resDatazao: [],
            resDatawei: [],
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
        this.getData();
    },
    methods: {
        getData() {
            getAmplitudeStocks().then((res) => {
                // console.log("重点预警成交额异动-----", res);
                this.resDatazao = [
                    ...res["早盘（09:30~10:00）"].aboveAvgAmplitudeStocks,
                    ...res["早盘（09:30~10:00）"].belowAvgAmplitudeStocks,
                ];
                this.resDatawei = [
                    ...res["尾盘（14:30~15:00）"].aboveAvgAmplitudeStocks,
                    ...res["尾盘（14:30~15:00）"].belowAvgAmplitudeStocks,
                ];
                this.resData = this.resDatazao;
                // console.log(this.resDatazao);
                // this.resData = res.成交额递增;
                // this.resDataQianbu = res.成交额递增;
                // this.resDataZhongbu = res.机构票监测;
                // this.resDataHoubu = res.成交额异动;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/zhong-zhengfu-detail",
                query: {
                    title1: "重点预警",
                    title2: "振幅",
                },
            });
        },
        handleChange(v) {
            if (v.key === "zao") {
                this.resData = this.resDatazao;
            } else if (v.key === "wei") {
                this.resData = this.resDatawei;
            }
        },
    },
};
</script>

<style lang="scss">
.zhong-zhegfu {
    padding: 7px 5px;
    .ant-select-selection {
        background-color: rgba(5, 49, 58, 0.5);
        color: #09b8bc;
        // border-color: rgba(5, 49, 58, 1);
        height: 35px;
    }
    .anticon {
        color: #09b8bc;
    }
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
.ant-select-dropdown-menu {
    background-color: rgba(5, 49, 58, 0.7);
    color: #09b8bc;
}
.ant-select-dropdown-menu-item-selected {
    background-color: #082d37;
    color: #09b8bc;
}
.ant-select-dropdown-menu-item:hover:not(
        .ant-select-dropdown-menu-item-disabled
    ) {
    background-color: #082d37;
}
.ant-select-dropdown-menu-item {
    color: #09b8bc;
}
</style>
