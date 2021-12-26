<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 管理用户
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="account" label="用户名"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.portraitUrl" :preview-src-list="[scope.row.portraitUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="mydesc" label="个性签名"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="40%">
      <el-form label-width="90px">
        <el-form-item label="用户名："> {{ form.account }}</el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major"></el-input>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="form.mydesc"></el-input>
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
import { updateUser,deleteUser,getAllUserInfo } from "../api/index";

export default {
  name: "basetable",
  setup() {
    const query = reactive({

    });
    const tableData = ref([
      {
        account: "student--jjj",
        major: "北大法律系",
        portraitUrl: "http://wx1.sinaimg.cn/large/0073Cjx6gy1gvikq9h345j60go0dlt9z02.jpg",
        mydesc: "kdsjflkajsdklfj"
      }
    ]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      console.log("hello")
      getAllUserInfo().then((res) => {
        tableData.value = res.data;
        console.log(tableData)
      });
    };
    getData();
    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };
    // 删除操作
    const handleDelete = (index,row) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            const name = row.account.substring(9);
            const role = row.account.substring(0,7);
            deleteUser(name,role).then((res) => {
              console.log(res);
              if (res.code == 200&&res.msg=="success") {
                ElMessage.success("删除成功");
                tableData.value.splice(index, 1);
              }else{
                ElMessage.error("删除失败");
              }
            });

          })
          .catch(() => {});
    };
    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      account: "",
      major: "",
      mydesc: "",
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
      const name = form.account.substring(9);
      const role = form.account.substring(0,7);
      form.account=name;
      updateUser(form,role).then((res) => {
        console.log(res);
        if (res.code === "200") {
          ElMessage.success(res.msg);
          getData();
        }else{
          ElMessage.error("更新失败");
        }
      });

    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
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
