<template>
  <div class="jubu-shuiwei">
    <div class="juzhong">
      <div style="margin-top: -5px;margin-bottom: -10px"><img src="../../../../assets/img/daban-title.svg" /></div>
      <img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" />
    </div>
    <div class="table-contain">
      <div class="juzhong title-contain">
        <div style="color: rgba(255, 244, 92, 1);">连板天梯：</div>
        <div style="color: white">最高连板<span style="color: #FF5145">{{highestConNum}}</span>连板，平均晋级成功率<span style="color: #FF5145">{{avgSuccessRate}}%</span> </div>
      </div>
      <div class="table-shuiwei-contain">
        <div class="table-shuiwei table-shuiwei-1">
          <div style="text-align: center">
            <div style="color: #FFF45C; font-size: 20px;">涨速预警</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;" v-for="(item,index) in zhangsuyujing" :key="index + 'opt'">{{item.stockName}}</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-2">
          <div style="text-align: center">
            <div style="color: #FF5145; font-size: 20px;">开板提醒</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;" v-for="(item,index) in kaibantixing" :key="index + 'opt'">{{item.stockName}}</div>
          </div>
        </div>
        <div class="table-shuiwei table-shuiwei-3">

          <div style="text-align: center">
            <div style="color: #1DFFFF; font-size: 20px;">隔夜委托量</div>
            <div style="color:#64B7BC;font-size: 13px;padding-top: 10px;" v-for="(item,index) in geyeweituo" :key="index + 'opt'">{{item.stockName}}</div>
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
import { getHitStocks } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import pollMixin from "@/utils/gpyjminix.js";

import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
            highestConNum: "",
            avgSuccessRate: "",
            zhangsuyujing: [],
            kaibantixing: [],
            geyeweituo: [],
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
    computed: {},
    created() {},
    mixins: [pollMixin],
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getHitStocks().then((res) => {
                this.highestConNum = res.连板天梯.highestConNum;
                this.avgSuccessRate = res.连板天梯.avgSuccessRate;
                this.zhangsuyujing = res.涨速预警.slice(0, 3);
                this.kaibantixing = res.开板提醒.slice(0, 3);
                this.geyeweituo = res.隔夜委托量.slice(0, 3);
                this.resData = res;
            });
        },
        toDetail() {
            this.$router.push({
                path: "/quan-daban-detail",
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-shuiwei {
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
        right: 500px;
    }
    .title-contain {
        height: 40px;
        background: url(../../../../assets/img/daban-top.png) no-repeat;
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
