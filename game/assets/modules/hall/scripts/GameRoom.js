var beiMiCommon = require("common");
cc.Class({
    extends: beiMiCommon,
    properties: {
        roomidDialog: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {

    },
    onClick:function(event, data){
        this.loadding();
        let object = this ;
        setTimeout(function(){
            object.scene(data , object) ;
        } , 200);
    },
    onClickJoinRoom:function(){
        if(this.roomidDialog){
            cc.beimi.openwin = cc.instantiate(this.roomidDialog) ;
            cc.beimi.openwin.parent = this.root();
        }
    }
});
