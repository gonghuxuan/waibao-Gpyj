import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
    data() {
        return {
            timer: null,
        };
    },
    activated() {
        console.log("activated  minix:", this.$route.name);
        this.startpoll();
    },
    deactivated() {
        console.log("deactivated  minix");
        clearInterval(this.timer);
        this.timer = null;
    },
    beforeDestroy() {
        console.log("beforeDestroy  minix");
        clearInterval(this.timer);
        this.timer = null;
    },
    methods: {
        testTime() {
            if (this.inTime()) {
                console.warn("poll true");
                this.pollApi();
            }
        },
        startpoll() {
            this.timer = setInterval(() => {
                this.testTime();
            }, 30000);
        },
        inTime() {
            let flag = true;
            const zaoStart = dayjs().hour(9).minute(15);
            const zaoend = dayjs().hour(11).minute(31);
            const wanStart = dayjs().hour(13).minute(0);
            const wanend = dayjs().hour(15).minute(1);
            const now = dayjs();
            const xinqi = now.day();
            console.warn("xinqi", xinqi);
            if (xinqi == 0 || xinqi == 6) {
                return false;
            }
            if (
                now.isBetween(zaoStart, zaoend) ||
                now.isBetween(wanStart, wanend)
            ) {
                flag = true;
            } else {
                flag = false;
            }
            return flag;
        },
    },
};
