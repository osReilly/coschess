var beiMiCommon = require("BeiMiCommon");
cc.Class({
    extends: beiMiCommon,
    properties: {
    },
    onLoad: function () {
    },
    back:function(){
        this.loadding();
        let self = this;
        if(this.ready()){
            cc.beimi.socket.emit("break_room",{user:cc.beimi.user});
            self.scene('room',self)
        }
    }
});
