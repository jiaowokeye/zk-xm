$(function(){
    $(".mid_left").animate({left:0}, 300);
    $(".mid_right").animate({right:0}, 300);
})

$(".weixin").on("mouseenter",function(){
    $(".wxbox").removeClass("hide");
}).on("mouseleave",function(){
    $(".wxbox").addClass("hide");
})
//登录
$(".login").on("click",function(){
    var uName=$(".userName").val();
    console.log(uName);
    var uPassword=$(".userPassword").val();
    console.log(uPassword);
    var url="http://10.17.158.243:8099/User/loginGet";
    $.ajax(url,{
        data:{
            name:uName,
            password:uPassword
        },
        success:function(data){
            console.log(data);
            if(data==1){
                alert("登录成功");
                window.location="http://10.17.158.243:8099/httpview/index.html?name:"+uName;
            }else{
                alert("用户名或者密码不正确");
            }
        }
    })
})
