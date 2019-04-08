import axios from 'axios';
import qs from 'qs';
import Config from '@/util/config.js';
import {Message} from 'element-ui';
import token from '@/util/token.js';
import member from '@/model/member.js';

axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000;
//axios.defaults.withCredentials = true

let successCode = 200;
export default {
    baseUrl: Config.api.baseUrl,
    successCode: successCode,

    openCredentials(){
        axios.defaults.withCredentials = true;
    },

    closeCredentials(){
        axios.defaults.withCredentials = false;
    },

    /**
     * 统一处理所有外部请求
     * @param url
     * @param params
     * @param method
     * @returns {*}
     */
    response: function(url = this.baseUrl, params = {}, method = 'get'){
        let responseFunc = function(method){
            return function(url, params){
                params.token = token.getToken();
                params.userId = member.userId();
                return method == 'post' ?
                    axios.post(url, qs.stringify(params)) :
                    axios.get(url, {params : params});
            };
        };
        let gotoLogin = function(){
            return Promise.reject('need to login');
        };

        return responseFunc(method)(url,params);
        /*
        if(token.checkToken()){
            return responseFunc(method)(url, params);
        }else if(token.checkRefreshToken()){
            return token.refreshToken().then(() => {
                return responseFunc(method)(url,params);
            }).catch(() =>{
                //跳转登录页面
                return gotoLogin();
            });
        }else{
            //跳转登录页面
            return gotoLogin();
        }
        */
    },

    /**
     * 验证接口返回状态码
     * @param response
     * @returns {Promise.<*>}
     */
    checkCode: function(response){
        let result = {};
        (response.data && response.data instanceof String) ? result = JSON.parse(response.data) : result = response.data;
        if(parseInt(result.status) === successCode){
            return result.data;
        }else{
            Message({message: result.message, type: 'warning'});
            return Promise.reject(result.message);
        }
    },

    /**
     * 不验证返回状态，直接输出返回内容
     * @param response
     * @returns {*}
     */
    reback: function(response){
        return response;
    },

    /**
     * get地址请求
     * @param params
     * @param withCheck
     * @returns {Promise.<TResult>}
     */
    get: function(params, withCheck = true){
        //let getUrl = this.baseUrl + '?r=' + params.r;
        let follow = withCheck ? this.checkCode : this.reback;
        //return axios.get(this.baseUrl, {params: params}).then(follow);
        return this.response(this.baseUrl,params,'get').then(follow);
    },

    /**
     * post地址请求
     * @param params
     * @param withCheck
     * @returns {Promise.<TResult>}
     */
    post: function(params, withCheck = true){
        let postUrl = this.baseUrl + '?r=' + params.r;
        let follow = withCheck ? this.checkCode : this.reback;
        //使用qs处理需要提交的参数
        return this.response(postUrl, params, 'post').then(follow);
        //return axios.post(postUrl, params).then(follow);
    },

    /**
     * 上传文件
     * @param file
     * @param name
     * @param params
     * @param withCheck
     * @returns {Promise.<TResult>}
     */
    postFile(file, name, params, withCheck = true){
        let postUrl = this.baseUrl + '?r=' + params.r;
        let follow = withCheck ? this.checkCode : this.reback;
        let formData = new FormData();
        formData.append(name, file);
        Object.getOwnPropertyNames().forEach((key) =>{
            formData.append(key, params[key]);
        });
        return axios.post(postUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(follow);
    },

};
