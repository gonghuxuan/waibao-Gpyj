<template>
  <div class="menu">

    <div><a-icon style="margin-top: 9px;font-size: 14px;margin-left: 10px;padding-right: 5px;" type="home" theme="filled" class="icon" /></div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="handleClick">
        全局市场预警 <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="toDetail( '/quan-shuiwei-detail', '全场预警',  '市场水位', 0)">
          <a href="javascript:;">市场水位</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/detail/quan-zhishu-detail')">
          <a href="javascript:;">指数背离</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-daban-detail')">
          <a href="javascript:;">打版</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-zijin-detail','全场预警','资金流向', 0)">
          <a href="javascript:;">资金流向</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-bankuaizhangting-detail','全场预警','板块涨停')">
          <a href="javascript:;">板块涨停个数</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-xingao-detail','全场预警','新高异动', 0)">
          <a href="javascript:;">新高异动</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-xingao-detail','全场预警','平台突破', 1)">
          <a href="javascript:;">平台突破</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-xingao-detail','全场预警','游资股预警', 3)">
          <a href="javascript:;">游资股预警</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-lianbangaodu-detail','全场预警','连板高度')">
          <a href="javascript:;">连板高度预警</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <!-- :trigger="['click']" -->
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        局部预警 <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">市场水位</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">指数背离</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">打版</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">资金流向</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">板块涨停个数</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">新高异动</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">平台突破</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">强势回调</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">游资股预警</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">连板高度预警</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        重点预警 <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;">市场水位</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">指数背离</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">打版</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">资金流向</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">板块涨停个数</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">新高异动</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">平台突破</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">强势回调</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">游资股预警</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;">连板高度预警</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="toManagement">
        后台管理 <a-icon type="down" />
      </a>
      <!-- <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;">市场水位</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">指数背离</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">打版</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">资金流向</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">板块涨停个数</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">新高异动</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">平台突破</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">强势回调</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">游资股预警</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">连板高度预警</a>
                </a-menu-item>
            </a-menu> -->
    </a-dropdown>
    <a-button-group size="small">
      <a-button type="primary" @click="back">
        <a-icon type="left" />
      </a-button>
      <a-button type="primary" @click="forward">
        <a-icon type="right" />
      </a-button>
      <a-button type="primary" @click="refresh">
        <a-icon type="reload" />
      </a-button>
    </a-button-group>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
    methods: {
        toDetail(url, title1, title2, type) {
            this.$router.push({
                path: url,
                query: {
                    stockType: type,
                    title1: title1,
                    title2: title2,
                },
            });
        },
        toManagement() {
            this.$router.push({
                path: "/importStockData",
            });
        },
        back() {
            this.$router.go(-1);
        },
        forward() {
            // this.$router.go(1);
            // this.$router.push({ path: "/brand" });
            this.$router.push({ path: "/home" });
        },
        refresh() {
            eventBus.$emit("refresh");
        },
    },
};
</script>

<style lang="less" scoped>
.ant-btn {
    border: 1px solid rgba(0, 0, 0, 0.1);
    // /deep/ .ant-dropdown-menu {
    //     background-color: #073b49;
    // }
}
.box-7 {
    width: 40px;
    height: 30px;
    // margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
}
.menu {
    display: flex;
    justify-content: start;
}
.icon {
    margin-top: 0px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
