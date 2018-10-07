// login & register
const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const passport =require("passport");

// var moment = require('moment-timezone');

// 后台转换时间失败,转用前端处理
// console.log(moment('2018-10-06T13:24:42.512Z').tz("Asia/Tokyo").format('YYYY/MM/DD HH:mm:ss'))
// console.log('上海：'+moment().tz("Asia/Shanghai").format('YYYY/MM/DD HH:mm:ss'))
// console.log('香港：'+moment().tz("Asia/Shanghai").format('YYYY/MM/DD HH:mm:ss'))
// console.log('日本：'+moment().tz("Asia/Tokyo").format('YYYY/MM/DD HH:mm:ss'))
// console.log('纽约：'+moment().tz("America/New_York").format('YYYY/MM/DD HH:mm:ss'))


// $route GET api/profiles/test
// $desc 返回的请求json数据
// @access public

// 开发时用于bug调试
// const router : Router
// router.get("/test", (req, res) => {
//     res.json({
//         msg: "Profile works"
//     })
// })

// $route GET api/profiles/add
// $desc 创建信息接口
// @access public

router.post("/add", passport.authenticate("jwt",{session:false}),(req,res) =>  {
    const profileFields={};

    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

    new Profile(profileFields).save().then(profile => {
        res.json(profile)
    })
   
})

// $route GET api/profiles
// $desc 获取所有信息
// @access Private
router.get('/:id',passport.authenticate("jwt",{session:false}),
(req,res) => {
    Profile.findOne({_id:req.params.id})
    .then(profile => {
        if(!profile){
            return res.status(404).json("没有任何内容")
        }

        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})


// $route GET api/profiles/:id
// $desc 获取单个信息
// @access Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
    .then(profile => {
        if(!profile){
            return res.status(404).json("没有任何内容")
        }

        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

// $route Post api/profiles/edit
// $desc 编辑信息接口
// @access Private
router.post('/edit/:id', passport.authenticate("jwt",{session:false}),(req,res) =>  {
    const profileFields={};

    if(req.body.type) profileFields.type=req.body.type;
    if(req.body.describe) profileFields.describe=req.body.describe;
    if(req.body.income) profileFields.income=req.body.income;
    if(req.body.expend) profileFields.expend=req.body.expend;
    if(req.body.cash) profileFields.cash=req.body.cash;
    if(req.body.remark) profileFields.remark=req.body.remark;

   Profile.findOneAndUpdate( 
    {_id: req.params.id},
    {$set:profileFields},
    {new:true}
    ).then(profile => res.json(profile))   
   
})

// $route Post api/profiles/delete/:id
// $desc 删除信息接口
// @access Private
router.delete('/delete/:id',passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOneAndRemove({_id:req.params.id}).then(profile => {
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json("删除失败!"))
    
})


module.exports = router;