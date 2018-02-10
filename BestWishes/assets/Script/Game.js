var Bubble  = require("Bubble")
cc.Class({
	extends:cc.Component,
	properties:{
		
		fish:{
			default:null,
			type:cc.Node,
		},
		orinBubble:{
			default:null,
			type:cc.Prefab,
		},
		curTouch:[],
		lastTick:0,
		isOnTouch:false,

		bubbles:[],//所有气泡
		curBubble:{
			default: null,
			type: cc.Prefab,
		},
	},
	onLoad:function () {
		var self = this;
		cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
        
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
            	self.isOnTouch = true;
            	let pos = touch.getLocation();
            	self.curTouch = pos;
            	self.startCreateBubble(pos);
            	return true;
            },
            onTouchMoved: function(touch, event){
					    	let pos = touch.getLocation();
					    	// console.log("onTouchMoved", pos.x, pos.y);
					    	// let fish = cc.find("Fish", target);
					    	// let bubble = self.bub;
					    	self.curTouch = pos;
					    	self.onMoveBubble(pos);
					    	// self.fish.setPosition(cc.p(pos.x, pos.y));
				    },
            onTouchEnded: function (argument) {
            	self.isOnTouch = false;
            }
        }, this.node);
	},

	update:function (dt) {
		this.lastTick += dt;
		// if (this.lastTick > 0.06 && this.isOnTouch) {
		// 	this.lastTick = 0
		// 	let b2 = cc.instantiate(this.orinBubble);
	 //    	b2.setPosition(cc.p(this.curTouch.x - cc.visibleRect.width*0.5, this.curTouch.y-cc.visibleRect.height*0.5));
	 //    	b2.setScale(dt* 10);
	 //    	// b2.setColor(cc.color(230, 200, 200));

	 //    	this.bubbles.push(b2)
	 //    	var bg = this.node.getChildByName("bg")
	 //    	// console.log("same?", this.fish.getParent() == bg);
	 //    	this.node.addChild(b2);
		// }
		// for (var i = 0; i < this.bubbles.length; i++) {
		// 	if (this.bubbles[i].x > cc.visibleRect.width * 0.5 || this.bubbles[i].y > cc.visibleRect.height * 0.5
		// 		|| this.bubbles[i].y < - cc.visibleRect.height*0.5 || this.bubbles[i].y > cc.visibleRect.height*0.5) {
		// 		this.bubbles[i].removeFromParent();
		// 		this.bubbles.slice(-1, 1);	
		// 	}
			
		// }
	},

	startCreateBubble:function (pos) {
		let b2 = cc.instantiate(this.orinBubble);
    	b2.setPosition(cc.p(pos.x - cc.visibleRect.width*0.5, pos.y-cc.visibleRect.height*0.5));
    	b2.setScale(0.2);
    	this.curBubble = b2;
    	this.bubbles.push(b2);
    	b2.getComponent("Bubble").startGrowUp();
    	var bg = this.node.getChildByName("bg");
    	this.node.addChild(b2);
	},

	onMoveBubble:function (pos) {
		pos = cc.p(pos.x - cc.visibleRect.width*0.5, pos.y-cc.visibleRect.height*0.5);
		if ((!this.isOnTouch) || this.curBubble == null) {
			return;
		}
		this.curBubble.setPosition(pos);
	},

	onReleaseBubble:function () {
		this.isOnTouch = false;
		if (this.curBubble != null) {
			this.curBubble.outHand();
		}
		this.curBubble = null;
	},
}
);