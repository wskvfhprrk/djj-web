<style scoped>
    .Contentflex {
        flex-direction: row;
    }

    .g-statues-bar {
        position: fixed;
        z-index: 90;
        top: 35px;
        left: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        margin-left: 11%;
        padding-left: 40px;
        background: #fff;
    }

    .g-statues-bar .bread {
        line-height: 30px;
    }

    .g-side {
        position: fixed;
        z-index: 90;
        top: 0;
        left: 0;
        box-sizing: border-box;
        width: 230px;
        height: 100%;
        padding-top: 55px;
        border-right: 1px solid #dedede;
        overflow-y: auto;
    }

    .g-head {
        position: fixed;
        z-index: 91;
        top: 0;
        left: 0;
        width: 100%;
        height: 35px;
        line-height: 35px;
        background: #409EFF;
    }

    .logo {
        float: left;
        text-align: left;
        width: 270px;
        font-size: .8em;
        text-decoration: none;
        color: #fff;
        padding-left: 20px
    }

    .nav {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        -ms-flex: 1;
        flex: 1;
    }

    .usermenu {
        float: right;
        padding: 0 2em;
        color: #fff;
    }

    .usermenu a {
        text-decoration: none;
        margin: 0 0.2em 0 1em;
        color: inherit;
    }

    #main {
        height: 90vh;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .clea {
        clear: both;
    }

    .leftMenu {
        width: 10%;
        height: 100vh;
        margin-top: 35px;
        position: fixed;
        background: #07192b !important
    }

    .leftMenu ul {
        overflow: hidden;
        padding-bottom: 100px;
    }

    .rowContent {
        width: 88%;
        margin-top: 50px;
        position: absolute;
        left: 11%;
    }
</style>

<template>
    <el-container class='Contentflex'>
        <!-- 用户信息 -->
        <el-header>
            <el-row type="flex" class="g-head">
                <a target="_blank" title="首页" class="logo">花博会主题彩票纪念册营销活动抽奖验证系统</a>
                <div class="nav">
                    <div class="usermenu">
                        欢迎您：{{user?user.username:''}}
                        <router-link :to="{path: '/'}"><i class="el-icon-location"></i>首页</router-link>
                        <a href="javascript:;" @click="editPassword"><i class="el-icon-edit"></i>修改密码</a>
                        <a href="javascript:;" @click="logout"><i class="el-icon-circle-close"></i>退出</a>
                    </div>
                </div>
            </el-row>
        </el-header>
        <!-- 菜单部分  indexView 为首页展示页面-->
        <el-aside width="11%" class="leftMenu">
            <el-menu :router="true"
                     :default-active="$route.path"

            >
                <!-- 判断一级菜单是否有子节点 -->
                <el-submenu :index="'/'+child1.menuId" v-for="child1 in this.$root.menuData" :key="child1.menuId"
                            v-if="!child1.children.length">
                    <!-- <i> </i> 此处可控制菜单图标-->
                    <span slot="title">{{child1.name}}</span>
                </el-submenu>
                <el-submenu :index="'/'+child1.menuId" v-for="child1 in this.$root.menuData" :key="child1.menuId"
                            v-if="child1.children.length">
                    <!--判断如果二级菜单没有子节点 -->
                    <el-menu-item :index="'/'+child2.url" v-for="child2 in child1.children" :key="child2.menuId"
                                  v-if="!child2.children.length">{{child2.name}}
                    </el-menu-item>
                    <template slot="title" v-if="child1.children.length">
                        <!-- <i></i>配置图标 -->
                        <span slot="title">{{child1.name}}</span>
                    </template>
                    <!-- 判断如果二级菜单存在子菜单 -->
                    <el-menu-item-group :index="'/'+child2.url" v-for="child2 in child1.children" :key="child2.menuId"
                                        v-if="child2.children.length">
                        <template slot="title"><span slot="title">{{child2.name}}</span></template>
                        <!-- 三级菜单 -->
                        <el-menu-item :inde="'/'+child3.url" v-for="child3 in child2.children"
                                      :key="child3.menuId.length">
                            {{child3.name}}
                        </el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!--   <template v-for="(route, index) in menus">
            <template v-if="route.children">
              <el-submenu :key="index" :index="route.name">
                <template slot="title">
                  {{route.meta.name || route.name}}</template>
                <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute"><i class="ion menuIcon" v-html="cRoute.meta.icon"></i>{{cRoute.meta.name || cRoute.name}}</el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :route="route" :index="route.name" :key="'nav'+index">{{route.meta.name || route.name}}</el-menu-item>
            </template>
          </template> -->
        <!-- </el-menu> -->
        <el-main class="rowContent">
            <!-- 面包屑 start-->
            <div class="g-statues-bar p-lr">
                <el-breadcrumb separator="/" class="bread" id="mybread">
                    <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
                        {{ item.name || item.meta.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 面包屑 end  -->
            <template class='clea' v-if="$route.path=='/'">
                <dashboard/>
            </template>
            <template v-else>
                <router-view id="main"></router-view>
            </template>
        </el-main>
        <el-footer>系统</el-footer>
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="30%" center="true">
            <div>
                <el-form :model="form" style="overflow:hidden" :rules="rules" ref="ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-form-item label="原 密 码：" :label-width="formLabelWidth">
                                <el-input v-model="form.oldPass" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="新 密 码：" :label-width="formLabelWidth">
                                <el-input v-model="form.newPass" autocomplete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer" style="text-align:center;">
                    <el-button type="primary" @click="editPass">确 定</el-button>
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </el-container>
</template>
<script>
    import instance from "../api";
    import * as order from "../api/account";
    import echarts from 'echarts';

    export default {
        data() {
            return {
                user: this.$root.userData,
                menus: this.$root.menuData,
                defaultOpeneds: [],
                dialogFormVisible: false,
                form: {},
                formLabelWidth: '120px',
            };
        },
        computed: {
            activeMenu: function () {
                return this.$route.name
            },
            breadcrumbs: function () {
                return (this.$route && this.$route.matched) || []
            }
        },
        methods: {
            logout: function () {
                this.$confirm("确定退出?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "info"
                })
                    .then(() => {
                        this.$emit("logout");
                    })
                    .catch(() => {
                    });
            },
            open(key, keyPath) {
                // alert(1)
                this.defaultOpeneds.push(keyPath)
            },
            editPassword() {
                var vm = this;
                vm.dialogFormVisible = true;
            },
            editPass() {
                var vm = this;
                if (!vm.form.oldPass || !vm.form.newPass) {
                    vm.$message.error("请输入原密码和新密码后点击修改")
                    return false
                }
                var param = {
                    oldPassword: vm.form.oldPass,
                    newPassword: vm.form.newPass
                }
                order.edit.r(param).then(res => {
                    vm.dialogFormVisible = false;
                    if (res.data.success) {
                        vm.$message.success('密码修改成功,请重新登陆')
                        vm.$emit("logout");
                    } else {
                        vm.$message.error(res.data.msg)
                    }
                })
            },
            close(key, keyPath) {
                var s = null;
                for (var i = 0; i < this.defaultOpeneds.length; i++) {
                    if (this.defaultOpeneds[i] == keyPath) {
                        s = i
                    }
                }
                this.defaultOpeneds.slice(s, 1)
            }
        },
        created: function () {
            // if (!this.user) {
            // this.$router.push({ path: "/login" });
            // }
        }
    };
</script>
