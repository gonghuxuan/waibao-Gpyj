<template>
  <div class="jubu-shuiwei-1">
    <div class="juzhong">市场水位
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" />
    </div>
    <div class="table-contain">
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
            <div style="color: #1DFFFF; font-size: 20px;">{{ resData.amountRatio }}</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;">量比</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- :class="
record[index].changepercent > 0 ? 'red' : 'green'
" -->
<script>
import { get2MarketAmount } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            pollApi: this.getData,
        };
    },
    props: {
        stockType: {
            type: String,
            default: 0,
        },
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
    // activated() {
    //     console.log("activeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    // },
    // deactivated() {
    //     console.log("shuiweiiiiideactivated");
    // },
    methods: {
        getData() {
            get2MarketAmount().then((res) => {
                this.resData = [];
                console.log(res);
                this.resData = res;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-shuiwei-detail",
                query: {
                    stockType: 0,
                    title1: "全场预警",
                    title2: "市场水位",
                },
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-shuiwei-1 {
    width: 100%;
    height: 100%;
    padding: 7px 5px;

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
        height: 40px;
        // background-image: linear-gradient(
        //     to right,
        //     rgba(255, 244, 92, 0.01),
        //     rgba(255, 244, 92, 0.05),
        //     rgba(255, 244, 92, 0.01)
        // );
        background: url(../../../../assets/img/shui-top.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
    }
    .table-shuiwei {
        width: 30%;
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        margin-top: 10px;
        &-1 {
            // background-image: linear-gradient(
            //     to right,
            //     rgba(255, 244, 92, 0.04),
            //     rgba(255, 244, 92, 0.06),
            //     rgba(255, 244, 92, 0.1)
            // );
            // border: 1px rgba(255, 244, 92, 0.2) solid;
            background: url(../../../../assets/img/shui-1.png) no-repeat;
            background-size: contain;
            background-position: 50% 0;
        }
        &-2 {
            // background-image: linear-gradient(
            //     to right,
            //     rgba(250, 81, 81, 0.08),
            //     rgba(250, 81, 81, 0.12),
            //     rgba(250, 81, 81, 0.14)
            // );
            // border: 1px rgba(250, 81, 81, 0.2) solid;
            background: url(../../../../assets/img/shui-2.png) no-repeat;
            background-size: contain;
            background-position: 50% 0;
        }
        &-3 {
            // background-image: linear-gradient(
            //     to right,
            //     rgba(29, 255, 255, 0.02),
            //     rgba(29, 255, 255, 0.06),
            //     rgba(29, 255, 255, 0.12)
            // );
            // border: 1px rgba(29, 255, 255, 0.2) solid;
            background: url(../../../../assets/img/shui-3.png) no-repeat;
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
