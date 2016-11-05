$(function(){
    $(".mid_left").animate({left:0}, 300);
    $(".mid_right").animate({right:0}, 300);
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
//注册
var istrue=true;
$(".mid_right").children().children(".teluser").on("blur",function(){
    var str=$(this).val();
    var re=/[1][0-9]{10}/
    if(!re.test(str)){
        $(".teltitle").html("请输入正确的手机号");
        istrue=false;
    }else{
        istrue=true;
        $(".teltitle").html(" ");
    }
})
$(".mid_right").children().children(".emailuser").on("blur",function(){
    var str=$(this).val();
    var re=/^\w+@[a-z0-9]+\.[a-z]+$/;
    if(!re.test(str)){
        $(".teltitle").html("请输入正确的邮箱");
        istrue=false;
    }else{
        istrue=true;
        $(".teltitle").html(" ");
    }
})
$(".password").on("blur",function(){
    var pas1=$(this).parent().children(".password:eq(0)").val();
    var pas2=$(this).parent().children(".password:eq(1)").val();
    if(pas1!=pas2){
        $(".passtitle").html("两次输入的密码不一致");
        istrue=false;
    }else{
        istrue=true;
        $(".passtitle").html(" ")
    }
})
$(".regnow").on("click",function(){
    if(istrue){
        var url="../../../User/CheckUserNameGet";
        var uName=$(".midform").children(".user").val();

        var uPassword=$(".midform").children(".password").val();
        $.ajax(url,{
            data:{
                username:uName
            },
            async:false,
            success:function(data){
                if(data==-1){
                    url="../../../User/registerGet";
                    $.ajax(url,{
                        data:{
                            name:uName,
                            password:uPassword
                        },
                        success:function(data){
                            if(data){
                                window.location="login.html";
                            }
                        }
                    })
                }else{
                    alert("用户名已被占用");
                }
            }
        })
    }
})