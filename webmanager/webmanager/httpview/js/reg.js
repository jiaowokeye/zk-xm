$(function(){
    $(".mid_left").animate({left:0}, 2000);
    $(".mid_right").animate({right:0}, 2000);
});

$(".weixin").on("mouseenter",function(){
    $(".wxbox").removeClass("hide");
}).on("mouseleave",function(){
    $(".wxbox").addClass("hide");
});
$(".right_topul li").on("click",tabclick)
function tabclick(){
    if(!$(this).hasClass("topli")){
        $(".right_topul .topli").removeClass("topli");
        $(this).addClass("topli");
        var index=$(this).index();
        console.log(index);
        $(".midform").addClass("hide").removeClass("midform");
        $(".mid_right .wform:eq("+index+")").addClass("midform").removeClass("hide");
    }
}