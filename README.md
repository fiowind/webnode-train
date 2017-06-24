## 开发指南

Isomorphic rendering with React, Redux, React-router and Redux-router

### 检出代码

```
git clone https://git@icode.baidu.com/baidu/bce-console/bce-console-r-iotdm && cd bce-console-r-iotdm
npm i
```

### 启动本地服务器（使用mock数据）

```
# 启动本地node服务
npm run dev
# 开一个新的terminal，启动前端调试服务
npm run develop
```
访问 localhost:8080

### 预览线上效果（不使用mock数据，push代码前请确认npm start下的服务启动正确）

```
# 启动完整服务
npm start
```
访问  localhost:8103

### 启动参数
1. NODE_ENV=development/production  development时使用mock数据，production时会使用线上数据
2. NODE_CONFIG_DIR=conf  conf文件本地路径
3. gulp中的proxy地址可以修改，用于 run develop 的调试

### 目录介绍

1. client 通用的模板
2. common 前端主代码
3. server node服务
4. conf 配置文件

### log目录
1. error： 错误记录
2. iotdm: 默认服务记录

### 其他
1. antd的样式未设置成按需加载，本地配置文件在common/theme.js
2. 访问 根目录/version.txt 看部署版本
3. 热加载可在gulp中关闭
4. 现在使用feature first的代码结构
5. common/constant 里集合前端的相关配置文件