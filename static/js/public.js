// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        // paramsAry.length数组的长度,1个
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
}



//封装一个函数处理表单数据
function serializeObject(obj) {
    // 处理结果对象
    var result = {};
    // [{name: 'username', value: '用户输入的内容'}, {name: 'password', value: '123456'}]
    var params = obj.serializeArray();

    // 循环数组 将数组转换为对象类型
    $.each(params, function(index, value) {
        result[value.name] = value.value;
    });
    // 将处理的结果返回到函数外部
    return result;
};
// alert(123)



// 1.文章热门排行
$.ajax({
    type: "get",
    url: "http://localhost:8080/api/v1/index/rank",
    success: function(response) {
        // console.log(response.data);
        var rankTpl = `
            {{each data}}

            <li><span class="first">1</span><a href="/article.html?articleId={{$value.id}}">{{$value.title}}</a></li>
            {{/each}}
                        `

        var html = template.render(rankTpl, { data: response.data });
        // console.log(html);
        $('#rankBox').html(html)

    }

})


//  2.焦点关注

$.ajax({

    url: "http://localhost:8080/api/v1/index/attention",
    type: "get",
    success: function(response) {
        // console.log(response.data);
        var attentionTpl = `
            {{each data}}
            <li><a href="/article.html?articleId={{$value.id}}">{{$value.intro}}</a></li>
            {{/each}}
                        `
        var html = template.render(attentionTpl, { data: response.data });

        $('#attentionBox').html(html)
    }

})

// 3.全部分类导航
$.ajax({
    url: "http://localhost:8080/api/v1/index/category",
    type: "get",
    success: function(response) {
        // console.log(response.data);
        var categorytpl = `
    {{each data}}
    <li><a href="/list.html?categoryId={{$value.id}}" class="categories">{{$value.name}}</a></li>
    {{/each}}

    `
        var html = template.render(categorytpl, { data: response.data.slice(0, 5) })
        $('#upBox').html(html);
        $("#leftBox").html(html)

    }
})

// 给页面所有搜索按钮注册事件
$(function() {
    $('#searchBtn').on("click", function() {
        var keys = $(this).siblings("input").val();
        location.href = "/search.html?key=" + keys;
        return false;
    })
});