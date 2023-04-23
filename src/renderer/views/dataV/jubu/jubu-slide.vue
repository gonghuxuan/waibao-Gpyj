<template>
  <div class="quan-slide">
    <div class="juzhong font-18">局部预警 </div>
    <div class="title" style="font-size: 16px">板块与指数的关系</div>
    <div class="quanqiu">
      <div v-if="show" class="flex bankuai-contain">
        <jubuzhishubankuai />
      </div>
    </div>
  </div>
</template>

<script>
import jubuzhishubankuai from "./jubu/jubu-zhishubankuai.vue";

export default {
    name: "jubu-slide",
    data() {
        return {
            show: true,
        };
    },
    watch: {
        "$store.state.App.swiper"(newval, oldval) {
            // 代码实现
            if (newval === 1) {
                this.show = false;
                this.$nextTick(() => {
                    this.show = true;
                });
            }
        },
    },
    components: {
        jubuzhishubankuai,
    },
};
</script>

<style lang="scss">
.quan-slide {
    .quanqiu {
        background: url(../../../assets/img/quanqiu.png) no-repeat;
        background-repeat: no-repeat;
        background-position: left top;
        background-origin: content-box;
        background-size: 100% 100%;
        width: 100%;
        height: 480px;
    }
    .title {
        padding-left: 30px;
        font-size: 16px;
    }
    .bankuai-contain {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
