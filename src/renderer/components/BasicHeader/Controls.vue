<template>
  <div class="menu">
    <div @click="toHome">
      <!-- <a-icon style="margin-top: 9px;font-size: 14px;margin-left: 10px;padding-right: 5px;" type="home" theme="filled" class="icon" /> -->
      <img src="../../assets/img/home.svg" height="23" style="margin-left: 10px;" />
    </div>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="handleClick">
        <img src="../../assets/img/quan.svg" height="23" style="margin-left: -16px" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="toDetail( '/quan-shuiwei-detail', '全场预警',  '市场水位', 0)">
          <a href="javascript:;">市场水位</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/detail/quan-zhishu-detail')">
          <a href="javascript:;">指数背离</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/quan-daban-detail')">
          <a href="javascript:;">打板</a>
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
        <img src="../../assets/img/jubu.svg" height="23" style="margin-left: -16px" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="toDetail( '/jubu-zhishubankuai-detail', '局部预警',  '板块与指数的关系')">
          <a href="javascript:;">板块与指数的关系</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/jubu-zhangfuyidong-detail', '局部预警',  '涨幅异动')">
          <a href="javascript:;">涨幅异动</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/jubu-chengjiaoeyidong-detail', '局部预警',  '成交异动')">
          <a href="javascript:;">成交额异动</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/jubu-10xianxing-detail', '局部预警',  '10天线性跟踪')">
          <a href="javascript:;">10天线性跟踪</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/jubu-10xianxingwei-detail', '局部预警',  '10天线性未跟踪')">
          <a href="javascript:;">10天未突破跟踪</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown>
      <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
        <img src="../../assets/img/zhong.svg" height="23" style="margin-left: -16px" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item @click="toDetail( '/zhong-zhishubankuai-detail', '重点预警',  '个股与指数的关系')">
          <a href="javascript:;">个股与指数的关系</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/zhong-zhangfuyidong-detail', '重点预警',  '涨幅异动')">
          <a href="javascript:;">涨幅异动</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/zhong-chengjiaoeyidong-detail', '重点预警',  '成交额异动')">
          <a href="javascript:;">成交额异动</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/zhong-lianxu-detail', '重点预警',  '连续性检测')">
          <a href="javascript:;">连续性</a>
        </a-menu-item>
        <a-menu-item @click="toDetail( '/zhong-zhengfu-detail', '重点预警',  '振幅')">
          <a href="javascript:;">振幅</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown v-if="admin == 1">
      <a class="ant-dropdown-link" @click="toManagement">
        <img src="../../assets/img/hou.svg" height="23" style="margin-left: -16px" />
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
    <!-- <a-button-group size="small">
      <a-button type="primary" @click="back">
        <a-icon type="left" />
      </a-button>
      <a-button type="primary" @click="forward">
        <a-icon type="right" />
      </a-button>
      <a-button type="primary" @click="refresh">
        <a-icon type="reload" />
      </a-button>
    </a-button-group> -->
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
export default {
    data() {
        return {
            admin: localStorage.getItem("admin"),
        };
    },
    created() {
        console.log(this.$route.name);
        console.log(this.admin);
    },
    //     watch: {
    //     $route(to, from) {
    //         if (to.path === this.$route.path) {
    //             console.log(this.$options);
    //             this.$options.activated.call(this);
    //         }
    //     },
    // },
    activated() {
        console.log("control acticed");
        this.admin = localStorage.getItem("admin");
        this.$forceUpdate();
    },
    methods: {
        toDetail(url, title1, title2, type) {
            console.log(this.$route.name);
            console.log(this.$route.name == "Home");

            this.$router.push({
                path: url,
                query: {
                    stockType: type,
                    title1: title1,
                    title2: title2,
                    refreshMounted: this.$route.name == "Home" ? undefined : 1,
                },
            });
        },
        toManagement() {
            this.$router.push({
                path: "/importStockData",
                query: {
                    title1: "后台管理",
                    title2: "导入股票数据",
                },
            });
        },
        toHome() {
            this.$router.push({ path: "/home" });
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
.ant-dropdown-menu-item:hover {
    background-color: #082d37;
}
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
