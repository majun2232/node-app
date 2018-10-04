<template>
 <div class="index">
     <HeadNav></HeadNav>
     <leftMenu/>
     <router-view></router-view>
 </div>
</template>

<script>
import HeadNav from '../components/HeadNav'
import leftMenu from '../components/leftMenu'
 export default {
     name: "index",
   data () {
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
