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

	getMaxSubArr:function (arr) {
		if (arr.length <= 1) {
			return arr;
		}
		let curMaxSum = 0;
		let curSum = 0;
		let subArr = [];
		let maxes = [];
		for (var i = 0; i < arr.length; i++) {
			curSum = curSum + arr[i];
			console.log("curSum:",curSum, "curMaxSum:", curMaxSum, " arr[i]:", arr[i]);
			if (curSum > curMaxSum) {
				subArr.push(arr[i]);
				curMaxSum = curSum;
			}else if (curSum < curMaxSum) {
				if (subArr.length > 0) {
					maxes[curMaxSum] = subArr.slice(0);	
				}
				curSum = 0;
				subArr.length = 0;
			}	
		}
		maxes[curMaxSum] = subArr.slice(0);
		console.log("====result:====");
		let theMax = 0;
		let maxSub = [];
		maxes.forEach(function (value, index, arr) {
			if (index > theMax) {
				theMax = index;
				maxSub = value;
			}
			console.log("idx:", index, " value:", value);
		})
		console.log("------max:", theMax)
		for (var i = 0; i < maxSub.length; i++) {
			console.log(maxSub[i]);
		}
	},
};

module.exports = UIHelper