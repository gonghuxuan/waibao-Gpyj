import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
export default {
    data() {
        return {
            timer: null,
            pollSelect: 1,
        };
    },
    // watch: {
    //     $route(to, from) {
    //         // console.log(to.path);
    //         // console.log(from.path);
    //         // console.log(to.name);
    //         // console.log(from.name);
    //         // console.log(to.path === from.path && to.name === from.name);

    //         if (to.path === from.path && to.name === from.name) {
    //             // 如果是相同路由，则手动触发 activated 钩子
    //             this.$options.activated[0].call(this);
    //         }
    //     },
    // },
    watch: {
        "$store.state.App.swiper"(newval, oldval) {
            // 代码实现
            if (newval === 0) {
                console.debug(
                    "实现首页刷新11111111111111111111",
                    this.$route.name
                );
                console.debug(this.$electron);
                this.pollApi();
            }
        },
    },
    mounted() {
        // console.log("pollSelect mounted", this.pollSelect);
        // console.log(this.$route.query);
        // console.log("mounted minix");
        // if (this.pollSelect == 2) {
        //     console.log("no");
        // } else {
        //     this.pollSelect = 1;
        //     this.startpoll();
        //     this.pollSelect = 2;
        // }
        if (this.$route.query.refreshMounted) {
            console.log("refreshMounted");
            this.startpoll();
            console.log("startpoll");
        }
    },
    // watch: {
    //     $route(to, from) {
    //         if (to.path === this.$route.path) {
    //             console.log(this.$options);
    //             this.$options.activated.call(this);
    //         }
    //     },
    // },
    // beforeRouteEnter(to, from, next) {
    //     next((vm) => {
    //         vm.$nextTick(() => {
    //             vm.$options.activated.call(vm);
    //         });
    //     });
    // },
    activated() {
        // console.log("pollSelect activated", this.pollSelect);
        // console.log("activated  minix:", this.$route.name);

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
                // console.log("poll true");
                this.pollApi();
            }
        },
        startpoll() {
            // console.log("pollllllllllllllllllllllllllllll");
            this.timer = setInterval(() => {
                // console.log("innnnnnnnnnnnnnnnnnn");
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
