<template>
        <el-tree :data="companyList" :props="defaultProps" @node-click="handleNodeClick" class='companytree'></el-tree> 
</template>

<script>
    export default {
        name: '',

        data() {
            return {
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                companyList: []
            }
        },
        methods: {
            handleNodeClick(data) {
                console.log(data);
            }
        },
        created() {
            this.$axios.get("api/qwe").then(res => {
                console.log(res.data.data.names)
                this.companyList = res.data.data.names
            })
        },
    }
</script>

<style scoped>
.companytree{
    font-size: 16px;
    color: #2e3648
}

</style>