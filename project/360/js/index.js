/**
 * Created by Paavo on 2015/6/14.
 */
$(function () {
    var num=0;
    var timer=null;

    var bgs = ['#0f98c5','#2cab5f','#ce8114','#19ad93','#119ac7'];
    $('.content>div').each(function(index, element) {
        $(element).css({'background':bgs[index]})
    });
    $('.content>div').eq(num).removeClass('out').siblings().addClass('out');

    $(document).mousewheel(function (e,d) {
        clearInterval(timer);
        timer=setTimeout(fn,300);
        function fn(){
            num-=d;
            if(num>4){num=4}
            if(num<0){num=0}
            /* $('title').html(num)*/
            $('.content').stop().animate({top:-num*100+'%'},500);
            $('.circle li').eq(num).addClass('current').siblings().removeClass();
            $('.content>div').eq(num).removeClass('out').siblings().addClass('out');


        }
    });
    $('.circle li').click(function () {
        var index=$(this).index();
        $(this).addClass('current').siblings().removeClass();
        $('.content').stop().animate({top:-index*100+'%'},500);
        $('.content>div').eq(index).removeClass('out').siblings().addClass('out');

        num=index

    })
});