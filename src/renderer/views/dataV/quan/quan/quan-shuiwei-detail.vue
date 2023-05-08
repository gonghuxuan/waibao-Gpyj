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
        <div style="color: #FF5145">{{resData.style}}</div>
      </div>
      <div class="table-shuiwei-contain">
        <div class="table-shuiwei table-shuiwei-1">
          <div style="text-align: center">
            <div style="color: #FFF45C; font-size: 20px;">{{resData.amount3Avg | fixedTwo}}亿</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">前3日均值</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-2">
          <div style="text-align: center">
            <div style="color: #FF5145; font-size: 20px;">{{resData.amount | fixedTwo}}亿</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">两市成交额</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-3">

          <div style="text-align: center">
            <div style="color: #1DFFFF; font-size: 20px;">{{ resData.amountRatio| fixedTwo }}</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">量比</div>
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import { get2MarketAmount } from "@/api/userInfo.js";
import pollMixin from "@/utils/gpyjminix.js";

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
            resData: [],
            pollApi: this.getData,
        };
    },
    mixins: [pollMixin],
    components: {},
    computed: {},
    created() {},
    mounted() {
        // this.getName();
        console.log(this.$route.query.stockType);
        this.getData();
    },
    activated() {
        this.getData();
    },
    methods: {
        getData() {
            get2MarketAmount().then((res) => {
                console.log(res);
                this.resData = res;
            });
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
    .bottom {
        width: 100%;
        height: 400px;
        background: url(../../../../assets/img/shui-detail-bottom.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        margin-top: 70px;
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
        background: url(../../../../assets/img/shui-top.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
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
            background: url(../../../../assets/img/shui-detail-1.png) no-repeat;
            background-size: contain;
            background-position: 50% 0;
        }
        &-2 {
            background: url(../../../../assets/img/shui-detail-2.png) no-repeat;
            background-size: contain;
            background-position: 50% 0;
        }
        &-3 {
            background: url(../../../../assets/img/shui-detail-3.png) no-repeat;
            background-size: contain;
            background-position: 50% 0;
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
