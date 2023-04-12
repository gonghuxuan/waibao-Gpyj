<template>
    <div class="jubu-zhishu">
        <div>
            <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick($event)">
                    <a-menu-item v-for="item in exponentNameList" :key="item">
                        {{ item }}
                    </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                    {{ exponentName }} <a-icon type="down" />
                </a-button>
            </a-dropdown>
            <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick2($event)">
                    <a-menu-item key="0"> 分时 </a-menu-item>
                    <a-menu-item key="1"> 日线 </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                    {{ timeType == "0" ? "分时" : "日线" }}
                    <a-icon type="down" />
                </a-button>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
import { getExponentNames } from "@/api/userInfo.js";
import { getExponentDivergeSignal } from "@/api/userInfo.js";

export default {
    data() {
        return {
            exponentName: "上证指数",
            exponentNameList: [],
            timeType: "0",
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.getName();
        this.getData();
    },
    methods: {
        handleMenuClick(el) {
            console.log(el);
            this.sexponentNametatus = el.key;
        },
        handleMenuClick2(el) {
            console.log(el.key);
            this.timeType = el.key;
        },
        getName() {
            getExponentNames().then((res) => {
                console.log(res);
                this.exponentNameList = res;
            });
        },
        getData() {
            getExponentDivergeSignal({
                timeType: this.timeType,
                exponentName: this.exponentName,
            }).then((res) => {
                console.log(res);
            });
        },
    },
};
</script>

<style lang="scss">
.jubu-zhishu {
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
