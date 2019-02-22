import { log } from "util";

var curTryNum = 0;
var maxTryNum = 10;
var heartCheck = {
    timeout: 5000, //计时器设定为5s
    timeoutObj: null,
    reset() {
        clearInterval(this.timeoutObj);
        this.start();
    },
    //开始
    start() {
        this.timeoutObj = setInterval(function() {
            window.ws.send("");
            console.log("发送心跳");
        }, this.timeout);
    }
};

cc.Class({
    extends: cc.Component,
    connect(url , options){
        
        var self = this ;
        this.ws = new WebSocket(url);
        window.ws = this.ws;
        this.ws.onopen = function (event) {
            console.log("Send Text WS was opened.");
            curTryNum = 0;
            console.log("心跳检测启动");
            // heartCheck.reset();
            //heartCheck.start();
        };
        this.ws.onmessage = function (event) {
            console.log('onmessage---')
            var data = self.parse(event.data) ;
            if(data!=null && data.event != null){
                cc.beimi.event[data.event](event.data);
            }
            console.log("response text msg: " + event.data);
            cc.beimi.socket.on('recovery',(res)=>{
                if(res.code === 1){
                    if(res.data.status === 1){//1是在线状态，2在房间没准备，3准备状态，4在游戏中
                        self.scene("room" , self) ;
                    }else{
                        self.scene("dizhu" , self) ; 
                    }
                }
            })
            cc.beimi.socket.on('timeout',(res)=>{// 超时
                // cc.beimi.sessiontimeout = true ;
                self.alert("登录已过期，请重新登录") ;
                self.scene("login" , self) ;
                curTryNum = maxTryNum+1;
            })
        };
        this.ws.onerror = function (event) {
            console.log("Send Text fired an error");
        };
        this.ws.onclose = function (event) {
            console.log("WebSocket instance closed.");
            if (curTryNum <= maxTryNum) {
                console.log("连接关闭，5秒后重新连接……");
                // 5秒后重新连接，实际效果：每5秒重连一次，直到连接成功
                console.log('cc.beimi.token',cc.beimi.token)
                setTimeout(function () {
                    curTryNum++;
                    self.connect(cc.beimi.http.wsURL);
                    setTimeout(()=>{
                        cc.beimi.socket.exec("recovery" , {});
                    },200)
                }, 3000);
            } else {
                console.log("连接关闭，且已超过最大重连次数，不再重连");
            }
        };
        return this;
    },
    on(command , func){
        cc.beimi.event[command] =  func ;
    },
    exec(command , data){
        console.log(command,'---------------commnd-----')
        if (this.ws.readyState === WebSocket.OPEN) {
            data.event = command;

            // data.userid = cc.beimi.user.id ;
            // data.orgi = cc.beimi.user.orgi ;
            data.token = cc.beimi.token ;
            this.ws.send(JSON.stringify(data));
        }
    },
    emit(command , data){
        let param = {
            data : data
        } ;
        this.exec(command , param) ;
    },
    disconnect(){

    },
    parse(result){
        return JSON.parse(result) ;
    },
});
