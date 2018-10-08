<template>
  <div id="app">
    
    <router-view />
  </div>
</template>

<script>
  import jwt_decode from 'jwt-decode'
  export default {
    name: 'app',
    created() {
      // 为了避免刷新丢失用户数据,需要程序每次进来时获取一下状态
      if (localStorage.eleToken) {
        const decode = jwt_decode(localStorage.eleToken);
        // token存储到vuex中
        this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
        this.$store.dispatch("setUser", decode);
      };
      //  this.$axios.get('apis/api/users/current')
      //   .then(res => {
      //       console.log(res)
      //   })
      //   .catch(res => {
      //       console.log(res)
      //   })
    },
    // 封装的判断是否为空
    methods: {
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

<style>
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
</style>