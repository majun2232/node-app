// login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const passport =require("passport");


// $route GET api/users/test
// $desc 返回的请求json数据
// @access public

// 开发时用于bug调试
// router.get("/test", (req, res) => {
//     res.json({
//         msg: "login works"
//     })
// })

// $route Post api/users/register
// $desc 返回的请求json数据
// @access public

router.post("/register", (req, res) => {
    // console.log(req.body);
    // 查询数据库中拥有邮箱
    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json(
                   '邮箱已被注册!'
                )
            } else {
                // 头像
                var avatar = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                    identity:  req.body.identity,
                })
                // 密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Store hash in your password DB.
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
})

// $route Post api/users/login
// $desc 返回touken jwt passport
// @access public

router.post("/login",(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    // 查询数据库
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json('用户不存在');
            }
        //  密码匹配
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                  if(isMatch){
                      const rule = {
                          id:user.id,
                          name:user.name,
                          avatar:user.avatar,
                          identity:user.identity
                        };
                      jwt.sign(rule,"secret",{expiresIn:3600},(err,token)=> {
                          if (err) throw err;
                          res.json({
                              success:true,
                              token:"Bearer " + token
                          });
                      }
                    ) 
                    // res.json({msg:"success"});               
                  }else{
                      return(res.status(400).json('密码错误!'));
                  }                 
              }  
              )
        })
})
// $route Get api/users/current, 验证得到用户信息
// $desc return current user
// @access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
  
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });

})

module.exports = router;