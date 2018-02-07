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
		bub:{
			default:null,
			type:cc.Node,
		},
		curTouch:[],
		lastTick:0,
		isOnTouch:false,

		bubbles:[],//所有气泡
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
            	return true;
            },
            onTouchMoved: function(touch, event){
					    	let pos = touch.getLocation();
					    	// console.log("onTouchMoved", pos.x, pos.y);
					    	// let fish = cc.find("Fish", target);
					    	// let bubble = self.bub;
					    	self.curTouch = pos;
					    	
					    	// self.fish.setPosition(cc.p(pos.x, pos.y));
				    },
            onTouchEnded: function (argument) {
            	self.isOnTouch = false;
            }
        }, this.node);
	},

	update:function (dt) {
		this.lastTick += dt;
		if (this.lastTick > 0.06 && this.isOnTouch) {
			this.lastTick = 0
			let b2 = cc.instantiate(this.orinBubble);
	    	b2.setPosition(cc.p(this.curTouch.x - cc.visibleRect.width*0.5, this.curTouch.y-cc.visibleRect.height*0.5));
	    	b2.setScale(dt* 10);
	    	// b2.setColor(cc.color(230, 200, 200));

	    	this.bubbles.push(b2)
	    	var bg = this.node.getChildByName("bg")
	    	// console.log("same?", this.fish.getParent() == bg);
	    	bg.addChild(b2);
		}
		for (var i = 0; i < this.bubbles.length; i++) {
			if (this.bubbles[i].x > cc.visibleRect.width * 0.5 || this.bubbles[i].y > cc.visibleRect.height * 0.5
				|| this.bubbles[i].y < - cc.visibleRect.height*0.5 || this.bubbles[i].y > cc.visibleRect.height*0.5) {
				this.bubbles[i].removeFromParent();
				this.bubbles.slice(-1, 1);	
			}
			
		}
	},

	containsTouchLocation:function (touch) {
        var getPoint = touch.getLocation();
        var myRect = this.rect();

        myRect.x += this.x;
        myRect.y += this.y;
        return cc.rectContainsPoint(myRect, getPoint);//this.convertTouchToNodeSpaceAR(touch));
    },
}
);