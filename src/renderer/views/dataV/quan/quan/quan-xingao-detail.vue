<template>
  <div class="xingao-detail">
    <div class="top-contain">
      <div>
        <span class="padding" :class="active == 0 ? 'active' : 'unactive'">新高异动</span>
        <span class="padding" :class="active == 1 ? 'active' : 'unactive'">平台突破</span>
        <span class="padding" :class="active == 2 ? 'active' : 'unactive'">强势回调</span>
        <span class="padding" :class="active == 3 ? 'active' : 'unactive'">游资股</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="table1">
        <div style="height: 20px"></div>
        <div class="gupiao-item" v-for="item in gupiaoList" :key="item.stockCode" :class="
                        selectedGupiao == item.stockCode
                            ? 'gupiao-active'
                            : 'gupiao-unactive'
                    " @click="selectgupiao(item.stockCode)">
          <div class="gupiao">{{ item.stockName }}</div>
          <div class="divider">
            <a-divider />
          </div>
        </div>
      </div>
      <div class="table2">
        <div class="table2-1 table-shadow">
          <div class="juzhong" style="padding-top: 10px">
            <div class="table-shadow" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                                margin-right: 30px;
                            " :class="
                                timeType == '0'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selecttime('0')">分时</div>
            <div class="table-shadow" style="
                                width: 70px;
                                padding: 5px;
                                text-align: center;
                                font-size: 14px;
                            " :class="
                                timeType == '1'
                                    ? 'time-active'
                                    : 'time-unactive'
                            " @click="selecttime('1')">日k</div>
          </div>
        </div>
        <div class="table2-2 table-shadow"></div>
      </div>
      <div class="table3 table-shadow">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLetfStocks, getStockDataLine } from "@/api/userInfo.js";

import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            active: 0,
            gupiaoList: [],
            selectedGupiao: "",
            timeType: "1",
            stockDetail: [],
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        // this.getName();
        console.log(this.$route.query.stockType);
        this.getData();
    },
    methods: {
        getData() {
            getLetfStocks({ stockType: this.$route.query.stockType }).then(
                (res) => {
                    this.gupiaoList = res;
                    console.log(this.gupiaoList);
                    this.selectedGupiao = this.gupiaoList[0].stockCode;
                    this.getStockDetail();
                }
            );
        },
        getStockDetail() {
            getStockDataLine({
                timeType: this.timeType,
                code: this.selectedGupiao,
            }).then((res) => {
                console.log(res);
                this.stockDetail = res;
            });
        },
        selectgupiao(stockCode) {
            this.selectedGupiao = stockCode;
        },
        selecttime(time) {
            this.timeType = time;
        },
    },
};
</script>

<style lang="scss">
.xingao-detail {
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
    .gupiao-unactive {
        color: #64b7bc;
    }
    .ant-divider {
        // color: rgba(2, 81, 93, 0.5);
        background-color: rgba(2, 81, 93, 1);
    }
    .divider {
        width: 90%;
        position: absolute;
        bottom: 0;
        left: 5%;
    }
    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }
    .unactive {
        color: rgba(29, 255, 255, 0.5);
    }
    .content-contain {
        display: flex;
        padding: 10px;
    }
    .table1 {
        height: 100%;
        width: 15%;
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
        overflow: scroll;
    }
    .table2 {
        width: 70%;
        height: 100%;
        margin-left: 20px;
    }
    .table3 {
        width: 15%;
        height: 100%;
        margin-left: 20px;
    }
    .table2-1 {
        width: 100%;
        height: 560px;
    }
    .table2-2 {
        width: 100%;
        height: 224px;
        margin-top: 20px;
    }
    .time-active {
        color: #1dffff;
        box-shadow: 0px 0px 15px #1dffff inset;
    }
    .time-unactive {
        color: #64b7bc;
    }
}
</style>
