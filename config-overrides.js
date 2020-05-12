const { override, overrideDevServer, fixBabelImports } = require('customize-cra');
function srtProxy(){
  return config=>{
    let obj={
      proxy:{
        '/api':{
          target:'http://localhost:4000',
          pathRewrite:{'^api':''}
        }
      }
    }
    return Object.assign(config,obj)
  }
}
module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      style: 'css',
    }),
  ),
  devServer:overrideDevServer(
    srtProxy()
  )
}