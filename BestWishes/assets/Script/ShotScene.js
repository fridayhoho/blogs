var Knife  = require("Knife")
cc.Class({
	extends:cc.Component,
	properties:{
		
		knife:{
			default:null,
			type:cc.Node,
		},
		orinKnife:{
			default:null,
			type:cc.Prefab,
		},
		curTouch:[],
		lastTick:0,
		isOnTouch:false,

		
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
            	self.shotTheKnife(pos);
            	return true;
            },
            onTouchMoved: function(touch, event){
					    	let pos = touch.getLocation();
					    	
				    },
            onTouchEnded: function (argument) {
            	
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

	shotTheKnife:function (pos) {
		var self = this;
		
		this.knife.getComponent("Knife").shot();
	},

}
);