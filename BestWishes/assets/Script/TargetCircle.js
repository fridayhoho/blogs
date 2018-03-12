
var TargetCircle = cc.Class({
    extends: cc.Component,

    properties: {
        startTime:0, //出现的时间
        toRun:false, //开始移动
        dx : 20, //位移速度
        dy : 0,
        ballSp:{
            default:null,
            type:cc.Node
        },
        parNode:{
            default:null,
            type:cc.Node, 
        },
        wBall:0,
        hBall:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        this.toRun = true;
        this.wBall = this.ballSp.getContentSize().width ;
        this.hBall = this.ballSp.getContentSize().height ;  
        // this.parNode.getComponent("ParticleSystem").active = false;
        console.log("dvisibleRect.width:", cc.visibleRect.width * 0.5); 
        this.resetBoard();
    },

    resetBoard () {
        this.toRun = true;
        this.dx = 10 + Math.abs(Math.random() % 20)
        console.log("board dx:", this.dx);
        this.toRun = (cc.random0To1() > 0.5);
        // 位置变化
        this.node.y = cc.random0To1() * cc.visibleRect.height * 0.4
        this.node.scale =  1 + cc.random0To1() 
    },

    update (dt) { 
        var x = this.node.x;
        var y = this.node.y;
        var tox = x + this.dx;
        // console.log("dx:", this.dx, ' x:', x, ' dt:', dt);
        if (this.toRun) {
            if (tox > cc.visibleRect.width * 0.5 + this.wBall*0.5 || tox < -cc.visibleRect.width * 0.5 + this.wBall*0.5) {
                    this.dx = - this.dx;
            }
            x += this.dx;
            this.node.setPosition(cc.p(x, y))
        }
    },
    
    onCollisionEnter(other) {
        console.log('on collision enter');
        // this.node.color = cc.Color.RED;
        // other.node.runAction(cc.flipX(true));
        this.toRun = false;
        // this.parNode.active = true;
        // this.parNode.resetSystem();
        // var cpts = other.world.points;
        // console.log("cptX:", cpts.x, ' y:', cpts.y);
        // ths.parNode.pos = cpts;
    },
});

module.exports = TargetCircle;