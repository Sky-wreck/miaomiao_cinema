var express = require('express');
var usersContoller = require('../controllers/users');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: 'public/uploads/'});//将上传的文件上传到此路径

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', usersContoller.login);//登录接口
router.post('/register', usersContoller.register);//注册接口
router.get('/verify', usersContoller.verify);//验证接口
router.get('/logout', usersContoller.logout);//退出接口
router.get('/getUser', usersContoller.getUser);//
router.post('/findPassword', usersContoller.findPassword);//找回密码接口
router.get('/verifyImg',usersContoller.verifyImg)

router.post('/uploadUserHead',upload.single('file'), usersContoller.uploadUserHead)

module.exports = router;
