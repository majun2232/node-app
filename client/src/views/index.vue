<template>
  <div class="index">
    <HeadNav></HeadNav>
    <!-- 做个测试 -->
    <!-- 更改 -->
    <leftMenu />
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import HeadNav from '../components/HeadNav'
  import leftMenu from '../components/leftMenu'
  export default {
    name: "qindex",
    data() {
      return {

      }
    },
    components: {
      HeadNav,
      leftMenu
    }
  }
</script>

<style>
  .index {
    width: 100%;
    height: 100%;
    overflow: hidden;
    min-width: 600px;
  }

  .rightContainer {
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: calc(100% - 71px);
    overflow: auto;
  }
</style>