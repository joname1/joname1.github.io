window.onload=function(){
	showSubList();
}
function showSubList(){
	var sublist=[];
	var listA=[];
	var timer=[];
	var list=document.getElementById("list");
	var container=document.getElementById("categorys");
	var aLi=list.getElementsByTagName("li");
	var aDiv=list.getElementsByTagName("div");
	for(var i in aLi){
		if(aLi[i].className=="nav"){
			listA.push(aLi[i].getElementsByTagName("a")[0]);
		}
	}
	for(var i in aDiv){
		if(aDiv[i].className=="sublist"){
			sublist.push(aDiv[i]);
		}
	}
	for(var i in listA){
		listA[i].index=i;
		listA[i].onmouseover=function(){
			if(timer[this.index]){
				clearTimeout(timer[this.index]);
			}
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
			sublist[this.index].style.display="block";
			if(scrollTop){
			sublist[this.index].style.top=scrollTop-container.offsetTop-list.offsetTop+"px";
			}
		}
		sublist[i].index=i;
		sublist[i].onmouseover=function(){
			if(timer[this.index]){
				clearTimeout(timer[this.index]);
			}
			sublist[this.index].style.display="block";
		}
		listA[i].onmouseout=sublist[i].onmouseout=function(){
			var index=this.index;
			timer[ index]=setInterval(function(){
				sublist[ index].style.display="none";
				sublist[index].style.top=0;
			},30);
		}
		timer[i]=null;
	}


}