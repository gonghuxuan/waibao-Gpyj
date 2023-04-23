<template>
  <div class="quan-bankuai">
    <div class="sn-container sn-container-1">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title">
          <jubuzhangfuyidong title="涨幅异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-2">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title">
          <jubuchengjiaoeyidong title="成交额异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-3">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title">
          <jubu10xianxing title="10天线性跟踪" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-4">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title">
          <jubu10xianxingwei title="10天未突破跟踪" />
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
import jubuzhangfuyidong from "./jubu/jubu-zhangfuyidong.vue";
import jubuchengjiaoeyidong from "./jubu/jubu-chengjiaoeyidong.vue";
import jubu10xianxing from "./jubu/jubu-10xianxing.vue";
import jubu10xianxingwei from "./jubu/jubu-10xianxingwei.vue";

export default {
    data() {
        return {};
    },
    components: {
        jubuzhangfuyidong,
        jubuchengjiaoeyidong,
        jubu10xianxing,
        jubu10xianxingwei,
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss">
.quan-bankuai {
    .sn-container {
        top: 760px;
        width: 440px;
        height: 250px;
    }
    .sn-container-1 {
        left: 50px;
    }
    .sn-container-2 {
        left: 510px;
    }
    .sn-container-3 {
        left: 970px;
    }
    .sn-container-4 {
        left: 1430px;
    }

    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
}
</style>
