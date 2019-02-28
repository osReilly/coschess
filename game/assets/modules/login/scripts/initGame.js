cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _progress:0.0,
        _splash:null,
        _isLoading:false,
        loaddingPrefab: {
            default: null,
            type: cc.Prefab
        },
        alertPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            var canvas = this.node.getComponent(cc.Canvas);
            canvas.fitHeight = true;
            canvas.fitWidth = true;
        }
        let win = cc.winSize() ;
        cc.view.setDesignResolutionSize(win.width, win.height, cc.ResolutionPolicy.EXACT_FIT);
        this.initMgr();

    },
    initMgr:function(){
        if(cc.beimi == null){
            /**
             * 增加了游戏全局变量控制，增加了 cc.beimi.gamestatus 参数，可选值：ready|notready|playing
             * @type {{}}
             */
            cc.beimi = {};
            cc.beimi.routes = {} ;
            cc.beimi.event = {}
            cc.beimi.http = require("HTTP");
            cc.beimi.token = "";
            cc.beimi.gamestatus = "none" ;



            cc.beimi.dialog = null ;   //弹出的提示对话框，  alert
            cc.beimi.openwin = null ;  //弹出的对话窗口，    设置、玩法、战绩等等
            cc.beimi.loading = new cc.NodePool();
            cc.beimi.loading.put(cc.instantiate(this.loaddingPrefab)); // 创建节点
            cc.beimi.dialog = new cc.NodePool();
            cc.beimi.dialog.put(cc.instantiate(this.alertPrefab)); // 创建节点
            cc.beimi.game = {
                model : null ,
                playway : null,
                type:function(name){
                    var temp ;
                    if(cc.beimi.games !=null){
                        for(var i=0 ; i<cc.beimi.games.length ; i++){
                            var gamemodel = cc.beimi.games[i] ;
                            for(var inx = 0 ; inx < gamemodel.types.length ; inx++){
                                var  type = gamemodel.types[inx] ;
                                if(type.code == name){
                                    temp = type ;
                                }
                            }
                        }
                    }
                    return temp ;
                }
            };

            var Audio = require("Audio");
            cc.beimi.audio = new Audio();
            cc.beimi.audio.init();

            var SocketIO = require("socket.io");
            window.io = new SocketIO();

            cc.beimi.audio.playBGM("bgMain.mp3");

            cc.Button.prototype.touchEndedClone = cc.Button.prototype._onTouchEnded ;
            cc.Button.prototype._soundOn = true ;
            cc.Button.prototype.setSoundEffect = function(on){
                this._soundOn = on ;
            }
            cc.Button.prototype._onTouchEnded = function(event){
                if(this.interactable && this.enabledInHierarchy && this._pressed && this._soundOn == true){
                    /**
                     * 播放声效
                     */
                    cc.beimi.audio.playSFX("select.mp3");
                }
                this.touchEndedClone(event) ;
            }
        }
    }

});
