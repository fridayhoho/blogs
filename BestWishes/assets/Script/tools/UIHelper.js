var UIHelper = {
	// createAnim : function (frameName, frameCnts, step){
	// 	var cache = cc.AnimationCache.getInstance()
	//     var animation = cache.getAnimation(frameName)
	//     if (animation == null) {
	//     	step = step || (0.03);
	// 		keyFrameIndex = keyFrameIndex || frameCnts;
	//     	var array = {};
	//     	var tmpSp = display.newSprite("#"+frameName + "00.png");
	// 		var fSize = tmpSp.getContentSize()
	// 		var keyFrame = nil
	// 	    var animFrames = {}
	// 	    for (var i = 0; i < frameCnts; i++) {
	// 	    	var frameName = string.format("%s%02d.png", frameName, i-1)
	// 	    	var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(frameName)
	// 	        animFrames[i] = frame
	// 	    end
	// 	    animation = cc.Animation.createWithSpriteFrames(animFrames, step)
	// 	    cache.addAnimation(animation, frameName)
	//     }
		
	//     var sprite = display.newSprite()
	//     sprite.setAnchorPoint(cc.p(0.5, 0.5))
	    
	//     var action = cc.Animate.create(animation)
	//     sprite.runAction(cc.RepeatForever.create(action))
	//     return sprite;
};

module.exports = UIHelper