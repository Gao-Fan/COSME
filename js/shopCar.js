	
	new enterToggle().init()    //登录注册切换
	new shopCar().init();       //结算商品加载

//购物车数据加载
	function shopCar(){
		this.init = function(){
			this.obj();
			this.removeShop();
		}
		this.obj = function(){
			var arr = this.getCookie("shop");
			var html = "";
			var sum = 0;
			var numShop = 0;
			$("#account").html("");
			for( var i = 0 ; i < arr.length ; i++ ){
				html = `
					<tr data-id="${arr[i].id}" data-name="${arr[i].name}">
						<td><img class="fl" src="../images/index/shopList/${arr[i].src}" alt="" /></td>
						<td>${arr[i].name}</td>
						<td>${arr[i].price}</td>
						<td>${arr[i].count}</td>
						<td> ${ Number( arr[i].count ) * Number( arr[i].price ) } </td>
						<td><button>删除</button></td>
					</tr>
				`
				sum += Number(arr[i].count)*Number(arr[i].price)
				$(html).prependTo( "#account" );
				$(".sumMoney").html(sum);
				var numShop = $.cookie("sum")
				$("#junpCar p").eq(0).find("span").html( numShop )
				$("#head_myshopcar>ul>li").eq(0).find("span").html( numShop )
			}
		}
		this.removeShop = function(){
			var that = this;
			$(".tab").on("click","button",function(){
				if( confirm( "确认删除吗") ){
					$(this).parent().parent().remove();
					var pid = $(this).parent().parent().data("id");
					var pname = $(this).parent().parent().data("name");
					var arr = that.getCookie("shop");
					var num = 0;
					for( var i = 0 ; i < arr.length ; i++ ){
						if( arr[i].id == pid && arr[i].name == pname ){
							num = arr[i].count
							arr.splice( i ,1 );
						}
					}
					document.cookie = "shop="+JSON.stringify( arr );
					$.cookie("sum",Number($.cookie("sum"))-num);
					that.obj();
				}
			})
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
//登录注册切换
	function enterToggle(){
		this.init = function(){
			this.Event();
		};
		this.Event = function(){
			$("#Enter_dengLu").click(function(){
				$(".main").css("display","block");
				$("#Enter_dengLu").removeClass("modle");
				$("#Enter_zhuCe").addClass("modle")
				$(".main_2").css("display","none")
			});
			$("#Enter_zhuCe").click(function(){
				$(".main_2").css("display","block")
				$("#Enter_dengLu").addClass("modle");
				$("#Enter_zhuCe").removeClass("modle")
				$(".main").css("display","none")
			});
		};
	}
