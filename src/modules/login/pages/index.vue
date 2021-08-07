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
    background-image: url("../assets/images/banner_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    .container {
      background-color: #fff;
      width: 800px;
      height: 405px;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto auto;
      .show-image {
        float: left;
        width: 423px;
        height: 100%;
        // background-image: url("../assets/images/left_banner.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        padding: 20px 20px;
        .tip-bar {
          line-height: initial;
          border: 1px solid #ddd;
          height: 100%;
          background-color: mintcream;
          .tip-wrap {
            display: inline-block;
            height: 100%;
            overflow: hidden;
            width: 0;
            animation: typing 5s steps(37, end) forwards;
            text-align: center;
            font-size: 18px;
            font-family: Consolas, Monaco;
            word-break: break-all;
          }
          .tip {
            vertical-align: middle;
            word-break: break-all;
            &::before {
              content: "";
              display: inline-block;
              width: 0;
              height: 100%;
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
          margin-top: 46px;
          border-bottom: 1px solid #ececec;
          padding-bottom: 2px;
          .text {
            border-bottom: 4px solid #2688fc;
            font-size: 18px;
            font-weight: bold;
            color: #333333;
            line-height: 48px;
            padding-bottom: 10px;
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
            font-size: 14px;
            font-weight: 400;
            color: #333333;
          }
          /deep/.el-input {
            input {
              padding-left: 0px;
              border-top: 0px;
              border-left: 0px;
              border-right: 0px;
              font-size: 14px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #cfcfcf;
              line-height: 48px;
            }
          }
        }
        #login-btn {
          margin-top: 30px;
          width: 100%;
          height: 48px;
          font-size: 18px;
          line-height: 48px;
          padding: 0px 0px;
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
