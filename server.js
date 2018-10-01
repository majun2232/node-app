const express=require("express");
const mongoose = require('mongoose'); 
 
const app=express();
const bodyParser = require("body-parser"); 

// 引入users.js
const users=require("./routes/api/users");

const passport=require("passport")

// {useMongoClient: true}

// app.get("/",(req,res) => {
//     res.send("Hello world");
// })
// 使用body-parser中间件(用于post请求)
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// 使用routes
app.use("/api/users",users);

const port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/restful-api-prod');

// 为这次连接绑定事件
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误'));
db.once('open', function() {console.log(new Date+'  http:localhost:80连接成功')});
db.on("disconnected", function () { console.log("MongoDB connected disconnected.")});

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})

// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);