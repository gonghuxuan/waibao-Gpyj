<template>
  <div ref="app" id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <music-viewer />
    <div style="color:white" class="popup-app" ref="editor" v-show="$store.state.App.showPupop">
      <div v-for="(item, index) in res" :key="index" class="popup-item-app">
        <span style="color: yellow">{{ item.timeStr }}:</span> {{ item.redord }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MusicViewer from "@/views/MusicViewer.vue";
import { getWarningRecords } from "@/api/userInfo.js";
import dayjs from "dayjs";
import { screenSize } from "@/assets/js/utils";

export default {
    name: "app",
    components: {
        MusicViewer,
    },
    data() {
        return {
            res: [],
        };
    },
    methods: {
        ...mapActions("Download", {
            initDownload: "init",
            checkDownloaded: "checkDownloaded",
        }),
        handleAppWillClose() {
            if (this.$route.name !== "mini") {
                this.$store.commit("play/SET_PLAY_STATUS", false);
            }
            this.$store.commit("play/SET_SHOW_DESKTOP_LYRIC", false);
        },
        handleNetworkChange({ name, title, message }, status = true) {
            let networkNotification = new Notification(name, {
                title,
                body: message,
                icon: "public/images/icon.ico",
            });
            this.$store.commit("App/SET_ONLINE", status);
        },
        getpop() {
            getWarningRecords({
                dealDate: dayjs().format("YYYY-MM-DD"),
            }).then((res) => {
                this.res = res.records;
                // res.warned = true;
                if (res.warned) {
                    this.$store.commit("App/SHOW_POPUP", true);
                }
                console.log(res);
                // this.xinxi = res.records[0];
                // sessionStorage.setItem("popup", JSON.stringify(this.xinxi));
                // if (res.warned) {
                //     const dialog = this.$electron.remote.dialog;
                //     const popupinfo = JSON.parse(
                //         sessionStorage.getItem("popup")
                //     );
                //     dialog
                //         .showMessageBox({
                //             type: "info",
                //             title: "预警信息时间:" + popupinfo.timeStr,
                //             message: popupinfo.redord,
                //             position: { x: "0", y: "0" },
                //             buttons: ["确定"],
                //         })
                //         .then((res) => {});
                // }
            });
        },
    },
    created() {
        this.initDownload();

        console.log(
            "window.location.href::::::::::::::::::",
            window.location.href
        );
    },
    mounted() {
        // screenSize(this.$refs.editor);

        this.$electron.ipcRenderer.on("will-close", () => {
            this.handleAppWillClose();
            this.$electron.ipcRenderer.send("app-exit");
        });
        const win = this.$electron.remote.getCurrentWindow();
        win.on("minimize", () => {
            console.log("minnnnnnnnnnnnnnnnnnsize");
            const time = dayjs().format("YYYY-MM-DD HH:mm");
            sessionStorage.setItem("minTime", time);
        });

        win.on("restore", () => {
            const readyTime = sessionStorage.getItem("minTime");
            console.log(readyTime);
            if (readyTime) {
                const nowtime = dayjs().subtract(30, "minute");
                // const nowtime = dayjs().subtract(30, "second");

                const lasttime = dayjs(readyTime);
                if (nowtime.isAfter(lasttime)) {
                    console.log("重启--------------");
                    win.webContents.reload();
                }
            }
            console.log("restorennnnnnnnnnnsize");
            // 窗口还原时触发的操作
        });
        window.onunload = () => {
            this.handleAppWillClose();
        };

        setInterval(() => {
            this.getpop();
        }, 30000);
        this.getpop();
        // window.onoffline = () => {
        //     this.handleNetworkChange(
        //         {
        //             name: "网易云音乐",
        //             title: "网易云音乐",
        //             message: "请检查您的网络连接",
        //         },
        //         false
        //     );
        // };
        // window.ononline = () => {
        //     this.handleNetworkChange({
        //         name: "网易云音乐",
        //         title: "网易云音乐",
        //         message: "网络连接成功",
        //     });
        // };
    },
};
</script>
<style lang="scss">
.popup-app {
    position: absolute;
    right: 0px;
    top: 40px;
    width: 400px;
    height: 60vh;
    background-color: #003c50;
    overflow-y: scroll;
    z-index: 999;
    font-size: 14px;
    padding-left: 5px;
}
.popup-item-app {
    padding-bottom: 10px;
    padding-top: 10px;

    // border-bottom: #000000 1px solid;
}
</style>
