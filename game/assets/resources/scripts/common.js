var Base64 = require("Base64");
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
  },

  // use this for initialization
  onLoad() {
    cc.beimi.room_callback = null; //加入房间回调函数
  },
  ready() {
    var check = false;
    if (cc.beimi) {
      check = true;
    } else {
      this.scene("login", this);
    }
    return check;
  },
  connect() {
    let self = this;
    /**
     * 登录成功后，创建 Socket链接，
     */
    // if(cc.beimi.socket != null){
    //     cc.beimi.socket.disconnect();
    //     cc.beimi.socket = null ;
    // }

    cc.beimi.socket = window.io.connect(cc.beimi.http.wsURL, {
      reconnection: true
    });

    cc.game.on(cc.game.EVENT_HIDE, function(event) {
      //self.alert("HIDE TRUE");
    });
    cc.game.on(cc.game.EVENT_SHOW, function(event) {
      console.log("SHOW TRUE");
      //self.alert("SHOW TRUE");
    });

    cc.beimi.socket.on("connect", function(data) {
      console.log("connected to server");
      //self.alert("connected to server");
    });

    cc.beimi.socket.on("disconnect", function(data) {
      console.log("disconnected from server");
      //self.alert("disconnected from server");
    });
    // var param = {
    //     token:cc.beimi.authorization,
    //     orgi:cc.beimi.user.orgi,
    //     userid:cc.beimi.user.id
    // } ;
    // cc.beimi.socket.exec("gamestatus" , param);
    // cc.beimi.socket.on("gamestatus" , function(result){
    //     if(result!=null) {
    //         var data = self.parse(result) ;
    //         if(cc.beimi.extparams !=null){
    //             if(data.gamestatus == "playing" && data.gametype != null){
    //                 /**
    //                  * 修正重新进入房间后 玩法被覆盖的问题，从服务端发送过来的 玩法数据是 当前玩家所在房间的玩法，是准确的
    //                  */
    //                 if(cc.beimi.extparams!=null){
    //                     cc.beimi.extparams.playway = data.playway ;
    //                     cc.beimi.extparams.gametype = data.gametype ;
    //                     if(data.cardroom!=null && data.cardroom == true){
    //                         cc.beimi.extparams.gamemodel = "room";
    //                     }
    //                 }
    //                 self.scene(data.gametype , self) ;
    //             }else if(data.gamestatus == "timeout"){ //会话过期，退出登录 ， 会话时间由后台容器提供控制
    //                 cc.beimi.sessiontimeout = true ;
    //                 self.alert("登录已过期，请重新登录") ;
    //             }else{
    //                 self.scene(cc.beimi.extparams.gametype , self) ;
    //             }
    //         }
    //         cc.beimi.gamestatus = data.gamestatus;
    //     }
    // });

    /**
     * 加入房卡模式的游戏类型 ， 需要校验是否是服务端发送的消息
     */
    // cc.beimi.socket.on("searchroom" , function(result){
    //     //result 是 GamePlayway数据，如果找到了 房间数据，则进入房间，如果未找到房间数据，则提示房间不存在
    //     if(result!=null && cc.beimi.room_callback!=null) {
    //         cc.beimi.room_callback(result , self);
    //     }
    // });
    setTimeout(() => {
      cc.beimi.socket.exec("login", {});
    }, 200);

    cc.beimi.socket.on("login", result => {
      console.log("hhhh", result);
      if (result != null) {
        var res = self.parse(result);
        console.log(res);
        cc.beimi.token = res.data.token;
        cc.beimi.user = res.data;
        cc.beimi.games = [
          {
            code: "createroom",
            name: "房卡",
            types: [
              {
                code: "createroom",
                name: "房卡模式",
                playways: [
                    {
                        "id": "402888815fe3f44a015feba5fe7d0002",
                        "name": "经典斗地主",
                        "code": "dizhu",
                        "score": 2,
                        "mincoins": 0,
                        "maxcoins": 0,
                        "changecard": false,
                        "onlineusers": 0,
                        "shuffle": true,
                        "level": "3",
                        "skin": "1",
                        "memo": "斗地主玩法简介，测试一下简介信息是否能够正常显示在界面上。",
                        "free": true,
                        "groups": [{
                            "id": "40288881602a0f1701602a100cba0000",
                            "name": "玩法",
                            "code": "game",
                            "title": null,
                            "parentid": null,
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "type": "radio",
                            "sortindex": 0,
                            "status": null,
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512572592000,
                            "updatetime": 1512572592000,
                            "style": "four"
                        }, {
                            "id": "4028888160297cb001602980d6180000",
                            "name": "确定地主",
                            "code": "dizhu",
                            "title": null,
                            "parentid": null,
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "type": "radio",
                            "sortindex": 1,
                            "status": null,
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512572622000,
                            "updatetime": 1512572622000,
                            "style": "four"
                        }, {
                            "id": "4028888160297cb001602982f6780003",
                            "name": "地主封顶",
                            "code": "limit",
                            "title": null,
                            "parentid": null,
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "type": "radio",
                            "sortindex": 2,
                            "status": null,
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512611330000,
                            "updatetime": 1512611330000,
                            "style": "four"
                        }, {
                            "id": "4028888160297cb00160298458bb0007",
                            "name": "局数",
                            "code": "games",
                            "title": null,
                            "parentid": null,
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "type": "radio",
                            "sortindex": 2,
                            "status": null,
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512572640000,
                            "updatetime": 1512572640000,
                            "style": "three"
                        }],
                        "items": [{
                            "id": "40288881602977a40160297a6bb20001",
                            "name": "无赖子",
                            "code": "wu",
                            "title": null,
                            "groupid": "40288881602977a40160297a42aa0000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "wu",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524377000,
                            "updatetime": 1512524377000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb00160298249670001",
                            "name": "抢地主",
                            "code": "qiang",
                            "title": null,
                            "groupid": "4028888160297cb001602980d6180000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": true,
                            "value": "qiang",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524893000,
                            "updatetime": 1512524893000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb001602982931e0002",
                            "name": "叫分",
                            "code": "score",
                            "title": null,
                            "groupid": "4028888160297cb001602980d6180000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "score",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524911000,
                            "updatetime": 1512524911000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb0016029834ece0004",
                            "name": "64分",
                            "code": "limit1",
                            "title": null,
                            "groupid": "4028888160297cb001602982f6780003",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "64",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524959000,
                            "updatetime": 1512524959000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb00160298381550005",
                            "name": "128分",
                            "code": "limit2",
                            "title": null,
                            "groupid": "4028888160297cb001602982f6780003",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "128",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524972000,
                            "updatetime": 1512524972000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb001602983b76b0006",
                            "name": "256分",
                            "code": "limit3",
                            "title": null,
                            "groupid": "4028888160297cb001602982f6780003",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": true,
                            "value": "256",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512524986000,
                            "updatetime": 1512524986000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb001602984c30b0008",
                            "name": "8局（房卡x1）",
                            "code": "games1",
                            "title": null,
                            "groupid": "4028888160297cb00160298458bb0007",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "8",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512525055000,
                            "updatetime": 1512525055000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb0016029852b590009",
                            "name": "16局（房卡x2）",
                            "code": "games2",
                            "title": null,
                            "groupid": "4028888160297cb00160298458bb0007",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "16",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512525081000,
                            "updatetime": 1512525081000,
                            "sortindex": 0
                        }, {
                            "id": "4028888160297cb001602985aebf000a",
                            "name": "25局（房卡x3）",
                            "code": "games3",
                            "title": null,
                            "groupid": "4028888160297cb00160298458bb0007",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": true,
                            "value": "25",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512525115000,
                            "updatetime": 1512525115000,
                            "sortindex": 0
                        }, {
                            "id": "402888816029f141016029f359510002",
                            "name": "红中癞子",
                            "code": "hong",
                            "title": null,
                            "groupid": "40288881602977a40160297a42aa0000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": true,
                            "value": "hong",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512532302000,
                            "updatetime": 1512532302000,
                            "sortindex": 0
                        }, {
                            "id": "40288881602a0f1701602a106a530001",
                            "name": "经典玩法",
                            "code": "dizhu",
                            "title": null,
                            "groupid": "40288881602a0f1701602a100cba0000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": true,
                            "value": "dizhu",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512534207000,
                            "updatetime": 1512534207000,
                            "sortindex": 0
                        }, {
                            "id": "40288881602a0f1701602a109f490002",
                            "name": "癞子玩法",
                            "code": "laizi",
                            "title": null,
                            "groupid": "40288881602a0f1701602a100cba0000",
                            "memo": null,
                            "playwayid": "402888815fe3f44a015feba5fe7d0002",
                            "game": "402888815fe3f44a015feba097ce0000",
                            "orgi": "beimi",
                            "status": null,
                            "type": null,
                            "defaultvalue": false,
                            "value": "laizi",
                            "creater": "297e8c7b455798280145579c73e501c1",
                            "createtime": 1512534221000,
                            "updatetime": 1512534221000,
                            "sortindex": 1
                        }],
                        "roomtitle": "房间-经典斗地主",
                        "extpro": true
                    },
                //   {
                //     code: "dizhu",
                //     name: "斗地主",
                //     memo:"斗地主玩法简介，测试一下简介信息是否能够正常显示在界面上。",
                //     roomtitle:"房间-经典斗地主",
                //     "groups": [{
                //         "id": "40288881602a0f1701602a100cba0000",
                //         "name": "玩法",
                //         "code": "game",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 0,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572592000,
                //         "updatetime": 1512572592000,
                //         "style": "four"
                //     }, {
                //         "id": "4028888160297cb001602980d6180000",
                //         "name": "确定地主",
                //         "code": "dizhu",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 1,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572622000,
                //         "updatetime": 1512572622000,
                //         "style": "four"
                //     }, {
                //         "id": "4028888160297cb001602982f6780003",
                //         "name": "地主封顶",
                //         "code": "limit",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 2,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512611330000,
                //         "updatetime": 1512611330000,
                //         "style": "four"
                //     }, {
                //         "id": "4028888160297cb00160298458bb0007",
                //         "name": "局数",
                //         "code": "games",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 2,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572640000,
                //         "updatetime": 1512572640000,
                //         "style": "three"
                //     }],
                //     "items": [{
                //         "id": "40288881602977a40160297a6bb20001",
                //         "name": "无赖子",
                //         "code": "wu",
                //         "title": null,
                //         "groupid": "40288881602977a40160297a42aa0000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "wu",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524377000,
                //         "updatetime": 1512524377000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb00160298249670001",
                //         "name": "抢地主",
                //         "code": "qiang",
                //         "title": null,
                //         "groupid": "4028888160297cb001602980d6180000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": true,
                //         "value": "qiang",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524893000,
                //         "updatetime": 1512524893000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb001602982931e0002",
                //         "name": "叫分",
                //         "code": "score",
                //         "title": null,
                //         "groupid": "4028888160297cb001602980d6180000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "score",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524911000,
                //         "updatetime": 1512524911000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb0016029834ece0004",
                //         "name": "64分",
                //         "code": "limit1",
                //         "title": null,
                //         "groupid": "4028888160297cb001602982f6780003",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "64",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524959000,
                //         "updatetime": 1512524959000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb00160298381550005",
                //         "name": "128分",
                //         "code": "limit2",
                //         "title": null,
                //         "groupid": "4028888160297cb001602982f6780003",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "128",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524972000,
                //         "updatetime": 1512524972000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb001602983b76b0006",
                //         "name": "256分",
                //         "code": "limit3",
                //         "title": null,
                //         "groupid": "4028888160297cb001602982f6780003",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": true,
                //         "value": "256",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512524986000,
                //         "updatetime": 1512524986000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb001602984c30b0008",
                //         "name": "8局（房卡x1）",
                //         "code": "games1",
                //         "title": null,
                //         "groupid": "4028888160297cb00160298458bb0007",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "8",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512525055000,
                //         "updatetime": 1512525055000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb0016029852b590009",
                //         "name": "16局（房卡x2）",
                //         "code": "games2",
                //         "title": null,
                //         "groupid": "4028888160297cb00160298458bb0007",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "16",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512525081000,
                //         "updatetime": 1512525081000,
                //         "sortindex": 0
                //     }, {
                //         "id": "4028888160297cb001602985aebf000a",
                //         "name": "25局（房卡x3）",
                //         "code": "games3",
                //         "title": null,
                //         "groupid": "4028888160297cb00160298458bb0007",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": true,
                //         "value": "25",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512525115000,
                //         "updatetime": 1512525115000,
                //         "sortindex": 0
                //     }, {
                //         "id": "402888816029f141016029f359510002",
                //         "name": "红中癞子",
                //         "code": "hong",
                //         "title": null,
                //         "groupid": "40288881602977a40160297a42aa0000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": true,
                //         "value": "hong",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512532302000,
                //         "updatetime": 1512532302000,
                //         "sortindex": 0
                //     }, {
                //         "id": "40288881602a0f1701602a106a530001",
                //         "name": "经典玩法",
                //         "code": "dizhu",
                //         "title": null,
                //         "groupid": "40288881602a0f1701602a100cba0000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": true,
                //         "value": "dizhu",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512534207000,
                //         "updatetime": 1512534207000,
                //         "sortindex": 0
                //     }, {
                //         "id": "40288881602a0f1701602a109f490002",
                //         "name": "癞子玩法",
                //         "code": "laizi",
                //         "title": null,
                //         "groupid": "40288881602a0f1701602a100cba0000",
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "status": null,
                //         "type": null,
                //         "defaultvalue": false,
                //         "value": "laizi",
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512534221000,
                //         "updatetime": 1512534221000,
                //         "sortindex": 1
                //     }]
                //   },
                //   {
                //     code: "paodekuai",
                //     name: "跑得快",
                //     memo:"跑得快介绍",
                //     roomtitle:"房间-跑得快",
                //     "groups": [{
                //         "id": "40288881602a0f1701602a100cba0000",
                //         "name": "玩法",
                //         "code": "game",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 0,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572592000,
                //         "updatetime": 1512572592000,
                //         "style": "four"
                //     }, {
                //         "id": "4028888160297cb001602980d6180000",
                //         "name": "确定地主",
                //         "code": "dizhu",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 1,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572622000,
                //         "updatetime": 1512572622000,
                //         "style": "four"
                //     }, {
                //         "id": "4028888160297cb00160298458bb0007",
                //         "name": "局数",
                //         "code": "games",
                //         "title": null,
                //         "parentid": null,
                //         "memo": null,
                //         "playwayid": "402888815fe3f44a015feba5fe7d0002",
                //         "game": "402888815fe3f44a015feba097ce0000",
                //         "orgi": "beimi",
                //         "type": "radio",
                //         "sortindex": 2,
                //         "status": null,
                //         "creater": "297e8c7b455798280145579c73e501c1",
                //         "createtime": 1512572640000,
                //         "updatetime": 1512572640000,
                //         "style": "three"
                //     }]
                //   }
                ]
              }
            ]
          }
        ];
        if (res.code === 1) {
          if (res.data.status === 1) {
            //1是在线状态，2在房间没准备，3准备状态，4在游戏中
            self.scene("room", self);
          } else {
            self.scene("dizhu", self);
          }
        }
      }
    });
    return cc.beimi.socket;
  },
  disconnect() {
    if (cc.beimi.socket != null) {
      cc.beimi.socket.disconnect();
      cc.beimi.socket = null;
    }
  },
  registercallback(callback) {
    cc.beimi.room_callback = callback;
  },
  cleancallback() {
    cc.beimi.room_callback = null;
  },
  getCommon(common) {
    var object = cc.find("Canvas/script/" + common);
    return object.getComponent(common);
  },
  loading() {
    if (cc.beimi.loading.size() > 0) {
      this.loaddingDialog = cc.beimi.loading.get();
      this.loaddingDialog.parent = cc.find("Canvas");

      this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
      var animState = this._animCtrl.play("loadding");
      animState.wrapMode = cc.WrapMode.Loop;
    }
  },
  alert(message) {
    this.alertForCallBack(message, null);
  },
  alertForCallBack(message, func) {
    if (cc.beimi.dialog.size() > 0) {
      this.alertdialog = cc.beimi.dialog.get();
      this.alertdialog.parent = cc.find("Canvas");
      let node = this.alertdialog.getChildByName("message");
      if (node != null && node.getComponent(cc.Label)) {
        node.getComponent(cc.Label).string = message;
      }
      if (func != null) {
        let temp = this.alertdialog.getComponent("Dialog");
        if (temp != null) {
          temp.callback(func);
        }
      }
    }
    this.closeloading();
  },
  closeloading() {
    if (cc.find("Canvas/loadding")) {
      cc.beimi.loading.put(cc.find("Canvas/loadding"));
    }
  },
  closeOpenWin() {
    if (cc.beimi.openwin != null) {
      cc.beimi.openwin.destroy();
      cc.beimi.openwin = null;
    }
  },
  openWin(prefab) {
    if (prefab != null) {
      cc.beimi.openwin = cc.instantiate(prefab);
      cc.beimi.openwin.parent = this.root();
    }
  },
  pvalistener(context, func) {
    cc.beimi.listener = func;
    cc.beimi.context = context;
  },
  cleanpvalistener() {
    if (cc.beimi != null) {
      cc.beimi.listener = null;
      cc.beimi.context = null;
    }
  },
  pva(pvatype, balance) {
    //客户端资产变更（仅显示，多个地方都会调用 pva方法）
    if (pvatype != null) {
      if (pvatype == "gold") {
        cc.beimi.user.goldcoins = balance;
      } else if (pvatype == "cards") {
        cc.beimi.user.cards = balance;
      } else if (pvatype == "diamonds") {
        cc.beimi.user.diamonds = balance;
      }
    }
  },
  updatepva() {
    if (
      cc.beimi != null &&
      cc.beimi.listener != null &&
      cc.beimi.context != null
    ) {
      cc.beimi.listener(cc.beimi.context);
    }
  },
  subsidy() {
    var needsubsidy = false;
    if (cc.beimi.user.goldcoins <= 0) {
      let self = this;
      needsubsidy = true;
      //提示是否需要破产补助 , 提示的时候，需要查询服务端是否当天的 补助次数已用完，如果还有剩余补助次数，则开始补助，否则直接进入商城提示兑换 ， 剩余的补助次数，在服务器推送 PVA信息的时候，同时推送过来
      if (
        cc.beimi.data.subsidy == true &&
        cc.beimi.data.subtimes > 0 &&
        cc.beimi.data.subgolds > 0 &&
        cc.beimi.data.lefttimes > 0
      ) {
        let tipmsg = "金币不足，您可以领取救济金。";
        if (cc.beimi.data.submsg != null) {
          tipmsg = cc.beimi.data.submsg;
        }
        this.alertForCallBack(tipmsg, function() {
          self.welfareDialog();
        });
      } else {
        let recmsg = "金币不足，请充值。";
        if (cc.beimi.data.recmsg != null) {
          recmsg = cc.beimi.data.recmsg;
        }
        this.alertForCallBack(recmsg, function() {
          self.shopDialog();
        });
      }
    }
    return needsubsidy;
  },
  // welfareDialog(){
  //     cc.loader.loadRes("prefab/welfare/over", function (err, prefab) {
  //         cc.beimi.openwin = cc.instantiate(prefab);
  //         cc.beimi.openwin.parent = cc.beimi.context.root();
  //     });
  // },
  shopDialog() {
    cc.loader.loadRes("prefab/welfare/shop", function(err, prefab) {
      cc.beimi.openwin = cc.instantiate(prefab);
      cc.beimi.openwin.parent = cc.beimi.context.root();
    });
  },
  resize() {
    let win = cc.winSize();
    cc.view.setDesignResolutionSize(
      win.width,
      win.height,
      cc.ResolutionPolicy.EXACT_FIT
    );
  },
  closealert() {
    if (cc.find("Canvas/alert")) {
      cc.beimi.dialog.put(cc.find("Canvas/alert"));
    }
  },
  scene(name, self) {
    cc.director.preloadScene(name, function() {
      if (cc.beimi) {
        self.closeloading(self.loaddingDialog);
      }
      cc.director.loadScene(name);
    });
  },
  preload(extparams, self) {
    this.loadding();
    /**
     *切换游戏场景之前，需要先检查是否 是在游戏中，如果是在游戏中，则直接进入该游戏，如果不在游戏中，则执行 新场景游戏
     */
    cc.beimi.extparams = extparams;
    /**
     * 发送状态查询请求，如果玩家当前在游戏中，则直接进入游戏回复状态，如果玩家不在游戏中，则创建新游戏场景
     */
    var param = {
      token: cc.beimi.authorization,
      orgi: cc.beimi.user.orgi,
      userid: cc.beimi.user.id
    };
    cc.beimi.socket.exec("gamestatus", param);
  },
  root() {
    return cc.find("Canvas");
  },
  decode(data) {
    return Base64.decode(data);
  },
  parse(result) {
    return JSON.parse(result);
  },
  reset(data, result) {
    //放在全局变量
    cc.beimi.authorization = data.token.id;
    cc.beimi.user = data.data;
    cc.beimi.games = data.games;
    cc.beimi.gametype = data.gametype;
    cc.beimi.data = data;
    cc.beimi.playway = null;
    this.io.put("token", data.token.id);
  },
  logout() {
    this.closeOpenWin();
    cc.beimi.authorization = null;
    cc.beimi.user = null;
    cc.beimi.games = null;
    cc.beimi.playway = null;
    this.disconnect();
  },
  socket() {
    let socket = cc.beimi.socket;
    if (socket == null) {
      socket = this.connect();
    }
    return socket;
  },
  map(command, callback) {
    if (cc.beimi != null && cc.beimi.routes[command] == null) {
      cc.beimi.routes[command] = callback || function() {};
    }
  },
  cleanmap() {
    if (cc.beimi != null && cc.beimi.routes != null) {
      //cc.beimi.routes.splice(0 , cc.beimi.routes.length) ;
      for (var p in cc.beimi.routes) {
        delete cc.beimi.routes[p];
      }
    }
  },
  route(command) {
    return cc.beimi.routes[command] || function() {};
  },
  /**
   * 解决Layout的渲染顺序和显示顺序不一致的问题
   * @param target
   * @param func
   */
  layout(target, func) {
    if (target != null) {
      let temp = new Array();
      let children = target.children;
      for (var inx = 0; inx < children.length; inx++) {
        temp.push(children[inx]);
      }
      for (var inx = 0; inx < temp.length; inx++) {
        target.removeChild(temp[inx]);
      }

      temp.sort(func);
      for (var inx = 0; inx < temp.length; inx++) {
        temp[inx].parent = target;
      }
      temp.splice(0, temp.length);
    }
  }
});
