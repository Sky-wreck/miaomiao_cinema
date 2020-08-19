var {Email,Head} = require('../untils/config.js');
var UserModel = require('../models/users.js');
var fs = require('fs');
var url = require('url');
var {setCrypto,createverifyImg} = require('../untils/base.js')

var login = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    var { username, password,verifyImg} = req.body;//获取传过来的字段

    if (verifyImg !== req.session.verifyImg){
        console.log(req.session.verifyImg)
        res.send({
            msg : '验证码输入不正确',
            status : -3
        });
        return;
    }
    
    var result = await  UserModel.findLogin({
        username,
        password : setCrypto(password)
    });
    if (result){
        req.session.username = username;
        req.session.isAdmin = result.isAdmin;
        req.session.userHead = result.userHead;

        if (result.isFreeze){
            res.send({
                msg : '账号已冻结',
                status : -2,
            });
        }else{
            res.send({ //发送给前台
                msg : '登录成功',
                status : 0
            });
        }
    } else {
        res.send({ //发送给前台
            msg : '登录失败',
            status : -1
        });
    }
};
var register = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    var { username ,password , email , verify} = req.body;
    
    if (email !== req.session.email || verify !== req.session.verify){
        res.send({ //发送给前台
            msg : '验证码错误',
            status : -1
        });
        return;
    }
    
    if ((Email.time - req.session.time) / 1000 > 60){
        res.send({
            msg : '验证码已过期',
            status : -3
        });
        return;
    }
    
    var result = await  UserModel.save({
        username,
        password : setCrypto(password),
        email
    });
    if (result){
        res.send({ //发送给前台
            msg : '注册成功',
            status : 0
        });
    }else {
        res.send({ //发送给前台
            msg : '注册失败',
            status : -2
        });
    }
};
var verify = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    var email = req.query.email;
    var verify = Email.verify;

    req.session.verify = verify;
    req.session.email = email;
    req.session.time = Email.time;

    var mailOptions = ({
        from: '喵喵网 1178821148@qq.com', //起源哪
        to: email, //发送人
        subject: '喵喵网邮箱验证码', //标题
        text: '验证码：'+ verify,//内容
    });
    Email.transporter.sendMail(mailOptions,(err)=>{

        if(err){
            res.send({ //发送给前台
                err : err,
                msg : '验证码发送失败',
                status : -1
            });
        }
        else{
            res.send({ //发送给前台
                msg : '验证码发送成功',
                status : 0
            });
        }

    });
};
var logout = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    req.session.username = '';
    res.send({
        msg : '退出成功',
        status : 0
    })
};
var getUser = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    if ( req.session.username){
        res.send({    //发送给前台
            msg : '获取用户信息成功',
            status : 0,
            data : {
                username : req.session.username, //需要把用户名发送到前端
                isAdmin : req.session.isAdmin,
                userHead : req.session.userHead
            }
        });
    }else {
        res.send({  //发送给前端
            msg : '获取用户信息失败',
            status : -1
        });
    }
};
var findPassword = async (req,res,next)=>{   //为了简化异步的回调问题使用async
    var{ email, password, verify} = req.body; //获取到前端传递的邮箱密码和验证码

    if (email === req.session.email && verify === req.session.verify){
        var result = await  UserModel.updatePassword(email, setCrypto(password));
        if (result){
            res.send({  //发送给前台
                msg : '修改密码成功',
                status : 0
            })
        }else {
            res.send({  //发送给前台
                msg : '修改密码失败',
                status : -1
            })
        }
    } else{
        res.send({
            msg : '验证码失败',
            status : -1
        });
    }
};

var verifyImg = async (req,res,next)=>{
    var result = await createverifyImg(req,res);
    if (result) {
        res.send(result)
    }
}


var uploadUserHead = async (req,res,next)=>{

    // console.log( req.file );

    await fs.rename( 'public/uploads/' + req.file.filename , 'public/uploads/' + req.session.username + '.jpg' ,function () {

    });
    var result = await UserModel.updateUserHead( req.session.username , ('http://localhost:3000/uploads/' +  req.session.username + '.jpg' ) );
    if(result){
        res.send({
            msg : '头像修改成功',
            status : 0,
            data : {
                userHead : 'http://localhost:3000/uploads/' + req.session.username + '.jpg'
            }
        });
    }
    else{
        res.send({
            msg : '头像修改失败',
            status : -1
        });
    }

}

module.exports = {
    login,
    register,
    verify,
    logout,
    getUser,
    findPassword,
    verifyImg,
    uploadUserHead
}