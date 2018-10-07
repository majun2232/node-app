import jwt_decode from 'jwt-decode'
import axios from '../http'
import router from '../router'
import store from '../store'

const login =  {
    submit(loginUser) {
        //  console.log(loginUser)
        axios.post('apis/api/users/login', loginUser)
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
                // console.log(decode);

                // token存储到vuex中
                store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
                store.dispatch("setUser", decode);
                // 页面跳转
                router.push('/index')
            })
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

export default login