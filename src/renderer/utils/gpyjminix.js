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
        console.log("activated  minix");
        this.startpoll();
    },
    deactivated() {
        console.log("deactivated  minix");
        clearInterval(this.timer);
    },
    beforeDestroy() {
        console.log("beforeDestroy  minix");
        clearInterval(this.timer);
    },
    methods: {
        startpoll() {
            this.timer = setInterval(() => {
                // if (this.inTime()) {
                //     func();
                // }
                this.pollApi();
            }, 10000);
        },
        inTime() {
            let flag = true;
            const zaoStart = dayjs().hour(9).minute(15);
            const zaoend = dayjs().hour(11).minute(31);
            const wanStart = dayjs().hour(13).minute(0);
            const wanend = dayjs().hour(15).minute(1);
            const now = dayjs();
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
