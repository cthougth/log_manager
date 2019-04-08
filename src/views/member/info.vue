<template>
    <el-main class="page-view">
        <!--page-header-->
        <div class="page-header clearfix">
            <h2 class="page-header-title pull-left">我的账号</h2>
        </div>
        <!--page-header-->

        <!--page-menu-->
        <tc-menu :menus="menus" focus="CompanyInfo"></tc-menu>
        <!--page-menu end-->

        <!--page-content-->
        <div class="page-content">
            <el-form ref="form" :model="form" label-width="180px">
                <el-form-item label="用户名：">
                    <span class="form-item-val">{{ form.username }}</span>
                </el-form-item>

                <el-form-item label="昵称：">
                    <el-col :span="6">
                        <el-input v-model="form.nickname"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="真实姓名：">
                    <el-col :span="8">
                        <span class="form-item-val">{{ form.truename }}</span>
                        <el-tag class="mar-lft-10" type="info" size="small" v-if="form.vtruename == '0'">未实名认证</el-tag>
                        <el-tag class="mar-lft-10" type="success" size="small" v-else>已实名</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authName'}" v-if="form.vtruename == '0'">实名认证</router-link>
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authName'}" v-else>修改真实姓名</router-link>
                    </el-col>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="1">先生</el-radio>
                        <el-radio label="0">女士</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="手机号码：">
                    <el-col :span="8">
                        <span class="form-item-val">{{ form.mobile }}</span>
                        <el-tag class="mar-lft-10" type="info" size="small" v-if="form.vmobile == '0'">未认证</el-tag>
                        <el-tag class="mar-lft-10" type="success" size="small" v-else>已认证</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authMobile'}" v-if="form.vmobile == '0'">手机认证</router-link>                       </router-link>
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authMobile'}" v-else>修改手机</router-link>
                    </el-col>
                </el-form-item>

                <el-form-item label="电子邮箱：">
                    <el-col :span="8">
                        <span class="form-item-val">{{ form.email }}</span>
                        <el-tag class="mar-lft-10" type="info" size="small" v-if="form.vemail == '0'">未认证邮箱</el-tag>
                        <el-tag class="mar-lft-10" type="success" size="small" v-else>已认证</el-tag>
                    </el-col>
                    <el-col :span="4">
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authEmail'}" v-if="form.vemail == '0'">邮箱认证</router-link>                       </router-link>
                        <router-link class="el-button el-button--small el-button--primary is-plain" :to="{ name : 'authEmail'}" v-else>修改邮箱</router-link>
                    </el-col>
                </el-form-item>

                <el-form-item label="所在地区：">
                    <el-col :span="6">
                        <area-select :areaid="form.areaid" @change="handleAreaChange"></area-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="联系地址：">
                    <el-col :span="10">
                        <el-input v-model="form.address"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="邮政编码：">
                    <el-col :span="6">
                        <el-input v-model="form.postcode"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="QQ：">
                    <el-col :span="6">
                        <el-input v-model="form.qq"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色：">
                    <el-col :span="6">
                        <el-input v-model="form.role"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="editMemberInfo">修改</el-button>
                    <el-button type="reset">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--page-content-->

    </el-main>
</template>
<style>

</style>
<script>
    import info from '@/model/memberInfo/info.js';
    import member from '@/model/member.js';
    import areaSelect from '@/components/areaSelect.vue';

    export default {
        created(){
            this.buildMemberInfo();
        },
        data(){

            return {
                menus : info.menus,
                form : {

                },
            };
        },
        methods : {
            buildMemberInfo(){
                member.memberInfo().then((result) => {
                    result.areaid = parseInt(result.areaid);
                    this.form = result;
                });
            },
            handleAreaChange(areaid){
                this.form.areaid = areaid;
            },
            editMemberInfo(){
                this.$confirm('确定修改?').then(() => {
                    info.editInfo(this.form).then((result) => {
                        this.$message({message : '修改成功'});
                    });
                });
            },
        },
        components : {
            'area-select' : areaSelect,
        },
    }
</script>
