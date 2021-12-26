<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 待选学生数量： {{ residue }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="account" label="学生姓名" align="center"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.portraitUrl" :preview-src-list="[scope.row.portraitUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="studentNumber" label="学号"></el-table-column>
        <el-table-column prop="mydesc" label="个性签名"></el-table-column>

        <el-table-column label="操作" width="180" align="center">


          <template #default="scope">
            <el-button
                type="text"
                icon="el-icon-lx-roundcheck"
                @click="sendData(scope.row)"
            >确定
            </el-button>
            <el-button
                type="text"
                icon="el-icon-lx-roundclose"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
            >驳回
            </el-button>

          </template>
        </el-table-column>
      </el-table>


    </div>

  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {confirmStudent, getResidueStudent, getAllStateStudent} from "../api/index";

export default {
  name: "basetable",
  setup() {
    const name = localStorage.getItem("ms_username")
    let ops = reactive([
      {
        value: 'V1',
      },
      {
        value: 'V2',
      },
      {
        value: 'V3',
      },
      {
        value: '取消选择',
      }
    ])
    let listData = reactive([
      {
        value: 'V1',
        name: ''
      },
      {
        value: 'V2',
        name: ''

      },
      {
        value: 'V3',
        name: ''
      }
    ])
    //处理选择栏
    const handleSelect = (val, account) => {
      if (val == "取消选择") {
        tableData.value.forEach(item => {
          if (item.grade == "取消选择") {
            item.grade = "";
          }
        })
      }

      //清空集合
      const count = ops.length;
      for (let i = 0; i < count; i++) {
        ops.pop()
      }
//如果选择的选项已被选过，选项清空
      listData.forEach(item => {
        if (item.name === account) {
          item.name = "";
        }
      })

      //val 找到对应的 元素
      //找到元素后把account的值给 元素.name

      listData.forEach(item => {
        if (item.value == val) {
          item.name = account;
        }
      })
      //进行遍历 listData 如果元素的name有值，把value取出来组装成一个k-v
      //把 k-v push 到ops
      listData.forEach(item => {
        if (!(item.name != "" && item.name != undefined)) {
          let data = {value: item.value}
          ops.push(data);
        }
      })
      ops.push({value: "取消选择"})


    };

    const residue = ref();
    let query = reactive({});
    let tableData = ref([
      {
        grade: "",
        account: "i'm botrom",
        major: "发考试的放假啦",
        teacherNumber: 7889,
        mydesc: "一起旅行",
        portraitUrl: "http://chenjunbin.ren/css--portrait--test.jpg"
      }
    ]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      getAllStateStudent(name).then((res) => {
        tableData.value = res.data;

      });
      getResidueStudent(name).then((res) => {
        residue.value = res.data
      })
    };
    getData();

    //筛选出数据发送给后台
    const sendData = (row) => {
      confirmStudent(name, row.account).then((res) => {
        ElMessage.success(res.msg);
        getData();
      })
    }

    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {
          })
    }
    return {
      query,
      residue,
      ops,
      tableData,
      pageTotal,
      sendData,
      handleDelete,
      handleSelect,
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
