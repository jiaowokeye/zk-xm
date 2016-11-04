$(function(){
    $(".mid_left").animate({left:0}, 2000);
    $(".mid_right").animate({right:0}, 2000);
})

$(".weixin").on("mouseenter",function(){
    $(".wxbox").removeClass("hide");
}).on("mouseleave",function(){
    $(".wxbox").addClass("hide");
})

