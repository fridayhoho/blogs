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
		}
	},
	onLoad:function () {
		var self = this;
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (argument) {
            	return true;
            },
            onTouchMoved: function(touch, event){
					    	let pos = touch.getLocation();
					    	console.log("onTouchMoved", pos.x, pos.y);
					    	// let fish = cc.find("Fish", target);
					    	// let bubble = self.bub;
					    	let b2 = cc.instantiate(self.orinBubble);
					    	b2.setPosition(cc.p(pos.x - cc.visibleRect.width*0.5, pos.y-cc.visibleRect.height*0.5));
					    	self.node.addChild(b2, 20);
					    	// self.fish.setPosition(cc.p(pos.x, pos.y));
				    },
            onTouchEnded: function (argument) {
            	
            }
        }, this.node);
	},

	update:function (dt) {
		
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