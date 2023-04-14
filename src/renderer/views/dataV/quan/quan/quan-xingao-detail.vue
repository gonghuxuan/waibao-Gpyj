<template>
  <div class="xingao-detail">1123
    <div class="top-contain">
      <div>
        <span class="padding" :class="active==0? 'active': 'unactive'">新高异动</span>
        <span class="padding" :class="active==1? 'active': 'unactive'">平台突破</span>
        <span class="padding" :class="active==2? 'active': 'unactive'">强势回调</span>
        <span class="padding" :class="active==3? 'active': 'unactive'">游资股</span>
      </div>
    </div>
    <div class="content-contain">
      <div class="table1">1</div>
      <div class="table2 table-shadow">2</div>
      <div class="table3">3</div>
    </div>
  </div>
</template>

<script>
import { getExponentNames } from "@/api/userInfo.js";
import { getExponentDivergeSignal } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";

console.log(echarts);
export default {
    data() {
        return {
            active: 0,
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        // this.getName();
        // this.getData();
    },
    methods: {},
};
</script>

<style lang="scss">
.xingao-detail {
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
        height: 800px;
        width: 300px;
        border: 1px solid rgba(6, 100, 117, 1);
        box-shadow: 0px 0px 15px rgba(6, 100, 117, 1) inset;
    }
    .table2 {
        width: 600px;
        height: 800px;
        margin-left: 10px;
    }
}
</style>
