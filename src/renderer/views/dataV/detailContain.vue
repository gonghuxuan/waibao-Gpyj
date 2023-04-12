<!--
 描述: 酷屏首页模板
 作者: Jack Chen
 日期: 2020-04-29
-->

<template>
    <div class="detail-container">
        <div class="wrap" ref="editor">
            <div class="top"> </div>
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
        </div>
    </div>
</template>

<script>
import { screenSize } from "@/assets/js/utils";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            status: 0,
        };
    },
    computed: {},
    created() {},
    mounted() {
        // console.log(this.$refs.editor);
        screenSize(this.$refs.editor);
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.detail-container {
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
    }
}
</style>
