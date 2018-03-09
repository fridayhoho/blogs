
var TargetCircle = cc.Class({
    extends: cc.Component,

    properties: {
        startTime:0, //出现的时间
        toRun:false, //开始移动
        dx : 0, //位移速度
        dy : 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        
    },

    start () {

    },

    update (dt) { 
        var x = this.node.x;
        var y = this.node.y;
        if (this.toRun) {
            if (x > cc.visibleRect.width * 0.5 || x < cc.visibleRect.width * 0.5) {
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