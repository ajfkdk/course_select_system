<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 管理通知
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">

      <div style="margin-bottom:20px">
        <el-select v-model="value1" style="width:40%" multiple placeholder="学生" class="mr10" >
          <el-option
              v-for="item in options"
              :key="item.account"
              :label="item.account"
              :value="item.account"
          >
          </el-option>
        </el-select>

        <el-input v-model="NoticeData.content" style="width:30%" placeholder="通知内容" class=" mr10"></el-input>
        <el-button type="primary" icon="el-icon-notice" style="width:10%" @click="handleSearch">发送通知</el-button>
      </div>


      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" width="160" label="id"></el-table-column>
        <el-table-column prop="content" width="500"  label="内容"></el-table-column>
        <el-table-column prop="receive" width="200"  label="接收者"></el-table-column>
        <el-table-column prop="notificationTime" label="通知时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">

            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {deleteNoticeById,addNotice, getAllNoticeInfo, getAllUserInfo} from "../api/index";

export default {
  name: "basetable",
  setup: function () {
    const NoticeData = reactive({
      content: ""
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      getAllNoticeInfo().then((res) => {
        tableData.value = res.data;
      });
      getAllUserInfo().then((res) => {
        options.value = res.data;
        // options.value.push({account: "admin"})
      });
    };
    getData();

    // 发送通知
    const handleSearch = () => {
      let vm=[]
      value1.value.forEach(item=>{
        vm.push(item.substring(9));
      })
      let jsonName=JSON.stringify(vm);
      jsonName=jsonName.substring(1);
      jsonName = jsonName.substring(jsonName.length - 1, -1);
      console.log(jsonName);
      addNotice(NoticeData.content,jsonName).then((res) => {
        ElMessage.success(res.msg);
        getData();
      });

    };
    // 分页导航
    const handlePageChange = (val) => {
      NoticeData.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index,row) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            console.log(row.id);
            deleteNoticeById(row.id,row.receive).then((res) => {
              ElMessage.success(res.msg);
              getData();
            });
            tableData.value.splice(index, 1);
          })
          .catch(() => {
          });
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      name: "",
      address: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };
    let options = ref([
      {
        account: '请求服务器失败',
      }
    ])
    let value1 = ref([])
    return {
      NoticeData,
      tableData,
      pageTotal,
      editVisible,
      form,
      options,
      value1,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,

    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
