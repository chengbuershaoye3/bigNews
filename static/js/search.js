// 页数
var pages;
// 根据key获取文章
// 获取参数值
var key = getUrlParams("key");
var data = {};
data.perpage = 6;
if (key.trim().length > 0) {
    data.key = key;

}

// 发送请求获取文章数据
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/index/search',
    data: data,
    success: function(response) {
        // console.log(response);


        // 渲染搜索结果
        var html = template('searchTpl', { data: response.data.data });
        $('#searchBox').html(html);

        var obj = {
            currentPage: response.data.page,
            totalPage: response.data.pages,
            callback: function(current) {
                // alert('ok!');
                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/index/search',
                    data: {
                        page: current,


                    },
                    success: function(response) {

                        var html = template('searchTpl', {
                            data: response.data.data
                        });
                        $('#searchBox').html(html);
                    }
                })
            }
        };
        // console.log(obj);
        $("#pagination").pagination(obj);


    }
})