<template>
    <div class="jubu-bankuai">
        <div class="sn-container sn-container-1">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
                <div class="juzhong font-18 bankuai-title">涨停板块个数1 </div>
            </dv-border-box-10>
        </div>
        <div class="sn-container sn-container-2">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
                <div class="juzhong font-18 bankuai-title">
                    <quanxingao stockType="0" title="新高异动" />
                </div>
            </dv-border-box-10>
        </div>
        <div class="sn-container sn-container-3">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
                <div class="juzhong font-18 bankuai-title">
                    <bankuaiitem title="平台突破">
                        <quanxingao stockType="1" title="平台突破" />
                    </bankuaiitem>
                </div>
            </dv-border-box-10>
        </div>
        <div class="sn-container sn-container-4">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']">
                <div class="juzhong font-18 bankuai-title">
                    <bankuaiitem title="游资股预警">
                        <quanxingao stockType="3" title="游资股预警" />
                    </bankuaiitem>
                </div>
            </dv-border-box-10>
        </div>
        <div class="sn-container sn-container-5">
            <dv-border-box-10 :color="['#0694B1', '#5D9A9E']">
                <div class="juzhong font-18 bankuai-title">连板高度预警 </div>
            </dv-border-box-10>
        </div>
    </div>
</template>

<script>
import quanxingao from "./quan/quan-xingao.vue";
// import quanpingtai from "./quan/quan-pingtai.vue";
// import quanyouzi from "./quan/quan-youzi.vue";

import bankuaiitem from "@/views/dataV/components/bankuai-item.vue";

export default {
    data() {
        return {};
    },
    components: {
        quanxingao,
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
    .sn-container {
        top: 760px;
        width: 350px;
        height: 250px;
    }
    .sn-container-1 {
        left: 50px;
    }
    .sn-container-2 {
        left: 420px;
    }
    .sn-container-3 {
        left: 790px;
    }
    .sn-container-4 {
        left: 1160px;
    }
    .sn-container-5 {
        left: 1530px;
    }
    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
}
</style>
