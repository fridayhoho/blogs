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
	},
	onLoad:function () {
		var self = this;
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (argument) {
            	self.isOnTouch = true;
            	return true;
            },
            onTouchMoved: function(touch, event){
					    	let pos = touch.getLocation();
					    	console.log("onTouchMoved", pos.x, pos.y);
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
	    	b2.setScale(0.2);
	    	this.node.addChild(b2, 20);
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