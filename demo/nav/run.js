function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];//兼容IE
		}
		else{
			return getComputedStyle(obj,false)[attr];//兼容FF
		}
	}
function fnStartRun(obj,attr,iTarget){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var iCur=0;
	
		if(attr=='opacity')/*兼容透明度*/
		{
		iCur=parseInt(parseFloat(getStyle(obj, attr))*100);/*去掉小数避免小数带来的BUG*/
		}
		else
		{
		iCur=parseInt(getStyle(obj, attr));
		}
	
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		if(iCur==iTarget){
			clearInterval(obj.timer)
		}else{
			if(attr=="opacity"){
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}else
			obj.style[attr]=iCur+iSpeed+"px";
		}

	},30);
}