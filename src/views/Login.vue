<template>
    <div class="login-container">
        <el-card>
            <p class="title">登陆总控系统</p>
            <div class="form-container" @keyup.enter='logIn'>
                <el-form>
                    <el-form-item>
                        <el-input placeholder="账号"
                                  clearable
                                  v-model="loginParams.username">
                            <div
                                    slot="prepend"
                                    style="padding:0;"
                            >
                                <i class="iconfont icon-yonghu"></i>
                            </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input type="password"
                                  placeholder="密码"
                                  clearable
                                  v-model="loginParams.password">
                            <div
                                    slot="prepend"
                                    style="padding:0;"
                            >
                                <i class="iconfont icon-mima"></i>
                            </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入右侧验证码"
                                  clearable
                                  v-model="loginParams.code">
                            <div
                                    slot="prepend"
                                    style="padding:0;"
                            >
                                <i class="iconfont icon-guifandunpai"></i>
                            </div>
                            <div slot="append">
                                <img class="codeimg" :src="codeSrc" alt="验证码" @click="generateImgCode">
                            </div>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="isLoading" style="width: 100%;"
                                   type="success" @click="logIn">立即登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import requests from '@/requests/login'

    export default {
        data() {
            return {
                isLoading: false,
                codeSrc: '',
                loginParams: {
                    username: '',
                    password: '',
                    code: ''
                }
            }
        },
        methods: {
            logIn() {
                try {
                    if (this.loginParams.username === '') throw '请输入账号！';
                    if (this.loginParams.password === '') throw '请输入密码！';
                    if (this.loginParams.code === '') throw '请输入验证码！';
                }
                catch (e) {
                    this.$message.error(e);
                    return;
                }
                this.isLoading = true;
                this.$store.dispatch('logIn', this.loginParams)
                    .then(res => {
                        this.isLoading = false;
                        sessionStorage.setItem("username",this.loginParams.username)
                        this.$message({
                            message: res.msg,
                            duration: 1000,
                            type: 'success'
                        });
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 1000);
                    })
                    .catch((e) => {
                        this.$notify.error({title:e.msg});
                        this.isLoading = false;
                        this.generateImgCode();
                    });
            },
            generateImgCode() { //刷新验证码
                this.codeSrc = '/api/generateCode?' + new Date().getTime();
            },
        },
        created() {
            this.generateImgCode()
        }
    }
</script>

<style lang="scss">

    .login-container {
        position: relative;
        height: 100%;
        background: url('~@/assets/login-bg.jpg') center;
        background-size: cover;
        .el-card {
            width: 550px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: none;
            border-radius: 5px;
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            box-shadow: 5px 5px 5px rgba(6, 1, 1, 0.43);
            padding: 50px;
            .el-card__body {
                padding: 0;
                background: transparent;
                .logo {
                    width: 159px;
                    height: 116px;
                    margin: auto;
                    /*background: url('~@/assets/login_logo2.png') no-repeat center;*/
                    background-size: contain;
                }
                p.title {
                    margin: 30px auto 50px;
                    text-align: center;
                    padding: 5px 0;
                    font-size: 28px;
                    letter-spacing: 2px;
                    white-space: nowrap;
                    font-weight: 800;
                    line-height: 30px;
                    overflow: hidden;
                    color: #ffffff;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
                    -webkit-mask-image: linear-gradient(-75deg, #ffffff 0%, rgba(255, 255, 255, 0.6) 30%, #ffffff 50%, rgba(255, 255, 255, 0.6) 70%, #ffffff 100%);
                    -webkit-mask-size: 200%;
                    animation: shine 6s infinite;
                }
                .el-form {
                    width: 350px;
                    margin: 0 auto;
                    .el-form-item__content {
                        &:hover, &:focus {
                            .el-input-group__prepend, .el-input__inner {
                                color: #fff;
                                background: rgba(255, 255, 255, 0.3);
                            }
                        }
                    }
                }

                input {
                    color: #fff;
                    border: 1px solid #ddd;
                    border-left: none;
                    background: transparent;
                }
                .el-input__prefix {
                    width: 40px;
                }
                .el-button {
                    width: 100%;
                    margin-top: 20px;
                }
                .el-input-group__prepend {
                    color: #fff;
                    padding: 0 10px;
                    background: transparent;
                }
                [class^="iconfont"] {
                    font-size: 18px;
                    vertical-align: middle;
                    color: inherit;
                }
                .el-input-group__append {
                    padding: 0;
                    height: 100%;
                    border: none;
                    overflow: hidden;
                    > div {
                        background: transparent;
                        .codeimg {
                            height: 36px;
                            cursor: pointer;
                        }
                    }
                }
                .tips {
                    width: 100%;
                    color: #676a6c;
                    text-align: center;
                    font-size: 16px;
                    line-height: 1.5;
                    margin-top: 98px;
                }
            }
        }
    }

    @-webkit-keyframes shine {
        from {
            -webkit-mask-position: 150%;
        }

        to {
            -webkit-mask-position: -50%;
        }
    }
</style>
