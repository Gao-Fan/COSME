window.onload= function(){
	new Nav().init();        //Nav 国家语言显示
	new BodyTop().init();    //最上端置顶
	new LunBo().init();       //轮播图
	new PaiList().init();    //sideNav
	new shpLiF();
	new EndBanner().init();
	new GetName().init();
}
//得到时间
	function GetName(){
		this.init = function(){
			setInterval( this.time , 1000 )
		}
		this.time = function(){
			var d = new Date();
			var y = d.getFullYear();
			var m = d.getMonth()+1;
			var h = d.getHours();
			var min = d.getMinutes();
			var s = d.getSeconds()
			var _date = toTwo(d.getDate())
			var html = ""
			var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
			html= y+"."+m+"."+_date+" "+h+"."+min+"."+s;
			$(".bottom_time").html( html )
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
				$(".head_language_menu").stop().slideDown(500)
			})
			$(".head_middle_language").mouseleave(function(){
				var flag = true;
				if( flag ){
					$(".head_language_menu").mouseleave(function(){
						$(".head_language_menu").stop().slideUp(500)
					})
				}
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
	
//shopList  ajax局部刷新
	function shpLiF(){
			$("#listNav>ul>a").click(function(){
				var index = $(this).index();
				$.ajax({
				type : "get",
				url : "json/index.json",
				success : function(json){
					var html = "";
					for( var attr in json["shopList_"+(index+1)].list ){
						var item = json["shopList_"+(index+1)].list[attr];
						html += `<ul>
									<li class="shopBox_li_01">
										<a href="javascript:;">
											<img src="images/index/shopList/${item.src1}"/>
										</a>
									</li>
									<li class="shopBox_li_02">
										<img src="images/index/shopList/${item.src2}"/>
									</li>
									<li class="shopBox_li_03">
										<p><a href="">${item.p1}</a></p>
										<p><a href="">${item.p2}</a></p>
									</li>
									<li class="shopBox_li_04">
										<p>${item.p3}</p>
										<p>${item.p4}</p>
									</li>
								</ul>`
					}
					$("#shopBox").html( html )
				
					}
				})
			})
		}

//end_banner 轮播
	function EndBanner(){
		this.obj = $(".end_banner").children();
		this.index = 0;
		this.timer = null;
		this.init = function(){
			this.timer = setInterval( this.autoPlay,2000 );
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
	}
