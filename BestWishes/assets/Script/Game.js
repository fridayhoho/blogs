cc.Class({
	extends:cc.Component,
	properties:{
		bubble:{
			default:null,
			type:cc.Node,
		},
		fish:{
			default:null,
			type:cc.Node,
		},
	},
	onLoad:function () {
		cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this.node);
	},
	onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        // if (!target.containsTouchLocation(touch)) return false;
        console.log("onTouchBegan", touch)
        
        return true;
    },
    onTouchMoved(touch, event, target){
    	let pos = touch.getLocation();
    	console.log("onTouchMoved", touch.getLocation().x, touch.getLocation().y);
    	let fish = cc.find("Fish", target);
    	fish.setPosition(cc.p(pos.x, pos.y));

    },
    onTouchEnded(touch, event){
        console.log("onTouchEnded", touch)
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