
var TargetCircle = cc.Class({
    extends: cc.Component,

    properties: {
        startTime:0, //出现的时间
        toRun:false, //开始移动
        dx : 20, //位移速度
        dy : 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        this.toRun = true;
        console.log("dvisibleRect.width:", cc.visibleRect.width * 0.5); 
    },

    resetBoard () {
        this.toRun = true;
        this.dx = 10 + Math.abs(Math.random() % 20)
        console.log("board dx:", this.dx);
    },

    update (dt) { 
        var x = this.node.x;
        var y = this.node.y;
        x += this.dx;
        // console.log("dx:", this.dx, ' x:', x, ' dt:', dt);
        if (this.toRun) {
            if (x > cc.visibleRect.width * 0.5 || x < -cc.visibleRect.width * 0.5) {
                    this.dx = - this.dx;
            }
            this.node.setPosition(cc.p(x, y))
        }
    },
    
    onCollisionEnter(other) {
        console.log('on collision enter');
        // this.node.color = cc.Color.RED;
        // other.node.runAction(cc.flipX(true));
        this.toRun = false;
        
    },
});

module.exports = TargetCircle;