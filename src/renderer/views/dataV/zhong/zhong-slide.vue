<template>
    <div class="zhong-slide">
        <div class="juzhong font-18">重点预警 </div>
        <div class="title">个股与指数的关系</div>
        <div class="juzhong">
            <dv-border-box-7 :color="['#0694B1', '#5D9A9E']" class="box-7"
                >同步性</dv-border-box-7
            >
            <dv-border-box-7 :color="['#5D9A9E', '#0694B1']" class="box-7"
                >抗跌性</dv-border-box-7
            >
        </div>
        <div class="quanqiu"> </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.zhong-slide {
    .quanqiu {
        background: url(../../../assets/img/quanqiu.png) no-repeat;
        background-repeat: no-repeat;
        background-position: left top;
        background-origin: content-box;
        background-size: 100% 100%;
        width: 100%;
        height: 480px;
        margin-left: -20px;
    }
    .title {
        padding-left: 30px;
        font-size: 16px;
    }
    .box-7 {
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin-left: 20px;
        text-align: center;
        font-size: 16px;
    }
}
</style>
