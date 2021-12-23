<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>基础信息</span>
            </div>
          </template>
          <div class="info">
            <div class="info-image" @click="showDialog">
              <img :src="avatarImg"/>
              <span class="info-edit">
                                <i class="el-icon-lx-camerafill"></i>
                            </span>
            </div>
            <div class="info-name">{{ name }}</div>
            <div class="info-desc">{{ form.desc }}</div>

          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>账户编辑</span>
            </div>
          </template>
          <el-form label-width="90px" center>
            <el-form-item label="用户名："> {{ name }}</el-form-item>
            <el-form-item label="学号：">{{ form.studentNum }}</el-form-item>
            <el-form-item label="班级：">{{ form.classId }}</el-form-item>
            <el-form-item label="专业：">{{ form.major }}</el-form-item>
            <el-form-item label="个人简介：">{{form.desc}}</el-form-item>
            <el-form-item>
              <el-button type="primary" @click="showDialog2">修改信息</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog center v-model="dialogVisible2" title="修改信息">

      <el-form label-width="90px" center>
        <el-form-item label="用户名："> {{ name }}</el-form-item>
        <el-form-item label="学号：">
          <el-input v-model="form.studentNum"></el-input>
        </el-form-item>
        <el-form-item label="班级：">
          <el-input v-model="form.classId"></el-input>
        </el-form-item>
        <el-form-item label="专业：">
          <el-input v-model="form.major"></el-input>
        </el-form-item>

        <el-form-item label="个人简介：">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>

      </el-form>

      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">保存</el-button>
      </span>
      </template>
    </el-dialog>





    <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
      <vue-cropper ref="cropper" :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                   style="width: 100%; height: 400px"></vue-cropper>

      <template #footer>
                <span class="dialog-footer">
                    <el-button class="crop-demo-btn" type="primary">选择图片
                        <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage"/>
                    </el-button>
                    <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {onMounted, reactive, ref} from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import avatar from "../assets/img/img.jpg";
import {fetchUserData} from "../api/index";
export default {
  name: "user",
  components: {
    VueCropper,
  },
  setup() {
    const name = localStorage.getItem("ms_username");
    const fetchData = (name) => {
      fetchUserData(name).then((res)=>{
        console.log(res);
        console.log(res.code == 200, res.msg == "请求成功");

          form.classId=res.data.classId;
          form.major=res.data.major;
          form.studentNum=res.data.studentNumber;
          form.teacherId=res.data.teacherId;
      console.log(form)
      })
    }

    const form = reactive({
      studentNum: "15615645646",
      classId: "1" + "班",
      major: "软件工程",
      desc: "不可能！我的代码怎么可能会有bug！",
      /*导师的编号*/
      teacherId:""
    });
    const onSubmit = () => {
    };

    const avatarImg = ref(avatar);
    const imgSrc = ref("");
    const cropImg = ref("");
    const dialogVisible = ref(false);
    const cropper = ref(null);
    const dialogVisible2 = ref(false);
    const showDialog = () => {
      dialogVisible.value = true;
      imgSrc.value = avatarImg.value;
    };
    const showDialog2 = () => {
      dialogVisible2.value = true;
    };

    const setImage = (e) => {
      const file = e.target.files[0];
      if (!file.type.includes("image/")) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        dialogVisible.value = true;
        imgSrc.value = event.target.result;
        cropper.value && cropper.value.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    };

    const cropImage = () => {
      cropImg.value = cropper.value.getCroppedCanvas().toDataURL();
    };

    const saveAvatar = () => {
      avatarImg.value = cropImg.value;
      dialogVisible.value = false;
    };
    fetchData(name);
    return {
      name,
      form,
      onSubmit,
      cropper,
      avatarImg,
      imgSrc,
      cropImg,
      showDialog,
      showDialog2,
      dialogVisible,
      dialogVisible2,
      setImage,

      cropImage,
      saveAvatar,
      fetchData,
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