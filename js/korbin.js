/**
 * 
 * @authors Korbin 280674094@qq.com
 * @date    2019-04-24 17:04:26
 * @version $Id$
 */

$(function(){

	$(".coordinate-item").hover(function(){
		$(this).find(".city-name").stop().animate({bottom:'40px',opacity:'0'},260,function(){
			$(this).hide();
		});
		$(this).find(".warehouse-detail").show().stop().animate({bottom:'26px',opacity:'1'},200);
	},function(){
		$(this).find(".warehouse-detail").stop().animate({bottom:'50px',opacity:'0'},200,function(){
			$(this).hide();
		});
		$(this).find(".city-name").show().stop().animate({bottom:'26px',opacity:'1'},260);
	});

	$(".coordinate-item").hover(function(){
		$(this).find(".warehouse_dright").show().stop().animate({left:'22px',opacity:'1'},200);
	},function(){
		$(this).find(".warehouse_dright").stop().animate({left:'50px',opacity:'0'},200,function(){
			$(this).hide();
		});
		
	});

	$(".switchFunc .tabT .box span").click(function(){	 
		$(this).addClass('curr').siblings().removeClass('curr');   
	    var index = $(this).index();
	    var ip = $(this).parents('li');
	    number = index;
	    ip.find('.switchBody .item').hide();
	    ip.find('.switchBody .item:eq('+index+')').show();
	    var title = $(this).parents('.switchBrandLogo');
	    title.find('.showtp').text($(this).text());
	    title.find('.showtp').removeClass('active');
	    title.find('.box').slideUp('fast');
	});

	$('.switchBrandLogo .showtp').click(function(){
		$(this).parent().find('.box').stop().toggle();
		if($(this).hasClass('active')){
			$(this).removeClass('active')
		}else{
			$(this).addClass('active')
		}
	})

	// 视频新增与修改
	$('body').on('click','.playShade',function(){
		$(this).parent('.videoInner').addClass('videoPlay');
		document.getElementById('ourvideo').play();
		$(this).hide();
	});

	$('body').on('click','.closeVideoBtn',function(){
		document.getElementById('ourvideo').pause();
		$(this).parent('.videoInner').removeClass('videoPlay');
		$(this).parent('.videoInner').find('.playShade').show();
	});
	// video end

	$(".Ellipsis").each(function (i) {
        var divH = $(this).height();
        var $p = $(".gt", $(this)).eq(0);
        while ($p.outerHeight() > divH) {
          $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
        };
      });
    
})
