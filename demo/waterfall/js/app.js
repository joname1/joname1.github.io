window.onload=function(){
waterfall();
}
function waterfall(){
    var parent=document.getElementById("container");
    var pin=getAllElemByClassName(parent,'pin');
    var pinx=pin[0].offsetWidth;
    //console.log(pinx);
    var clinetx=document.documentElement.clientWidth;
    var num=Math.floor(clinetx/pinx);
  //  parent.style.cssText="width:"+pinx*num+"px;margin:0px,auto;height:auto";
    //console.log(num);
     var pinHightAr=[]

    for(var i =0;i<pin.length;i++){
        var piny=pin[i].offsetHeight;
        if(i<num){
            pinHightAr[i]=piny;
        }else{
            var minH=Math.min.apply(null,pinHightAr);
            var minHindex=getminHIndex(pinHightAr,minH);
            pin[i].style.position="absolute";
            pin[i].style.left=pin[minHindex].offsetLeft+'px';
            pin[i].style.top=minH+'px';
            pinHightAr[minHindex]+=pin[i].offsetHeight;
        }
    }
}
function getAllElemByClassName(parent,className){
    var obj=parent.getElementsByTagName("*");
    var list=[];
    for(var i=0;i<obj.length;i++){
        if(obj[i].className==className){
            list.push(obj[i]);
        }
    }
    return list;
}
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}