<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>账户编辑</span>
            </div>
          </template>
          <el-form label-width="100px" label-position="left">
            <el-form-item label="学生数为：">
              {{StudentNumber}}
            </el-form-item>
            <el-form-item label="当前时间段：">
              {{when}} 阶段
            </el-form-item>
            <el-form-item>
              <el-button type="default" class="el-icon-lx-global "  @click="showDialog2">初始化系统</el-button>
              <el-button type="default" class="el-icon-lx-remind "  @click="deadline">提前截止   {{when}}阶段</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">


            <div class="block" >
              <el-timeline>
                <el-timeline-item
                    v-for="(item,index) in activities"
                    :key="index"
                    :timestamp="item.timestamp" placement="top">
                  <el-card class="box-card">  {{ item.title }}</el-card>

                </el-timeline-item>
              </el-timeline>
            </div>


          </div>
        </el-card>
      </el-col>

    </el-row>

    <el-dialog width="50%" center v-model="dialogVisible2" title="初始化系统">

      <el-form label-position="left" label-width="200px" >
        <el-form-item label="学生数为：">
          <el-input v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="学生选老师的截止时间为：">
          <el-date-picker
              v-model="form.date0"
              type="date"
             placeholder="Pick a date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="老师选V1学生的截止时间为：">
          <el-date-picker
              v-model="form.date1"
              type="date"
              style="width: 100%"
             placeholder="Pick a date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="老师选V2学生的截止时间为：">
          <el-date-picker
              v-model="form.date2"
              type="date"
             placeholder="Pick a date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="老师选V3学生的截止时间为：">
          <el-date-picker
              v-model="form.date3"
              type="date"
             placeholder="Pick a date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="差额补录时间：">
          <el-date-picker
              v-model="form.date4"
              type="date"
             placeholder="Pick a date"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%"
          ></el-date-picker>
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="sendData">保存</el-button>
      </span>
      </template>
    </el-dialog>


  </div>
</template>

<script>
import {reactive, ref} from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import {deadLine,getWhen, getSystemConfig, initialSystem} from "../api/index";
import {ElMessage} from "element-plus";

export default {
  name: "user",
  components: {
    VueCropper,
  },
  setup() {
    let activities=reactive([
      {
        title: '学生选导师',
        timestamp: '2018-04-15',
      },
      {
        title: '导师选V1列的学生',
        timestamp: '2018-04-15',
      },
      {
        title: '导师选V2列的学生',
        timestamp: '2018-04-15',
      },
      {
        title: '导师选V3列的学生',
        timestamp: '2018-09-15',
      },
      {
        title: '差额补选',

        timestamp: '2018-09-15',
      }
    ])
    let StudentNumber = ref();
    const fetchData = () => {
      getSystemConfig().then((res) => {
        const data=res.data;
        activities[0].timestamp=data.date0;
        activities[1].timestamp=data.date1;
        activities[2].timestamp=data.date2;
        activities[3].timestamp=data.date3;
        activities[4].timestamp=data.date4;
        StudentNumber.value=data.teacherStudentsNumber;
      })

      getWhen().then((res) =>{
        when.value=activities[res.msg].title
        time.value=res.msg;
      })

    }
    const form = reactive({
      number: "",
      date0: "",
      date1: "",
      date2: "",
      date3: "",
      date4: ""
    });
    let dialogVisible2 = ref(false);
    const showDialog2 = () => {
      dialogVisible2.value = true;
    };
    const sendData=()=>{
      initialSystem(form).then(res=>{
        if (res.code === "200") {
          dialogVisible2.value=false;
          fetchData();
        }
      })

    }
    const when = ref();
    const time = ref();
    const deadline=()=>{
      deadLine(time.value).then(res=>{
        ElMessage.success(res.msg)
        fetchData()
      })
    }
    fetchData();
    return {
      form,
      activities,
      dialogVisible2,
      StudentNumber,
      when,
      showDialog2,
      fetchData,
      deadline,
      sendData,
    };
  },
};
</script>

<style scoped>
.info {
  text-align: center;
  padding: 35px 0;
}

.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}

.info-image img {
  width: 100%;
  height: 100%;
}

.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.info-edit i {
  color: #eee;
  font-size: 25px;
}

.info-image:hover .info-edit {
  opacity: 1;
}

.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}

.crop-demo-btn {
  position: relative;
}

.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>