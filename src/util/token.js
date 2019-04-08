import Cookie from './cookie.js';
import Api from './api.js';

let tokenName = 'access_token';
let refreshTokenName = 'refresh_token';
export default {
    getToken(){
        if(Cookie.check(tokenName)){
            return Cookie.get(tokenName);
        }else{
            return null;
        }
    },

    checkToken(){
        return Cookie.check(tokenName);
    },

    checkRefreshToken(){
        return Cookie.check(refreshTokenName);
    },

    getRefreshToken(){
        return Cookie.get(refreshTokenName);
    },

    refreshToken(){
        return new Promise(function(resolve,reject){
            if(Cookie.check(refreshTokenName)){
                Api.get({
                    r : 'member/token/refresh-token',
                    refreshToken : Cookie.get(refreshTokenName),
                },false).then((response) => {
                    let result = response.data;
                    if(result.code == Api.successCode){
                        let data = result.data;
                        Cookie.set(tokenName,data.token,data.tokenSaveTime);
                        Cookie.set(refreshTokenName,data.refreshToken,data.refreshSaveTime);
                        resolve();
                    }else{
                        reject();
                    }
                });
            }else{
                reject();
            }
        });
    },
};
