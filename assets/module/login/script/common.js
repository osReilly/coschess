var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,

    // use this for initialization
    onLoad: function () {

    },
    login:function(){
        this.io = require("IOUtils");
        this.loadding();
        this.connect();
	},
    // sucess:function(result , object){
    //     var data = JSON.parse(result) ;
    //     if(data!=null && data.token!=null && data.data!=null){
    //         //放在全局变量
    //         object.reset(data , result);
    //         cc.beimi.gamestatus = data.data.gamestatus ;
    //         /**
    //          * 登录成功后即创建Socket链接
    //          */
    //         object.connect();
    //         //预加载场景
    //         if(cc.beimi.gametype!=null && cc.beimi.gametype != ""){//只定义了单一游戏类型 ，否则 进入游戏大厅
    //             object.scene(cc.beimi.gametype , object) ;
    //         }else{
    //             /**
    //              * 暂未实现功能
    //              */
    //         }
    //     }
    // },
    // error:function(object){
    //     object.closeloadding(object.loaddingDialog);
    //     object.alert("网络异常，服务访问失败");
    // }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
