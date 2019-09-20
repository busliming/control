# control-front
## 简介
```
一个使用vue-cli@3 + elementUI + vuex + vue router + axios 搭建的后台管理系统。
用到的技术：高级路由组件、全局路由守卫、请求拦截/响应拦截等。

权限控制暂时未完成，待后续更新。

开发备注：避免java及其他前端同事维护困难，迭代新视图时不要对elementUI组件进行再次封装。
```

## 快速上手

#### 0、https://nodejs.org/zh-cn/   下载安装nodeJS
```
略 😆😆
```

#### 1、验证安装成功:
```
node -v
* 在任意路径输入命令行命令，能显示版本号为正确安装
```

#### 2、git克隆项目到本地
```
略 😆😆
```

#### 3、命令行进入项目文件夹
```
cd control-front
* 包含package.json文件的文件夹
```

#### 4、安装依赖
```
npm i
* npm install的简写
* 随着功能的扩充，依赖包会逐渐增加，重复运行该命令会自动安装本项目没有安装过的依赖
```

#### 5、本地开发：
```
npm start

* 启动后所有接口请求默认代理转发到vue.config.js文件里的target里。比如：target:'http://puat2.agent.com:9092'
* 启动后依据终端提示 App running at: 的路径即可本地访问该web应用
* 默认端口8080会与java本地服务account-service的8080端口一致，如果先启动web应用，会导致account-service无法启动，先启动account-service再启动control-front则正常
```


## 目录说明 (待更新)
```
├─ src
    ├─ assets           静态资源 背景图片及自定义图标等
    ├─ request          接口请求集合
    │   ├─ gameManage         游戏管理请求方法集合
    │   ├─ gameRoomManage     厅主管理请求方法集合
    │   ├─ homePage           首页请求方法集合
    │   ├─ login              登录方法
    │   ├─ reportQuery        投注记录请求方法集合
    │   ├─ siteInfoManage     站内消息请求方法集合
    │   ├─ siteManage         站点管理请求方法集合
    │   ├─ systemSettings     系统配置请求方法集合
    │   │   ├─ AccountsManage           总控账号管理
    │   │   ├─ ActivitiesLog            操作日志
    │   │   ├─ AgentMenuSettings        代理菜单管理、总控菜单管理
    │   │   ├─ BankingControl           终端银行控制
    │   │   ├─ GlobalParameter          全局参数
    │   │   ├─ PaymentSettings          支付入款配置
    │   │   ├─ RoleManage               角色管理
    │   │   └─ WithdrawalSettings       支付出款配置
    │   └─ index.js          request主入口 封装axios 全局拦截
    ├─ tools            工具类模块
    │   ├─ formatter.js        格式转换方式
    │   ├─ formData.js       formData数据处理
    │   ├─ tableHeight.js    表格高度计算方式
    │   └─ regexp.js         表单验证规则
    ├─ views            视图集合
    │   ├─ gameManage        游戏管理
    │   │   ├─ GameManage.vue           游戏列表
    │   │   └─ RoomList.vue             游戏房间列表
    │   ├─ gameRoomManage    厅主管理
    │   │   ├─ GameList.vue             厅主游戏列表
    │   │   ├─ GameRoomManage.vue       厅主列表
    │   │   ├─ GameRecord.vue           游戏记录
    │   │   ├─ RoomList.vue             厅主房间列表
    │   │   ├─ childAccountList.vue     下级列表
    │   │   └─ defaultRoomSettings.js   默认房间配置
    │   ├─ HomePage.vue      首页
    │   │   ├─ components    首页的部件     
    │   │   │   ├─ Counter.vue          总数和日均的盈亏，出入款，有效下注
    │   │   │   ├─ StatisticTable.vue   统计表
    │   │   │   └─ VChart.vue           图形
    │   │   └─ HomePage.vue
    │   ├─ LayoutComponents   页面布局子组件
    │   │   ├─ HeaderNavBar.vue         顶部导航栏组件
    │   │   ├─ HeaderNavItems.js        子组件整合入口
    │   │   ├─ MainContents.vue         主功能布局
    │   │   └─ SideNavBar.vue           左侧导航栏布局
    │   ├─ profile            个人资料(暂无接口)
    │   │   └─ ProfileSettings.vue      个人资料
    │   ├─ reportQuery        报表查询
    │   │   ├─ components               游戏详情组件集合
    │   │   │   ├─ BaiRenNiuNiu.vue          百人牛牛
    │   │   │   ├─ BenChiBaoMa.vue           奔驰宝马
    │   │   │   ├─ DeZhou.vue                德州扑克
    │   │   │   ├─ DouDiZhu.vue              斗地主
    │   │   │   ├─ ErBaGang.vue              二八杠
    │   │   │   ├─ ErRenPinShi.vue           二人拼十
    │   │   │   ├─ ErShiYiDian.vue           21点
    │   │   │   ├─ FeiQinZouShou.vue         飞禽走兽
    │   │   │   ├─ HongHeiDaZhan.vue         红黑大战
    │   │   │   ├─ HuanLe30Miao.vue          欢乐30秒
    │   │   │   ├─ JinChanBuYu.vue           金蟾捕鱼
    │   │   │   ├─ QiangZhuangNiuNiu.vue     抢庄牛牛
    │   │   │   ├─ QiangZhuangPaiJiu.vue     抢庄牌九
    │   │   │   ├─ SanGong.vue               三公
    │   │   │   ├─ ShiSanShui.vue            十三水
    │   │   │   ├─ TongBiNiuNiu.vue          通比牛牛
    │   │   │   ├─ YaoYiYao.vue              摇一摇
    │   │   │   ├─ YaZhuangLongHu.vue        压装龙虎
    │   │   │   └─ ZhaJinHua.vue             扎金花
    │   │   ├─ BetDetail.vue            投注详情
    │   │   ├─ BetRecord.vue            投注记录
    │   │   ├─ MemberReport.vue         会员报表
    │   │   ├─ MemberReportDetail.vue   会员报表详情
    │   │   └─ queryDate.js             获取时间方法   
    │   ├─ siteInfoManage     站内消息
    │   │   └─ SiteInfoManage.vue       消息列表
    │   ├─ siteManage         站点管理
    │   │   ├─ DomainBinding.vue        域名绑定
    │   │   ├─ DownloadConf.vue         下载配置
    │   │   └─ SiteManage.vue           站点列表
    │   ├─ systemSettings     系统配置
    │   │   ├─ AccountsManage.vue       总控账号管理
    │   │   ├─ ActivitiesLog.vue        操作日志
    │   │   ├─ AgentMenuSettings.vue    代理菜单管理
    │   │   ├─ BankingControl.vue       终端银行控制
    │   │   ├─ GlobalParameter.vue      全局参数
    │   │   ├─ MenuSettings.vue         总控菜单管理
    │   │   ├─ PaymentSettings.vue      支付入款配置
    │   │   ├─ RoleManage.vue           角色管理
    │   │   └─ WithdrawalSettings.vue   支付出款配置
    │   ├─ Layout.vue          首页默认视图,将来用于放置仪表盘
    │   └─ Login.vue           登录界面
    ├─ App.vue                      应用组件入口
    ├─ element-variables.scss       element主色调
    ├─ main.js                      应用主入口
    ├─ router.js                    路由设置 挂载无需权限的同步组件
    └─ store.js                     状态主入口 引入了headernav模块

```
