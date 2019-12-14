//一.向处理器发送请求参数 将后台评论据渲染到页面
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    data: {
        page: num,
        perpage: 15,
    },
    success: function (response) {
        // console.log(response);
        //拼接评论列表
        var html = template('comment_listTpl', response);
        $('#comment_listBox').html(html);
        //拼接评论分页
        var html2 = template('comment_pageTpl', response);
        $('#comment_pageBox').html(html2);
    }
})


//二.制作分页
var num=1//设置一个全局变量让其他页面也可以获取到

    //1.注册点击事件 点击页面调用分页函数
$('#comment_pageBox').on('click','#addPage',function(){
     num = $(this).html();
    changePage(num);
    // return num;
})
console.log(num);


    //2.分页函数 发送ajax请求传递页码重新渲染页面
function changePage(num) {
    //将上面的ajax请求放入这个函数里面 并在data里面传递当前点击的页码
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: num,
            perpage: 15,
        },
        
        success: function (response) {
            console.log(num);
            console.log(response);
            //拼接评论列表
            var html = template('comment_listTpl', response);
            $('#comment_listBox').html(html);
            //拼接评论分页
            var html2 = template('comment_pageTpl', response);
            $('#comment_pageBox').html(html2);
        }
    })
}



//三. 审核评论 当审核按钮被点击的时候 事件委托
$('#comment_listBox').on('click', '.audit', function () {
    //获取到这个点击按钮的状态 和id
    var state = $(this).attr('data-state')
    var id = $(this).attr('data-id')

    // 发送ajax请求 更改评论状态
    // 1.如果是待审核状态 点击了批准它会变成已通过状态
    if (state == '待审核') {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/pass',
            data: { id: id },
            success: function () {
                location.reload();
            }
        })
    }
    // 2.如果是已通过状态 点击了拒绝它变成不通过状态
    if (state == '已通过') {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/reject',
            data: { id: id },
            success: function () {
                location.reload();
            }
        })
    }

})


//四.删除评论 当点击删除按钮的时候删除评论 事件委托
$('#comment_listBox').on('click', '.delete', function () {
    //获取到id
    var id = $(this).attr('data-id')
    //判断是确定删除
    if(confirm('您确定要删除这条评论嘛?')){
    //发送请求删除评论 并跳转到当前页
        $.ajax({
            type:'post',
            url:'http://localhost:8080/api/v1/admin/comment/delete',
            data: { id: id },
            success:function(){
                location.reload();
            }
        })

    }
})
