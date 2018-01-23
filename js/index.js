window.onload= function(){
	new Nav().init();        //Nav 国家语言显示
	new BodyTop().init();    //最上端置顶
	new LunBo().init();       //轮播图
	new PaiList().init();    //sideNav
}
//Nav 国家语言显示
	function Nav(){
		this.init = function(){
			$(".head_middle_country").stop().mouseenter(function(){
				$("#header_middle_menu").stop().slideDown(500);
			})
			$(".head_middle_language").stop().mouseenter(function(){
				$(".head_language_menu").stop().slideDown(500)
			})
			$("#header_middle_menu").mouseleave(function(){
				$("#header_middle_menu").stop().slideUp(500)
			})
			$(".head_language_menu").mouseleave(function(){
				$(".head_language_menu").stop().slideUp(500)
			})
			this.NavMiddle()
		}
		
		this.NavMiddle = function(){
			$(".nav_middle_01").focus(function(){
				$(this).attr("value","");
			}).blur(function(){
				if( !$(this).val() ){
				$(this).attr("value"," 输入关键词 或 货品编号 ");	
				}
			})
		}
		
	}
//最上端置顶
	function BodyTop(){
		this.init = function(){
			$(document).scroll(function(){
				$("#red_bar_td").css({"position":"fixed","top":0,"left":0,"right":0,"z-index":3})
			})
			this.blik();
		}
		this.blik = function(){
			var that = this
			$("#red_bar_td a").fadeOut(2000,function(){
				$(this).fadeIn(2000,function(){
					that.blik();
				})
			})
		}
	}
//轮播图
	function LunBo(){
		this.index = 0 ;
		this.timer = null;
		this.init = function(){
			this.timer = setInterval( this.autoPlay,2000 );
			this.enter();
		}
		this.autoPlay = function(){
			this.index++;
			$(".banner ol li").removeClass("bannerColor")
			if( this.index == 4 ){
				this.index = 0;
			}
			$(".banner ol li").stop().eq(this.index).addClass("bannerColor")
			$(".banner ul a").stop().eq(this.index).animate({"opacity":1},1000)
							 .siblings().animate({"opacity":0},1000)
		}.bind(this);
		this.enter = function(){
			var that = this;
			$(".banner ol li").mouseenter(function(){
				var sum = $(this).index()-1;
				that.index = sum;
				that.autoPlay();
				clearInterval(that.timer);
			})
			$(".banner ol li").mouseleave(function(){
				that.timer = setInterval( that.autoPlay,2000 )
			})
		}
	}
//图标切换 sideNav
	function PaiList(){
		this.speed = 300;
		this.init = function(){
			$(".side_wrap_left").click(function(){
				$(".side_wrap ul").css("position","relative");
				var spL = parseInt($(".side_wrap ul").css("left"))
				if( Math.abs(spL) > 1000){
					spL = 0;
					$(".side_wrap ul").stop().animate({"left":spL},1000)
				}else{
					$(".side_wrap ul").stop().animate({"left": spL - this.speed },1000)
				}
			}.bind(this))
			
			$(".side_wrap_right").click(function(){
				$(".side_wrap ul").css("position","relative");
				var spL = parseInt($(".side_wrap ul").css("left"))
				console.log(spL)
				if( spL >= 0 ){
					spL = 0;
					$(".side_wrap ul").stop().animate({"left":spL},1000)
				}else{
					$(".side_wrap ul").stop().animate({"left": spL + this.speed },1000)
				}
			}.bind(this))
		}
	}
//