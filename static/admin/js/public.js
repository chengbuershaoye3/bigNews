// 获取到搜索表单 并为其添加表单提交事件
$('.header_bar form').on('submit', function () {
	// 获取到用户在表单中输入的搜索关键字
	var keys = $(this).find('.keys').val();
	// 跳转到搜索结果页面 并且将用户输入的搜索关键字传递到搜索结果页面
	location.href = "/search.html?key=" + keys
	// 阻止表单默认提交行为
	return false;
});