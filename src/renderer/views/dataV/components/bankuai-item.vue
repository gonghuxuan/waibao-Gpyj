<template>
  <div class="jubu-xingao-detail">
    <div class="juzhong">{{ title }}<img @click="toDetail" src="@/assets/img/detail.svg" alt="" class="detail" style="width: 20px;cursor: pointer;" /></div>
    <div class="table-contain">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { getLetfStocks } from "@/api/userInfo.js";
import { getSecond, getDay, getMax, getMin } from "@/utils/gpyj.js";
import * as echarts from "echarts";
export default {
    data() {
        return {
            resData: [],
        };
    },
    props: {
        title: {
            type: String,
            default() {
                return this.$getItem("新高异动1");
            },
        },
    },
    computed: {},
    created() {},
    mounted() {
        this.getData();
        // console.log(this.title);
    },
    methods: {
        getData() {
            getLetfStocks({ stockType: 0 }).then((res) => {
                // console.log(res);
                this.resData = res;
            });
        },
        toDetail() {},
    },
};
</script>

<style lang="scss">
.jubu-xingao-detail {
    padding: 7px 5px;
    .ant-btn {
        background-color: #082932;
        border-color: #5d9a9e;
        color: #1de2e2;
    }
    .ant-dropdown-menu-item {
        color: blue;
    }
    .table-contain {
        width: 310px;
        height: 195px;
        overflow: scroll;
        background-color: rgba(2, 81, 93, 1);
        margin-top: 5px;
    }
    .ant-table-thead > tr > th {
        background-color: rgba(2, 81, 93, 1);
        color: white;
        font-size: 14px;
        text-align: center;
    }
    .ant-table-tbody > tr > td {
        color: #64b7bc;
        border-color: #5f9ea0;
    }
    .detail {
        position: absolute;
        right: 20px;
    }
}
</style>
