<!--
 描述: 酷屏首页模板
 作者: Jack Chen
 日期: 2020-04-29
-->

<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <div class="top"></div>

            <!-- <sinan />
            <seamless />
            <pyramid /> -->
            <carousel-3d
                class="sn-container-car wrap-container"
                perspective="35"
                space="800"
                height="550"
                width="600"
                inverseScaling="300"
            >
                <slide :index="0"> Slide 1 Content </slide>
                <slide :index="1"> Slide 2 Content </slide>
                <slide :index="2"> Slide 3 Content </slide>
            </carousel-3d>
            <scrollArc />
            <szBar />

            <ringPin />
            <rotateColorful />
            <circleRunway />
            <scanRadius />

            <cakeLinkage />
            <pyramidTrend />
            <dynamicLine />

            <staffMix />
            <flashCloud />
            <ringPie />
            <colorfulRadar />

            <dynamicList />
            <bar3d />
            <colorfulArea />

            <rainbow />
            <gauge />
            <waterPolo />
            <circleNesting />

            <!-- <div class="divider"></div> -->
            <div class="divider2"></div>
        </div>
    </div>
</template>

<script>
import { screenSize } from "@/assets/js/utils";
import Carousel3d from "@/components/carousel-3d/Carousel3d.vue";
import Slide from "@/components/carousel-3d/Slide.vue";
export default {
    name: "Home",
    components: {
        Carousel3d,
        Slide,
    },
    data() {
        return {};
    },
    computed: {},
    created() {
        console.log("refresh");
    },
    mounted() {
        // console.log(this.$refs.editor);
        screenSize(this.$refs.editor);
        console.log(document.location.href);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.home-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .test {
        width: 30vw;
        height: 20vh;
        background-color: green($color: #000000);
    }
    .sn-container-car {
        // left: 50px;
        top: 100px;
    }
    .wrap {
        transform-origin: 0px 0px 0px;
        background: url(../../assets/img/bj.jpg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        background-color: rgb(0, 0, 0);
        min-width: auto;
        width: 1920px;
        min-height: auto;
        height: 1080px;
        overflow: auto;
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
