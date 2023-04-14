<template>
  <div>
    <a-table bordered :columns="columns" :data-source="resData" :pagination="false">
      <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
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
            columns: [
                {
                    title: "名称",
                    dataIndex: "plateName",
                    key: "plateName",
                },
                {
                    title: "价格",
                    dataIndex: "stockCode",
                    key: "stockCode",
                },
            ],
        };
    },
    computed: {},
    created() {},
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            getLetfStocks({ stockType: 3 }).then((res) => {
                console.log(res);
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
