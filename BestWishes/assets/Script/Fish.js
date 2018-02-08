var G_VAR = require("G_VAR")
cc.Class({
    extends: cc.Component,

    properties: {
        ftype: 0 , //类型
        xspeed : 5, //速度
        yspeed : 2,
        fdir: G_VAR.DIR_LEFT, //方向
        fanim:{
            default:null,
            type: cc.Animation,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        
    },

    start () {

    },

    update (dt) {
        var x = this.node.x;
        var y = this.node.y;
        x = x + this.xspeed;
        // y = y + this.yspeed;
        if (x > cc.visibleRect.width * 0.5) {
            x = -cc.visibleRect.width * 0.5;
            
            // this.node.runAction(cc.flipX(true));
            y = cc.lerp(0, cc.visibleRect.height, cc.random0To1());
            this.xspeed = cc.lerp(5, 10, cc.random0To1());
            // this.yspeed = cc.lerp(-5, 5, cc.random0To1());
        }else if (x < -cc.visibleRect.width * 0.5) {
            // x = cc.visibleRect.width * 0.5;
            // y = cc.lerp(10, cc.visibleRect.height, cc.random0To1());
            // this.xspeed = cc.lerp(-5, -15, cc.random0To1());
            // this.yspeed = cc.lerp(-5, 5, cc.random0To1());
        }
        this.node.setPosition(x, y)
        // console.log("x:", x, " y:", y)
    },
});
