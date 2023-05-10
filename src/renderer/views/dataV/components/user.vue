<template>
  <div style="
            color: white;
            font-size: 16px;
            padding-top: 15px;
            padding-left: 30px;
            z-index: 999
        ">
    <!-- <span v-if="admin == 1">{{ username }}</span>
    <span v-if="admin == 2">{{ username }}</span> -->
    <span @click="logout" style="padding-left: 15px;padding-right: 30px;"><img src="@/assets/img/logout.svg" alt="" style="width: 20px;" /></span>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
    data() {
        return {
            username: localStorage.getItem("username"),
            admin: localStorage.getItem("admin"),
        };
    },
    mounted() {},
    activated() {
        this.username = localStorage.getItem("username");
    },
    methods: {
        logout() {
            this.$electron.ipcRenderer.send("window-restore");
            this.$router.push({
                path: "/login",
            });
        },
        show() {},
    },
};
</script>

<style lang="scss">
.time {
    padding: 7px 5px;
    .ant-btn {
        background-color: #082932;
        border-color: #5d9a9e;
        color: #1de2e2;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
}
</style>
