一般我们是多个项目同时开发，但是配置文件都是一样的。 

开发过程中使用监听功能动态处理 sass、es6、tpl文件，并在某些类型文件发生变化时自动刷新浏览器

开发完毕后把文件（css，js）打包、压缩，图片压缩，图片加上md5，图片base64,图片压缩，减少在生产环境下的文件大小及数量。


#启动监听
>gulp work  --name project01(项目名字，在project下)

#发布项目
>gulp publish  --name project01(项目名字，在project下)
