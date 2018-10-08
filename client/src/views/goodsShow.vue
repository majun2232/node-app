<template>
    <div class="table_container">
        <el-table v-if="foodlist.length > 0" :data='foodlist' max-height="5000" style="width: 100%">
            <el-table-column type="index" label="序号" align='center' width="70">
            </el-table-column>
            <!-- 图片暂时展示不了 -->
            <!-- <el-table-column prop="icon" label="图片" align='center' width="250" >
                <template slot-scope="scope">
                     <span class="ico"> <img src=icon alt="" ></span>             
                </template>
            </el-table-column> -->

            <el-table-column prop="name" label="菜品名称" align='center' width="250">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="销售价格" align='center' width="150">
                <template slot-scope="scope">
                    <span style="color:#00d053"> {{scope.row.price }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="description" label="描述" align='center' width="150">
                <template slot-scope="scope">
                    <span style="color:#00d053"> {{scope.row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sellCount" label="打折" align='center' width="150">
                <template slot-scope="scope">
                    <span style="color:#f56767">- {{scope.row.sellCount }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="info" label="简单描述" align='center' width="150">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.info}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="rating" label="评价" align='center' width="150">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.rating}}</span>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                foodlist: []
            }
        },
        created() {
            this.getProfile();
        },
        methods: {
            getProfile() {
                this.$axios("api/goods").then(res => {
                    // console.log(res.data.goods[0].foods)
                    this.foodlist = res.data.goods[0].foods;
                })
            }
        }
    }
</script>

<style scoped>
    .ico {
        margin-left: 10px;
        height: 40px;
        width: 40px;
        display: inline-block;
    }
</style>