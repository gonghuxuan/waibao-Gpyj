<template>
  <div class="importStockData">
    <div class="top-contain">
      <div>
        <span class="padding active">导入股票数据</span>
      </div>
    </div>
    <div class="content-contain">
      <div style="display: flex; justify-content: flex-start">
        <span style="
                        font-size: 16px;
                        color: #5fa4a8;
                        height: 40px;
                        line-height: 40px;
                        margin-right: 30px;
                    ">上传类型</span>
        <div :class="type == '0' ? 'selected' : 'unselected'" style="margin-right: 30px" @click="typeClick('jubu')">局部预警</div>
        <div :class="type == '1' ? 'selected' : 'unselected'" @click="typeClick('zhongdian')">重点预警</div>
      </div>
      <div style="margin-top: 20px">
        <a-upload-dragger name="file" :multiple="false" accept=".txt" :before-upload="beforeUpload">
          <div v-if="fileList < 1">
            <img src="../../../assets/img/upload-4.png" />
            <div class="upload-text">点击或拖动TXT文件上传</div>
          </div>

        </a-upload-dragger>
      </div>
      <div style="
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    margin-top: 20px;
                    margin-bottom: 20px;
                ">
        <a-button type="primary" @click="confirm">提交</a-button>
        <a-button>取消</a-button>
      </div>
      <a-table bordered :columns="columns" :data-source="stockData" :pagination="false" :scroll="{ y: 500 }">
      </a-table>
      <div> </div>
    </div>
  </div>
</template>

<script>
import { uploadStockDataTxt, stockList } from "@/api/userInfo.js";
import * as echarts from "echarts";

export default {
    data() {
        return {
            type: "0",
            fileList: [],
            columns: [
                {
                    title: "股票代码",
                    dataIndex: "stockCode",
                    key: "stockCode",
                    align: "center",
                },
            ],
            重点预警: [],
            stockData: [],
            局部预警: [],
            lianbantianti: {},
        };
    },
    components: {},
    computed: {},
    created() {},
    mounted() {
        this.getStockList();
    },
    methods: {
        typeClick(type) {
            if (type === "jubu") {
                this.type = "0";
                this.stockData = this.局部预警;
            } else if (type === "zhongdian") {
                this.type = "1";
                this.stockData = this.重点预警;
            }
        },
        beforeUpload(file) {
            return new Promise((resolve, reject) => {
                let type = file.name
                    .toLowerCase()
                    .substr(file.name.lastIndexOf("."));
                if (type != ".txt") {
                    this.$message.warning("请上传txt文件");
                    return reject(false);
                }
                this.fileList = [...this.fileList, file].slice(0, 1);
                console.log(this.fileList);
                // return false;
            });
        },
        confirm() {
            if (this.fileList.length == 0) {
                this.$message.warn("请上传文件");
                return;
            } else {
                const that = this;
                const fd = new FormData();
                console.log(this.fileList);
                // this.fileList.forEach((file) => {
                //     fd.append("files", file);
                // });
                fd.append("file", this.fileList[0]);
                fd.append("stockType", "重点预警");

                // fd.append("userName", "stockCode");
                // console.log(fd);
                // debugger
                // let param = {
                //     file: fd,
                //     stockType: this.type === "0" ? "局部预警" : "重点预警",
                // };
                uploadStockDataTxt(fd).then((res) => {
                    if (res.code == "200" || res.status == "0") {
                        that.$message.success("上传成功");
                        that.modalValue.visible = false;
                        that.$emit("updatetable");
                    } else {
                        that.$message.error(res.description || res.message);
                    }
                });
                this.fileList = [];
            }
        },
        handleCancel() {
            this.modalValue.visible = false;
            this.fileList = [];
        },
        getStockList() {
            stockList({ stockType: "重点预警" }).then((res) => {
                this.重点预警 = res;
            });
            stockList({ stockType: "局部预警" }).then((res) => {
                this.局部预警 = res;
                this.stockData = this.局部预警;
            });
        },
    },
};
</script>

<style lang="scss">
.importStockData {
    .ant-table-row {
        background-color: #073b49;
    }
    .ant-table-thead {
        background-color: #073b49;
    }
    .ant-upload {
        padding-bottom: 0px;
        padding-top: 0px;
        background-color: #082932;
    }
    .upload-text {
        font-size: 16px;
        color: rgba(93, 154, 158, 0.7);
        padding-top: 20px;
    }
    .selected {
        height: 50px;
        width: 100px;
        background: url(../../../assets/img/upload-1.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #1dffff;
        font-size: 15px;
    }
    .unselected {
        height: 50px;
        width: 100px;
        background: url(../../../assets/img/upload-2.png) no-repeat;
        background-size: contain;
        background-position: 50% 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #09b8bc;
        font-size: 15px;
    }
    .gupiao-item {
        font-size: 16px;
        text-align: left;
        height: 40px;
        position: relative;
    }
    .ant-divider-horizontal {
        margin: 0px;
    }
    .gupiao {
        padding-left: 10%;
        display: flex;
        align-items: center;
        height: 38px;
    }
    .gupiao-active {
        color: #1dffff;
        background-color: rgba(2, 81, 93, 1);
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    .padding {
        padding-left: 20px;
        padding-right: 20px;
    }
    .content-contain {
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    .table-contain {
        width: 100%;
        height: 100%;
        margin-top: 5px;
    }
    .detail {
        position: absolute;
        right: 20px;
    }
    .title-contain {
        height: 100px;
        width: 100%;
        background-image: linear-gradient(
            to right,
            rgba(255, 244, 92, 0.01),
            rgba(255, 244, 92, 0.05),
            rgba(255, 244, 92, 0.01)
        );
        font-size: 22px;
        margin-top: 30px;
        margin-bottom: 30px;
    }
    .ant-btn {
        color: white;
        border-color: #5d9a9e;
        min-width: 70px;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        width: 92%;
        height: 195px;
        overflow: scroll;
        background-color: rgba(2, 81, 93, 1);
        margin: 0 auto;
        margin-top: 5px;
    }
    .ant-table-thead > tr > th {
        background-color: rgba(2, 81, 93, 0);
        color: white;
        font-size: 14px;
        text-align: center;
    }
    // .ant-table-tbody > tr > td {
    //     color: #64b7bc;
    //     border-color: #5f9ea0;
    // }
    .detail {
        position: absolute;
        right: 20px;
    }
    .green {
        color: #1ab05d;
        .ant-btn {
            background-color: #1ab05d;
        }
    }
    .red {
        color: #ff5145;
        .ant-btn {
            background-color: #ff5145;
        }
    }
    .ant-table-tbody > tr > td {
        text-align: cenetr;
    }
    .ant-table-tbody
        > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
        > td {
        background-color: #082d37;
    }
}
.ant-table-tbody > tr > td {
    color: #64b7bc;
    border-color: #5f9ea0;
}
</style>
