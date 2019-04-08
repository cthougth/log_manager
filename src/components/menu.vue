<template>
    <div class="page-menu">
        <ul class="menu clearfix">
            <li class="menu-item" v-for="(item,index) in menus">
                <router-link :to="item.to" v-if="item.name == focus" class="menu-item-link active">{{ item.label }}</router-link>
                <router-link :to="item.to" v-else class="menu-item-link">{{ item.label }}</router-link>
            </li>
        </ul>
    </div>
</template>

<style>
    .menu{
        border-bottom: 2px solid #e6e9f0;
    }
    .menu-item {
        float: left;
        margin-bottom: -2px;
    }
    .menu-item:not(:first-child){
        margin-left: 50px;
    }
    .menu-item-link{
        display: block;
        font-size: 14px;
        padding: 0px 2px 15px 2px;
        border-bottom: 2px solid transparent;
        color: #60636A;
        text-decoration: none;
    }
    .menu-item-link.active{
        color: #1989fa;
        border-bottom-color: #1989fa;
    }
</style>

<script>
    export default {
        date(){
            return {};
        },

        methods : {

        },

        props : {
            focus : {type : String},
            menus : {type : Array},
        }
    }
</script>
