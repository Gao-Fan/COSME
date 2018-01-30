	
	new Verify().init()         //表单验证

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
