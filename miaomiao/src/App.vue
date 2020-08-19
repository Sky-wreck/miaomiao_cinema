<template>
    <keep-alive>  <!-- keep-alive第一次请求渲染之后，再次切换的时候可以进行缓存-->
        <router-view/>
    </keep-alive>
</template>