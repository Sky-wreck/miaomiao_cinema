<template>
    <div class="movie_body">
        <Loading v-if="isLoading"/>
        <Srcoller v-else>
            <ul>
                <li v-for="data in movieList" :key="data.filmId">
                    <div class="pic_show" @tap="handleToDetail(data.filmId)"><img :src="data.poster"></div>
                    <div class="info_list">
                        <h2 @tap="handleToDetail(data.filmId)">{{data.name}}</h2>
                        <p v-if="data.grade">观众评分: <span class="grade">{{data.grade}}</span></p>
                        <p v-else><span><br/></span></p>
                        <p>主演: {{data.actors | actorfilter}}</p>
                        <p>上映日期:&nbsp;&nbsp;{{data.premiereAt+1600570000000  | dateFormat}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li>
            </ul>
        </Srcoller>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

// 定义时间格式化全局过滤器
Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-DD-MM ') => {
  return moment(dateStr).format(pattern)
})

Vue.filter('actorfilter', function (data) {   //过滤器
   //console.log(data);
  var newlist = data.map(item => item.name)  //map函数它返回一个新的数组，数组中的元素为原始数组调用函数处理后的值。
  //console.log(newlist)
  return newlist.join(' ')
})

export default {
    name : 'ComingSoon',
    data(){
        return {
            movieList : [],
            isLoading : true,
            prevCityId : -1
        }
    },
    activated(){

        var cityID = this.$store.state.city.cityId
        if(this.prevCityId === cityID){  //这样可以保证（除城市页面）从其他页面跳转过来有缓存，从城市页面跳转重新加载
              return;
        }
        this.isLoading = true

        axios({
            url : 'https://m.maizuo.com/gateway?cityId='+cityID+'&pageNum=1&pageSize=10&type=2&k=407903',
            headers : {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596848294105531641430017","bc":"310100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res =>{
            console.log(res.data)
            this.movieList = res.data.data.films
            this.isLoading = false
        })
    },
    methods : {
        handleToDetail(filmId){
            this.$router.push('/movie/detail/2/'+ filmId);
        }
    }
}
</script>

<style scoped>
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:50px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
</style>