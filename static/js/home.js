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