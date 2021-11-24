document.onkeydown=function(){
    var e = window.event||arguments[0];
    if(e.keyCode==123){
    	alert('请尊重劳动成果！www.moyublog.com');
            return false;
    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
    	alert('请尊重劳动成果！www.moyublog.com');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==85)){
            alert('请尊重劳动成果！www.moyublog.com');
            return false;
    }else if((e.ctrlKey)&&(e.keyCode==83)){
           alert('请尊重劳动成果！www.moyublog.com');
           return false;
    }
}
document.oncontextmenu=function(){
	alert('请尊重劳动成果！www.moyublog.com');
    return false;
}

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ac325f03b1062f6ff332a9994497eb01";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();