<!--
 描述: 酷屏首页模板
 作者: Jack Chen
 日期: 2020-04-29
-->

<template>
  <div class="home-container">
    <div class="wrap" ref="editor">
      <div class="top">
        <timecom />
        <usercom />
      </div>
      <!-- <sinan />
            <seamless />
            <pyramid /> -->
      <div class="left-slider"><img width="430" src="../../assets/img/left-slider.svg" /></div>
      <div class="right-slider"><img width="430" src="../../assets/img/right-slider.svg" /></div>
      <div class="jiantou-1"><img width="30" src="../../assets/img/jiantou-1.svg" /></div>
      <div class="jiantou-2"><img width="30" src="../../assets/img/jiantou-2.svg" /></div>

      <carousel-3d class="sn-container-car wrap-container" perspective="35" space="750" height="600" width="950" inverseScaling="300" sliderWidthmy="500" @before-slide-change="slideChange($event)">
        <slide :index="0" class="slider">
          <quanslide />
        </slide>
        <slide :index="1" class="slider">
          <jubuslide />
        </slide>
        <slide :index="2" class="slider">
          <zhongslide />
        </slide>
      </carousel-3d>
      <div v-show="status === 0">
        <quanbankuai />
      </div>
      <div v-show="status === 1">
        <jububankuai />
      </div>
      <div v-show="status === 2">
        <zhongbankuai />
      </div>
      <!-- <div class="divider2"></div> -->
    </div>
  </div>
</template>

<script>
import { screenSize } from "@/assets/js/utils";
import Carousel3d from "@/components/carousel-3d/Carousel3d.vue";
import Slide from "@/components/carousel-3d/Slide.vue";
import quanbankuai from "./quan/quan-bankuai.vue";
import quanslide from "./quan/quan-slide.vue";
import jubuslide from "./jubu/jubu-slide.vue";
import jububankuai from "./jubu/jubu-bankuai.vue";
import zhongslide from "./zhong/zhong-slide.vue";
import zhongbankuai from "./zhong/zhong-bankuai.vue";
import timecom from "./components/time.vue";
import usercom from "./components/user.vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
    name: "Home",
    components: {
        Carousel3d,
        Slide,
        quanbankuai,
        quanslide,
        jubuslide,
        jububankuai,
        zhongslide,
        zhongbankuai,
        timecom,
        usercom,
    },
    data() {
        return {
            status: 0,
        };
    },
    computed: {
        ...mapState("App", ["swiper"]),
    },
    created() {
        console.log("refresh");
        console.log(this.status);
        console.warn("created", this);
    },
    mounted() {
        // console.log(this.$refs.editor);
        screenSize(this.$refs.editor);
        console.log(document.location.href);
    },
    methods: {
        ...mapMutations("Setting", ["mutateState"]),
        slideChange(el) {
            console.log(el);
            console.warn("el,:", el);
            this.status = el;
            sessionStorage.setItem("status", this.status);
            this.$store.dispatch("gpyj/setSwiper", this.status);
            this.$store.commit("App/SHOW_SWIPER", this.status);
            console.warn("hhhhhhhhhhhh", this.swiper);
        },
    },
};
</script>

<style lang="scss" scoped>
.home-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .left-slider {
        position: absolute;
        top: 100px;
        left: 30px;
        width: 200px;
    }
    .right-slider {
        position: absolute;
        top: 100px;
        left: 1460px;
        width: 200px;
    }
    .jiantou-1 {
        position: absolute;
        top: 400px;
        left: 460px;
        width: 200px;
    }
    .jiantou-2 {
        position: absolute;
        top: 400px;
        left: 1430px;
        width: 200px;
    }
    .left-1 {
        background-color: rgba(255, 244, 92, 0.2);
    }
    .right-1 {
        background-color: rgba(217, 61, 210, 0.2);
    }
    .test {
        width: 30vw;
        height: 20vh;
        background-color: green($color: #000000);
    }
    .sn-container-car {
        // left: 50px;
        top: 100px;
    }
    .slider {
        color: white;
    }

    .wrap {
        transform-origin: 0px 0px 0px;
        background: url(../../assets/img/bg.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        background-color: rgb(0, 0, 0);
        min-width: auto;
        width: 1920px;
        // min-height: auto;
        height: 1080px;
        overflow: hidden;
        .top {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 80px;
            background-color: transparent;
            background: url(../../assets/img/tag_nav.png) no-repeat;
            background-position: 65% 0;
            border: none;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .divider {
            position: absolute;
            left: 50px;
            top: 3253px;
            width: 90%;
            height: 50px;
            width: 300px;
            border: none;
            background: transparent;
        }
        .divider2 {
            position: absolute;
            left: 50px;
            top: 3653px;
            height: 50px;
            width: 300px;
            border: none;
            background: transparent;
        }
    }
}
</style>
