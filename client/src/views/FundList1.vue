<template>
 <div class=''>
123
 </div>
</template>

<script>
 export default {
name:'FundList1',
   data () {
     return {
      tableData:[]
     }
   },
   created () {
       this.getProfile();
   },
   methods: {
       getProfile(){
        //    获取表格数据
        this.$axios.get("apis/api/profiles")
        .then(res => {
            console.log(res)
        })
        .catch(res => {
            console.log(res)
        })
       }
   }
 }
</script>

<style scoped>

 
</style>
