<template>
    <div>
        <div>个人中心：</div>
        <div>当前用户：{{$store.state.user.name}}<h4   @touchstart="handleToLogout" >退出</h4> </div>
        <div v-if="$store.state.user.isAdmin">用户身份：管理员 <a href="/admin" target="_blank">进入管理后台</a></div>
        <div v-else>用户身份：普通会员</div>
        <dir>
            <input type="file" name="file" value="上传头像" @change="handleToUpload">
            <img class="userHead" :src="$store.state.user.userHead">
        </dir>
    </div>    
</template>

<script>
import axios from 'axios';
import {messageBox} from '@/components/JS';
export default {
    name : 'center',
    methods : {
        handleToLogout(){
            this.$axios.get('/ajax2/users/logout').then((res)=>{
                var status = res.data.status;
                if(status == 0){
                    localStorage.removeItem('name');
                    localStorage.removeItem('isAdmin');
                    this.$store.commit('user/USER_NAME',{name : '',isAdmin : false,userHead : ''})
                    this.$router.push('/mine/login')
                }
            })
        },
        handleToUpload(ev){
            var file = ev.target.files[0];  //需要上传的文件
            var param = new FormData();
            param.append('file',file,file.name);//第一个是key值，第二个是文件，第三个是文件名
            console.log(param)
            var config = {
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            }

            this.$axios.post('/ajax2/users/uploadUserHead',param,config).then((res)=>{
                console.log(res);
                var status = res.data.status;
                var This = this;
                if (status === 0 ){
                    messageBox({
                        title : '信息',
                        content : '上传头像成功',
                        ok : '确定',
                        handleOk(){
                            This.$store.commit('user/USER_NAME',{ 
                            name : This.$store.state.user.name, 
                            isAdmin : This.$store.state.user.isAdmin,
                            userHead : res.data.data.userHead + '?' + Math.random()
                            });
                        }
                    })
                }else{
                    messageBox({
                        title : '信息',
                        content : '上传头像失败',
                        ok : '确定',
                    })
                }
            })
        }
    },
    beforeRouteEnter (to,from,next){  //路由守卫
        axios.get('/ajax2/users/getUser').then((res)=>{
            var status = res.data.status;
            if(status == 0){
                next(vm => {
                    localStorage.setItem('name',res.data.data.username);
                    localStorage.setItem('isAdmin',res.data.data.isAdmin);
                    vm.$store.commit('user/USER_NAME',{ 
                        name : res.data.data.username, 
                        isAdmin : res.data.data.isAdmin,    
                        userHead : res.data.data.userHead
                    });
                });
            }else{
                next('/mine/login');
            }
        })
    }
}
</script>

<style scoped>
.logout{display: inline; border-bottom: 1px solid red;}
.userHead{width: 100px; height: 100px; border-radius: 50%; overflow: hidden;}
</style>