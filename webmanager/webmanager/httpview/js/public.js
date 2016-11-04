//侧边栏
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
        $(".returntop").children("p").on("click",function(){
            $("html,body").stop().animate({scrollTop:0},1000)
        });
//用户名
        var href=window.location.href;
        var arr1=href.split("?");
        if(arr1.length>1){
            userName=arr1[arr1.length-1].split(":")[1];
            console.log(userName);
            $(".header_left").html("<li>欢迎光临本店!</li><li>用户：</li><li>"+userName+"</li>");
        }
//header 部分 li移入变色移出变回
        $("#header .drop-down").on("mouseenter",function(){
            $(this).children('div').removeClass('hide');
            $(this).on("mouseleave",function(){
                $(this).children('div').addClass('hide');
            });
        });

//nav部分
        $(".search .nonered").on("click",searchClick);
        function searchClick(){
                $(".search .sel").css({"background":"white","color":"black"});
                $(".search .red").addClass("nonered").removeClass("red");
                $(this).css({"backgroundColor":"#e31939","color":"white"}).addClass("red").removeClass("nonered");
                $(".search .nonered").on("click",searchClick);
            }
