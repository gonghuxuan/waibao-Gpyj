<template>
  <div class="quan-slide">
    <div :class="color == 0 ? 'color1': color == 1 ? 'color2': 'color3'">
      <div class="juzhong font-18" style="padding-top: 18px;color: #1DFFFF">局部预警 </div>
      <div class="title" style="font-size: 16px;margin-top: 20px">板块与指数的关系</div>
      <div class="quanqiu">
        <div v-if="show" class="flex bankuai-contain">
          <jubuzhishubankuai />
        </div>
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
            color: 0,
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
            if (newval === 0) {
                console.warn("newcal1");
                this.color = 0;
            }
            if (newval === 1) {
                console.warn("newcal2");

                this.color = 1;
            }
            if (newval === 2) {
                console.warn("newcal3");

                this.color = 2;
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
    .color3 {
        background-color: rgba(255, 244, 92, 0.2);
    }
    .color1 {
        background-color: rgba(217, 61, 210, 0.2);
    }
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
