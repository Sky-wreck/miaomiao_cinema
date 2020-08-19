var crypto = require('crypto');
var captcha = require('trek-captcha');

var setCrypto = (info)=>{
    return crypto.createHmac('sha256', '%#%#$%#%')
                    .update(info)  //需要加密的信息
                    .digest('hex');
};
var createverifyImg = (req,res)=>{
    return captcha().then((info)=>{
        req.session.verifyImg = info.token;  //验证码具体的值
        return info.buffer; //二进制的字节对应token
    }).catch(()=>{
        return false
    });
}

module.exports = {
    setCrypto,
    createverifyImg
}