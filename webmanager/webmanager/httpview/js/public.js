//侧边栏
        var id=0;
        var shopinf;
        $("#sideBar li").on("mouseenter",function(){
            $(this).children("div").removeClass("hide");
            $(this).on("mouseleave",function(){
                $(this).children("div").addClass("hide");
            })
        })
        $(".fanzhuan").on("mouseenter",function(){
            var a=$(this).children(".show");
            $(this).children(".hide").addClass("show").removeClass("hide").css("background","#e31939");
            a.addClass("hide").removeClass("show");
        })
        $(".fanzhuan").on("mouseleave",function(){
            var a=$(this).children(".show");
            $(this).children(".hide").addClass("show").removeClass("hide");
            a.addClass("hide").removeClass("show").css("background","black");
        })
        //屏幕滚到一定地方 回到顶部就会出现
        $(window).scroll(function(){
            var height=$(window).scrollTop();
            if(height>1600){
                $(".returntop").removeClass("hide");
            }
            if(height<1600){
                if(!$(".returntop").hasClass("hide")){
                    $(".returntop").addClass("hide");
                }
            }
        })
        //回到顶部按钮的事件
        $(".returntop").children("p").on("click",function(){
            $("html,body").stop().animate({scrollTop:0},1000)
        });
        //侧边栏登录按钮
        $(".loginnow").on("click",loginnow);
        function loginnow(){
            var uName=$(".userName").val();
            var uPass=$(".userPass").val();
            var url="../../../User/loginGet";
            $.ajax(url,{
                data:{
                    name:uName,
                    password:uPass
                },
                success:function(data){
                    if(data==1){
                        document.cookie="name="+uName
                        getUser();
                        getShopCar();
                    }else{
                        alert("用户名或者密码不正确");
                    }
                }
            })
        }
//获取cookie 设置用户名 如果没有cookie那么久不变
        var name;
        function getUser(){
           var str=document.cookie;
        if(str){
            name=str.split("=")[1];
            $(".addcar").off("click",login);
            $(".addcar").on("click",addCarClick);
            getShopCar();
            //ifcookie中找到用户名了 那么就在页面上显示已经登陆后的页面
            $(".header_left").html('<li>欢迎您回来'+name+'</li><li><a href="javascript:;">用户中心</a></li><li class="out"><a href="javascript:;">退出</li>');
            $(".smalllogin").html('<p class="smallloginp">18535677667</p><ul class="smallloginul"><li><a href="javascript:;">会员中心</a></li><li><a href="javascript:;">订单中心</a></li><li><a href="javascript:;">账户中心</a></li><li><a href="javascript:;">我的留言</a></li></ul>');
            getShopCar();
            /*$(".smalllogin").html(" ")*/
            //退出账号
            $(".out").on("click",function(){
                //删除cookie
                var date=new Date();
                date.setDate(date.getDate()-1);
                document.cookie="name="+name+";expires="+date;
                //改变需要改变的地方
                $(".smalllogin").html('<b>请登录</b><span class="noneName">还没有账号？</span><a href="reg.html">立即注册</a><form action="index_submit" method="get" accept-charset="utf-8" class="form"><span>账&nbsp;号</span><input type="text" name="userName" class="userName"><br/><span>密&nbsp;码</span><input type="password" name="password" class="userPass"><br/><span>验证码</span><input type="txt" name="Code" class="Code"></form><input type="checkbox" name="checkbox" class="check" checked=""><span>记住密码</span><a href="javascript:;" class="forget">忘记密码？</a><a href="javascript:;" class="loginnow">立即登录</a>')
                $(".loginnow").on("click",loginnow);
                $(".shopcarli").children('span').html("0");
                getUser();
                $(".addcar").off("click",addCarClick);
                $(".addcar").on("click",login);
            });
        }else{
            $(".header_left").html('<li>欢迎光临本店!</li><li><a href="login.html">请登录</a></li><li><a href="reg.html">免费注册</a></li>')
            $(".cardiv").html("<i>您的购物车是空的哦，快去看看有没有心动的吧</i>");
        }
        }
        getUser();
//header 部分 li移入变色移出变回
        $("#header .drop-down").on("mouseenter",function(){
            $(this).children('div').removeClass('hide');
            $(this).on("mouseleave",function(){
                $(this).children('div').addClass('hide');
            });
        });
//nav部分
        //搜索框位置改变
        $(".search .nonered").on("click",searchClick);
        function searchClick(){
                $(".search .sel").css({"background":"white","color":"black"});
                $(".search .red").addClass("nonered").removeClass("red");
                $(this).css({"backgroundColor":"#e31939","color":"white"}).addClass("red").removeClass("nonered");
                $(".search .nonered").on("click",searchClick);
            }

//从数据中获取此账户的购物车数据
function getShopCar(){
    var url="../../../Product/GetProductsByPage_get";
    $.ajax(url,{
        data:{
            pagesize:10000,
            pageindex:1,
            type:name
        },
        dataType:"json",
        success:function(data){
            shopinf=data;
            id=data.length;
            console.log(data);
            var length=data.length;
            console.log(length);
            $(".quality").html(length);
            if(length>0){
                $(".cardiv").html('<ul class="shoplist ">');
                $(".shoplist").html('<li class="shoplistone"><span>共有<i>'+length+'</i>件商品</span><a href="javascript:;">去购物车结算</a></li>');
                //简介购物车里只显示最新的三条数据
                var start=Math.max(data.length-3,0);
                for(var i=data.length-1;i>=start;i--){
                    var obj=JSON.parse(data[i].Data)
                    $(".shoplist").append('<li><img src='+obj.src+' alt=""><p>'+obj.name+'</p><p><a href="javascript:;"><b>'+obj.price+'</b>*<em>'+obj.quality+'</em></a></p></li>');
                }
            }
        }
    })
}
//添加到购物车函数  将选的那个加到数据库中
function addCar(obj){
    getShopCar();
    var shopname=$(obj).siblings().children(".shopname").html();
    var shopprice=$(obj).siblings(".shopprice").children("i").html();
    var src=$(obj).siblings().children().children("img").attr("src");
    var iscz=false;
    var quality=1;
    var newId;
    //判断以下数据里是否有它，如果有，让它的数量+1
    if(shopinf.length>0){
       for(var i=0;i<shopinf.length;i++){
            var obj=JSON.parse(shopinf[i].Data)
            if(obj.name==shopname){
               quality=obj.quality+1;
               newId=shopinf[i].Id.split("-")[1];
               iscz=true;
               break;
            }
        }
    }
    if(!iscz){
        id++;
        newId=id;
    }
    var shop={
        name:shopname,
        price:shopprice,
        src:src,
        quality:quality
    }
    var url="../../../Product/CreateUpdateProduct_get";
    var data=JSON.stringify(shop);
    console.log(data);
    $.ajax(url,{
        data:{
            id:name+"-"+newId,
            datajson: data,
            type:name
        },
        success:function(){
            getShopCar();
        }
    })
}
