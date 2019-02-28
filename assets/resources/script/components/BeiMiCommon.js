var Base64 = require("Base64");
cc.Class({
  extends: cc.Component,
  properties: {},
  onLoad: function() {
    cc.beimi.room_callback = null; //加入房间回调函数
  },
  ready: function() {
    var check = false;
    if (cc.beimi) {
      check = true;
    } else {
			cc.beimi.sceneType = "login"
      this.scene("login", this);
    }
    return check;
  },
  connect: function() {
    let self = this;
    cc.beimi.socket = window.io.connect(cc.beimi.http.wsURL, {
      reconnection: true
    });
    cc.game.on(cc.game.EVENT_HIDE, function(event) {});
    cc.game.on(cc.game.EVENT_SHOW, function(event) {
      console.log("SHOW TRUE");
    });

    cc.beimi.socket.on("connect", function(data) {
      console.log("connected to server");
    });

    cc.beimi.socket.on("disconnect", function(data) {
      console.log("disconnected from server");
    });
    setTimeout(() => {
      cc.beimi.socket.exec("login", {});
    }, 250);

    cc.beimi.socket.on("login", function(result) {
      if (result != null) {
        var data = self.parse(result);
        cc.beimi.user = data.data;
        cc.beimi.games = [
          {
            id: "402888815fe3f44a015feba097ce0000",
            code: "createroom",
            name: "房卡",
            types: [
              {
                id: "402888815fe3f44a015feba50c940001",
                name: "房卡模式",
                code: "createroom",
                playways: [
                  {
                    id: "402888815fe3f44a015feba5fe7d0002",
                    name: "经典斗地主",
                    code: "dizhu",
                    score: 2,
                    mincoins: 0,
                    maxcoins: 0,
                    changecard: false,
                    onlineusers: 0,
                    shuffle: true,
                    level: "3",
                    skin: "1",
                    memo:
                      "斗地主玩法简介，测试一下简介信息是否能够正常显示在界面上。",
                    free: true,
                    groups: [
                      {
                        id: "40288881602a0f1701602a100cba0000",
                        name: "玩法",
                        code: "game",
                        title: null,
                        parentid: null,
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        type: "radio",
                        sortindex: 0,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb001602980d6180000",
                        name: "确定地主",
                        code: "dizhu",
                        title: null,
                        parentid: null,
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        type: "radio",
                        sortindex: 1,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb001602982f6780003",
                        name: "地主封顶",
                        code: "limit",
                        title: null,
                        parentid: null,
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        type: "radio",
                        sortindex: 2,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb00160298458bb0007",
                        name: "局数",
                        code: "games",
                        title: null,
                        parentid: null,
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        type: "radio",
                        sortindex: 2,
                        status: null,
                        style: "three"
                      }
                    ],
                    items: [
                      {
                        id: "40288881602977a40160297a6bb20001",
                        name: "无赖子",
                        code: "wu",
                        title: null,
                        groupid: "40288881602977a40160297a42aa0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "wu",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb00160298249670001",
                        name: "抢地主",
                        code: "qiang",
                        title: null,
                        groupid: "4028888160297cb001602980d6180000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "qiang",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602982931e0002",
                        name: "叫分",
                        code: "score",
                        title: null,
                        groupid: "4028888160297cb001602980d6180000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "score",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb0016029834ece0004",
                        name: "64分",
                        code: "limit1",
                        title: null,
                        groupid: "4028888160297cb001602982f6780003",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "64",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb00160298381550005",
                        name: "128分",
                        code: "limit2",
                        title: null,
                        groupid: "4028888160297cb001602982f6780003",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "128",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602983b76b0006",
                        name: "256分",
                        code: "limit3",
                        title: null,
                        groupid: "4028888160297cb001602982f6780003",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "256",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602984c30b0008",
                        name: "8局（房卡x1）",
                        code: "games1",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "8",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb0016029852b590009",
                        name: "16局（房卡x2）",
                        code: "games2",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "16",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602985aebf000a",
                        name: "25局（房卡x3）",
                        code: "games3",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "25",
                        sortindex: 0
                      },
                      {
                        id: "402888816029f141016029f359510002",
                        name: "红中癞子",
                        code: "hong",
                        title: null,
                        groupid: "40288881602977a40160297a42aa0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "hong",
                        sortindex: 0
                      },
                      {
                        id: "40288881602a0f1701602a106a530001",
                        name: "经典玩法",
                        code: "dizhu",
                        title: null,
                        groupid: "40288881602a0f1701602a100cba0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "dizhu",
                        sortindex: 0
                      },
                      {
                        id: "40288881602a0f1701602a109f490002",
                        name: "癞子玩法",
                        code: "laizi",
                        title: null,
                        groupid: "40288881602a0f1701602a100cba0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "laizi",
                        sortindex: 1
                      }
                    ],
                    roomtitle: "房间-经典斗地主",
                    extpro: true
                  },
                  {
                    id: "402888815fe3f44a015feba5fe7d0002",
                    name: "跑得快",
                    code: "paodekuai",
                    score: 2,
                    mincoins: 0,
                    maxcoins: 0,
                    changecard: false,
                    onlineusers: 0,
                    shuffle: true,
                    level: "3",
                    skin: "1",
                    memo:
                      "跑得快玩法简介，测试一下简介信息是否能够正常显示在界面上。",
                    free: true,
                    groups: [
                      {
                        id: "40288881602a0f1701602a100cba0000",
                        name: "房间玩法",
                        code: "gameType",
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        type: "radio",
                        sortindex: 0,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb001602980d6180010",
                        name: "基数",
                        code: "baseNum",
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        type: "radio",
                        sortindex: 1,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb001602982f6780003",
                        name: "最大人数",
                        code: "players",
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        type: "radio",
                        sortindex: 2,
                        status: null,
                        style: "four"
                      },
                      {
                        id: "4028888160297cb00160298458bb0007",
                        name: "房间总局数",
                        code: "totalNum",
                        title: null,
                        parentid: null,
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        type: "radio",
                        sortindex: 3,
                        status: null,
                        style: "three"
                      }
                    ],
                    items: [
                      {
                        id: "40288881602977a40160297a6bb20001",
                        name: "无赖子",
                        code: "wu",
                        title: null,
                        groupid: "40288881602977a40160297a42aa0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "wu",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb00160298249670001",
                        name: "抢地主",
                        code: "qiang",
                        title: null,
                        groupid: "4028888160297cb001602980d6180000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: true,
                        value: "qiang",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602982931e0002",
                        name: "叫分",
                        code: "score",
                        title: null,
                        groupid: "4028888160297cb001602980d6180000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",

                        status: null,
                        type: null,
                        defaultvalue: false,
                        value: "score",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb0016029834ece0004",
                        name: "3人",
                        code: "limit1",
                        title: null,
                        groupid: "4028888160297cb001602982f6780003",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: true,
                        value: "3",
                        sortindex: 0
                      },

                      {
                        id: "4028888160297cb0016029834ece0004",
                        name: "1倍",
                        code: "baseNum1",
                        title: null,
                        groupid: "4028888160297cb001602980d6180010",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: true,
                        value: "1",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb00160298381550005",
                        name: "10倍",
                        code: "baseNum2",
                        title: null,
                        groupid: "4028888160297cb001602980d6180010",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: false,
                        value: "10",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602983b76b0006",
                        name: "20倍",
                        code: "baseNum3",
                        title: null,
                        groupid: "4028888160297cb001602980d6180010",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: false,
                        value: "20",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602984c30b0008",
                        name: "8局（房卡x1）",
                        code: "games1",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: true,
                        value: "8",
                        expendCard: "1",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb0016029852b590009",
                        name: "16局（房卡x2）",
                        code: "games2",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: false,
                        value: "16",
                        expendCard: "2",
                        sortindex: 0
                      },
                      {
                        id: "4028888160297cb001602985aebf000a",
                        name: "25局（房卡x3）",
                        code: "games3",
                        title: null,
                        groupid: "4028888160297cb00160298458bb0007",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: false,
                        value: "25",
                        expendCard: "3",
                        sortindex: 0
                      },
                      {
                        id: "40288881602a0f1701602a106a530001",
                        name: "跑得快",
                        code: "paodekuai",
                        title: null,
                        groupid: "40288881602a0f1701602a100cba0000",
                        memo: null,
                        playwayid: "402888815fe3f44a015feba5fe7d0002",
                        game: "402888815fe3f44a015feba097ce0000",
                        defaultvalue: true,
                        value: "paodekuai",
                        sortindex: 0
                      }
                    ],
                    roomtitle: "房间-诈金花",
                    extpro: true
                  }
                ]
              }
            ]
          }
        ];
        cc.beimi.token = data.data.token;
        if (data.code === 1) {
					cc.beimi.sceneType = "hall"
          self.scene("room", self);
        }
      }
    });
    cc.beimi.socket.on("create_room", function(result) {
      console.log(result);
      var data = JSON.parse(result);
      if (cc.beimi.extparams != null) {
        if (data.data.status === 1 || data.data.status === 0) {
					cc.beimi.sceneType = "room"
          self.scene(data.data.gameType, self);
        } else if (data.code === 2) {
          self.alert(data.data);
        }
      }
    });

    cc.beimi.socket.on("recovery", (res) => {
			let data = JSON.parse(res);
			let udata = data.data
			let gtype = udata.gameType;
			cc.beimi.user = data.user;
      console.log("----recovery----", res);
			if (data.code === 1) { //1 是玩家之前在大厅，2是玩家在房间,3是是玩家开始准备，游戏
        self.scene("room", self);
      }else if(data.code === 2){
				self.scene(gtype, self);
			}else if(data.code === 3){
				self.scene(gtype, self);
			}else{
				self.alert("数据状态异常")
			}
    });

    return cc.beimi.socket;
  },
  disconnect: function() {
    if (cc.beimi.socket != null) {
      cc.beimi.socket.disconnect();
      cc.beimi.socket = null;
    }
  },
  registercallback: function(callback) {
    cc.beimi.room_callback = callback;
  },
  cleancallback: function() {
    cc.beimi.room_callback = null;
  },
  getCommon: function(common) {
    var object = cc.find("Canvas/script/" + common);
    return object.getComponent(common);
  },
  loadding: function() {
    if (cc.beimi.loadding.size() > 0) {
      this.loaddingDialog = cc.beimi.loadding.get();
      this.loaddingDialog.parent = cc.find("Canvas");

      this._animCtrl = this.loaddingDialog.getComponent(cc.Animation);
      var animState = this._animCtrl.play("loadding");
      animState.wrapMode = cc.WrapMode.Loop;
    }
  },
  alert: function(message) {
    this.alertForCallBack(message, null);
  },
  alertForCallBack: function(message, func) {
    if (cc.beimi.dialog.size() > 0) {
      this.alertdialog = cc.beimi.dialog.get();
      this.alertdialog.parent = cc.find("Canvas");
      let node = this.alertdialog.getChildByName("message");
      if (node != null && node.getComponent(cc.Label)) {
        node.getComponent(cc.Label).string = message;
      }
      if (func != null) {
        let temp = this.alertdialog.getComponent("BeiMiDialog");
        if (temp != null) {
          temp.callback(func);
        }
      }
    }
    this.closeloadding();
  },
  closeloadding: function() {
    if (cc.find("Canvas/loadding")) {
      cc.beimi.loadding.put(cc.find("Canvas/loadding"));
    }
  },
  closeOpenWin: function() {
    if (cc.beimi.openwin != null) {
      cc.beimi.openwin.destroy();
      cc.beimi.openwin = null;
    }
  },
  openWin: function(prefab) {
    if (prefab != null) {
      cc.beimi.openwin = cc.instantiate(prefab);
      cc.beimi.openwin.parent = this.root();
    }
  },
  pvalistener: function(context, func) {
    cc.beimi.listener = func;
    cc.beimi.context = context;
  },
  cleanpvalistener: function() {
    if (cc.beimi != null) {
      cc.beimi.listener = null;
      cc.beimi.context = null;
    }
  },
  pva: function(pvatype, balance) {
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
  updatepva: function() {
    if (
      cc.beimi != null &&
      cc.beimi.listener != null &&
      cc.beimi.context != null
    ) {
      cc.beimi.listener(cc.beimi.context);
    }
  },
  subsidy: function() {
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
        // cc.loader.loadRes("prefab/welfare/over", function (err, prefab) {
        //     cc.beimi.openwin = cc.instantiate(prefab);
        //     cc.beimi.openwin.parent = cc.beimi.context.root();
        // });
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
  // welfareDialog:function(){
  //     cc.loader.loadRes("prefab/welfare/over", function (err, prefab) {
  //         cc.beimi.openwin = cc.instantiate(prefab);
  //         cc.beimi.openwin.parent = cc.beimi.context.root();
  //     });
  // },
  // shopDialog:function(){
  //     cc.loader.loadRes("prefab/welfare/shop", function (err, prefab) {
  //         cc.beimi.openwin = cc.instantiate(prefab);
  //         cc.beimi.openwin.parent = cc.beimi.context.root();
  //     });
  // },
  resize: function() {
    // let win = cc.Director.getWinSize();
    // cc.view.setDesignResolutionSize(
    //   win.width,
    //   win.height,
    //   cc.ResolutionPolicy.EXACT_FIT
    // );
    var node = cc.find('Canvas');
    var size = cc.view.getFrameSize();
    var w = size.width;
    var h = size.height;

    var cvs = node.getComponent(cc.Canvas);
    var dw = cvs.designResolution.width;
    var dh = cvs.designResolution.height;
    //如果更宽 则让高显示满
    if((w / h)  > (dw / dh)){
        cvs.fitHeight = true;
        cvs.fitWidth = false;
    }
    else{
        //如果更高，则让宽显示满
        cvs.fitHeight = false;
        cvs.fitWidth = true;
    }
  },
  closealert: function() {
    if (cc.find("Canvas/alert")) {
      cc.beimi.dialog.put(cc.find("Canvas/alert"));
    }
  },
  scene: function(name, self) {
    cc.director.preloadScene(name, function() {
      if (cc.beimi) {
        self.closeloadding(self.loaddingDialog);
      }
      cc.director.loadScene(name);
    });
  },
  preload: function(url, extparams, self) {
    if (!url) url = "gamestatus";
    this.loadding();
    /**
     *切换游戏场景之前，需要先检查是否 是在游戏中，如果是在游戏中，则直接进入该游戏，如果不在游戏中，则执行 新场景游戏
     */
    cc.beimi.extparams = extparams;
    /**
     * 发送状态查询请求，如果玩家当前在游戏中，则直接进入游戏回复状态，如果玩家不在游戏中，则创建新游戏场景
     */
    cc.beimi.socket.exec(url, extparams);
  },
  root: function() {
    return cc.find("Canvas");
  },
  decode: function(data) {
    return Base64.decode(data);
  },
  parse: function(result) {
    return JSON.parse(result);
  },
  reset: function(data, result) {
    //放在全局变量
    cc.beimi.authorization = data.token.id;
    cc.beimi.user = data.data;
    cc.beimi.games = data.games;
    cc.beimi.gametype = data.gametype;

    cc.beimi.data = data;
    cc.beimi.playway = null;
    this.io.put("token", data.token.id);
  },
  logout: function() {
    this.closeOpenWin();
    cc.beimi.authorization = null;
    cc.beimi.user = null;
    cc.beimi.games = null;

    cc.beimi.playway = null;

    this.disconnect();
  },
  socket: function() {
    let socket = cc.beimi.socket;
    if (socket == null) {
      socket = this.connect();
    }
    return socket;
  },
  map: function(command, callback) {
    if (cc.beimi != null && cc.beimi.routes[command] == null) {
      cc.beimi.routes[command] = callback || function() {};
    }
  },
  cleanmap: function() {
    if (cc.beimi != null && cc.beimi.routes != null) {
      //cc.beimi.routes.splice(0 , cc.beimi.routes.length) ;
      for (var p in cc.beimi.routes) {
        delete cc.beimi.routes[p];
      }
    }
  },
  route: function(command) {
    return cc.beimi.routes[command] || function() {};
  },
  /**
   * 解决Layout的渲染顺序和显示顺序不一致的问题
   * @param target
   * @param func
   */
  layout: function(target, func) {
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
