export default{
    path : '/movie',
    component : () => import('@/views/Movie'),
    children : [
        {
            path : 'city',
            component : () => import('@/components/City')
        },
        {
            path : 'nowplaying',
            component : () => import('@/components/NowPlaying')
        },
        {
            path : 'comingsoon',
            component : () => import('@/components/ComingSoon')
        },
        {
            path : 'search',
            component : () => import('@/components/Search')
        },
        {
            path : 'detail/1/:movieId',  //动态获取路由
            components : {
                default : () => import('@/components/NowPlaying'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : 'detail/2/:movieId',  //动态获取路由
            components : {
                default : () => import('@/components/ComingSoon'),
                detail : ()=> import('@/views/Movie/detail')
            },
            props : {
                detail : true
            }
        },
        {
            path : '/movie',
            redirect : '/movie/nowplaying'
        },
    ]
}