<template>
  <div class="zhong-slide">
    <div :class="color == 0 ? 'color1': color == 1 ? 'color2': 'color3'">
      <div class="juzhong font-18">
        <div class="juzhong font-18" style="padding-top: 18px;color: #1DFFFF">重点预警 </div>
      </div>
      <div class="title" style="margin-top: 20px">个股与指数的关系</div>

      <div v-if="show" class="quanqiu flex">
        <zhongzhishubankuai />
      </div>
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
            color: 0,
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
        zhongzhishubankuai,
    },
};
</script>

<style lang="scss">
.zhong-slide {
    .color1 {
        background-color: rgba(255, 244, 92, 0.2);
    }
    .color2 {
        background-color: rgba(217, 61, 210, 0.2);
    }
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
