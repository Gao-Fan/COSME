window.onload= function(){
	new Nav().init();           //Nav 国家语言显示
	new BodyTop().init();       //最上端置顶
	new PaiList().init();       //sideNav
	new EndBanner().init();     //右下角广告
	new GetName().init();	    //左下角时间
	new CarBoard().init();      //head购物篮广告
	new ShowUl();               //main点击左侧按钮出现子元素ul
	new Verify().init()         //表单验证
	new JunpHtml();             //页面跳转
	new shopNum().init()        //购物车里有多少东西
}
//判断购物车里有多少东西
	function shopNum(){
		this.init = function(){
			var arr = this.getCookie("sum")
			$("#junpCar p").eq(0).find("span").html( arr )
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
//跳转
	function JunpHtml(){
		$("#head_myshopcar,#junpCar").click(function(){
			location.href = "shopCar.html"
		}).mouseenter(function(){
			$(this).css("cursor","pointer")
		});
	}
//表单验证
	function Verify(){
//		* 请在标示的项目输入正确资料：
//		称谓及姓名 - 请输入此项资料
//		所在地 - 请选择你的所在地
//		电邮地址 - 请输入此项资料
//		建立密码 - 密码须由 6-12 个英文及数字组成，大小写有别。
//		使用条款 - 请在方格内打勾表示接受有关的条款。
//		图像核证 - 请按图像显示输入字符
		this.init = function(){
			this.flagName = true;
			this.flagAddress = true;
			this.flagEmile = true;
			this.flagPwd = true;
			this.flagQpwd = true;
			this.flagProvision = true;
			$("#formBox").submit(function(){
				if( this.flagName&&this.flagAddress&&this.flagEmile&&this.flagPwd&&
					this.flagQpwd&&this.flagProvision){
						alert("注册成功")
						var obj = {
							"name": $("#userName").val(),
							"pwd": $("#userPwd").val(),
							"email": $("#userEmile").val()
						}
//						$.ajax({
//							type : "get",
//							url : "../json/userinfo.json",
//							dataType : "json",
//							data : obj,
//							success : function(json){
//								console.log( json )
//								json.list.push( obj )
////								$(json).list.html( json.list.push( obj ) )
//								console.log( json )
//							}
//						})
						document.cookie="user="+JSON.stringify( obj )
						console.log( document.cookie );
						return true;
					}else{
						$("<dt>").html("请在标示的项目内输入正确信息 : ").prependTo("#formEnter");
						$("html,body").animate({"scrollTop":200},1000)
						return false;
					}
			}.bind(this))
			
			$("#subMit").click(function(){
				$("#formEnter").find("dd").remove();
				$("#formEnter").find("dt").remove();
				//称位
				if( $("#userNamed").val()=="--" || $("#userName").val()=="" ){
					$("<dd>").html("称谓及姓名 - 请输入此项资料").appendTo( "#formEnter" )
					this.flagName = false;
				}else{
					this.flagName = true;
				}
				//所在地 - 请选择你的所在地
				if( $("#userAddress").val()=="--请选择--" ){
					$("<dd>").html("所在地 - 请选择你的所在地").appendTo( "#formEnter" )
					this.flagAddress = false;
				}else{
					this.flagAddress = true;
				}
				//邮箱
				var regEmlie = /^\w{8,}@\w{2,}\.\w{2,}$/
				if( regEmlie.test( $("#userEmile").val() ) ){
					this.flagEmile = true;
				}else if( $("#userEmile").val() != $("#QuserEmile").val()){
					alert(" ")
					$("<dd>").html("电邮地址 - 请输入此项资料").appendTo( "#formEnter" )
					this.flagEmile = false;
				}
				else{
					$("<dd>").html("电邮地址 - 请输入此项资料").appendTo( "#formEnter" )
					this.flagEmile = false;
				}
				var redPwd = /^.{6,}$/
				if( redPwd.test( $("#userPwd").val() ) ){
					this.flagPwd = true;
				}else{
					$("<dd>").html("密码须由 6-12 个英文及数字组成，大小写有别").appendTo( "#formEnter" )
					this.flagPwd = false;
				}
				//确认密码
				if( $("#userPwd").val() == $("#QuserPwd").val() ){
					this.flagQpwd = true;
				}else{
					$("<dd>").html("两次密码输入不一致").appendTo( "#formEnter" )
					this.flagQpwd = false;
				}
				//使用条款 - 请在方格内打勾表示接受有关的条款。
				if( $("#provision").is(":checked")){
					this.flagProvision = true;
				}else{
					this.flagProvision = false;
					$("<dd>").html("使用条款 - 请在方格内打勾表示接受有关的条款。").appendTo( "#formEnter" )
				}
			}.bind(this))
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
