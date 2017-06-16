window.onload=function(){
    var oUl=document.getElementById('ul1');

    var x=-10;
    var y=0;

    var N=11;
    for(var i=0; i<N; i++){
        var oLi=document.createElement('li');
        oLi.style.backgroundImage=`url(img/${i+1}.jpg)`;
        oUl.appendChild(oLi);

        oLi.style.transition=`1s all ease ${200*(N-i)}ms`;

        (function(oLi,i){
            setTimeout(function(){
                oLi.style.transform=`rotateY(${360/N*i}deg) translateZ(300px)`;
            },0);
        })(oLi,i)
    }
    var aLi=oUl.children;
    //键盘控制
    document.onmousedown=function (ev){
        var oEvent=ev||event;
        var mouseStartX=oEvent.clientX;
        var mouseStartY=oEvent.clientY;
        
        var startX=x;
        var startY=y;
        
        var lastX=mouseStartX;
        var lastY=mouseStartY;
        
        speedX=speedY=0;
        
        document.onmousemove=function(ev){
            var oEvent=ev||event;
            
            y=startY+(oEvent.clientX-mouseStartX)/10;
            x=startX-(oEvent.clientY-mouseStartY)/10;
            
            speedX=(oEvent.clientX-lastX)/5;
            speedY=(oEvent.clientY-lastY)/5;
            
            fixAll();
            
            lastX=oEvent.clientX;
            lastY=oEvent.clientY;
        };
        
        document.onmouseup=function (){
            document.onmousemove=null;
            document.onmouseup=null;
            
            startMove();
        };
        
        stopMove();
        
        return false;
    };
    
    var timer=null;
    function startMove(){
        clearInterval(timer);
        timer=setInterval(function (){
            x-=speedY;
            y+=speedX;
            
            speedY*=0.93;
            speedX*=0.93;
            
            if(Math.abs(speedX)<0.1 && Math.abs(speedY)<0.1)
                stopMove();
            
            fixAll();
        }, 30);
    }
    
    function stopMove(){
        clearInterval(timer);
    }
    
    function fixAll(){
        oUl.style.WebkitTransform='perspective(1000px) rotateX('+x+'deg) rotateY('+y+'deg)';
        oUl.style.MozTransform='perspective(1000px) rotateX('+x+'deg) rotateY('+y+'deg)';
        oUl.style.msTransform='perspective(1000px) rotateX('+x+'deg) rotateY('+y+'deg)';
        oUl.style.OTransform='perspective(1000px) rotateX('+x+'deg) rotateY('+y+'deg)';
        oUl.style.transform='perspective(1000px) rotateX('+x+'deg) rotateY('+y+'deg)';
        
        for(var i=0;i<aLi.length;i++){
            var deg=aLi[i].degY+y;
            var a=(deg%360+360)%360;
            
            a=Math.abs(180-a);
            
            var d=0.1+(a/180)*0.9;
            
            if(d<0.2)d=0.2;
            
            aLi[i].style.opacity=d;
            
            //aLi[i].innerHTML=parseInt(a);
        }
    }            
};
