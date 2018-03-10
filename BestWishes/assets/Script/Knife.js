
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
        orinX: 0,
        orinY: 0, 
        frameNormal:{
            default:null,
            type:cc.SpriteFrame
        },
        frameOnTarget:{
            default:null,
            type:cc.SpriteFrame
        },
        audioSource: {
         url: cc.AudioClip,
         default: null
        },
        audioOnTarget: {
         url: cc.AudioClip,
         default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        this.resetKnife();

    },
    resetKnife(){
        this.dx = 10 + Math.abs(Math.random()%30);
        this.node.x = this.orinX;
        this.node.y = this.orinY;
        this.kstate = K_WAITTING;
        
        this.getComponent("cc.Sprite").spriteFrame = this.frameNormal;
        // var knife_n = cc.url.raw("Texture/knife.png");
        // var tex = cc.textureCache.addImage(knife_n);
        // this.getComponent("cc.Sprite").spriteFrame.setTexture(tex);
        var moveR = cc.moveBy(0.4, cc.p(cc.visibleRect.width * 0.5 - 30, 0));
        var easeMoveR = moveR.easing(cc.easeIn(0.3));
        var moveL = cc.moveBy(0.4, cc.p(-(cc.visibleRect.width * 0.5 - 30), 0));
        var easeMoveL = moveL.easing(cc.easeIn(0.3));
        var rAction = cc.repeatForever(cc.sequence(easeMoveR, easeMoveR.reverse(), easeMoveL, easeMoveL.reverse()))
        this.node.runAction(rAction); 
    },

    shot(collide_callback) {
        this.kstate = K_FLYING;
        this.node.stopAllActions();
        this.collide_callback = collide_callback;
        var rotate = cc.rotateBy(0.3, 360);
        var actionTo = cc.moveBy(0.5, cc.p(0, cc.visibleRect.height));
        this.node.runAction(cc.spawn(rotate, actionTo));
        // this.node.runAction(repeat)
        cc.audioEngine.playEffect(this.audioSource, false);
    },

    update (dt) {
        var x = this.node.x;
        var y = this.node.y;
        switch(this.kstate){
            case K_WAITTING:
                // left right
                // x = this.node.x + this.dx;
                // if (x > cc.visibleRect.width * 0.5 || x < -cc.visibleRect.width * 0.5) {
                //     this.dx = - this.dx;
                // }
                break;
            case K_FLYING:
                // updown
                // y = this.node.y + this.dy;
                // if (y > cc.visibleRect.height * 0.5) {
                //     this.kstate = K_OVER;
                // }
                break
            case K_SHOT_DOWN:
                this.dx = 0;
                this.dy = 0;
                break
        }
        this.node.setPosition(cc.p(x, y))
    },
    
    onCollisionEnter(other) {
        console.log('on collision enter');
        this.kstate = K_OVER; 
        this.node.stopAllActions();
        this.node.setRotation(0);
        this.getComponent("cc.Sprite").spriteFrame = this.frameOnTarget;
        this.collide_callback()
        cc.audioEngine.playEffect(this.audioOnTarget, false);
    },
});

module.exports = Knife;