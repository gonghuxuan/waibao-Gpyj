<template>
  <div class="zhong-bankuai">
    <div class="sn-container sn-container-1">
      <div class="table-1">
        <div class="juzhong font-18 bankuai-title">
          <zhongzhangfuyidong title="涨幅异动" style="margin-top: 20px" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-2">
      <div class="table-2">
        <div class="juzhong font-18 bankuai-title">
          <zhongchengjiaoeyidong title="成交额异动" style="margin-top: 20px" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-3">
      <div class="table-3">
        <div class="juzhong font-18 bankuai-title">
          <zhonglianxu title="连续性" style="margin-top: 20px" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-4">
      <div class="table-4">
        <div class="juzhong font-18 bankuai-title">
          <zhongzhengfu title="振幅" style="margin-top: 20px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import zhongzhangfuyidong from "./zhong/zhong-zhangfuyidong.vue";
import zhongchengjiaoeyidong from "./zhong/zhong-chengjiaoeyidong.vue";
import zhonglianxu from "./zhong/zhong-lianxu.vue";
import zhongzhengfu from "./zhong/zhong-zhengfu.vue";

export default {
    data() {
        return {};
    },
    components: {
        zhongzhangfuyidong,
        zhongchengjiaoeyidong,
        zhonglianxu,
        zhongzhengfu,
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss">
.zhong-bankuai {
    .table-1 {
        background: url(../../../assets/img/jubu-table-1.svg) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        width: 460px;
        height: 275px;
        margin-top: -30px;
    }
    .table-2 {
        background: url(../../../assets/img/jubu-table-2.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-3 {
        background: url(../../../assets/img/jubu-table-3.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-4 {
        background: url(../../../assets/img/jubu-table-4.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 470px;
        height: 275px;
        margin-top: -30px;
    }
    .table-5 {
        background: url(../../../assets/img/table-5.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
        margin-top: -30px;
    }
    .sn-container {
        top: 760px;
        width: 440px;
        height: 250px;
    }
    .sn-container-1 {
        left: 10px;
    }
    .sn-container-2 {
        left: 480px;
    }
    .sn-container-3 {
        left: 960px;
    }
    .sn-container-4 {
        left: 1440px;
    }

    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
}
</style>
