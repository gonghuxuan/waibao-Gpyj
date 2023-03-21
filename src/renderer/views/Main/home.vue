<template>
    <div class="home">
        <div class="box">
            <!-- <carousel-3d perspective="35" space="380">
                <slide :index="0"> Slide 1 Content </slide>
                <slide :index="1"> Slide 2 Content </slide>
                <slide :index="2"> Slide 3 Content </slide>
            </carousel-3d> -->
            123
        <div class="auto-test">123</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Info from "@/components/Info.vue";
// import { Carousel3d, Slide } from 'vue-carousel-3d';
import Carousel3d from "@/components/carousel-3d/Carousel3d.vue";
import Slide from "@/components/carousel-3d/Slide.vue";

export default {
    name: "Home",
    data() {
        return {
            slides: [
                {
                    title:
                        "9111111111111111111111111111111111111111111111111111111111119",
                },
                { title: "2222222222222222222222222222222222222222222222222" },
                { title: "333333333333333333333333333333333333333333333333" },
            ],
        };
    },
    components: {
        Carousel3d,
        Slide,
    },
    computed: {
        ...mapGetters(["userInfo"]),
    },
    mounted() {
        this.$store.dispatch("user/getUserInfo");
    },
};
</script>

<style lang="less" scoped>
.auto-test {
    width: 200px;
    height: 100px;
    color: green;
    background-color: green;
}
</style>
