// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
var sha256 = require("./tools/sha256").sha256;
var Bubble = cc.Class({
    extends: cc.Component,

    properties: {
        startTime:0, //出现的时间
        toRun:false, //开始移动
        dx : 0, //位移速度
        dy : 0,
        radius:20,
        isGrowing:false,//是否长大中
        growStep:10, //增长半径步长
        startCallback:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.startTime = Date.now();
        
    },

    start () {

    },

    update (dt) { 
        if (this.toRun == false && Date.now() - this.startTime > (3800 + cc.random0To1() * 3000) ) {
            // this.toRun = true;
            // this.dx = cc.lerp(-5, 5, cc.random0To1());
            // this.dy = cc.lerp(-5, 5, cc.random0To1());
        }
        
        if (this.isGrowing) {
                this.radius += this.growStep;
                this.node.setScale(this.node.getScale() + dt );
                var timestamp3 = new Date().getTime();
                console.log("intput:", timestamp3.toString());
                var outSha = sha256(timestamp3.toString());
                var fetchs = this.fetchGolds(outSha, '0');
                console.log( outSha.length, " out:", outSha, " fetchs:", fetchs);
                // this.startCallback(fetchs)
        }
        if (this.toRun) {
            var x = this.node.x + this.dx;
            var y = this.node.y + this.dy;
            this.node.setPosition(cc.p(x, y))
        }
    },
    outHand:function () {
        console.log("outHand");
        this.toRun = true;
        this.dx = cc.lerp(-5, 5, cc.random0To1());
        this.dy = cc.lerp(-5, 5, cc.random0To1());
        this.stopGrowUp();
    },
    setNewCallback(callback){
        this.startCallback = callback;
        // console.log("typeFunc:", typeof(this.startCallback));
    },
    fetchGolds:function (str, target) {
        let poses = [];
        let pos = -1;
        let cnt = 0;
        while ((pos = str.indexOf(target, pos + 1)) != -1) {
          poses[pos] = pos;
          cnt += 1;
        }
        return cnt;
        // for (let v in poses) {
        //   console.log(v);
        // }
    },
    startGrowUp:function () {
        this.isGrowing = true;
        // var test = "2e31df8208ab4fb5949ef68895bd090a692bbfa2afd49290a72680f42f9f0a1e";
        // var counts = this.fetchGolds(test, '0');
        // console.log(test, " counts:", counts);
        // var dateNow = (new Date()).valueOf();
        // var timestamp3 = new Date().getTime();
        // console.log("intput:", timestamp3.toString());
        // var outSha = sha256(timestamp3.toString());
        // console.log( " out:", outSha);
    },
    stopGrowUp:function () {
        this.isGrowing = false;  
    },
    onCollisionEnter(other) {
        console.log('on collision enter');
        // this.node.color = cc.Color.RED;
        // other.node.runAction(cc.flipX(true));
        this.toRun = true;
        this.dx = cc.lerp(-5, 5, cc.random0To1());
        this.dy = cc.lerp(-5, 5, cc.random0To1());
    },
});

module.exports = Bubble;