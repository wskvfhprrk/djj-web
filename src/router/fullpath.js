// import Abstract from '../views/common/abstract.vue';

export default [{
  path: '/',
  name: '首页',
  // redirect:'indexView',
  component: (resolve) => require(['@/views/index.vue'], resolve),
  children: [{
    path: '/role',
    name: '角色管理',
    meta: {
      name: '角色管理'
    },
    component: (resolve) => require(['@/views/sys/roles/roles.vue'], resolve)
  },{
    path: '/user',
    name: '人员管理',                     //票种批次新增
    meta: {
      name: '人员管理'
    },
    component: (resolve) => require(['@/views/sys/user/index.vue'], resolve)
  },{
    path: '/menu',
    name: '菜单管理',                     //菜单管理
    meta: {
      name: '菜单管理'
    },
    component: (resolve) => require(['@/views/sys/menu/index.vue'], resolve)
  },{
    path: '/businessDistrict',
    name: '商圈',                     //商圈
    meta: {
      name: '商圈'
    },
    component: (resolve) => require(['@/views/businessDistrict/index.vue'], resolve)}
,{
    path: '/shop',
    name: '商店',                     //商店
    meta: {
      name: '商店'
    },
    component: (resolve) => require(['@/views/shop/index.vue'], resolve)}
,{
    path: '/shopUser',
    name: '商店管理员',                     //商店管理员
    meta: {
      name: '商店管理员'
    },
    component: (resolve) => require(['@/views/shopUser/index.vue'], resolve)}
,{
    path: '/sysDept',
    name: '商店部门管理',                     //商店部门管理
    meta: {
      name: '商店部门管理'
    },
    component: (resolve) => require(['@/views/sysDept/index.vue'], resolve)}
,{
    path: '/coupon',
    name: '代金券',                     //代金券
    meta: {
      name: '代金券'
    },
    component: (resolve) => require(['@/views/coupon/index.vue'], resolve)}
,{
    path: '/couponHistory',
    name: '代金券历史',                     //代金券历史
    meta: {
      name: '代金券历史'
    },
    component: (resolve) => require(['@/views/couponHistory/index.vue'], resolve)}
,{
    path: '/couponStock',
    name: '代金券明细',                     //代金券明细
    meta: {
      name: '代金券明细'
    },
    component: (resolve) => require(['@/views/couponStock/index.vue'], resolve)}
,{
    path: '/goods',
    name: '商品',                     //商品
    meta: {
      name: '商品'
    },
    component: (resolve) => require(['@/views/goods/index.vue'], resolve)}
,{
    path: '/indexCoupon',
    name: '首页促销代金券',                     //首页促销代金券
    meta: {
      name: '首页促销代金券'
    },
    component: (resolve) => require(['@/views/indexCoupon/index.vue'], resolve)}
,{
    path: '/indexImages',
    name: '轮播图',                     //轮播图
    meta: {
      name: '轮播图'
    },
    component: (resolve) => require(['@/views/indexImages/index.vue'], resolve)}
,{
    path: '/indexShop',
    name: '首页促销店铺',                     //首页促销店铺
    meta: {
      name: '首页促销店铺'
    },
    component: (resolve) => require(['@/views/indexShop/index.vue'], resolve)}
,{
    path: '/member',
    name: '会员',                     //会员
    meta: {
      name: '会员'
    },
    component: (resolve) => require(['@/views/member/index.vue'], resolve)}
,{
    path: '/memberOperationHistory',
    name: '会员操作记录历史',                     //会员操作记录历史
    meta: {
      name: '会员操作记录历史'
    },
    component: (resolve) => require(['@/views/memberOperationHistory/index.vue'], resolve)}
,{
    path: '/operationType',
    name: '操作类型',                     //操作类型
    meta: {
      name: '操作类型'
    },
    component: (resolve) => require(['@/views/operationType/index.vue'], resolve)}
,{
    path: '/reportSite',
    name: '定位信息上报',                     //定位信息上报
    meta: {
      name: '定位信息上报'
    },
    component: (resolve) => require(['@/views/reportSite/index.vue'], resolve)}
,{
    path: '/scheduleJob',
    name: '定时任务',                     //定时任务
    meta: {
      name: '定时任务'
    },
    component: (resolve) => require(['@/views/scheduleJob/index.vue'], resolve)}
,{
    path: '/scheduleJobLog',
    name: '定时任务日志',                     //定时任务日志
    meta: {
      name: '定时任务日志'
    },
    component: (resolve) => require(['@/views/scheduleJobLog/index.vue'], resolve)}
    ,{
      path: '/picture',
      name: '图片管理',                     //图片管理
      meta: {
        name: '图片管理'
      },
      component: (resolve) => require(['@/views/picture/index.vue'], resolve)}
  
  
  ]
}];
