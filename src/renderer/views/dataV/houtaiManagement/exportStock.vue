<template>
  <div class="exportStock">
    <div class="top-contain">
      <div>
        <span class="padding active">导出数据</span>
      </div>
    </div>
    <div class="content-contain">
      <span style="margin-left: 20px;">日期：<a-range-picker :disabled-date="disabledDate" v-model="rangeTime" @change="changetime" @calendarChange="calendarPriceRangeChange" format="YYYY-MM-DD" /></span>
      <span style="margin-left: 50px;">类型：<a-cascader class="cascader" :options="options" placeholder="请选择" @change="onChange" /></span>
      <a-button style="margin-left: 50px" @click="download" type="primary">
        下载
      </a-button>
      <a href="http://test46.szdjct.com/stockAlert/export/excel/downloadData?startDate=2023-05-12&endDate=2023-05-18&navigationFirst=全市场预警&navigationSecond=新高异动" target="_blank">123</a>
      <a-button style="margin-left: 50px" @click="downloadFile" type="primary">
        下载2
      </a-button>
    </div>
  </div>
</template>

<script>
import { downloadData, getExportDataNavigation } from "@/api/userInfo.js";
import { getFiveDay, getDay, getMax, getMin } from "@/utils/gpyj.js";

import * as echarts from "echarts";
import { chownSync } from "original-fs";
import moment from "moment";
export default {
    data() {
        return {
            options: [],
            offsetDays: 604800 * 1000,
            rangeTime: [getFiveDay()[0], getFiveDay()[0]],
            selectPriceDate: "",
            navigationFirst: "",
            navigationSecond: "",
            downloadUrl:
                "http://test46.szdjct.com/stockAlert/export/excel/downloadData?startDate=2023-05-12&endDate=2023-05-18&navigationFirst=全市场预警&navigationSecond=新高异动",
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getStockList();
        console.log(getFiveDay());
    },
    methods: {
        download() {
            // console.log(!!(!this.navigationFirst && !this.navigationSecond));
            // if (!this.navigationFirst && !this.navigationSecond) {
            //     this.$message.warn("请先选择类型");
            //     // this.$message.success("退出成功");
            //     return;
            // }
            // const url =
            //     "http://test46.szdjct.com/stockAlert/export/excel/downloadData?startDate=2023-05-12&endDate=2023-05-18&navigationFirst=全市场预警&navigationSecond=新高异动";
            // this.$electron.ipcRenderer.send("download", {
            //     downloadPath: url,
            //     fileName: "123",
            // });
            downloadData({
                startDate: "2023-05-12",
                endDate: "2023-05-18",
                navigationFirst: "全市场预警",
                navigationSecond: "新高异动",
            });
        },
        downloadFile() {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", this.downloadUrl, true);
            xhr.setRequestHeader(
                "authorization",
                localStorage.getItem("authorization")
            );
            xhr.setRequestHeader("userId", localStorage.getItem("userId"));

            xhr.responseType = "blob";

            xhr.onload = function () {
                if (this.status === 200) {
                    const blob = new Blob([this.response], {
                        type: "application/octet-stream",
                    });
                    const downloadUrl = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = downloadUrl;
                    link.download = "file.xlsx";
                    link.click();

                    URL.revokeObjectURL(downloadUrl);
                }
            };
            xhr.onprogress = (event) => {
                console.log("onprogress");
                console.log(event.lengthComputable);
                console.log(event);

                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    this.progress = Math.round(percentComplete);
                    console.log("this.progress", this.progress);
                } else {
                    this.progress = 100;
                }
            };
            xhr.send();
        },
        calendarPriceRangeChange(date) {
            this.selectPriceDate = date[0];
        },
        changetime(value) {
            console.log(value);
        },
        getStockList() {
            getExportDataNavigation().then((res) => {
                for (let key in res) {
                    const itemOption = { value: key, label: key, children: [] };
                    res[key].forEach((item) => {
                        itemOption.children.push({
                            value: item,
                            label: item,
                        });
                    });
                    this.options.push(itemOption);
                }
                console.log(this.options);
                // console.log(this.lengthS);
            });
        },
        onChange(value) {
            this.navigationFirst = value[0];
            this.navigationSecond = value[1];
        },
        disabledDate(current) {
            // Can not select days before today and today
            if (this.selectPriceDate) {
                let selectV = moment(
                    this.selectPriceDate,
                    "YYYY-MM-DD"
                ).valueOf();
                return (
                    current >
                        moment(
                            this.formatDate(
                                new Date(selectV + this.offsetDays).getTime(),
                                "Y-m-d"
                            )
                        ) ||
                    current <
                        moment(
                            this.formatDate(
                                new Date(selectV - this.offsetDays).getTime(),
                                "Y-m-d"
                            )
                        ) ||
                    current > moment().endOf("day")
                );
            } else {
                return current > moment().endOf("day");
            }
        },
        formatDate: (timestamp, formatLayout = "Y-m-d H:i:s") => {
            let formatDate = "";
            formatLayout = formatLayout.toUpperCase();
            timestamp =
                (timestamp + "").length > 11 ? timestamp : timestamp * 1000;
            let time = new Date(timestamp);
            for (let i in formatLayout) {
                if (
                    ["Y", "M", "D", "W", "H", "I", "S"].indexOf(
                        formatLayout[i]
                    ) >= 0
                ) {
                    switch (formatLayout[i]) {
                        case "Y":
                            formatDate += time.getFullYear();
                            break;
                        case "M":
                            formatDate +=
                                time.getMonth() >= 9
                                    ? time.getMonth() + 1
                                    : "0" + (time.getMonth() + 1);
                            break;
                        case "D":
                            formatDate +=
                                time.getDate() > 9
                                    ? time.getDate()
                                    : "0" + time.getDate();
                            break;
                        case "W":
                            formatDate +=
                                time.getDay() == 0 ? 7 : time.getDay();
                            break;
                        case "H":
                            formatDate +=
                                time.getHours() > 9
                                    ? time.getHours()
                                    : "0" + time.getHours();
                            break;
                        case "I":
                            formatDate +=
                                time.getMinutes() > 9
                                    ? time.getMinutes()
                                    : "0" + time.getMinutes();
                            break;
                        case "S":
                            formatDate +=
                                time.getSeconds() > 9
                                    ? time.getSeconds()
                                    : "0" + time.getSeconds();
                            break;
                    }
                } else {
                    formatDate += formatLayout[i];
                }
            }

            return formatDate;
        },
    },
};
</script>

<style lang="scss">
.exportStock {
    .content-contain {
        color: white;
        font-size: 16px;
    }
    .cascader {
        margin-top: 30px;
        // margin-left: 50px;
    }
    .ant-input {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum";
        position: relative;
        display: inline-block;
        width: 100%;
        height: 32px;
        padding: 4px 11px;
        // color: rgba(93, 154, 158, 0.5);
        color: #1de2e2;

        font-size: 14px;
        line-height: 1.5;
        background-color: #082932;
        background-image: none;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        transition: all 0.3s;
    }
    .ant-cascader-input.ant-input {
        background-color: #082932;
        color: rgba(93, 154, 158, 0.5);
    }
    .ant-cascader-picker {
        background-color: #082932;
    }
    .ant-cascader-menus-content {
        background-color: #082932;
    }
    .ant-cascader-menus ul {
        background-color: #082932;
    }
    .ant-cascader-menu-item {
        background-color: #082932;
    }
    .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled),
    .ant-cascader-menu-item-active:not(.ant-cascader-menu-item-disabled):hover {
        background-color: #082932;
    }
    .anticon svg {
        color: white;
    }
}
.ant-table-tbody > tr > td {
    color: #64b7bc;
    border-color: #5f9ea0;
}
.ant-modal-content {
    background-color: rgba(11, 69, 74, 1);
    // color: white;
}
.ant-modal-confirm-body .ant-modal-confirm-title {
    color: white;
}
// .ant-cascader-picker {
//     background-color: #5f9ea0;
//     color: white;
// }
.ant-cascader-menu-item:hover {
    background: rgba(129, 142, 143, 0.3);
}
.ant-cascader-picker {
    height: 30px;
    width: 250px;
}
.ant-cascader-input.ant-input {
    height: 30px;
}
.ant-cascader-picker-label {
    height: 30px;
    font-size: 16px;
    color: #1de2e2;
}
.ant-calendar th {
    min-width: unset;
}
.ant-btn {
    color: white;
    border-color: #5d9a9e;
    min-width: 70px;
}
</style>
