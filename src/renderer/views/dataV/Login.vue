<!--
 描述: 登录模板
 作者: Jack Chen
 日期: 2020-04-18
-->

<template>
  <div class="login-container">
    <div class="layer">
      <!-- <div class="some-space">
        <div class="form">
          <h2>股票预警系统可视化平台</h2>
          <div class="item">
            <i class="iconfont icon-user"></i>
            <input autocomplete="off" type="text" class="input" v-model="userName" placeholder="请输入用户名" />
          </div>
          <div class="item">
            <i class="iconfont icon-password"></i>
            <input autocomplete="off" type="password" class="input" v-model="userPwd" maxlength="20" @keyup.enter="login" placeholder="请输入密码" />
          </div>
          <a-checkbox @change="onChange" style="color: white">
            管理员登录
          </a-checkbox>
          <button class="loginBtn" :disabled="isLoginAble" @click.stop="login">
            立即登录
          </button>
        </div>
      </div> -->
      <div class="bg-2">
        <div class="right">
          <div class="title">股票预警系统登录</div>
          <div class="login-1">
            <!-- {{ typeFlag ? 'active': 'unactive' }} {{  typeFlag}} -->
            <div class="login-2">
              <span :class="typeFlag ? 'active': 'unactive'" @click="onChange">管理员</span>
              <span :class="!typeFlag ? 'active': 'unactive'" @click="onChange">普通用户</span>
            </div>
            <div class="login-4">
              <div class="some-space">
                <div class="form">
                  <a-input ref="userNameInput" v-model="userName" placeholder="请输入账号" style="margin-bottom: 20px;">
                    <a-icon slot="prefix" type="user" style="color: #09B8BC" />
                    <!-- <a-tooltip slot="suffix" title="Extra information">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip> -->
                  </a-input>
                  <a-input-password ref="userNameInput" v-model="userPwd" placeholder="请输入密码">
                    <a-icon type="lock" slot="prefix" theme="filled" style="color: #09B8BC" />
                    <!-- <a-tooltip slot="suffix" title="Extra information">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip> -->
                  </a-input-password>
                  <div class="mima-con">
                    <a-checkbox v-model="jishu" style="color: white" class="mima">
                      记住密码
                    </a-checkbox>
                  </div>

                  <div class="login-5" @click="login">登录</div>
                  <!-- <a-checkbox @change="onChange"  style="color: white">
                    管理员登录
                  </a-checkbox> -->
                  <!-- <button class="loginBtn" :disabled="isLoginAble" @click.stop="login">
                    立即登录
                  </button> -->
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- <vue-particles color="#6495ED" :particleOpacity="0.7" :particlesNumber="80" shapeType="circle" :particleSize="4" linesColor="#6495ED" :linesWidth="1" :lineLinked="true" :lineOpacity="0.6" :linesDistance="150"
      :moveSpeed="3" :hoverEffect="true" hoverMode="grab" :clickEffect="true" clickMode="push">
    </vue-particles> -->

    <!-- <bgAnimation /> -->

    <modal title="提示" :content="modalContent" :visible.sync="visible" @confirm="confirm">
    </modal>
  </div>
</template>

<script>
import { login123 } from "@/api/userInfo.js";
import apis from "@/utils/httputils.js";
export default {
    name: "Login",
    components: {},
    data() {
        return {
            userName: "",
            userPwd: "",
            visible: false,
            modalContent: "这是一段自定义模态框消息",
            typeFlag: false,
            jishu: false,
        };
    },
    computed: {
        isLoginAble() {
            return !(this.userName && this.userPwd);
        },
    },
    created() {
        console.log("created");
        this.$forceUpdate();
    },
    activated() {
        console.log("actived");
        if (
            localStorage.getItem("userName") &&
            localStorage.getItem("userPwd")
        ) {
            this.userName = localStorage.getItem("userName");
            this.userPwd = localStorage.getItem("userPwd");
            this.typeFlag = JSON.parse(localStorage.getItem("typeFlag"));

            this.jishu = true;
        } else {
            this.userName = "";
            this.userPwd = "";
            this.typeFlag = false;
        }
        console.log(this.typeFlag);
        console.log(this.jishu);
        console.log(this.jishu);
    },
    mounted() {},
    methods: {
        jizhumima() {
            this.jishu = !this.jishu;
        },
        login() {
            // this.$router.go(-1);
            // return
            // console.log(login);
            login123({
                userAccount: this.userName,
                userPwd: this.userPwd,
                type: this.typeFlag ? "1" : "0",
            }).then((res) => {
                console.log(res);
                localStorage.setItem("authorization", res.authorization);
                localStorage.setItem("userId", res.userId);
                localStorage.setItem("username", this.userName);
                if (this.typeFlag == "1") {
                    localStorage.setItem("admin", 1);
                } else {
                    localStorage.setItem("admin", 2);
                }
                console.log(this.jishu);
                if (this.jishu) {
                    localStorage.setItem("userName", this.userName);
                    localStorage.setItem("userPwd", this.userPwd);
                    localStorage.setItem("typeFlag", this.typeFlag);
                } else {
                    console.log("in remove");
                    localStorage.removeItem("userName");
                    localStorage.removeItem("userPwd");
                    localStorage.removeItem("typeFlag");
                }
                this.$electron.ipcRenderer.send("window-max");
                this.$router.push({
                    path: "/home",
                });
            });
            // apis.post("/share/user/login_auth_check", {
            //     data: {
            //         userAccount: "test1",
            //         userPwd: "test1",
            //         type: 0,
            //     },
            // });
            // request({
            //     url: "/share/user/login_auth_check",
            //     method: "post",
            //     data: {
            //         userAccount: "test1",
            //         userPwd: "test1",
            //         type: 0,
            //     },
            // });
            return;
            if (this.userName == "admin" && this.userPwd == "123456") {
                this.$router.push({
                    path: "/home",
                });
            } else {
                this.$Toast({
                    content: "请输入正确的用户名和密码",
                    type: "error",
                    // hasClose: true
                });
            }
        },
        onChange() {
            this.typeFlag = !this.typeFlag;
        },
        confirm() {
            this.visible = false;
            console.log("点击确定");
        },
        showDevtool() {
            console.log(window.mainWindow);
            console.log(this.$electron);
            this.$electron.ipcRenderer.send("open-devtools");
            console.log(this.$electron.ipcRenderer.send("open-devtools"));
        },
    },
};
</script>

<style lang="scss" >
.login-container {
    .ant-input-password-icon {
        color: rgba(93, 154, 158, 0.5);
    }
    .mima {
        text-align: left;
    }
    .ant-checkbox-input {
        background-color: #082932 !important;
        border: #64b7bc 2px solid;
    }
    .ant-checkbox-inner {
        background-color: unset;
        border: #64b7bc 2px solid !important;
    }
    .mima-con {
        margin-top: 20px;
        width: 100%;
        display: flex;
        align-items: start;
        justify-content: start;
    }
    .ant-input {
        padding: 0;
        background-color: #082932;
        border-color: #082932;
        border-radius: 30px;
        height: 40px;
        color: white;
    }
    .login-5 {
        background: url(../../assets/img/login-6.png) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        margin-top: 20px;
        font-size: 15px;
    }
    .bg-2 {
        width: 80%;
        height: 80%;
        background: url(../../assets/img/login-2.png) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        position: relative;
    }
    .title {
        color: white;
        font-size: 32px;
    }
    .login-1 {
        width: 100%;
    }
    .active {
        color: #1dffff;
        font-size: 14px;
    }
    .unactive {
        color: rgba(9, 184, 188, 0.5);
        font-size: 14px;
    }
    .login-2 {
        background: url(../../assets/img/login-3.png) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        height: 40px;
        margin-top: 20px;
        width: 400px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .login-4 {
        background: url(../../assets/img/login-4.png) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        height: 340px;
        width: 400px;
        margin-left: auto;
        margin-right: auto;
    }
    .right {
        position: absolute;
        right: 0;
        top: 150px;
        width: 500px;
        text-align: center;
    }
    .layer {
        position: absolute;
        height: 100%;
        width: 100%;
        background: url(../../assets/img/login-1.png) no-repeat;
        background-size: cover;
        background-position: 50% 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #particles-js {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .some-space {
        // color: white;
        // font-weight: 100;
        // letter-spacing: 2px;
        // position: absolute;
        // top: 50%;
        // left: 50%;
        // z-index: 1001;
        // -webkit-transform: translate3d(-50%, -50%, 0);
        // transform: translate3d(-50%, -50%, 0);

        // -ms-animation: cloud 2s 3s ease-in infinite alternate;
        // -moz-animation: cloud 2s 3s ease-in infinite alternate;
        // -webkit-animation: cloud 2s 3s ease-in infinite alternate;
        // -o-animation: cloud 2s 3s ease-in infinite alternate;
        // -webkit-animation: cloud 2s 3s ease-in infinite alternate;
        // animation: cloud 2s 3s ease-in infinite alternate;

        .form {
            padding-top: 80px;
            width: 80%;
            // height: auto;
            // background: rgba(36, 36, 85, 0.5);
            // margin: 0 auto;
            // padding: 35px 30px 25px;
            // box-shadow: 0 0 25px rgba(255, 255, 255, 0.5);
            // border-radius: 10px;
            margin-left: auto;
            margin-right: auto;
            .item {
                display: flex;
                align-items: center;
                margin-bottom: 25px;
                border-bottom: 1px solid #d3d7f7;

                i {
                    color: #d3d7f7;
                    margin-right: 10px;
                }
            }
            h2 {
                text-align: center;
                font-weight: normal;
                font-size: 26px;
                color: #d3d7f7;
                padding-bottom: 35px;
            }
            .input {
                font-size: 16px;
                line-height: 30px;
                width: 100%;
                color: #d3d7f7;
                outline: none;
                border: none;
                background-color: rgba(0, 0, 0, 0);
                padding: 10px 0;
            }
            .loginBtn {
                width: 100%;
                padding: 12px 0;
                border: 1px solid #d3d7f7;
                font-size: 16px;
                color: #d3d7f7;
                cursor: pointer;
                background: transparent;
                border-radius: 4px;
                margin-top: 10px;
                &:hover {
                    color: #fff;
                    background: #0090ff;
                    border-color: #0090ff;
                }
            }
            .tip {
                font-size: 12px;
                padding-top: 20px;
            }
        }
    }
}

input::-webkit-input-placeholder {
    color: #d3d7f7;
}
input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #d3d7f7;
}
input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #d3d7f7;
}
input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #d3d7f7;
}

@-ms-keyframes cloud {
    0% {
        -ms-transform: translate(-50%, -50%);
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        -ms-transform: translate(-50%, -40%);
    }
}
@-moz-keyframes cloud {
    0% {
        -moz-transform: translate(-50%, -50%);
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        -moz-transform: translate(-50%, -40%);
    }
}
@-o-keyframes cloud {
    0% {
        -o-transform: translate(-50%, -50%);
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        -o-transform: translate(-50%, -40%);
    }
}
@-webkit-keyframes cloud {
    0% {
        -webkit-transform: translate(-50%, -50%);
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        -webkit-transform: translate(-50%, -40%);
    }
}
@keyframes cloud {
    0% {
        transform: translate(-50%, -50%);
    }
    40% {
        opacity: 1;
    }
    60% {
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -40%);
    }
}
</style>
