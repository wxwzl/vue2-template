<template>
  <div class="login-wrapper">
    <div class="container">
      <div class="show-image">
        <div class="tip-bar">
          <div class="tip-wrap">
            <span class="tip">好用，麻烦给个star啊！</span>
          </div>
        </div>
      </div>
      <div class="login-form-container">
        <div class="form-title"><span class="text">登录</span></div>
        <el-form class="login-form" :model="ruleForm" :rules="rules" ref="login" show-message>
          <el-form-item label="手机号码/邮箱" prop="account">
            <el-input
              placeholder="请输入手机号/邮箱"
              v-model="ruleForm.account"
              clearable
              @keyup.enter.native="login"
            />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              placeholder="请输入账户登录密码"
              v-model="ruleForm.password"
              clearable
              show-password
              @keyup.enter.native="login"
            />
          </el-form-item>
        </el-form>
        <el-button type="primary" id="login-btn" @click="login" :loading="loading">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { Vue, Component } from "vue-property-decorator";
  import { isEmpty, trim } from "../setup";
  let accountValidator = function (rule: any, value: string, callback: (err?: Error) => void) {
    let val = trim(value);
    if (isEmpty(val)) {
      callback(new Error("请输入手机号码或邮箱"));
    } else {
      callback();
    }
  };
  let passwordValidator = function (rule: any, value: string, callback: (err?: Error) => void) {
    let val = trim(value);
    if (isEmpty(val)) {
      callback(new Error("请输入账户登录密码"));
    } else {
      callback();
    }
  };
  @Component({
    name: "Login",
    components: {},
  })
  export default class Login extends Vue {
    // @Ref("login")
    // readonly loginInstance!: { validate: () => Promise<boolean> };
    private ruleForm = {
      account: "",
      password: "",
    };
    private rules = {
      account: [{ validator: accountValidator, trigger: "blur" }],
      password: [{ validator: passwordValidator, trigger: "blur" }],
    };
    private loading = false;

    login() {
      let account = this.ruleForm.account;
      let password = this.ruleForm.password;
      this.ruleForm.account = trim(account);
      this.ruleForm.password = trim(password);
      if (this.loading) {
        return;
      }
      (this.$refs.login as any).validate((valid: boolean) => {
        if (valid) {
          this.loading = true;
          this.$router.push({ name: "home" });
          this.loading = false;
          // service.login(account, password, (status: boolean) => {
          //   if (status) {
          //     this.$router.push({ name: "index" });
          //   }
          //   this.loading = false;
          // });
        }
      });
    }
  }
</script>
<style lang="less" scoped>
  .login-wrapper {
    position: relative;
    height: 100%;
    background-image: url("../assets/images/banner_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .container {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 800px;
      height: 405px;
      margin: auto auto;
      background-color: #fff;
      .show-image {
        width: 423px;
        height: 100%;
        padding: 20px 20px;
        // background-image: url("../assets/images/left_banner.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        float: left;
        .tip-bar {
          height: 100%;
          border: 1px solid #ddd;
          background-color: mintcream;
          line-height: initial;
          .tip-wrap {
            display: inline-block;
            overflow: hidden;
            width: 0;
            height: 100%;
            animation: typing 5s steps(37, end) forwards;
            font-family: Consolas, Monaco;
            font-size: 18px;
            text-align: center;
            word-break: break-all;
          }
          .tip {
            vertical-align: middle;
            word-break: break-all;
            &::before {
              display: inline-block;
              width: 0;
              height: 100%;
              content: "";
              line-height: initial;
              vertical-align: middle;
            }
          }
        }
      }
      .login-form-container {
        overflow: hidden;
        height: 100%;
        padding: 0 38.5px;
        .form-title {
          padding-bottom: 2px;
          border-bottom: 1px solid #ececec;
          margin-top: 46px;
          .text {
            padding-bottom: 10px;
            border-bottom: 4px solid #2688fc;
            color: #333;
            font-size: 18px;
            font-weight: bold;
            line-height: 48px;
          }
        }
        .login-form {
          margin-top: 22px;
          /deep/.el-form-item {
            margin-bottom: 2px;
            &:first-child {
              margin-bottom: 8px;
            }
          }
          /deep/.el-form-item__label {
            color: #333;
            font-size: 14px;
            font-weight: 400;
          }
          /deep/.el-input {
            input {
              padding-left: 0;
              border-top: 0;
              border-right: 0;
              border-left: 0;
              color: #cfcfcf;
              font-family: Microsoft YaHei;
              font-size: 14px;
              font-weight: 400;
              line-height: 48px;
            }
          }
        }
        #login-btn {
          width: 100%;
          height: 48px;
          padding: 0 0;
          margin-top: 30px;
          font-size: 18px;
          line-height: 48px;
        }
      }
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }

    to {
      width: 12em;
    }
  }
</style>
