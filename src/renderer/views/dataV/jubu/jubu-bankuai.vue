<template>
  <div class="quan-bankuai">
    <div class="sn-container sn-container-1">
      <div class="table-1">
        <div class="juzhong font-18 bankuai-title">
          <jubuzhangfuyidong title="涨幅异动" style="margin-top: 20px" />
        </div>
      </div>
    </div>

    <div class="sn-container sn-container-2">
      <div class="table-2">
        <div class="juzhong font-18 bankuai-title">
          <jubuchengjiaoeyidong title="成交额异动" style="margin-top: 20px" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-3" @click="show3d">
      <div class="table-3">
        <!-- <span style="font-size: 16px; color: white">{{ getstatus3d() == 1 }}</span> -->
        <div v-if="getstatus3d() == 1" class="juzhong font-18 bankuai-title">
          <jubu10xianxing title="10天线性跟踪" style="margin-top: 20px" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-4">
      <div class="table-4">
        <div v-if="getstatus3d() == 1" class="juzhong font-18 bankuai-title">
          <jubu10xianxingwei title="10天未突破跟踪" style="margin-top: 20px" />
        </div>
      </div>
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
    .table-1 {
        background: url(../../../assets/img/jubu-table-1.svg) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        width: 460px;
        height: 275px;
        margin-top: -30px;
    }
    .table-2 {
        background: url(../../../assets/img/jubu-table-2.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-3 {
        background: url(../../../assets/img/jubu-table-3.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-4 {
        background: url(../../../assets/img/jubu-table-4.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-5 {
        background: url(../../../assets/img/table-5.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
        margin-top: -30px;
    }
    .sn-container {
        top: 760px;
        width: 440px;
        height: 250px;
    }
    .sn-container-1 {
        left: 10px;
    }
    .sn-container-2 {
        left: 480px;
    }
    .sn-container-3 {
        left: 960px;
    }
    .sn-container-4 {
        left: 1440px;
    }

    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
}
</style>
