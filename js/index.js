	new shpLiF().init();        //选项卡,请求ajax
	new PaiList().init();       //sideNav
	new LunBo().init();         //轮播图

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
		
		this.Ajaxget = function( index ){
			var index = index
			$.ajax({
			type : "get",
			url : "../json/index.json",
			success : function(json){
				var html = "";
				for( var attr in json["shopList_"+(index+1)].list ){
					var item = json["shopList_"+(index+1)].list[attr];
					html += `<ul>
								<li class="shopBox_li_01">
									<a href="details.html?fL=${"shopList_"+(index+1)}&id=${item.id}">
										<img src="../images/index/shopList/${item.src1}"/>
									</a>
								</li>
								<li class="shopBox_li_02">
									<img src="../images/index/shopList/${item.src2}"/>
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
			
		}
		this.init = function(){
			var that = this;
			$("#listNav>ul>a").click(function(){
				var index = $(this).index();
				that.Ajaxget( index );
			})
		}
		var flag = true;
		if( flag ){
			this.Ajaxget( 0 );
			flag = false;
		}
	}

