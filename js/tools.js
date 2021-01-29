function getStyle(obj, name) { //第二个参数为字符串
	if (obj.currentStyle) {
		return obj.currentStyle[name];
	} else {
		return getComputedStyle(obj, null)[name];
	}
}

// 切换类 toggleClass
// 有则删除无责添加
function toggleClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	if (hasClass(obj, cn)) { // 有则删除
		delClass(obj, cn);
	} else { //无则添加
		addClass(obj, cn);
	}
}

// 删除类 delClass
// 添加不重复类 重复则不添加
function delClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	// 将cn 替换为空串即可删除
	obj.className = obj.className.replace(reg, "");
}

// 给元素添加类addClass
// 添加不重复类 重复则不添加
function addClass(obj, cn) {
	if (!hasClass(obj, cn)) { // 如果没有cn类则添加
		obj.className += " " + cn;
	}
}

// 判断是否已经含有cn类
// 有则返回 true 无则返回 false
function hasClass(obj, cn) {
	// \b 正则表达式 表示单词边界
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
}


// 移动函数
function move(obj, target, attr, speed, callBack) {
	// 添加定时器钱先删除
	clearInterval(obj.timer);
	// 判断移动方向
	if (parseInt(getStyle(obj, attr)) >= target) speed = -speed;
	// 设置定时器
	obj.timer = setInterval(function() {
		var newValue = parseInt(getStyle(obj, attr)) + speed;
		obj.style[attr] = newValue + "px";
		// 判断是否到达终点
		if (speed > 0 && newValue > target || speed < 0 && newValue < target) {
			obj.style[attr] = target + "px";
			clearInterval(obj.timer);
			callBack && callBack();
		}
	}, 50);
}
