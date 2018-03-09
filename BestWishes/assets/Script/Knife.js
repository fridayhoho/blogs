
var K_WAITTING = 10;
var K_FLYING = 11;
var K_SHOT_DOWN =12; //击中
var K_OVER = 13;

var Knife = cc.Class({
    extends: cc.Component,

    properties: {
        startTime:0, //出现的时间
        dy : 0,
        dx : 0,
        kstate: K_WAITTING,
        collide_callback:null,
        orinX:43,
        orinY:-546,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        
    },
    resetKnife(){
        this.node.x = this.orinX;
        this.node.y = this.orinY;
    },
    shot(collide_callback) {
        this.kstate = K_FLYING;
        this.collide_callback = collide_callback;
        var rotate = cc.rotateBy(0.3, 360);
        var actionTo = cc.moveTo(0.3, cc.p(this.x, cc.visibleRect.height/2));
        this.node.runAction(cc.spawn(rotate, actionTo));
        // this.node.runAction(repeat)
    },

    update (dt) {
        // var x = this.node.x;
        // var y = this.node.y;
        // switch(this.kstate):{
        //     case K_WAITTING:
        //         // left right
        //         x = this.node.x + this.dx;
        //         if (x > cc.visibleRect.width * 0.5 || x < cc.visibleRect.width * 0.5) {
        //             this.dx = - this.dx;
        //         }
        //         break;
        //     case K_FLYING:
        //         // updown
        //         y = this.node.y + this.dy;
        //         if (y > cc.visibleRect.height * 0.5) {
        //             this.kstate = K_OVER;
        //         }
        //         break
        //     case K_SHOT_DOWN:
        //         this.dx = 0;
        //         this.dy = 0;
        //         break
        // }
        // this.node.setPosition(cc.p(x, y))
    },
    
    onCollisionEnter(other) {
        console.log('on collision enter');
        this.kstate = K_OVER;
        this.node.stopAllActions();
        this.node.setRotation(-90);
        this.collide_callback()
    },
});

module.exports = Knife;