
new register().init();      //登陆验证

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
