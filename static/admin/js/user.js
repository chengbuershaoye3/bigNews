// 要求:图片的预览功能
// 1-给文件控件注册change事件
$('#exampleInputFile').on('change',function(){
    // 2-图片的的预览
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    $('#preview').prop('src',imgURL);
}); 
// 给用户表单注册submit事件
$('#userForm').on('submit',function(){
    // alert('ok')
    // 1- 创建formData对象
    var formData = new FormData(this)
    // 2-发送ajax请求
    $.ajax({
        type:'post',
        url: 'http://localhost:8080/api/v1/admin/user/edit',
        data: formData,
        processData:false,
        contentType: false,
        success: function(response){
            alert('用户修改成功')
            location.reload()
            // location.href = 'index.html'
                        
        }
    })
    // 阻止表单默认提交行为
    return false;
})
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    success: function(response){
        // 把用户信息显示在列表中
        $('#userForm input[name="username"]').val(response.data.username)
        $('#userForm input[name="nickname"]').val(response.data.nickname)
        $('#userForm input[name="email"]').val(response.data.email)
        // img标签设置src
        $('#preview').prop('src',response.data.userPic)
        $('#userForm input[name="password"]').val(response.data.password)
    }
})

