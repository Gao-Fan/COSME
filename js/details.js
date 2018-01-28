window.onload= function(){
	new Nav().init();           //Nav 国家语言显示
	new BodyTop().init();       //最上端置顶
	new PaiList().init();       //sideNav
	new EndBanner().init();     //右下角广告
	new GetName().init();	    //左下角时间
	new CarBoard().init();      //head购物篮广告
	new SetDetails().init();    //请求ajax设置主题内容
	new AddShop().init()        //将商品添加到cookie
	new JunpHtml()              //页面跳转
}

//跳转
	function JunpHtml(){
		$("#head_myshopcar,#junpCar").click(function(){
			location.href = "shopCar.html"
		}).mouseenter(function(){
			$(this).css("cursor","pointer")
		});
	}
//加入购物车
	function AddShop(){
		this.init = function(){
			this.add();
		};
		this.add = function(){
			var that = this;
			$("#addShop").click(function(){
				var arr = [];
				var flag = true;
				var sum = 0;
				var json = {
					"src" : $(this).data("src"),
					"id" : $(this).data("id"),
					"name" : $(this).data("name"),
					"price" : $(this).data("price"),
					"list" : $(this).data("list"),
					"count" : $('#Num option:selected').text()
				}
				var oldArr = that.getCookie("shop") 
				if( oldArr ){
					arr = oldArr;
					for( var i = 0 ; i < arr.length ; i++ ){
						if( arr[i].id == json.id && arr[i].name == json.name ){
							arr[i].count = parseInt( json.count ) + parseInt( arr[i].count )
							sum += arr[i].count
							flag = false;
						}
					}
				}
				if( flag ){
					arr.push( json )
					console.log( json.count )
					sum += json.count
				}
				$("#junpCar p").eq(0).find("span").html("")
				$("#junpCar p").eq(0).find("span").html( sum )
				document.cookie = "shop="+( JSON.stringify( arr ) );
				document.cookie = "sum="+sum
			})
		};
		this.getCookie = function(key){
			cookie_info = document.cookie;
			if (cookie_info) {
				list = cookie_info.replace(/;\s/g,";").split(';');
				for (var i=0;i<list.length;i++) {
					item = list[i].split('=');
					if (item[0] == key) {
						oldCookie = item[1];
						return JSON.parse(oldCookie); //返回一个 数组
					}
				}
				return [];//如果cookie中 没有想要的 键值   也返回一个空数组		
			}
			return [];// 如果cookie中没有值，返回一个空数组
		}
	}
	
//请求ajax设置主题内容
	function SetDetails(){
		this.init = function(){
			this.getItem();
		}
		this.getItem = function(){
			var str = location.href;
			str = str.split("?")[1];
			var arr = str.split("&");
			var fL = arr[0].split("=")[1];
			var id = arr[1].split("=")[1];
			var that = this;
			$.ajax({
				url : "../json/index.json",
				type : "get" ,
				success : function(json){
					for( var i = 0 ; i < json[fL].list.length ; i++ ){
						var item = json[fL].list[i];
						if( item.id == id ){
							$("#addShop").attr({"data-src":item.src1, "data-id":item.id, "data-list":fL, "data-name":item.name,"data-price":item.price})
							that.setMain( item )
						}
					}
				}
			})
		}
		this.setMain = function( obj ){
			$("#img001").attr("src","../images/index/shopList/"+obj.src1)
			$("#img002").attr("src","../images/index/shopList/"+obj.src1)
						.css({"width":100,"height":100})
			$("#text001").html(obj.name);
			$("#text002").html(obj.name);
		}
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
