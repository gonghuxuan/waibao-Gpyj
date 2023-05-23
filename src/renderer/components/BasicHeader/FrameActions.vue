<template>
  <div class="frame-actions">
    <!-- <span @click="showcommit">123231</span> -->
    <a-icon class="bell" @click="showpopup" type="bell" />
    <a-icon class="dowmload" @click="toDetail" type="download" />
    <!-- <a-icon type="shrink" class="item" @click="setFrame('mini')" /> -->
    <a-icon type="minus" class="item" @click="setFrame('min')" v-if="platform === 'win32'" />
    <z-icon :type="isMax ? 'tuichuquanping' : 'juxing'" class="item" @click.native="setFrame('plus')" v-if="platform === 'win32'" />
    <a-icon type="close" class="item" @click="setFrame('close')" v-if="platform === 'win32'" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ZIcon from "@/components/ZIcon";
import dayjs from "dayjs";
import { getWarningRecords } from "@/api/userInfo.js";

export default {
    data() {
        this.currentWindow = this.$electron.remote.getCurrentWindow();
        return {
            isMax: this.currentWindow.isMaximized(),
            activeKey: ["1"],
        };
    },
    computed: {
        ...mapState("App", ["platform"]),
    },
    components: {
        ZIcon,
    },
    mounted() {
        // console.log("control mounted");
        // setInterval(() => {
        //     this.getpop();
        // }, 30000);
        // this.getpop();
    },
    methods: {
        showcommit() {
            console.log(this.$store.state.App.showPupop);
        },
        getpop() {
            getWarningRecords({
                dealDate: dayjs().format("YYYY-MM-DD"),
            }).then((res) => {
                this.xinxi = res.records[0];
                sessionStorage.setItem("popup", JSON.stringify(this.xinxi));
                if (res.warned) {
                    const dialog = this.$electron.remote.dialog;
                    const popupinfo = JSON.parse(
                        sessionStorage.getItem("popup")
                    );
                    dialog
                        .showMessageBox({
                            type: "info",
                            title: "预警信息时间:" + popupinfo.timeStr,
                            message: popupinfo.redord,
                            position: { x: "0", y: "0" },
                            buttons: ["确定"],
                        })
                        .then((res) => {});
                }
            });
        },
        showpopup() {
            this.$store.commit(
                "App/SHOW_POPUP",
                !this.$store.state.App.showPupop
            );
            // const dialog = this.$electron.remote.dialog;
            // const popupinfo = JSON.parse(sessionStorage.getItem("popup"));
            // console.log(popupinfo);
            // dialog
            //     .showMessageBox({
            //         type: "info",
            //         title: "预警信息时间:" + popupinfo.timeStr,
            //         message: popupinfo.redord,
            //         position: { x: "0", y: "0" },
            //         buttons: ["确定"],
            //     })
            //     .then((res) => {});
        },
        setFrame(action) {
            switch (action) {
                case "min":
                    this.$electron.ipcRenderer.send("window-min");
                    break;
                case "plus":
                    this.$electron.ipcRenderer.send("window-max");
                    break;
                case "close":
                    this.$electron.ipcRenderer.send("window-close");
                    break;
                case "mini":
                    this.$electron.ipcRenderer.send("toggle-mini", {
                        value: true,
                    });
                    break;
            }
            this.isMax = this.currentWindow.isMaximized();
        },
        toDetail() {
            this.$router.push({
                path: "/exportStock",
                // query: {
                //     stockType: type,
                //     title1: title1,
                //     title2: title2,
                //     refreshMounted: this.$route.name == "Home" ? undefined : 1,
                // },
            });
        },
    },
};
</script>

<style lang="less" scoped>
.bell {
    font-size: 18px;
    padding-right: 10px;
    position: relative;
}
.frame-actions {
    display: flex;
    align-items: center;
    margin-right: 10px;
    -webkit-app-region: no-drag;
    // &::before {
    //     content: "";
    //     display: inline-block;
    //     width: 1px;
    //     height: 20px;
    //     margin-right: 8px;
    //     background: #ddd;
    // }
    .item {
        padding: 0 4px;
        line-height: 54px;
        height: 50px;
        vertical-align: unset;
        font-size: 18px;
        cursor: pointer;
    }
    .dowmload {
        margin-right: 30px;
        font-size: 18px;
    }
}
</style>
