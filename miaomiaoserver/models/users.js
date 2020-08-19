var mongoose = require('mongoose');
var {Head} = require('../untils/config.js');
var url = require('url');
mongoose.set('useCreateIndex',true);


var UserSchema = new mongoose.Schema({  //用户信息
    username: {type: String, required: true, index: {unique: true}}, //String类型,是否为空 ：不能为空，指定username为唯一值
    password : { type: String, required: true},
    email : {type: String, required: true, index: {unique: true}},
    data : { type : Date, default : Date.now()},
    isAdmin : {type :Boolean, default: false},
    isFreeze : {type : Boolean, default : false},
    userHead : {type : String, default : url.resolve(Head.baseURl,'gw.jpg')}
});

var UserModel = mongoose.model('user', UserSchema);  //user是表名
UserModel.createIndexes(); //这样index: {unique: true}才会生效

var save = (data)=>{  //添加数据库操作
    var user = new UserModel(data);
    return user.save()
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })
};

var findLogin = (data)=>{
    return UserModel.findOne(data);//查询到返回对象，查询不到返回null
}

var updatePassword = (email, password)=>{  //修改密码
    return UserModel.update({email},{ $set : { password }})
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })
}

var userList = ()=>{  //查寻所有内容
    return UserModel.find();
}

var updataFreeze = (email, isFreeze)=>{  //冻结皂搓
    return UserModel.update({email},{$set: {isFreeze}})   //根据email更新是否冻结
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        })
}

var deleteUser = (email)=>{  //删除操作
    return UserModel.deleteOne({email})
}

var updateUserHead = ( username , userHead ) => {
    return UserModel.update({username} , { $set : { userHead } })
        .then(()=>{
            return true;
        })
        .catch(()=>{
            return false;
        });
}

module.exports = {
    save,
    findLogin,
    updatePassword,
    userList,
    updataFreeze,
    deleteUser,
    updateUserHead
};