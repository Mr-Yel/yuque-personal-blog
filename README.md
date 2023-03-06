# 个人博客小程序

[![uniapp](https://img.shields.io/badge/-uniapp-orange)](https://uniapp.dcloud.net.cn/)
[![vue/cli@4](https://img.shields.io/badge/-@vue/cli%40v4-brightgreen)](https://cn.vuejs.org/)
![npm](https://img.shields.io/badge/-npm-brightgreen)

  支持微信小程序，查看语雀文档、查看阅读总数等功能，后续会开启更多功能;

基于[uniapp](https://uniapp.dcloud.net.cn/quickstart-cli.html) + [语雀API](https://www.yuque.com/yuque/developer/api) 构建个人博客微信小程序。语雀API接口免费使用每个用户（基于Token 关联到的账户），5000次/小时，应该是够用的;

运行注意：
  - 记得修改`src/yuque.json`下的相关配置，将其改为自己的
  - `manifest.json`中的appid修改为自己的；

## 项目运行
```
// 注意：
// 如果全局安装过vue，如果版本不同可能需要移除下，再全局安装
npm install -g @vue/cli@4

yarn install

// 运行
npm run dev:mp-weixin
```

## 小程序二维码

![](./public/static/gh_4766a66c7f8e_258%20(2).jpg)

[MIT License](./LICENSE)

