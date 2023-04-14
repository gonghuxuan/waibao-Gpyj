<template>
  <div style="
            color: white;
            font-size: 16px;
            padding-top: 15px;
            padding-left: 30px;
        ">
    <span>test1</span>
    <span style="padding-left: 15px;padding-right: 30px;"><img src="@/assets/img/logout.svg" alt="" style="width: 20px;" /></span>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {},
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
