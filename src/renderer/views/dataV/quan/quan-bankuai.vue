<template>
    <div class="jubu-bankuai">
        <div class="sn-container sn-container-1">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >涨停板块个数1
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-2">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >新高异动
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-3">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >平台突破
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-4">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >游资股预警
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-5">
            <dv-border-box-10 :color="['#0694B1', '#5D9A9E']"
                ><div class="juzhong font-18 bankuai-title"
                    >连板高度预警
                </div></dv-border-box-10
            >
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.jubu-bankuai {
    .sn-container {
        top: 710px;
        width: 350px;
        height: 300px;
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
