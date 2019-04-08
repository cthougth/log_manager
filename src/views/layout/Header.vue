<template>
    <el-header class="tc-header">
        <div class="topbar clearfix">
            <h1 class="tc-logo pull-left">
                <router-link :to="{name : 'Index'}">
                    <img class="tc-logo-img" src="../../assets/img/tc-header-logo.png"/>
                    <span class="tc-logo-text">会员中心</span>
                </router-link>
            </h1>

            <ul class="topbar-nav pull-right">
                <li class="class='clearfix'">
                    <router-link to="/index">
                        <i class='iconfont icon-notice-o'></i>
                        <el-badge is-dot class="topbar-nav-text">站内信</el-badge>
                    </router-link>
                </li>

                <li class="clearfix'">
                    <el-dropdown class="topbar-dropdown">
                        <div>
                            <img class="topbar-nav-avatar" src="http://www.tecenet.com/api/avatar/show.php?username=cthought&size=large"/>
                            <span class="topbar-nav-text">cthought<i class="el-icon-arrow-down el-icon--right"></i></span>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><i class="iconfont icon-user-r-o"></i> 账号信息</el-dropdown-item>
                            <el-dropdown-item><i class="iconfont icon-logout-o"></i> 安全退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </div>
    </el-header>
</template>

<script>

    export default {
        data(){
            return {
                username: '',
            };
        },
        created(){

        },
        methods: {
            logout(){
                this.$router.push({name: 'Login'});
            },

        },

    };

</script>


