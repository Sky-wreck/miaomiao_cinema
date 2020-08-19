<template>
    <div class="cinema_body">
        <Loading v-if="isLoading" />
        <Srcoller v-else>
            <ul>
                <li v-for="data in cinemaList" :key="data.cinemaId">
                    <div>
                        <span>{{data.name}}</span>
                        <span class="q"><span class="price">{{data.lowPrice/100}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{data.address}}</span>
                        <span>{{data.distance}}</span>
                    </div>
                    <div class="card">
                        <div>小吃</div>
                        <div>折扣卡</div>
                    </div>
                </li>
            </ul>
        </Srcoller>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'


export default {
    name : 'CinemaList',
    data(){
        return {
            cinemaList : [],
            isLoading : true,
            prevCity : -1
        }
    },
    activated(){
        var cityID = this.$store.state.city.cityId

        if(this.prevCityId === cityID){  //这样可以保证（除城市页面）从其他页面跳转过来有缓存，从城市页面跳转重新加载
            return;
        }
        this.isLoading = true

        axios({
             url : 'https://m.maizuo.com/gateway?cityId='+cityID+'&ticketFlag=1&k=8176731',
             headers : {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1596848294105531641430017","bc":"110100"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then(res =>{
            //console.log(res.data)
            this.cinemaList = res.data.data.cinemas
            this.isLoading = false
        })
    }
}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>