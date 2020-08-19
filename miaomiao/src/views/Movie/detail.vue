<template>
    <div id="detailContrainer" class="slide-enter-active">
        <Header title="影片详情">
            <i class="iconfont icon-right" @touchstart="handleToBack"></i>
        </Header>
		<Loading v-if="isLoading"/>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg" :style="{ 'background-image' : 'url('+ detailmovie.poster +')'}"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="detailmovie.poster" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{detailmovie.name}}</h2>
						<p> </p>
						<p>{{detailmovie.grade}}</p>
						<p>{{detailmovie.category}}</p>
						<p>{{detailmovie.nation}} / {{detailmovie.runtime}}分钟</p>
						<p>{{detailmovie.premiereAt+1600570000000 | dateFormat}}大陆上映</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{detailmovie.synopsis}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li v-for="(item,index) in detailmovie.actors" :key="index" class="swiper-slide">
						<div>
							<img :src="item.avatarAddress" class="detail_img" alt="">
						</div>
						<p>{{item.name}}</p>
						<p>{{item.role}}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>

import Header from '@/components/Header'
import axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
//import Swiper from 'Swiper'

// 定义时间格式化全局过滤器
Vue.filter('dateFormat', (dateStr, pattern = 'YYYY-DD-MM ') => {
  return moment(dateStr).format(pattern)
})

export default {
	name : 'Detail',
	data(){
		return {
			detailmovie : {},
			isLoading :true
		}
	},
    components : {
        Header
	},
	props : ['movieId'],
    methods : {
        handleToBack(){
            this.$router.back() // 返回上一个页面
        }
	},
	mounted(){
		axios({
			url : 'https://m.maizuo.com/gateway?filmId='+this.movieId+'&k=8759265',
			headers : {
				'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1597120753233616156131329","bc":"110100"}',
				'X-Host': 'mall.film-ticket.film.info'
			}
		}).then(res =>{
			console.log(res.data)
			if(res.data.msg === "ok"){
				this.isLoading = false
				this.detailmovie = res.data.data.film
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player,{
						slidesPerView : 'auto',  //
						freeMode : true,		//拖放
						freeModeSticky: true,	//自动锁定对齐
					})					
				})
			}
		})
	}   
}
</script>

<style scoped>
#detailContrainer{ position: absolute; left: 0; top: 0; z-index: 100; width: 100%; min-height: 100%; background: white;}
#detailContrainer .slide-enter-active{animation: 3s slideMove;}
@keyframes slideMove {
	0%{ transform: translateX(100%);}
	100%{ transform: translateX(0);}
}
.detail_img{width: 170px;height: 100px; }
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ width:100%; height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>