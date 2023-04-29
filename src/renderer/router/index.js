import Vue from "vue";
import store from "@/store/index.js";
import Router from "vue-router";
import BasicLayout from "@/layouts/BasicLayout";

// import { recommendRoutes } from "./modules/recommend";
// import { myMusicRoutes } from "./modules/myMusic";
// import { playlistRoutes } from "./modules/playlist";
// import { artistRoutes } from "./modules/artist";
// import { albumRoutes } from "./modules/album";
// import { djRoutes } from "./modules/dj";
// import { rankRoutes } from "./modules/rank";
// import { settingRoutes } from "./modules/setting";
// import { searchRoutes } from "./modules/search";
// import { videoRoutes } from "./modules/video";
// import { userRoutes } from "./modules/user";
import { ipcRenderer } from "electron";
import Toast from "./../components/Toast/toast";
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            component: BasicLayout,
            redirect: "/login",
            children: [
                // ...recommendRoutes,
                // ...rankRoutes,
                // ...myMusicRoutes,
                // ...playlistRoutes,
                // ...artistRoutes,
                // ...albumRoutes,
                // ...searchRoutes,
                // ...videoRoutes,
                // ...userRoutes,
                // ...settingRoutes,
                // ...djRoutes,
                {
                    path: "/offline",
                    name: "offline",
                    component: function (resolve) {
                        require(["@/views/Offline/index.vue"], resolve);
                    },
                },

                {
                    path: "/home",
                    name: "Home",
                    component: () => import("@/views/dataV/Home.vue"),
                    meta: {
                        title: "酷屏首页统计图",
                    },
                },
                {
                    path: "/brand",
                    name: "Brand",
                    component: () => import("@/views/dataV/Brand.vue"),
                    meta: {
                        title: "公司品牌介绍",
                    },
                },
                {
                    path: "/detail",
                    component: () => import("@/views/dataV/detailContain.vue"),
                    meta: {
                        title: "troubleDebt",
                        keepAlive: false,
                    },
                    children: [
                        {
                            path: "quan-zhishu-detail",
                            name: "quan-zhishu-detail",
                            component: () =>
                                import(
                                    "@/views/dataV/quan/quan/quan-zhishuDetail.vue"
                                ),
                            meta: {
                                title: "quan-zhishuDetail",
                                keepAlive: false,
                            },
                        },
                        {
                            path: "detail2",
                            component: () =>
                                import(
                                    "@/views/dataV/components/detail-item.vue"
                                ),
                            meta: {
                                title: "detail-item",
                                keepAlive: false,
                            },
                            children: [
                                {
                                    path: "/quan-xingao-detail",
                                    name: "quan-xingao-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-xingao-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-xingao-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/quan-shuiwei-detail",
                                    name: "quan-shuiwei-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-shuiwei-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-shuiwei-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/quan-zijin-detail",
                                    name: "quan-zijin-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-zijin-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-zijin-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/quan-lianbangaodu-detail",
                                    name: "quan-lianbangaodu-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-lianbangaodu-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-lianbangaodu-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/quan-bankuaizhangting-detail",
                                    name: "quan-bankuaizhangting-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-bankuaizhangting-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-bankuaizhangting-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/quan-daban-detail",
                                    name: "quan-daban-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/quan/quan/quan-daban-detail.vue"
                                        ),
                                    meta: {
                                        title: "quan-daban-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/jubu-chengjiaoeyidong-detail",
                                    name: "jubu-chengjiaoeyidong-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/jubu/jubu/jubu-chengjiaoeyidong-detail.vue"
                                        ),
                                    meta: {
                                        title: "jubu-chengjiaoeyidong-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/jubu-zhishubankuai-detail",
                                    name: "jubu-zhishubankuai-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/jubu/jubu/jubu-zhishubankuai-detail.vue"
                                        ),
                                    meta: {
                                        title: "jubu-zhishubankuai-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/jubu-zhangfuyidong-detail",
                                    name: "jubu-zhangfuyidong-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/jubu/jubu/jubu-zhangfuyidong-detail.vue"
                                        ),
                                    meta: {
                                        title: "jubu-zhangfuyidong-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/jubu-10xianxing-detail",
                                    name: "jubu-10xianxing-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/jubu/jubu/jubu-10xianxing-detail.vue"
                                        ),
                                    meta: {
                                        title: "jubu-10xianxing-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/jubu-10xianxingwei-detail",
                                    name: "jubu-10xianxingwei-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/jubu/jubu/jubu-10xianxingwei-detail.vue"
                                        ),
                                    meta: {
                                        title: "jubu-10xianxingwei-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/zhong-chengjiaoeyidong-detail",
                                    name: "zhong-chengjiaoeyidong-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/zhong/zhong/zhong-chengjiaoeyidong-detail.vue"
                                        ),
                                    meta: {
                                        title: "zhong-chengjiaoeyidong-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/zhong-zhishubankuai-detail",
                                    name: "zhong-zhishubankuai-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/zhong/zhong/zhong-zhishubankuai-detail.vue"
                                        ),
                                    meta: {
                                        title: "zhong-zhishubankuai-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/zhong-zhangfuyidong-detail",
                                    name: "zhong-zhangfuyidong-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/zhong/zhong/zhong-zhangfuyidong-detail.vue"
                                        ),
                                    meta: {
                                        title: "zhong-zhangfuyidong-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/zhong-lianxu-detail",
                                    name: "zhong-lianxu-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/zhong/zhong/zhong-lianxu-detail.vue"
                                        ),
                                    meta: {
                                        title: "zhong-lianxu-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/zhong-zhengfu-detail",
                                    name: "zhong-zhengfu-detail",
                                    component: () =>
                                        import(
                                            "@/views/dataV/zhong/zhong/zhong-zhengfu-detail.vue"
                                        ),
                                    meta: {
                                        title: "zhong-zhengfu-detail",
                                        keepAlive: false,
                                    },
                                },
                                {
                                    path: "/importStockData",
                                    name: "importStockData",
                                    component: () =>
                                        import(
                                            "@/views/dataV/houtaiManagement/importStockData.vue"
                                        ),
                                    meta: {
                                        title: "importStockData",
                                        keepAlive: false,
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        // {
        //     path: "/mini",
        //     name: "mini",
        //     component: function (resolve) {
        //         require(["@/views/Mini/index.vue"], resolve);
        //     },
        // },
        {
            path: "/login",
            name: "Login",
            component: () => import("@/views/dataV/Login.vue"),
            meta: {
                title: "登录界面",
            },
        },
        // {
        //     name: "tray",
        //     path: "/tray",
        //     component: function (resolve) {
        //         require(["@/views/Tray.vue"], resolve);
        //     },
        // },
        // {
        //     name: "desktopLyric",
        //     path: "/desktop-lyric",
        //     component: function (resolve) {
        //         require(["@/views/DesktopLyric.vue"], resolve);
        //     },
        // },
        // {
        //     name: "fullscreen",
        //     path: "/fullscreen",
        //     component: function (resolve) {
        //         require(["@/views/Video/fullscreen.vue"], resolve);
        //     },
        // },
        // {
        //     name: "update",
        //     path: "/update",
        //     component: function (resolve) {
        //         require(["@/views/Update/index.vue"], resolve);
        //     },
        // },
        // {
        //     name: "localPlayer",
        //     path: "/local-player",
        //     component: function (resolve) {
        //         require(["@/views/Video/player.vue"], resolve);
        //     },
        // },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.auth) {
        const userId = localStorage.getItem("userId");
        if (userId) {
            next();
        } else {
            store.commit("User/SET_SHOW_LOGIN", true);
            store.commit("App/SET_REDIRECT", to.fullPath);
            console.log(store.state.App.redirect);
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    if (to.meta && to.meta.title) {
        ipcRenderer.send("set-tray-title", to.meta.title);
    }
});
export default router;
