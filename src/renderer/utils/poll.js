import dayjs from "dayjs";

const poll = {
    getTime: function () {
        return dayjs().second();
    },
    interfacePoll: function () {
        console.log(
            checkAuditTime("09:15", "11:30") || checkAuditTime("13:00", "15:00")
        );
        if (
            checkAuditTime("09:15", "11:30") ||
            checkAuditTime("13:00", "15:00")
        ) {
            this.compareTime();
        } else {
            setTimeout(() => {
                this.interfacePoll();
            }, 1000 * 60);
        }
    },
    requestPoll: function (request) {
        this.request = request;
        console.log("立即执行一次");
        this.request();
        console.log(this);
        this.compareTime();
    },
    compareTime: function () {
        console.log(this.getTime());

        if (
            (5 < this.getTime() && this.getTime() < 15) ||
            (35 < this.getTime() && this.getTime() < 45)
        ) {
            console.log("in");
            this.poll();
            // }
        } else {
            setTimeout(() => {
                this.compareTime();
            }, 1000);
        }
    },
    poll: function () {
        this.timer = setInterval(() => {
            console.log(this.getTime(), "::发送接口"); //
            this.request();
        }, 5000);
        if (
            checkAuditTime("09:15", "11:30") ||
            checkAuditTime("13:00", "15:00")
        ) {
            console.log("在时间段内");
        } else {
            console.log("不在时间段内。清除轮询");
            clearInterval(this.timer);
        }
        // setTimeout(() => {
        //     console.log(dayjs().hour());
        //     const nowHour = dayjs().hour();
        //     if (nowHour < 9 || nowHour >= 15 || nowHour == 12) {
        //         this.clear();
        //     }
        // });
    },
    clear: function () {
        console.log("清除轮询");
        console.log(dayjs().hour());
        clearInterval(this.timer);
    },
};

function checkAuditTime(startTime, endTime) {
    // 获取当前时间
    const date = new Date();
    // 获取当前时间的年月日
    const dataStr = `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} `;

    // 获取开始时间、结束时间、现在时间的时间戳
    let startDate = new Date(dataStr + startTime).getTime();
    let endDate = new Date(dataStr + endTime).getTime();
    let nowDate = date.getTime();

    const s = startDate > endDate; // 判断开始时间否大于结束时间

    if (s) [startDate, endDate] = [endDate, startDate]; // 若开始时间否大于结束时间则交换值

    // 判断现在的时间是否在开始时间和结束时间之间，若s为true则结果取反
    if (nowDate > startDate && nowDate < endDate) {
        return s ? false : true;
    } else {
        return s ? true : false;
    }
}

export default poll;
