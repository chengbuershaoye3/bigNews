//获取文章id
var id = getUrlParams('articleId');
// console.log(id);

// 1 - 文章详情显示功能-- - 根据id获取文章具体信息 渲染到页面
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/article',
    data: {
        id: id,
    },
    success: function(response) {
        // console.log(response);
        //准备模板
        //拼接字符串
        var html = template('articleTpl', response);

        //渲染页面
        $('#articleBox').html(html);
    }
});


//2-发表评论功能 --给评论表单注册提交事件
$('#commentForm').on('submit', function() {

    var author = $('#author').val();
    var content = $('#content').val();

    //判断用户名和评论内容是否为空
    if (author.length == 0 || content.length == 0) {
        alert('您的用户名或评论内容为空 请输入正确内容')
    } else {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/index/post_comment',
            data: {
                author: author,
                content: content,
                articleId: id
            },
            success: function(response) {
                // console.log(response);
                alert('评论添加成功');
                //评论发表成功 重绘页面
                location.reload();

            }
        });
    }
    //阻止表单默认提交行为 
    return false;
});



//3-展示具体评论功能---根据id获取评论数据 渲染到页面
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/get_comment',
    data: {
        articleId: id
    },
    success: function(response) {
        console.log(response);
        //准备模板
        //拼接字符串
        console.log(response.data.slice(0, 6));

        var html = template('commentsTpl', {
            data: response.data.slice(0, 6)
        });
        // console.log(html);

        //渲染页面
        $('#commentsBox').html(html);
    }

});