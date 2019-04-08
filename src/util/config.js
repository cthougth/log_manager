const config = {
    api: {
        hostUrl: '//www.mylog.com',
        baseUrl: '//www.mylog.com/index.php',
        upload: {
            url: '//www.mylog.com/index.php?r=member/ueditor/upload-image',
            name: 'upfile',
        },
    },

    customerServer: 'javascript:window.open(\'http://p.qiao.baidu.com/cps/chat?siteId=3215492&userId=6452136\',\'newwindow\',\'height=530,width=600,top=100,left=200,toolbar=no,menubar=no,scrollbars=no,resizeable=no,lacation=no,status=no\');_hmt.push([\'_trackPageview\', \'/im/qiao\']);',

    pcWeb: {
        hostUrl: 'http://www.tecenet.com/',
    },

    module: {
        4: {id: 4, name: 'company', label: '厂商', dir: 'gongsi'},
        5: {id: 5, name: 'sell', label: '供求', dir: 'gongying', getShowUrl: function(id){ return config.pcWeb.hostUrl + this.dir + '/show-' + id + '.html' }},
        6: {id: 6, name: 'buy', label: '招标', dir: 'zhaobiao'},
        15: {id: 15, name: 'share', label: '共享', dir: 'gongxiang'},
        16: {id: 16, name: 'mall', label: '产品', dir: 'chanpin'},
        21: {id: 21, name: 'article', label: '资讯', dir: 'zixun', getShowUrl: function(id){ return config.pcWeb.hostUrl + this.dir + '/show-' + id + '.html' }},
    },

};

export default config;
