<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="20" class="logo-contener">
                <img src='../assets/logo.jpg' alt="" class="logo">
                <span class="title">卡索在线后台管理系统</span>
            </el-col>
            <el-col :span="2" class="company">
                <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                    <span>这是一段信息</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>

            </el-col>
            <el-col :span="2" class="user">
                <div class="userinfo">
                    <img :src="user.avatar" alt="" class="avatar">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarneme">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <!-- 下啦箭头 -->
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
    export default {
        name: 'Headnav',
        data() {
            return {
                dialogVisible: false,
                companyList: []
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            }
        },
        created() {
            this.$axios.get("api/qwe").then(res => {
                // console.log(res.data.data.names[0])
            })
        },
        methods: {
            setDialogInfo(cmdItem) {
                //    console.log(cmdItem)
                switch (cmdItem) {
                    case "info":
                        this.showInfoList();
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },
            showInfoList() {
                // console.log("个人信息")
                this.$router.push("/infoshow")
            },
            logout() {
                // console.log("退出")
                // 清除token   
                localStorage.removeItem('eleToken');
                // 设置vuex store
                this.$store.dispatch('clearCurrentState');
                // 跳转到登陆页面
                this.$router.push('/login')
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>
    .head-nav {
        width: 100%;
        height: 60px;
        padding: 5px;
        background: #324057;
        /* background: #101216; */
        color: #fff;
        border-bottom: 1px solid #1f2d3d;

        /* opacity:0.5; */
    }

    .logo-container {
        line-height: 60px;
        min-width: 400px;
    }

    .logo {
        height: 50px;
        width: 50px;
        margin-right: 5px;
        vertical-align: middle;
        display: inline-block;
    }

    .title {
        vertical-align: middle;
        font-size: 22px;
        font-family: "Microsoft YaHei";
        letter-spacing: 3px;
    }

    .company {
        /* line-height: 60px; */
        /* text-align: right; */
        /* padding-right: 10px; */
    }

    .user {
        line-height: 60px;
        text-align: right;
        float: right;
        padding-right: 10px;
    }

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        vertical-align: middle;
        display: inline-block;
    }

    .welcome {
        display: inline-block;
        width: auto;
        vertical-align: middle;
        padding: 0 5px;
    }

    .name {
        line-height: 20px;
        text-align: center;
        font-size: 14px;
    }

    .comename {
        font-size: 12px;
    }

    .avatarname {
        color: #409eff;
        font-weight: bolder;
    }

    .username {
        cursor: pointer;
        margin-right: 5px;
    }

    .el-dropdown {
        color: #fff;
    }
</style>