<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name : 'Srcoller',
    props : {  //父子通信接口
        handleToScroll : {
            type : Function,  //初始类型为Function
            default : function(){}  //默认为空函数
        },
        handleToTouchEnd : {
            type : Function,
            default : function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper, {
            tap : true,   //让tag开启点击事件
            probeType : 1 //滚动的时候触发scroll事件，会截留
        }); 

        scroll.on('scroll',(pos)=>{
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{
            this.handleToTouchEnd(pos);
        })
    }
}
</script>

<style scoped>
    .wrapper{ height: 100%;}
</style>