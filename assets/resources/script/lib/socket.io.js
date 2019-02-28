    //当前已重连次数，超过上限则不再重连，彻底关闭连接
    var curTryNum = 0;
    var maxTryNum = 10;
    var heartCheck = {
    timeout: 5000, //计时器设定为5s
    timeoutObj: null,
    //重置
    reset: function() {
        clearTimeout(this.timeoutObj);
        this.start();
    },
    //开始
    start: function() {
        var self = this;
        this.timeoutObj = setInterval(function() {
            window.cio.send("ping");
            console.log("发送心跳");
        }, this.timeout);
    }
    };
cc.Class({
    extends: cc.Component,
    properties: {
    },
    connect:function(url , options){
         curTryNum = curTryNum + 1;
        let self = this ;
        this.ws = new WebSocket(url);
        window.cio = this.ws;
        this.ws.onopen = function (event) {
           //连接成功时将当前已重连次数归零
            curTryNum = 0;
            console.log("Send Text WS was opened.");
           console.log("心跳检测启动");
           heartCheck.start();
        };
        this.ws.onmessage = function (event) {
            // 无论收到什么信息，说明当前连接正常，将心跳检测的计时器重置
           heartCheck.reset();
            var data = self.parse(event.data) ;
            if(data!=null && data.event != null){
                console.log(cc.beimi.event)
                if(cc.beimi.event[data.event]){
                    cc.beimi.event[data.event](event.data);
                }               
            }
            console.log("response text msg: " + event.data);
        };
        this.ws.onerror = function (event) {
            console.log("Send Text fired an error");
            console.log("连接出错")

        };
        this.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
                if (curTryNum <= maxTryNum) {
                    console.log("连接关闭，5秒后重新连接……");
                    // 5秒后重新连接，实际效果：每5秒重连一次，直到连接成功
                    setTimeout(function () {
                      self.connect(url);
                      console.log('cc.beimi.user----',cc.beimi.user)
                      if(cc.beimi.user){
                          setTimeout(()=>{
                            self.emit('recovery',cc.beimi.user) 
                          },200)
                      } 
                    }, 5000);
                } else {
                     self.alert("连接服务器出错")
                     if(this.loadding) this.closeloadding()
                     console.log("连接关闭，且已超过最大重连次数，不再重连");
                }
        };
        return this;
    },
    on:function(command , func){
        cc.beimi.event[command] =  func ;
    },
    exec:function(command , res){
        if (this.ws.readyState === WebSocket.OPEN) {
            var data = {
                event:command,
                token:cc.beimi.token,
                data:res
            }
            this.ws.send(JSON.stringify(data));
        }
    },
    emit:function(command , data){
        let param = {
            data : data
        } ;
        this.exec(command , param) ;
    },
    disconnect:function(){

    },
    parse:function(result){
        return JSON.parse(result) ;
    },
    loadding:function(){
        if(cc.beimi.loadding.size() > 0){
            this.loaddingDialog = cc.beimi.loadding.get();
            this.loaddingDialog.parent = cc.find("Canvas");

            this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
            var animState = this._animCtrl.play("loadding");
            animState.wrapMode = cc.WrapMode.Loop;
        }
    },
    alert:function(message){
        this.alertForCallBack(message , null);
    },
    alertForCallBack:function(message , func){
        if(cc.beimi.dialog.size() > 0){
            this.alertdialog = cc.beimi.dialog.get();
            this.alertdialog.parent = cc.find("Canvas");
            let node = this.alertdialog.getChildByName("message") ;
            if(node!=null && node.getComponent(cc.Label)){
                node.getComponent(cc.Label).string = message ;
            }
            if(func!=null){
                let temp = this.alertdialog.getComponent("BeiMiDialog") ;
                if(temp!=null){
                    temp.callback(func);
                }
            }
        }
        this.closeloadding();
    },
    closeloadding:function(){
        if(cc.find("Canvas/loadding")){
            cc.beimi.loadding.put(cc.find("Canvas/loadding"));
        }
    },
});
