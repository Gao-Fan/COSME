window.onload= function(){
	new Nav().init();           //Nav 国家语言显示
	new BodyTop().init();       //最上端置顶
	new CarBoard().init();      //head购物篮广告
	new JunpHtml()              //页面跳转
	new shopNum().init()        //判断购物车有多少东西
	new EndBanner().init();     //右下角广告
	new GetTime().init();	    //左下角时间
	new ShowUl();               //main点击左侧按钮出现子元素ul
}
//点击左侧按钮出现子元素ul
	function ShowUl(){
		$("li").click(function(){
		 	if( $(this).find("ul").css("display") == "block" ){
		 		$(this).find("ul").hide(600);
		 	}else{
		 		$(this).find("ul").show(600);
		 	}
		})
	}
//得到时间
	function GetTime(){
		this.init = function(){
			setInterval( this.time , 1000 )
		}
		this.time = function(){
			var d = new Date();
			var y = d.getFullYear();
			var m = d.getMonth()+1;
			var h = d.getHours();
			var min = d.getMinutes();
			var s = d.getSeconds();
//			var _date = toTwo(d.getDate())
			var x = 0;
			var _date = d.getDate();
			var html = ""
			var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
			html= y+"."+m+"."+_date+" "+h+"."+min+"."+s;
			$(".bottom_time").html( html )
		}
	}
	
//end_banner 轮播
	function EndBanner(){
		this.obj = $(".end_banner").children();
		this.index = 0;
		this.timer = null;
		this.init = function(){
			this.timer = setInterval( this.autoPlay,2000 );
			this.mouseEnter();
		};
		this.autoPlay = function(){
			this.index++;
			if( this.index == 5 ){
				this.index = 0;
			}
			console.log()
			this.obj.eq(this.index).animate({"opacity":1},1000)
					.siblings().animate({"opacity":0},1000)
		}.bind(this);
		this.mouseEnter = function(){
			this.obj.mouseenter(function(){
				clearInterval( this.timer )
			}.bind(this));
			this.obj.mouseleave(function(){
				this.timer = setInterval( this.autoPlay,2000 );
			}.bind(this));
		}
	}

//判断购物车里有多少东西
	function shopNum(){
		this.init = function(){
			var sum = $.cookie("sum")
			$("#junpCar p").eq(0).find("span").html( sum )
			$("#head_myshopcar>ul>li").eq(0).find("span").html( sum )
		}
	}
	
//跳转
	function JunpHtml(){
		$("#head_myshopcar,#junpCar").click(function(){
			location.href = "shopCar.html"
		}).mouseenter(function(){
			$(this).css("cursor","pointer")
		});
	}
	
//购物车广告滚动
	function CarBoard(){
		this.body = $("#carList ul");
		this.index = 0;
		this.init = function(){
			this.timer = setInterval( this.autoPlay , 3000 )
		}
		this.autoPlay = function(){
			this.index++;
			if( this.index == this.body.children().size() ){
				this.index = 0
			}
			this.body.animate({"top":-20*this.index-8},500)
		}.bind(this)
	}
//最上端置顶
	function BodyTop(){
		this.init = function(){//$("body,html")
			$(window).scroll(function(){
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
//Nav 国家语言显示
	function Nav(){
		this.init = function(){
			$(".head_middle_country").stop().mouseenter(function(){
				$("#header_middle_menu").stop().slideDown(500);
			})
			$(".head_middle_country").mouseleave(function(){
				$("#header_middle_menu").stop().slideUp(500)
			})

			$(".head_middle_language").stop().mouseenter(function(){
				$("#head_language_menu").slideDown(500)
				$("#head_language_menu a").animate({"top":0},500)
			}).mouseleave(function(){
				$("#head_language_menu").stop().slideUp(500);
				$("#head_language_menu a").animate({"top":-30},500)
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