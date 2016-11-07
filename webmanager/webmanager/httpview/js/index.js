//hot部分的选项卡切换
$(".hottopli").on("mouseenter",function(){
    $(".borderred").removeClass("borderred");
    $(this).addClass("borderred");
    var index=$(this).index();
    $(".hotsbox").children(".show").removeClass("show").addClass("hide");
    $(".hotsbox ul:eq("+index+")").removeClass("hide").addClass("show");
})
   //banner部分 辅助菜单 弹出三级菜单
        $(".banner_left li").on("mouseenter",function(){
            $(this).children(".enter").removeClass("hide");
            $(this).on("mouseleave",function(){
                $(this).children(".enter").addClass("hide");
            });
        });
    //banner中部轮播图
    var index=1;
    var Timer=setInterval(Carousel,3000);
    function Carousel(){
        if(index>2){
            index=0;
        }
        $(".CarouselIndex li").removeClass("red");
        $(".CarouselIndex li:eq("+index+")").addClass("red");
        $(".Carousel").animate({left:-900*index}, 1000,function(){
            index++;
        });
    }
        $(".BannerTabSwitch .none").on("mouseenter",BannerTabSwitch);
        function BannerTabSwitch(){
            $(".BannerTabSwitch .white").addClass("none").removeClass("white");
            $(this).addClass("white").removeClass("none");
            $(".BannerTabSwitch .none").on("mouseenter",BannerTabSwitch);
            var index=$(this).index();
            $(".banner_right div").addClass("hide");
            $(".banner_right div:eq("+index+")").removeClass("hide");
        }
/*main部分*/
        //给左边8个小Ddiv上色
        var color=["#71a830","#d5c99f","#d7e8c6","#fed047","#271f1c","#8b663a","#907852","#222014"];
        for(var i=0;i<8;i++){
            $(".mainleft1:eq("+i+")").css("background",color[i]);
        }
        //小div移入让里面的小球变色
        $(".mainbull li").on("mouseenter",function(){
            var pcolor=$(this).parent().parent().css("background");
            $(this).css("background",pcolor);
            var thislink=$(this).children("a")
            thislink.css("color","white");
            $(this).on("mouseleave",function(){
                $(this).css("background","white");
                thislink.css("color","black");
            })
        })
        //main部分每一层的选项卡
        $(".maintabs li").on("mouseenter",function(){
            var index=$(this).index();
            $(this).parent().siblings(".ulcheak").addClass("hide").removeClass("ulcheak");
            $(this).parent().siblings(".mainshop:eq("+index+")").addClass("ulcheak").removeClass("hide");
        })
        //添加购物车
        $(".addcar").on("click",login);
        function login(){
            window.location="login.html";
        }
        function addCarClick(e){
            addCar(this);
            var e=e||window.event;
            var x=e.clientX;
            var y=e.clientY;
            var src=$(this).siblings().children().children("img").attr("src");
            var div=document.createElement("div");
            $("body").append(div);
            $(div).css({"width":"170px","height":"170px","position":"fixed","left":x,"top":y}).html('<img src='+src+' alt="" />');
            $(div).animate({"left":"100%","top":"45%","width":"50px","height":"50px"}, 1000,function(){
                $(div).remove();
            })
        }