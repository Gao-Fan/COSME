
//获得区间内随机数
function rand(min,max){
	return Math.round(Math.random()*(max-min)+min);
}

//获得随机颜色
function getColor(){
	var str = "0123456789abcedf"
	var strCol = "#"
	for(var i = 0 ; i < 6 ; i++ ){
		strCol += str.charAt(rand(0,15));
	}
	return strCol
}

//根据id查找页面元素
function $id(id){
	return document.getElementById(id);
}

//现在的时间日期
function showTime(){
	var d = new Date();
	var y = d.getFullYear();
	var m = toTwo(d.getMonth()+1)
	var _date = toTwo(d.getDate())
	
	var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
	
	return ( y+"年"+m+"月"+_date+"日"+" "+arr[d.getDay()]);
}
function toTwo(val){
	return val<10? "0"+val : val ;
}
//计算差多少秒
function diff(st,en){
	return Math.abs(st.getTime() - en.getTime()) / 1000;
}
//碰撞
function pz(obj1,obj2){
	var L1 = obj1.offsetLeft;
	var R1 = obj1.offsetLeft + obj1.offsetWidth;		
	var T1 = obj1.offsetTop;
	var B1 = obj1.offsetTop + obj1.offsetHeight;
				
	var L2 = obj2.offsetLeft;
	var R2 = obj2.offsetLeft + obj2.offsetWidth;		
	var T2 = obj2.offsetTop;
	var B2 = obj2.offsetTop + obj2.offsetHeight; 
				
	if( R1 < L2 || L1 > R2 || B1 < T2 || T1 > B2 ){
		return false;
	}else{
		return true;
	}
}	

//完美运动
function startMove(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;                              //如果值为真  表示所有动作都已经完成 可以停止定时器了
		for( var attr in json ){
			var current = 0;
			if( attr == "opacity" ){                 //透明度
				current = parseFloat( getStyle(obj,attr) ) * 100;
			}else if( attr == "zIndex" ){
				current = parseInt( getStyle(obj,attr) ) ;
			}else{
				current = parseInt( getStyle(obj,attr) ) ; 
			}
			
			var speed = (json[attr]-current)/10;
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			if( current!=json[attr] ){//没有达到目标值  将开关变成false
				flag = false;
			} 
			
			if( attr == "opacity" ){ //透明度的操作
				obj.style[attr] = (current + speed) / 100;
			}else if( attr == "zIndex" ){
				obj.style[attr] = json[attr];
			}else{
				obj.style[attr] = current + speed + "px";
			}
		}
	
		//如果flag值为真  表示所有动作都已经完成 可以停止定时器了
		if( flag ){
			clearInterval( obj.timer );
			//上个动作结束后进入下一个动作   
			if( callback ){
				callback();
			}
		}
	},30)
}


//获取非行内元素样式    实际值  
function getStyle(obj,attr){ 
	if( getComputedStyle ){
		return window.getComputedStyle(obj,false)[attr];
	}else{
		return obj.currentStyle[attr];
	}
}

/*--------------------抛物线函数-------------------*/
//确定三点坐标
// 		var startPoint = {
// 			x : addCart.offsetLeft + addCart.offsetWidth/2,
// 			y : addCart.offsetTop
// 		}
// 		var endPoint = {
// 			x : shopCart.offsetLeft + shopCart.offsetWidth/2,
// 			y : shopCart.offsetTop
// 		}
// 		var topPoint = {
// 			x : endPoint.x - 100,
// 			y :endPoint.y - 80
// 		}
// 		
//根据三点坐标确定抛物线系数
//(startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));  
		
//		var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);  
		
//		var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;

