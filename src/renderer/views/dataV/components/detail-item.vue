<template>
  <div class="detail-item">
    <div>
      <div class="top1">
        <timecom />
        <usercom />
      </div>
      <div v-show="title2    !== '新高异动' && title2 !== '平台突破' && title2 !== '游资股' && title2 !== '强势回调'&& getTilte() " style="
              font-size: 16px;
                    padding-left: 10px;
                    color: rgba(100, 183, 188, 0.5);
                    margin-top: 20px;
                    margin-bottom: -20px;
                    display: flex;
                    align-items: center;
                    justify-content:space-between;
                ">
        <div style="margin-left: 3vw">
          <span style="padding-right: 5px">{{ title1 }}</span>
          <span v-show="hidden">/</span>
          <span style="color: rgba(100, 183, 188, 1); padding-left: 5px">{{ title2 }}</span>
        </div>
        <div style="margin-right: 3vw" @click="back"> <a-button>
            返回
          </a-button></div>
      </div>
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :key="key"></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
  </div>
</template>

<script>
import { getExponentNames } from "@/api/userInfo.js";
import { getExponentDivergeSignal } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
import timecom from "@/views/dataV/components/time.vue";
import usercom from "@/views/dataV/components/user.vue";
export default {
    data() {
        return {
            title1: "",
            title2: "",
            hidden: true,
        };
    },
    components: {
        timecom,
        usercom,
    },
    watch: {
        $route(to, from) {
            this.title1 = this.$route.query.title1;
            this.title2 = this.$route.query.title2;
            if (!this.title2 && !this.title2) {
                this.hidden = false;
            } else {
                this.hidden = true;
            }
        },
    },
    computed: {
        key() {
            return this.$route.name + Math.random();
        },
    },
    created() {},
    mounted() {
        // console.log(this.$route);
        // console.log(this.$route.query.title1);
        // console.log(this.$route.query.title2);
        this.title1 = this.$route.query.title1;
        this.title2 = this.$route.query.title2;
    },

    activated() {
        this.title1 = this.$route.query.title1;
        this.title2 = this.$route.query.title2;
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        getTilte() {
            return (
                this.$route.name !== "jubu-10xianxingwei-detail" &&
                this.$route.name !== "jubu-10xianxing-detail"
            );
        },
    },
};
</script>

<style lang="scss">
.detail-item {
    padding: 7px 5px;
    z-index: 999;
    .top1 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 10px;
    }
    .ant-btn {
        background-color: #082932;
        border-color: #5d9a9e;
        color: #1de2e2;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .top-contain {
        border: 2px solid rgba(12, 220, 226, 0.3);
        background-image: linear-gradient(
            to right,
            rgba(29, 255, 255, 0.1),
            rgba(29, 255, 255, 0.3),
            rgba(29, 255, 255, 0.1)
        );
        margin-top: 40px;
        width: 96%;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
        font-size: 18px;
        color: rgba(29, 255, 255, 1);
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .content-contain {
        border: 1px solid rgba(12, 220, 226, 0.1);
        height: 825px;
        width: 96%;
        margin-left: auto;
        margin-right: auto;
    }
    .dropdown {
        margin-top: 20px;
    }
}
</style>
