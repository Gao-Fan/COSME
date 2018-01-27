window.onload= function(){
	new Nav().init();           //Nav 国家语言显示
	new BodyTop().init();       //最上端置顶
	new PaiList().init();       //sideNav
	new EndBanner().init();     //右下角广告
	new GetName().init();	    //左下角时间
	new CarBoard().init();      //head购物篮广告
	new ShowUl();               //main点击左侧按钮出现子元素ul
	new register().init();      //登陆验证
}
//登录验证
	function register(){
		this.init = function(){
			$("#enBtn").click(function(){
				var obj = this.getCookie("user");
				if( $("#useEmile").val() != "" && $("#useEmile").val() == obj.email 
					&& $("#usePwd").val() != "" && $("#usePwd").val() == obj.pwd
				){
					$("#enterEM1,#enterEM2").css("display","none")
					document.cookie = "enterOk=ok";
					console.log( document.cookie )
					alert("登录成功")
					location.href = "../index.html";
					return;
				}
					if( $("#useEmile").val() != obj.email || $("#useEmile").val() ==""){
						$("#enterEM1").css("display","block")
						$("#enterEM1 em").html("用户名错误或用户名不存在")
					}else{
						$("#enterEM1").css("display","none")
						$("#enterEM1 em").html("")
					}
					if( $("#usePwd").val() != obj.pwd || $("#usePwd").val() ==""){
						$("#enterEM2").css("display","block")
						$("#enterEM2 em").html("请输入正确的密码")
					}else{
						$("#enterEM2").css("display","none")
						$("#enterEM2 em").html("")
					}
			}.bind(this) )
		};
		this.setCookie = function(key,value,exdays){
			var now = new Date();
			now.setTime(now.getTime()+exdays*24*60*60*1000);
			document.cookie=key+"="+value+";"+"Expires"+"="+now+";";
		}
		this.getCookie = function(key){
			cookie_info = document.cookie;
			if (cookie_info) {
				list = cookie_info.replace(/;\s/g,";").split(';');
				for (var i=0;i<list.length;i++) {
					item = list[i].split('=');
					if (item[0] == key) {
						oldCookie = item[1];
						return JSON.parse(oldCookie);
						}
					}
				return [];	
				}
			return [];
			}
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
//购物城广告滚动
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
			var s = d.getSeconds();
			var _date = d.getDate();
			var html = "";
			var arr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
			html= y+"."+m+"."+_date+" "+h+"."+min+"."+s;
			$(".bottom_time").html( html );
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
