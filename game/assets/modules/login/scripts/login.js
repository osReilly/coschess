var Common = require("common");
cc.Class({
  extends: Common,

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

  onLoad() {},

  start() {},
  ylogin() {
    var self = this;
    self.loading();
    self.connect();
  },
  wlogin() {
    
  },
  toggle(e) {
    console.log(`this is toggle `, e);
  },
  agrements() {
    console.log("用户协议");
  }
});
