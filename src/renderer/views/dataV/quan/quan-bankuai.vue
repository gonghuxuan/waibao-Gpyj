<template>
  <div class="jubu-bankuai">
    <div class="sn-container sn-container-1 ">
      <div class="table-1">
        <div class="juzhong font-18 bankuai-title">
          <quanbankuaizhangting style="padding-top: 36px" stockType="1" title="板块涨停个数" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-2">
      <div class="table-2">
        <div class="juzhong font-18 bankuai-title">
          <quanxingao stockType="0" style="padding-top: 36px" title="新高异动" />
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-3">
      <div class="table-3">
        <div class="juzhong font-18 bankuai-title">
          <bankuaiitem title="平台突破" style="padding-top: 36px">
            <quanxingao stockType="1" title="平台突破" />
          </bankuaiitem>
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-4">
      <div class="table-4">
        <div class="juzhong font-18 bankuai-title">
          <bankuaiitem title="游资股预警" style="padding-top: 36px">
            <quanxingao stockType="3" title="强势回调" />
          </bankuaiitem>
        </div>
      </div>
    </div>
    <div class="sn-container sn-container-5">
      <div class="table-5">
        <div class="juzhong font-18 bankuai-title">
          <bankuaiitem title="" style="padding-top: 36px">
            <quanlianbangaodu stockType="1" title="连板高度预警" />
          </bankuaiitem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import quanxingao from "./quan/quan-xingao.vue";
import quanbankuaizhangting from "./quan/quan-bankuaizhangting.vue";
import quanlianbangaodu from "./quan/quan-lianbangaodu.vue";
// import quanpingtai from "./quan/quan-pingtai.vue";
// import quanyouzi from "./quan/quan-youzi.vue";

import bankuaiitem from "@/views/dataV/components/bankuai-item.vue";

export default {
    data() {
        return {};
    },
    components: {
        quanxingao,
        quanbankuaizhangting,
        quanlianbangaodu,
    },
    computed: {},
    created() {},
    mounted() {
        // this.getData();
    },
    methods: {},
};
</script>

<style lang="scss">
.jubu-bankuai {
    .table-1 {
        background: url(../../../assets/img/table-1.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
        margin-top: -30px;
    }
    .table-2 {
        background: url(../../../assets/img/table-2.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
        margin-top: -30px;
    }
    .table-3 {
        background: url(../../../assets/img/table-3.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
        margin-top: -30px;
    }
    .table-4 {
        background: url(../../../assets/img/table-4.svg) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        width: 370px;
        height: 300px;
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
        width: 350px;
        height: 250px;
    }
    .sn-container-1 {
        left: 15px;
    }
    .sn-container-2 {
        left: 395px;
    }
    .sn-container-3 {
        left: 775px;
    }
    .sn-container-4 {
        left: 1155px;
    }
    .sn-container-5 {
        left: 1535px;
    }
    .bankuai-title {
        color: #1dffff;
        // padding-top: 10px;
    }
}
</style>
