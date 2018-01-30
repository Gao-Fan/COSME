
	new SetDetails().init();    //请求ajax设置详情内容
	new AddShop().init()        //将商品添加到cookie

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
				if( $.cookie("sum") ){
					sum = Number($.cookie("sum"));
				}
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
							arr[i].count = Number( json.count ) + Number( arr[i].count )
							sum += Number( json.count )
							flag = false;
						}
					}
				}
				
				if( flag ){
					arr.push( json )
					sum += Number( json.count )
				}
				
				document.cookie="shop="+JSON.stringify( arr );
				$.cookie("sum", Number( sum ) )
				$("#junpCar p").eq(0).find("span").html("")
				$("#junpCar p").eq(0).find("span").html( sum )
				$("#head_myshopcar>ul>li").eq(0).find("span").html( sum )
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
