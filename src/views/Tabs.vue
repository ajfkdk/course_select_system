<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`消息(${state.unread.length})`" name="first">
                    <el-table :data="state.unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template #default="scope">
                                <span class="message-title">{{scope.row.content}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="notificationTime" width="180"></el-table-column>
                    </el-table>

                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import {fetchNotice} from "../api/index";

export default {
    name: "tabs",
    setup() {
      const name = localStorage.getItem("ms_username");
      const param = reactive({
        username: name
      });
        const message = ref("first");
        let state = reactive({
            unread: [
                {
                  notificationTime: "2018-04-19 20:00:00",
                  content: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
                },
                {
                  notificationTime: "2018-04-19 21:00:00",
                  content: "今晚12点整发大红包，先到先得",
                },
            ],
        });
        //获取通知

        const getNotice = () => {
          fetchNotice(name).then((res)=>{
            console.log(res);
            state.unread = res.data;
            
          })
        }

      getNotice();
        return {
            message,
            state,
        };
    },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

