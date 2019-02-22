var beiMiCommon = require("common");
cc.Class({
    extends: beiMiCommon,
    properties: {
    },

    onLoad: function () {
        /**
         * 适配屏幕尺寸
         */
        this.resize();
    },
    onClickDizhu:function(){
        this.loadding();
        let object = this ;
        setTimeout(function(){
            object.scene("dizhu" , object) ;
        } , 200);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
