//获取分类id 根据分类渲染文章
var categoryId = getUrlParams('categoryId');
console.log(categoryId);
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: {
        type: categoryId,

    },
    success: function(response) {
        console.log(response);

        //step1-准备模板字符串
        //step2-拼接字符串
        var html = template('categoryArticleTpl', response);
        // console.log(html);
        //step3-渲染页面
        $('#categoryArticleBox').html(html);


        //分页功能
        $("#pagination").pagination({
            currentPage: 1,
            totalPage: Math.ceil(response.data.totalCount / 6),
            callback: function(current) {

                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/index/search',
                    data: {
                        type: categoryId,
                        page: current
                    },
                    success: function(response) {
                        console.log(response);
                        var html = template('categoryArticleTpl', response);
                        $('#categoryArticleBox').html(html);
                    }
                });
            }
        });
    }
});