/*---------Jetpop Js by jetchou.com---------*/
popalbum = function (pop){	
	for(var i = 0 ; i < pop.length ; i++)
	{
		if(pop[i].picItem)
		{
			$(document).on("click",pop[i].picItem,{picItem:pop[i].picItem,src:pop[i].src,summary:pop[i].summary,zindex:pop[i].zindex},function(e){
				popimg({object:$(this),picItem:e.data.picItem,src:e.data.src,summary:e.data.summary,zindex:e.data.zindex});
			});
		}
	}
	popimg = function(pop){
		object=pop.object;
		picItem=pop.picItem;
		src=pop.src;
		summary=pop.summary;
		zindex=pop.zindex;
		if(typeof object == "object"){
		poppicclose();
		img = $(object).find(src[0]).attr(src[1]);
		if(!img){
			popmsg({html:"<div style='padding:30px 50px;'>图片路径设置错误！</div>"});
			return false;
		}
		if(!zindex){
			zindex = 900;
		}
		if(!summary){
			text="";
		}
		else{
			if(summary[1]=="text"){
			text = $(object).find(summary[0]).text();
			}else{
			text = $(object).find(summary[0]).attr(summary[1]);
			}
		}
		wwidth=$(window).width();
		wheight=$(window).height();
		//上下张图片获取
		index=$(object).index(picItem);
		$nextobject = $(picItem).eq(index+1);
		$prevobject = $(picItem).eq(index-1);
		if (index == ($(picItem).length-1) && !$("#jetpopmsg").length)
			{
				$nextobject = "已经是最后一张图片";
			}
		if (index == 0  && $("#jetpopmsg").length == 0)
			{
				$prevobject = "已经是第一张图片";
			}
		next = {object:$nextobject,picItem:picItem,src:src,summary:summary,zindex:zindex};
		prev = {object:$prevobject,picItem:picItem,src:src,summary:summary,zindex:zindex};
		if(text)
		{
			html = '<div class="show-picture"><img id="piczoom" src="'+img+'"><span>'+text+'</span></div>';
		}
		else
		{			
			html = '<div class="show-picture"><img id="piczoom" src="'+img+'"></div>';
		}
		}
		else{
			popmsg({html:"<div style='padding:30px 50px;'>"+object+"</div>"});
			setTimeout(function(){popmsgclose('#jetpopmsg');},1000);
			return false;
		}
		$("body").prepend('<div id="jetpoppic"><div class="pop_next" onclick="popimg(next)"></div><div class="pop_prev" onclick="popimg(prev)"></div><div class="poppic_close" onclick="poppicclose()"></div><div class="popimg">'+html+'</div><div><div class="jetpop_bg" id="jetpop_bg"></div>');
		$("#jetpoppic").css({"height":wheight+"px","z-index":zindex+1});
		$(".jetpop_bg").css({opacity:"0.8","height":wheight+100+"px","z-index":zindex})
		$(".jetpop_bg").addClass("loading");
		$(".poppic_close").css({"z-index":zindex+3})
		$(".pop_prev").css({"z-index":zindex+1})
		$(".pop_next").css({"z-index":zindex+1})
		$(".popimg").css({"z-index":zindex+2});
		$('#piczoom').load(function(){
		theImage = new Image();
		theImage.src = img;
		imgwidth = theImage.width;
		imgheight = theImage.height;
		wwidth=$(window).width();
		wheight=$(window).height();
		realheight=0;
		realwidth=0;
		if(wwidth>=wheight && imgwidth>=imgheight && (wwidth/wheight)>=(imgwidth/imgheight) && wheight>=imgheight)
		{
			realheight=imgheight;
			realwidth=realheight*(imgwidth/imgheight);
		}
		if(wwidth>=wheight && imgwidth>=imgheight && (wwidth/wheight)>=(imgwidth/imgheight) && wheight<imgheight)
		{
			realheight=wheight-20;
			realwidth=realheight*(imgwidth/imgheight);
		}
		if(wwidth>=wheight && imgwidth>=imgheight && (wwidth/wheight)<(imgwidth/imgheight) && wwidth>=imgwidth)
		{
			realwidth=imgwidth;
			realheight=realwidth*(imgheight/imgwidth);
		}
		if(wwidth>=wheight && imgwidth>=imgheight && (wwidth/wheight)<(imgwidth/imgheight) && wwidth<imgwidth)
		{
			realwidth=wwidth;
			realheight=realwidth*(imgheight/imgwidth);
		}
		if(wwidth>=wheight && imgwidth < imgheight &&  wheight>=imgheight)
		{
			realheight=imgheight;
			realwidth=realheight*(imgwidth/imgheight);
		}
		if(wwidth>=wheight && imgwidth < imgheight &&  wheight<imgheight)
		{
			realheight=wheight-20;
			realwidth=realheight*(imgwidth/imgheight);
		}


		if(wwidth < wheight && imgwidth >= imgheight &&  wwidth>=imgwidth)
		{
			realwidth=imgwidth;
			realheight=realwidth*(imgheight/imgwidth);
		}

		if(wwidth < wheight && imgwidth >= imgheight &&  wwidth<imgwidth)
		{
			realwidth=wwidth;
			realheight=realwidth*(imgheight/imgwidth);
		}

		if(wwidth < wheight && imgwidth < imgheight &&  wheight>=imgheight)
		{
			realheight=imgheight;
			realwidth=realheight*(imgwidth/imgheight);
		}
		if(wwidth < wheight && imgwidth < imgheight &&  wheight<imgheight && (wwidth/wheight)>=(imgwidth/imgheight) )
		{
			realheight=wheight-20;
			realwidth=realheight*(imgwidth/imgheight);
		}
		if(wwidth < wheight && imgwidth < imgheight &&  wheight<imgheight && (wwidth/wheight)<(imgwidth/imgheight) )
		{
			realwidth=wwidth;
			realheight=realwidth*(imgheight/imgwidth);
		}

		$("#piczoom").width(realwidth).height(realheight);
		$(".popimg").css({"width":+realwidth+"px","height":+realheight+"px","margin-left":"-"+realwidth/2+"px","margin-top":"-"+realheight/2+"px"});
		$(".popimg").fadeIn(300);
		$(".show-picture").css("transform","scale(1, 1)");
		$(".poppic_close,.pop_next,.pop_prev").delay(300).fadeIn();
		});

		//手机版滑动事件绑定
	    $('.popimg').bind('touchstart', function(e) {
	        var touch = e.originalEvent;
	        startX = e.originalEvent.changedTouches[0].pageX;
	        startY = e.originalEvent.changedTouches[0].pageY;
	        $(".popimg").on('touchmove', function(e) {
	            e.preventDefault();
	            touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
	                $(this).css({"transform":"translateX("+(touch.pageX - startX)+"px)","transition":" all 0s ease-in-out"});//使用css3.0
	                //$(this).css({"margin-left":"-"+(realwidth/2-(touch.pageX - startX))+'px'}); //不使用css3.0
	            if(touch.pageX - startX > realwidth/4) {
	                popimg(prev);
	                $(this).off('touchmove');

	            } else if(touch.pageX - startX < -realwidth/4) {
	                popimg(next);
	                $(this).off('touchmove');
	            };
	            if(touch.pageY - startY > 10) {
	                //console.log("下划");
	            } else if(touch.pageY - startY < -10) {
	                //console.log("上划");
	            };
	        });
	        return false;
	    }).bind('touchend', function() {
	        $(this).css({"transform":"translateX(0px)","transition":" all 0.3s ease-in-out"});//使用css3.0
	        //$(this).animate({"marginLeft":"-"+realwidth/2+'px'}); //不使用css3.0
	        $(".show-picture").off('touchmove');
	    });
	}


}

popmsg = function(pop){
  if(!pop.zindex)
  {
  	zindex=900;
  }
  wheight=$(window).height();
  if(!$("#jetpop_bg").length){
  	$("body").prepend('<div class="jetpop_bg" id="jetpop_bg"></div>');
  	$(".jetpop_bg").css({opacity:"0.3","height":wheight+"px","z-index":zindex})
  }
  else
  {
  	zindex=$("#jetpopmsg:first").css("z-index");
	  if(!zindex)
	  {
	  	zindex=$("#jetpoppic:first").css("z-index");
	  }
  	zindex=parseInt(zindex)+1;
  }
  popdom="'.popmsg"+zindex+"'";
  if(pop.dom){
    content = $(pop.dom).prop("outerHTML");
    //$(html).hide(); 
    html = content;
    if(!html){html='<div class="normal_msg"><p class="normal_msg_text">无法显示，请稍后再试！</p><span class="normal_msg_button" onclick="popmsgclose('+popdom+')">关闭</span></div>'}
  }
  if(pop.msg){
  	html='<div class="normal_msg"><p class="normal_msg_text">'+pop.msg+'</p><span class="normal_msg_button" onclick="popmsgclose('+popdom+')">关闭</span></div>';
  }
  if(pop.html){
  	html=pop.html;
  }
  $("body").prepend('<div id="jetpopmsg" class="popmsg'+zindex+'" style="height:'+wheight+'px;z-index:'+(zindex+1)+';"><div class="pophtml pophtml'+zindex+'">'+html+'<div class="pop_close" onclick="popmsgclose('+popdom+')">x</div></div><div>');
  pwidth = $(".pophtml"+zindex).innerWidth();
  pheight = $(".pophtml"+zindex).innerHeight();
  $(".pophtml"+zindex).css({"z-index":zindex+1,"margin-left":"-"+pwidth/2+"px","margin-top":"-"+pheight/2+"px"});
  $(".pop_close").css({"z-index":zindex+1})
  $(".pophtml"+zindex).fadeIn();
}

poppicclose =function(){
	$("#jetpoppic").remove();
 	if(!$("#jetpopmsg").length){
		$("#jetpop_bg").remove();
	}
}
popmsgclose =function(object){
	$(object).remove();
 	if(!$("#jetpoppic").length && !$(".pophtml").length){
		$("#jetpop_bg").remove();
	}
}