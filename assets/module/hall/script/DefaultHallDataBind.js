var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,
    properties: {
        username: {
            default: null,
            type: cc.Label
        },
        goldcoins: {
            default: null,
            type: cc.Label
        },
        cards: {
            default: null,
            type: cc.Label
        }
        ,
        girl:{
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        let self = this ;
        if(this.ready()){
            this.username.string = cc.beimi.user.nickname ;
            this.pva_format(cc.beimi.user.integral , cc.beimi.user.roomCard ,  self);
            this.pvalistener(self , function (context) {
                context.pva_format(cc.beimi.user.integral , cc.beimi.user.roomCard , context) ;
            });
        }
    },
    pva_format:function(coins, cards  , object){
        if(coins > 9999){
            var num = coins / 10000  ;
            object.goldcoins.string = num.toFixed(2) + '万';
        }else{
            object.goldcoins.string = coins;
        }
        object.cards.string = cards + "张" ;
    },
    playToLeft:function(){
        this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
        this._girlAnimCtrl.play("girl_to_left");
    },
    playToRight:function(){
        this._girlAnimCtrl = this.girl.getComponent(cc.Animation);
        this._girlAnimCtrl.play("girl_to_right");
    },
    onDestroy:function(){
        this.cleanpvalistener() ;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
