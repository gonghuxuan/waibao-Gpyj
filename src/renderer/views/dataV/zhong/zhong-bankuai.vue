<template>
    <div class="zhong-bankuai">
        <div class="sn-container sn-container-1">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >涨幅异动
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-2">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >成交额异动
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-3">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >连续性
                </div></dv-border-box-10
            >
        </div>
        <div class="sn-container sn-container-4">
            <dv-border-box-10 :color="['#5D9A9E', '#0694B1']"
                ><div class="juzhong font-18 bankuai-title"
                    >振幅
                </div></dv-border-box-10
            >
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.zhong-bankuai {
    .sn-container {
        top: 760px;
        width: 440px;
        height: 250px;
    }
    .sn-container-1 {
        left: 50px;
    }
    .sn-container-2 {
        left: 510px;
    }
    .sn-container-3 {
        left: 970px;
    }
    .sn-container-4 {
        left: 1430px;
    }

    .bankuai-title {
        color: #1dffff;
        padding-top: 10px;
    }
}
</style>
