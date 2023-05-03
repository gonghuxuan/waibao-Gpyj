<template>
  <div class="quan-bankuai">
    <div class="sn-container sn-container-1">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div class="juzhong font-18 bankuai-title" style="background-color: rgba(255,244,92,0.3);">
          <jubuzhangfuyidong title="涨幅异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-2">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']" style="background-color: rgba(255,81,69,0.3);">
        <div class="juzhong font-18 bankuai-title">
          <jubuchengjiaoeyidong title="成交额异动" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-3" @click="show3d">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <!-- <span style="font-size: 16px; color: white">{{ getstatus3d() == 1 }}</span> -->
        <div v-if="getstatus3d() == 1" class="juzhong font-18 bankuai-title" style="background-color: rgba(217,61,210,0.3);">
          <jubu10xianxing title="10天线性跟踪" />
        </div>
      </dv-border-box-10>
    </div>
    <div class="sn-container sn-container-4">
      <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
        <div v-if="getstatus3d() == 1" class="juzhong font-18 bankuai-title" style="background-color: rgba(30,139,255,0.3);">
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
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
    data() {
        return {};
    },
    computed: {
        ...mapState("App", ["swiper"]),
    },
    components: {
        jubuzhangfuyidong,
        jubuchengjiaoeyidong,
        jubu10xianxing,
        jubu10xianxingwei,
    },
    computed: {},
    created() {
        console.warn(this.swiper);
        console.warn(this.$store.state.App.swiper);
    },
    mounted() {},
    methods: {
        show3d() {
            console.warn("hhhhhhhhhhhh", this.swiper);
            console.warn(this.$store.state.App.swiper);
        },
        getstatus3d() {
            console.warn(this.$store.state.App.swiper);
            return this.$store.state.App.swiper;
        },
    },
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
