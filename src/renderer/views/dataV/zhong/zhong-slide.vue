<template>
  <div class="zhong-slide">
    <div class="juzhong font-18">重点预警 </div>
    <div class="title">个股与指数的关系</div>

    <div v-if="show" class="quanqiu flex">
      <zhongzhishubankuai />
    </div>
  </div>
</template>

<script>
import zhongzhishubankuai from "./zhong/zhong-zhishubankuai.vue";

export default {
    name: "zhong-slide",
    data() {
        return {
            show: true,
        };
    },
    watch: {
        "$store.state.App.swiper"(newval, oldval) {
            // 代码实现
            if (newval === 2) {
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
    },
    components: {
        zhongzhishubankuai,
    },
};
</script>

<style lang="scss">
.zhong-slide {
    .quanqiu {
    }
    .title {
        padding-left: 30px;
        font-size: 16px;
    }
    .box-7 {
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
        text-align: center;
        font-size: 16px;
    }
}
</style>
