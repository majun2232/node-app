<template>
  <div class="fillcontain">
    <div>
      <el-form :inline="true" ref="search_data" :model='search_data'>
        <el-form-item label="投标时间筛选:">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间">
          </el-date-picker> --
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click='onScreeoutMoney()'>筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click='onAddMoney()'>添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 下面是表格区域 -->
    <div class="table_container" v-show="!isshow">
      <el-table v-if="tableData.length > 0" :data='tableData' max-height="500" border :default-sort="{prop: 'date', order: 'descending'}"
        style="width: 100%">
        <el-table-column type="index" label="序号" align='center' width="70">
        </el-table-column>
        <el-table-column prop="date" label="创建时间" align='center' width="200" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align='center' width="150">
        </el-table-column>
        <el-table-column prop="describe" label="收支描述" align='center' width="150">
        </el-table-column>
        <el-table-column prop="income" label="收入" align='center' width="150">
          <template slot-scope="scope">
            <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align='center' width="150">
          <template slot-scope="scope">
            <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align='center' width="150">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align='center' width="150">
            <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align='center' label="操作" fixed="right" width="160">
          <template slot-scope='scope'>
            <el-button type="warning" icon='edit' size="small" @click='onEditMoney(scope.row)' v-if="user.identity == 'manager'">编辑</el-button>
            <el-button type="danger" icon='delete' size="small" @click='onDeleteMoney(scope.row,scope.$index)' v-if="user.identity == 'manager'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination v-if='paginations.total > 0' :page-sizes="paginations.page_sizes" :page-size="paginations.page_size"
              :layout="paginations.layout" :total="paginations.total" :current-page.sync='paginations.page_index'
              @current-change='handleCurrentChange' @size-change='handleSizeChange'>
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 这里没有数据显示 -->
    <h1 v-show="isshow" class="empty">亲!没有任何数据,请添加</h1>
    <!-- 弹框页面 -->
    <!-- 在这里绑定自动刷新,updata,重新获取表单数据 -->
    <DialogFound :dialog='dialog' :form='form' @update="getProfile"></DialogFound>
  </div>
</template>

<script>
  import DialogFound from "../components/DialogFound";
  import moment from 'moment-timezone'

  export default {
    name: "fundlist",
    data() {
      return {
        isshow: false,
        tableData: [],
        allTableData: [],
        filterTableData: [],
        dialog: {
          show: false,
          title: "",
          option: "edit"
        },
        form: {
          type: "",
          describe: "",
          income: "",
          expend: "",
          cash: "",
          remark: "",
          id: ""
        },
        //需要给分页组件传的信息
        paginations: {
          page_index: 1, // 当前位于哪页
          total: 0, // 总数
          page_size: 5, // 1页显示多少条
          page_sizes: [5, 10, 15, 20], //每页显示多少条
          layout: "total, sizes, prev, pager, next, jumper" // 翻页属性
        },
        search_data: {
          startTime: "",
          endTime: ""
        }
      };
    },
    //   要使用vux里面的数据,必须添加computed属性
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    components: {
      DialogFound
    },
    created() {
      this.getProfile();
    },
    methods: {
      getProfile() {
        // 获取表格数据
        this.$axios("apis/api/profiles").then(res => {
          var obj = res.data;
          // 判断数据库的数组是否为空,若为空则把没有任何数据的div打开,若不为空则显示数据
          if (obj.length == 0) {
            this.isshow = true
            // console.log(this.isshow)
          } else {
            this.isshow = false;
          }
          for (var i in obj) {
            // console.log(obj[i].date);
            // console.log(moment(obj[i].date).tz("Asia/Shanghai").format('YYYY/MM/DD HH:mm:ss'));
            // 这里把世界时间转换为北京时间进行显示,实际数据库存储的为世界时间
            obj[i].date = moment(obj[i].date).tz("Asia/Shanghai").format('YYYY/MM/DD HH:mm:ss');
          };
          this.allTableData = obj;
          this.filterTableData = res.data;
          // 设置分页数据
          this.setPaginations();
        }),
          this.$axios("api/goods").then(res => {
              console.log(res.data.goods[0].foods)
         }
        )

      },
      onEditMoney(row) {
        // 编辑
        this.dialog = {
          show: true,
          title: "修改资金信息",
          option: "edit"
        };
        this.form = {
          type: row.type,
          describe: row.describe,
          income: row.income,
          expend: row.expend,
          cash: row.cash,
          remark: row.remark,
          id: row._id
        };
      },
      onDeleteMoney(row, index) {
        // 删除
        this.$axios.delete(`apis/api/profiles/delete/${row._id}`).then(res => {
          this.$message("删除成功");
          this.getProfile();
        });
      },
      onAddMoney() {
        // 添加
        this.dialog = {
          show: true,
          title: "添加资金信息",
          option: "add"
        };
        this.form = {
          type: "",
          describe: "",
          income: "",
          expend: "",
          cash: "",
          remark: "",
          id: ""
        };
      },
      handleCurrentChange(page) {
        // 当前页
        let sortnum = this.paginations.page_size * (page - 1);
        let table = this.allTableData.filter((item, index) => {
          return index >= sortnum;
        });
        // 设置默认分页数据
        this.tableData = table.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
      handleSizeChange(page_size) {
        // 切换size
        this.paginations.page_index = 1;
        this.paginations.page_size = page_size;
        this.tableData = this.allTableData.filter((item, index) => {
          return index < page_size;
        });
      },
      setPaginations() {
        // 总页数
        this.paginations.total = this.allTableData.length;
        this.paginations.page_index = 1;
        this.paginations.page_size = 5;
        // 设置默认分页数据
        this.tableData = this.allTableData.filter((item, index) => {
          return index < this.paginations.page_size;
        });
      },
      onScreeoutMoney() {
        // 筛选
        if (!this.search_data.startTime || !this.search_data.endTime) {
          this.$message({
            type: "warning",
            message: "请选择时间区间"
          });
          this.getProfile();
          return;
        }
        const stime = this.search_data.startTime.getTime();
        const etime = this.search_data.endTime.getTime();
        this.allTableData = this.filterTableData.filter(item => {
          let date = new Date(item.date);
          let time = date.getTime();
          return time >= stime && time <= etime;
        });
        // 分页数据
        this.setPaginations();
      }
    }
  };
</script>
<style scoped>
  .fillcontain {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
  }

  .btnRight {
    float: right;
  }

  .pagination {
    text-align: right;
    margin-top: 10px;
  }

  .empty {
    padding-top: 100px;
    text-align: center;
  }
</style>