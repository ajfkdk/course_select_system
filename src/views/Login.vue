<template>
  <test-bac source="../src/assets/video/abc.mp4">
  <div class="">

    <div class="   ms-login">
      <div class="ms-title shake-chunk">师生互选-后台管理系统</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content   ">
        <el-form-item class="" prop="username">
          <el-input v-model="param.username" placeholder="username">
            <template #prepend>
              <el-button icon="el-icon-user"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="param.password"
                    @keyup.enter="submitForm()">
            <template #prepend>
              <el-button icon="el-icon-lock"></el-button>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn ">
          <el-button  type="primary" @click="submitForm()">登录</el-button>
        </div>
        <el-row :gutter="20">

          <el-col :offset="16">
            <a href="javascript:void(0)" class="login-tips el-icon-lx-addressbook " @click="register">注册账号</a>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="注册账号"
      center
      width="30%">

    <el-form label-width="120px">
      <el-form-item label="账号">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="form.role"></el-input>
      </el-form-item>
    </el-form>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="sendRegister">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
  </test-bac>
</template>

<script>
import {ref, reactive} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import {getUserPortrait,registerUser, toLogin} from "../api/index";
import TestBac from "./testBackground.vue";


export default {
  components: {
    TestBac,
  },
  setup() {

    const router = useRouter();
    const param = reactive({
      username: "zhangsan",
      password: "123456",
    });
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "blur",
        },
      ],
      password: [
        {required: true, message: "请输入密码", trigger: "blur"},
      ],
    };
    const login = ref(null);
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          //请求服务器接口的操作
          //todo 把表单数据发送给后端进行验证如果验证成功跳转到  /
          toLogin(param).then((res) => {
            console.log("login",res);
            if (res.code == "200" && res.msg != "") {
              ElMessage.success("登录成功");
              localStorage.setItem("ms_username", param.username);
              localStorage.setItem("my_role", res.msg);
              getUserPortrait(param.username).then((res) =>{
                if(res.code==="200"){
                  localStorage.setItem("image_url",res.msg)
                  location.reload();
                }
              })
              router.push("/");
            } else {
              ElMessage.error("登录失败");
            }

          })

        } else {
          ElMessage.error("登录失败");
          return false;
        }
      });
    };
    const store = useStore();
    store.commit("clearTags");
    const register = () => {
      dialogVisible.value = true;
    }
    const sendRegister = () => {
      console.log(form)
      registerUser(form).then((res) => {
            ElMessage.success(res.msg);
          }
      )
    }
    const form = reactive(
        {
          account: "",
          role: "",
          password: "",
        }
    )
    const dialogVisible = ref(false)
    return {
      param,
      rules,
      login,
      dialogVisible,
      form,
      sendRegister,
      register,
      submitForm,
    };
  },
};
</script>



<style scoped>
@import "https://csshake.surge.sh/csshake.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/login-bg.jpg);
  background-size: 100%;
}

.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.el-button--primary {
  background: #687a92;
border-color: #5d6978;
color: #FFF;
}
.login-tips{

      font-size: 15px;
      line-height: 30px;
      color: #a390ff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.ms-content {
  padding: 30px 30px;
}

.login-btn {
  text-align: center;
}

.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}

.login-tips {
  font-size: 15px;
  line-height: 30px;
  color: #0670dd;
}
</style>