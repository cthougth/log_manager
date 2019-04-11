<template>
    <el-aside  width="200px" class="tc-aside">
        <el-menu default-active="1" class="el-menu-vertical-demo">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="1-1-1">
                    <router-link :to="{path : '/article/add'}">写文章</router-link>
                </el-menu-item>
                <el-menu-item index="1-1-2">
                    <router-link :to="{name : 'articleList'}">文章列表</router-link>
                </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>分类管理</span>
                </template>
                <el-menu-item index="2-1-1">
                    <router-link :to="{path : '/category'}">分类管理</router-link>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    import config from '@/util/config.js';

    export default {
        created(){

        },
        data(){
            return {};
        },
        methods : {
            gotoUpgrade(){
                window.open(config.pcWeb.hostUrl + 'member/grade.php');
            },
        }
    }
</script>


