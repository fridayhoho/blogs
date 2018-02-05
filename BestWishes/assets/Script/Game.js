cc.Class({
	extends:cc.Component,
	properties:{

	},
	onLoad:function () {
		let testarr = [1, -2, 3, 4, -9, 6];
// this.getMaxSubArr([-1, 2, 3, -9]);
// this.getMaxSubArr([2, -1, 2, 3, -9]);
// this.getMaxSubArr([-1, 2, 3, -9, 11]);
// this.getMaxSubArr([-2, -1, 1, 2]);
// this.getMaxSubArr([100, -9, 2, -3, 5]);
// this.getMaxSubArr([1, 2, 3]);
// 		this.getMaxSubArr(testarr);
this.getMaxSubArr([-1, -2, -3]);
	},
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
	update:function (dt) {
		
	},

}
);