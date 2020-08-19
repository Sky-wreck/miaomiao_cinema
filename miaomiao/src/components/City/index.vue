<template>
    <mt-index-list>
        <Loading v-if="isLoading"/>
        <mt-index-section v-else :index="data.index" v-for="data in datalist" :key="data.index" >
            <mt-cell :title="city.name" v-for="city in data.list" :key="city.cityId" @click.native="handleToCity(city.name , city.cityId)">
            </mt-cell>
        </mt-index-section> 
    </mt-index-list>
        
</template>

<script>
import axios from 'axios'

export default {

    data(){
        return {
            datalist : [],
            isLoading : true
        }
    },
    name : 'City',
    mounted(){
        var citylist = window.localStorage.getItem('citylist')

        if(citylist){
            this.datalist = JSON.parse(citylist)
            this.isLoading = false
        }else{
            axios({
                url:"https://m.maizuo.com/gateway?k=9206772",
                headers : {
                    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596848294105531641430017","bc":"310100"}',
                    'X-Host': 'mall.film-ticket.city.list'
                }
            }).then(res =>{
                this.datalist = this.handleCity(res.data.data.cities)
                this.isLoading = false
                //数据进行本地存储,数组是不能直接存储的，得转换成字符串类型
                window.localStorage.setItem('citylist',JSON.stringify(this.datalist));             
            })
        }
        
    },

    methods:{
        handleCity(datalist){
            console.log(datalist)
            var letterArr = []
            for(var i = 65; i < 91; i++){  //收集26个字母
                letterArr.push(String.fromCharCode(i));
            }
            console.log(letterArr)

            var newlist = []
            for(var j=0;j<letterArr.length;j++){  //通过拼音的首字母过滤
                var arr = datalist.filter(item=>item.pinyin.substring(0,1)===letterArr[j].toLowerCase())
                //console.log(arr)
                //将每个字母开头分成一组，加入到数组中
                if(arr.length>0){
                    newlist.push({
                        index: letterArr[j],
                        list: arr
                    })
                }
            }
            return newlist

        },
        handleToCity(name , cityId){
            //修改状态管理
            this.$store.commit('city/CITY_INFO',{name,cityId})
            window.localStorage.setItem('nowName',name)
            window.localStorage.setItem('nowId',cityId)
            this.$router.push('/movie')
        }
    }
}
</script>

<style scoped>
</style>