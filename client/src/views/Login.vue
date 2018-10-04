<template>
    <div class="login">
        <!-- 背景 -->
        <div class="bg bg-blur"></div>
        <!-- 表单 -->
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">卡索在线后台管理系统</span>
                <el-form :model="loginUser" :rules="rules" ref="loginForm" label-width="60px" class="loginForm">

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="sumbmit_btn" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                    <div class="tiparea">
                        <p>还没有账号?现在<router-link to='register'>注册</router-link>
                        </p>
                    </div>

                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    import jwt_decode from 'jwt-decode'
    export default {
        name: 'Login',
        data() {
            return {
                loginUser: {
                    email: "",
                    password: "",
                },
                rules: {
                    email: [{
                        type: "email",
                        required: true,
                        message: "邮箱格式不正确",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    }, {
                        min: 6,
                        max: 30,
                        message: "长度在6到30之间",
                        trigger: "blur"
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios.post('apis/api/users/login', this.loginUser)
                            .then(res => {
                                // 获取token
                                // console.log(res)
                                const {
                                    token
                                } = res.data;
                                //  存储到ls
                                localStorage.setItem("eleToken", token);
                                // 解析token
                                const decode = jwt_decode(token);
                                console.log(decode);

                                // token存储到vuex中
                                this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                                this.$store.dispatch("setUser", decode);
                                // 页面跳转
                                this.$router.push('/index')
                            })
                        // .catch(err => {console.log("登陆失败")})                          
                    }
                });
            },
            isEmpty(value) {
                return (
                    value === undefined ||
                    value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
                );
            }
        }
    }
</script>

<style scoped>
    .login {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .bg {
        background: url(../assets/bg.jpg);
        height: 100%;
        width: 100%;
    }

    .bg-blur {
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .form_container {
        width: 370px;
        height: 21px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }

    .title {
        font-family: "Microsoft YaHei";
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }

    .loginForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10 px #cccc;
    }

    .sumbmit_btn {
        width: 100%;
    }

    .tiparea {
        text-align: right;
        font-size: 12px;
        color: #333;
    }

    .tiparea p a {
        color: #409eff;
    }
</style>