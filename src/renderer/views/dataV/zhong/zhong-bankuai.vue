<template>
  <div class="zhong-bankuai">
    <div class="sn-container sn-container-1">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title" style="background-color: rgba(255,244,92,0.3);">
          <zhongzhangfuyidong title="涨幅异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-2">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title" style="background-color: rgba(255,81,69,0.3);">
          <zhongchengjiaoeyidong title="成交额异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-3">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']" style="background-color: rgba(217,61,210,0.3);">
        <div class="juzhong font-18 bankuai-title">
          <zhonglianxu title="连续性" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-4">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']" style="background-color: rgba(30,139,255,0.3);">
        <div class="juzhong font-18 bankuai-title">
          <zhongzhengfu title="振幅" />
        </div>
      </dv-border-box-10>
    </div>
  </div>
</template>

<script>
import zhongzhangfuyidong from "./zhong/zhong-zhangfuyidong.vue";
import zhongchengjiaoeyidong from "./zhong/zhong-chengjiaoeyidong.vue";
import zhonglianxu from "./zhong/zhong-lianxu.vue";
import zhongzhengfu from "./zhong/zhong-zhengfu.vue";

export default {
    data() {
        return {};
    },
    components: {
        zhongzhangfuyidong,
        zhongchengjiaoeyidong,
        zhonglianxu,
        zhongzhengfu,
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss">
.zhong-bankuai {
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
