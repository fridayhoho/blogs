var G_VAR = require("G_VAR")
cc.Class({
    extends: cc.Component,

    properties: {
        ftype: 0 , //类型
        fspeed : 5, //速度
        fdir: G_VAR.DIR_LEFT, //方向
        fanim:{
            default:null,
            type: cc.Animation,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.getComponent(cc.Sprite).atlas
        
    },

    start () {

    },

    update (dt) {
        var x = this.node.x;
        var y = this.node.y;
        x = x + this.fspeed;
        if (x > cc.visibleRect.width) {
            x = 0;
            y = cc.random0To1() * cc.visibleRect.height
        }else if (x < 0) {
            x = cc.visibleRect.width;
            y = cc.random0To1() * cc.visibleRect.height
        }
        this.node.setPosition(x, y)
        // console.log("x:", x, " y:", y)
    },
});
