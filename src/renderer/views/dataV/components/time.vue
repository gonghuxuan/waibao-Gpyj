<template>
    <div
        style="
            color: white;
            font-size: 16px;
            padding-top: 30px;
            padding-left: 30px;
        "
    >
        {{ nowTime }}
    </div>
</template>
<script>
import dayjs from "dayjs";
export default {
    data() {
        return {
            nowTime: "",
        };
    },
    mounted() {
        this.getNowTime();
    },
    methods: {
        getNowTime() {
            let speed = 1000;
            let that = this;
            let theNowTime = function () {
                that.nowTime = that.timeNumber();
            };
            setInterval(theNowTime, speed);
        },
        timeNumber() {
            let today = new Date();
            let date =
                today.getFullYear() +
                "." +
                this.twoDigits(today.getMonth() + 1) +
                "." +
                this.twoDigits(today.getDate());
            let time =
                this.twoDigits(today.getHours()) +
                ":" +
                this.twoDigits(today.getMinutes()) +
                ":" +
                this.twoDigits(today.getSeconds());
            console.log(dayjs(today).day());
            return date + " " + time + " " + this.getDay(dayjs(today).day());
        },
        getDay(index) {
            switch (index) {
                case 0:
                    return "周日";
                case 1:
                    return "星期一";
                case 2:
                    return "星期二";
                case 3:
                    return "星期三";
                case 4:
                    return "星期四";
                case 5:
                    return "星期五";
                case 6:
                    return "星期六";
            }
        },
        twoDigits(val) {
            if (val < 10) return "0" + val;
            return val;
        },
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
