<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 基础表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="account" label="导师姓名" align="center"></el-table-column>
        <el-table-column prop="major" label="专业"></el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.portraitUrl" :preview-src-list="[scope.row.portraitUrl]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="teacherNumber" label="导师编号"></el-table-column>
        <el-table-column prop="mydesc" label="个性签名"></el-table-column>

        <el-table-column label="选择的意愿等级" width="180" align="center">


          <template #default="scope">
            <!--            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑-->
            <!--            </el-button>-->
            <!--            <el-button type="text" icon="el-icon-delete" class="red"-->
            <!--                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
            <el-select v-model="scope.row.grade" placeholder="等级">
              <el-option
                  v-for="item in ops"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"

                  @click="handleSelect(item.value,scope.row.account)"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>

      <el-button style="margin-top : 20px" type="primary" @click="sendData" class="el-icon-lx-upload">确定</el-button>


    </div>

  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchData, sendChooseTeacherData} from "../api/index";

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
      fetchData(query).then((res) => {
        tableData.value = res.data;

      });
    };
    getData();

    //筛选出数据发送给后台
    const sendData = () => {
      //把姓名加到list中去传给后端
      listData.push({value: "studentName", name: name})
      let flag = false;
      //遍历listD如果 元素.name的值为空的话,flag=false否则flag=true

      for (let i = 0; i < listData.length; i++) {
        let item = listData[i];
        flag = item.name !== "" && item.name !== undefined;
        if (!flag) {
          break;
        }
      }
      if (flag) {
        let jsonStr = JSON.stringify(listData);
        let subJsonStr = jsonStr.slice(1, -1);
        query = {listMap: subJsonStr}
        sendChooseTeacherData(query).then((res) => {
          if (res.code === '200') {
            ElMessage.success(res.msg);
          } else {
            ElMessage.success("请求失败22");
          }
            }
        )
      } else ElMessage.error("请检查表单，有一个梯队没有老师");
    }


    return {
      query,
      ops,
      tableData,
      pageTotal,
      sendData,
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
