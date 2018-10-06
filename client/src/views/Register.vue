<template>
    <div class="register">
        <!-- 背景 -->
        <div class="bg bg-blur"></div>
        <!-- 表单 -->
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">卡索在线后台管理系统</span>
                <el-form :model="registerUser" :rules="rules" ref="registerUser" label-width="80px" class="registerForm">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerUser.email" placeholder="请输入email"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="registerUser.password" placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item label="确认密码" prop="password2">
                        <el-input type="password" v-model="registerUser.password2" placeholder="请确认密码"></el-input>
                    </el-form-item>

                    <el-form-item label="选择身份">
                        <el-select v-model="registerUser.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="manager"></el-option>
                            <el-option label="员工" value="employee"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" class="sumbmit_btn" @click="submitForm('registerUser')">注册</el-button>

                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
   import loginMothod from '../utils/login.js'
    export default {
        name: 'register',
        data() {
            var validatePass2 = (rule, value, callback) => {
                if (value !== this.registerUser.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                registerUser: {
                    name: "",
                    email: "",
                    password: "",
                    password2: "",
                    identity: "",
                },
                rules: {
                    name: [{
                            required: true,
                            message: "用户名不能为空",
                            trigger: "blur"
                        },
                        {
                            min: 2,
                            max: 30,
                            message: "长度在2到30个字符之间",
                            trigger: "blur"
                        }
                    ],
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
                    }],
                    password2: [{
                            required: true,
                            message: "确认密码不能为空",
                            trigger: "blur"
                        }, {
                            min: 6,
                            max: 30,
                            message: "长度在6到30之间",
                            trigger: "blur"
                        },
                        {
                            validator: validatePass2,
                            trigger: "blur"
                        }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                // console.log(formName)
                // 测试
                // this.$axios.post('http://10.22.199.116:8081/api/users/register', {
                // this.$axios.post('apis/api/users/register', {
                //     "email": "m2dw6665544433216r2@16wwertweert3.com",
                //     "name": "kasuo",
                //     "password": "123456",
                //     "identity": "employee"
                // })
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        this.$axios.post('apis/api/users/register', this.registerUser)
                            .then(res => {
                                // 注册成功
                                this.$message({
                                    message: "账号注册成功!",
                                    type: 'success'
                                })
                            })
                            .catch(res => {
                                // 注册成功
                                this.$message({
                                    message: "!",
                                    type: 'success'
                                })
                            });
                        this.$router.push('/login')
                    //   debugger
                    //    loginMothod.submit({"email":this.registerUser.email,"password":this.registerUser.password2})
                    //    this.$router.push('/index')



                    }
                });


                
            }
        }
    }
</script>

<style scoped>
    .register {
        position: relative;
        width: 100%;
        height: 100%;

    }

    .bg {
        background: url(../assets/bg.jpg);
        height: 100%;
        width: 100%;
        text-align: center;
        line-height: 600px;
    }

    .bg-blur {
        float: left;
        /* opacity:0.4;    */
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        /* filter: blur(5px); */
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

    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10 px #cccc;
    }

    .sumbmit_btn {
        width: 100%;
    }
</style>