<template>
    <div class="jubu-xingao-detail"> 新高异动 </div>
</template>

<script>
import { getExponentNames } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
export default {
    data() {
        return {};
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
.jubu-xingao-detail {
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
