var express = require('express');
var adminContoller = require('../controllers/admin.js');
var router = express.Router();

/* GET users listing. */
router.use((req,res,next)=>{  //拦截    登录后并且是管理员身份才可以
    if (req.session.username && req.session.isAdmin) {
        next();
    }else {
        res.send({
            msg : '没有管理权限',
            status : -1
        });
    }
})



router.get('/', adminContoller.index)
router.get('/userList',adminContoller.userList)
router.post("/updateFreeze",adminContoller.updateFreeze)
router.post('/deleteUser',adminContoller.deleteUser)

module.exports = router;
