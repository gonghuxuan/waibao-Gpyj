<template>
  <div class="jubu-slide">
    <div :class="color == 0 ? 'color1': color == 1 ? 'color2': 'color3'">
      <div class="juzhong font-18" style="padding-top: 18px;color: #1DFFFF">全局预警</div>
      <div class="flex bankuai-contain">
        <div class="quan-bankuai-contain left">
          <div :color="['#5D9A9E', '#0694B1']">
            <div class="juzhong font-18 quan-bankuai-inner">
              <quanshuiwei />
            </div>
          </div>
        </div>
        <div class="quan-bankuai-contain right">
          <div>
            <div class="font-18 quan-bankuai-inner">
              <quanzhishu />
            </div>
          </div>
        </div>
      </div>
      <div class="flex bankuai-contain" style="margin-top: -12px">
        <div class="quan-bankuai-contain left">
          <div>
            <div class="juzhong font-18 quan-bankuai-inner under">
              <quandaban />
            </div>
          </div>
        </div>
        <div class="quan-bankuai-contain right">
          <div>
            <div class="juzhong font-18 quan-bankuai-inner under">
              <quanzijin />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import quanzhishu from "./quan/quan-zhishu.vue";
import quanshuiwei from "./quan/quan-shuiwei.vue";
import quandaban from "./quan/quan-daban.vue";
import quanzijin from "./quan/quan-zijin.vue";

export default {
    name: "quan-slide",
    components: {
        quanzhishu,
        quanshuiwei,
        quanzijin,
        quandaban,
    },
    data() {
        return {
            color: 0,
        };
    },
    watch: {
        "$store.state.App.swiper"(newval, oldval) {
            // 代码实现

            if (newval === 0) {
                console.warn("newcal1");
                this.color = 0;
            }
            if (newval === 1) {
                console.warn("newcal2");

                this.color = 1;
            }
            if (newval === 2) {
                console.warn("newcal3");

                this.color = 2;
            }
        },
    },
};
</script>

<style lang="scss">
.jubu-slide {
    .color1 {
    }
    .color2 {
        background-color: rgba(255, 244, 92, 0.2);
    }
    .color3 {
        background-color: rgba(217, 61, 210, 0.2);
    }
    // background-color: #002531;
    // background-color: rgba(2, 56, 75, 0.5);
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
