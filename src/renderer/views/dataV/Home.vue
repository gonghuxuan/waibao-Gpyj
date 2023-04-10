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
                space="750"
                height="550"
                width="950"
                inverseScaling="300"
                sliderWidthmy="500"
            >
                <slide :index="0" class="slider">
                    <div class="juzhong font-18">全局预警 </div>
                    <div class="flex bankuai-contain">
                        <div class="quan-bankuai-contain">
                            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                                ><div class="juzhong font-18 quan-bankuai-inner"
                                    >市场水位
                                </div></dv-border-box-10
                            ></div
                        >
                        <div class="quan-bankuai-contain">
                            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                                ><div class="juzhong font-18 quan-bankuai-inner"
                                    >指数背离
                                </div></dv-border-box-10
                            ></div
                        >
                    </div>
                    <div class="flex bankuai-contain">
                        <div class="quan-bankuai-contain">
                            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                                ><div class="juzhong font-18 quan-bankuai-inner"
                                    >打板
                                </div></dv-border-box-10
                            ></div
                        >
                        <div class="quan-bankuai-contain">
                            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                                ><div class="juzhong font-18 quan-bankuai-inner"
                                    >资金流向
                                </div></dv-border-box-10
                            ></div
                        >
                    </div>
                </slide>
                <slide :index="1" class="slider">
                    <div class="juzhong font-18">局部预警 </div>
                </slide>
                <slide :index="2" class="slider">
                    <div class="juzhong font-18">重点预警 </div>
                </slide>
            </carousel-3d>
            <div class="sn-container sn-container-1">
                <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                    ><div class="juzhong font-18 bankuai-title"
                        >涨停板块个数
                    </div></dv-border-box-10
                >
            </div>
            <div class="sn-container sn-container-2">
                <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                    ><div class="juzhong font-18 bankuai-title"
                        >新高异动
                    </div></dv-border-box-10
                >
            </div>
            <div class="sn-container sn-container-3">
                <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                    ><div class="juzhong font-18 bankuai-title"
                        >平台突破
                    </div></dv-border-box-10
                >
            </div>
            <div class="sn-container sn-container-4">
                <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                    ><div class="juzhong font-18 bankuai-title"
                        >游资股预警
                    </div></dv-border-box-10
                >
            </div>
            <div class="sn-container sn-container-5">
                <dv-border-box-10 :color="['#0694B1', '#5D9A9E']"
                    ><div class="juzhong font-18 bankuai-title"
                        >连板高度预警
                    </div></dv-border-box-10
                >
            </div>
            <!-- <scrollArc />
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
            <circleNesting /> -->

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
    .slider {
        color: white;
    }
    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
    .bankuai-contain {
        width: 100%;
        display: flex;
        height: 250px;
        justify-content: space-around;
        align-items: center;
    }
    .quan-bankuai-contain {
        height: 220px;
        width: 400px;
    }
    .quan-bankuai-inner {
        height: 200px;
        width: 400px;
    }
    .sn-container {
        top: 710px;
        width: 350px;
        height: 300px;
    }
    .sn-container-1 {
        left: 50px;
    }
    .sn-container-2 {
        left: 420px;
    }
    .sn-container-3 {
        left: 790px;
    }
    .sn-container-4 {
        left: 1160px;
    }
    .sn-container-5 {
        left: 1530px;
    }
    .wrap {
        transform-origin: 0px 0px 0px;
        background: url(../../assets/img/bg.png) no-repeat;
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
