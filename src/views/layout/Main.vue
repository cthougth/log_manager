<template>
    <el-container class="tc-container">
        <router-view></router-view>

        <!--侧边栏悬浮-->
        <div class="tc-advice">
            <div class="tc-advice-menu">
                <i class="iconfont icon-serve"></i>
                <span>在线客服</span>
            </div>
            <div class="tc-advice-items">
                <a :href="baiduBridgeUrl" target="_blank" class="clearfix">
                    <i class="iconfont icon-kefu"></i>
                    <div class="tc-advice-items-desc">
                        <strong>在线人工客服</strong>
                        <p>提供7*24小时全天候的服务</p>
                    </div>
                </a>
                <a href="javascript:;" class="clearfix">
                    <i class="iconfont icon-dianhua"></i>
                    <div class="tc-advice-items-desc">
                        <strong>全国咨询热线</strong>
                        <p>服务热线：400-617-3599</p>
                    </div>
                </a>
            </div>
        </div>
        <!--侧边栏悬浮 end-->
    </el-container>
</template>

<script>
import config from "@/util/config"

export default {
    data(){
        return {
            baiduBridgeUrl: config.customerServer
        };
    }
}
</script>

