module.exports = {
    publicPath : '/miaomiao',
    devServer : {
        proxy: {
            '/ajax2' : {
              target : 'http://localhost:3000',
              changeOrigin : true,
            },
            '/ajax': {
              target: 'http://m.maoyan.com',
              // ws: true,
              changeOrigin: true  //是否跨域
            },
            /* '/api2' : {
              target : 'http://localhost:3000',
              changeOrigin : true
            },
            '/api' : {
                target : 'http://192.168.56.1',
                changeOrigin : true
            } */
              // '/foo': {
              //   target: '<other_url>'
              // }
          }
        
    }
}