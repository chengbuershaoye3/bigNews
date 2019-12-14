//首页最新资讯

$.ajax({
        url: "http://localhost:8080/api/v1/index/latest",
        type: "get",
        success: function(response) {
            // console.log(response.data);
            var html = template("lastedTpl", { data: response.data })

            $('#lastedBox').html(html)

        }

    })
    // 热点图
$.ajax({
    url: "http://localhost:8080/api/v1/index/hotpic",
    type: "get",
    success: function(response) {
        // console.log(response.data);
        var html = template("hotpicTpl", { data: response.data })

        $("#hotpicBox").html(html);
        $("#hotpicBox li:first-child").addClass("first")
    }
})