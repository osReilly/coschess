// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, function(e){
            e.stopPropagation();
        });
        /**
         * 关闭ALERT的回调动作
         */
        this.node.on("close", function (event) {
            if(cc.beimi!=null && cc.beimi.sessiontimeout == true){
                cc.beimi.sessiontimeout = null;
                self.scene("login" , self) ;
            }
            event.stopPropagation();
        });
    },
    onClose(){
        let dialog = cc.find("Canvas/alert") ;
        cc.beimi.dialog.put(dialog);
        this.node.dispatchEvent( new cc.Event.EventCustom("close", true) );
    }
});
