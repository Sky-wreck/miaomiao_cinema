var mongoose = require('mongoose');  //引入mongoo
var nodemailer = require('nodemailer'); //引入邮箱模块

var Mongoose = {
    url : 'mongodb://localhost:27017/miaomiao',  //连接数据库的协议
    connect(){  //连接数据库的方法
        mongoose.connect(this.url,{ useNewUrlParser : true},(err) =>{
            if (err){
                console.log("数据库连接失败");
                return;
            }
            console.log("数据库连接成功")
        });
    }
}

var Email = {
    config : {
        host: "smtp.qq.com",
        port: 587,
        auth: {
            user: '1178821148@qq.com', // 发件人
            pass: 'oozpbxmygyhnffhf', // IMAP/SMTP服务授权码
        },
    },
    get transporter(){
        return nodemailer.createTransport(this.config);
    },
    get verify(){  //生成验证码
        return Math.random().toString().substring(2,6);//生成随机数转成字符串取2到6位
    },
    get time(){
        return Date.now();  //返回毫秒数
    }
};

var Head = {
    baseURl : 'http://localhost:3000/uploads/'
}

module.exports = {  //对外接口
    Mongoose,
    Email,
    Head
};
