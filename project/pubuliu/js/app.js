window.onload=function(){
        imgLocation("container","box");
        // var imgData={"data":[{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"}]}    //模拟数据（json）

    window.onscroll= function () {
       if( checkFlag()){
            var cparent=document.getElementById("container"); //父级对象
           for(var i=0;i<imgData.data.length;i++){
               var ccontent =document.createElement("div"); //添加元素节点
               ccontent.className="box";                    //添加类名属性
               cparent.appendChild
                (ccontent);               //添加子节点
               var boximg =document.createElement("div");
               boximg.className="box-img";
               ccontent.appendChild(boximg);
               var img=document.createElement("img");
               img.src="img/"+imgData.data[i].src;
               boximg.appendChild(img);

           }
           imgLocation("container","box");          //重新调用一次方法，重新排版
       }

    }

}

function checkFlag(){
    var cparent=document.getElementById("container");      //父级元素
    var ccontent=getChildElement(cparent,"box");        //获取元素
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;    //创建【触发添加块框函数waterfall()】的高度；当出现最后一个块元素的时候自动加载后面的内容
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;  //滚动的高度（注意兼容性）
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;   //页面高度，兼容性
    if(lastContentHeight<scrollTop+pageHeight){         //判断到达指定高度  返回true 触发imgLocation函数
        return true;
    }
}

function imgLocation(parent,content){
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    var imgWidth=ccontent[0].offsetWidth;       //一个块元素的高度
    var num=Math.floor(document.documentElement.clientWidth/imgWidth);  //每一行能容纳的块元素的个数（窗口宽度除以一个块的宽度）
    cparent.style.cssText="width:"+imgWidth*num+"px;margin:0 auto";     //设置样式，居中


    var BoxHeightArr=[];    //创建数组来存储块元素的高度
    for(var i=0; i<ccontent.length;i++){    //遍历ccontent数组的每个元素
        if(i<num){
            BoxHeightArr[i]=ccontent[i].offsetHeight;   //第一行中的num个块元素，添加到数组BoxHeightArr
        }else{
            var minHeight= Math.min.apply(null,BoxHeightArr);   //数组中最小值
            var minIndex=getminheightLocation(BoxHeightArr,minHeight);
            ccontent[i].style.position="absolute";  //设置绝对定位，方便布局
            ccontent[i].style.top=minHeight+"px";
            ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
            //数组元素最小的高 + 新添加上的块元素的高度
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight; //更新添加一个块状元素的高度
        }

    }

}

//获取块元素的最小值的索引值index

function getminheightLocation(BoxHeightArr,minHeight){
    for( var i in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
        }
    }
}


//通过父级和子元素的class类，获取同类子元素的数组
function getChildElement(parent,content){
    var contentArr=[];      //创建一个数组
    var allcontent=parent.getElementsByTagName('*');    //获取父级的所有元素  通配
    for(var i=0; i<allcontent.length;i++){      //遍历所有子元素，判断类型，放入数组
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
        return contentArr;      //返回数据
}