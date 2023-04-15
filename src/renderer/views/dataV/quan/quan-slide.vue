<template>
  <div class="jubu-slide">
    <div class="juzhong font-18">全局预警 </div>
    <div class="flex bankuai-contain">
      <div class="quan-bankuai-contain left">
        <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
          <div class="juzhong font-18 quan-bankuai-inner">
            <quanshuiwei />
          </div>
        </dv-border-box-10>
      </div>
      <div class="quan-bankuai-contain right">
        <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
          <div class="font-18 quan-bankuai-inner">
            <quanzhishu />
          </div>
        </dv-border-box-10>
      </div>
    </div>
    <div class="flex bankuai-contain">
      <div class="quan-bankuai-contain left">
        <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
          <div class="juzhong font-18 quan-bankuai-inner under">打板
          </div>
        </dv-border-box-10>
      </div>
      <div class="quan-bankuai-contain right">
        <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
          <div class="juzhong font-18 quan-bankuai-inner under">
            <quanzijin />
          </div>
        </dv-border-box-10>
      </div>
    </div>
  </div>
</template>

<script>
import quanzhishu from "./quan/quan-zhishu.vue";
import quanshuiwei from "./quan/quan-shuiwei.vue";
import quanzijin from "./quan/quan-zijin.vue";

export default {
    name: "quan-slide",
    components: {
        quanzhishu,
        quanshuiwei,
        quanzijin,
    },
};
</script>

<style lang="scss">
.jubu-slide {
    // background-color: #002531;
    background-color: rgba(2, 56, 75, 0.5);
    .bankuai-contain {
        width: 100%;
        display: flex;
        height: 280px;
        justify-content: space-around;
        align-items: center;
    }
    .quan-bankuai-contain {
        height: 240px;
        width: 435px;
    }
    .quan-bankuai-inner {
        height: 240px;
        width: 435px;
    }
    .under {
        margin-top: -10px;
    }
    .left {
        margin-left: 15px;
    }
    .right {
        margin-right: 15px;
    }
}
</style>
