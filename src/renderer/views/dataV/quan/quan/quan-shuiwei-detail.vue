<template>
  <div class="quan-shuiwei-detail">
    <div class="top-contain">
      <div>
        <span class="padding active">市场水位</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="juzhong title-contain">
        <div style="color: rgba(255, 244, 92, 1);">市场风格：</div>
        <div style="color: #FF5145">游资</div>
      </div>
      <div class="table-shuiwei-contain">
        <div class="table-shuiwei table-shuiwei-1">
          <div style="text-align: center">
            <div style="color: #FFF45C; font-size: 20px;">1386亿</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">前3日均值</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-2">
          <div style="text-align: center">
            <div style="color: #FF5145; font-size: 20px;">4586亿</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">两市成交额</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-3">

          <div style="text-align: center">
            <div style="color: #1DFFFF; font-size: 20px;">1.88</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">量比</div>
          </div>
        </div>
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
.quan-shuiwei-detail {
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
    .table-shuiwei {
        width: 30%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        margin-top: 10px;
        &-1 {
            background-image: linear-gradient(
                to right,
                rgba(255, 244, 92, 0.04),
                rgba(255, 244, 92, 0.06),
                rgba(255, 244, 92, 0.1)
            );
            border: 1px rgba(255, 244, 92, 0.2) solid;
        }
        &-2 {
            background-image: linear-gradient(
                to right,
                rgba(250, 81, 81, 0.08),
                rgba(250, 81, 81, 0.12),
                rgba(250, 81, 81, 0.14)
            );
            border: 1px rgba(250, 81, 81, 0.2) solid;
        }
        &-3 {
            background-image: linear-gradient(
                to right,
                rgba(29, 255, 255, 0.02),
                rgba(29, 255, 255, 0.06),
                rgba(29, 255, 255, 0.12)
            );
            border: 1px rgba(29, 255, 255, 0.2) solid;
        }
    }
    .table-shuiwei-contain {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 92%;
        margin-left: auto;
        margin-right: auto;
    }
}
</style>
