module.exports = {
  configureWebpack: {
    externals:{//打包时  cdn 配置
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      "element-ui": "ELEMENT",
      'axio':'axios',
      'echarts': 'echarts',
    },

},
    productionSourceMap: false,//去除谷歌js 调试处理文件
    outputDir: 'docs',       //打包目标路径
    baseUrl: process.env.NODE_ENV === 'production'
      ? '/'
      : '/',
    devServer: {            //跨域配置    拦截/api 开头的请求
    	proxy: {
    		'/AlipayAward': {
          target:'http://127.0.0.1:8080',
          // target:'http://192.168.166.180:8781',
          // target:'http://192.168.166.181:11000',
          // target:'http://192.168.5.180:8080',
          // target:'http://192.168.166.25:8080',
          // target:'http://192.168.166.52:8080',

           // target:'http://192.168.5.170:8080',
    			changeOrigin: true,
          ws: true,
          // pathRewrite:{
          //   'AlipayAward':""
          // }
        },
      }
    }
  }
