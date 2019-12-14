$('#loginout').on('click',function(){
    var jj = confirm('您确定要退出吗?')
    if(jj == true){
      location.href = 'login.html'
    }
  })

//   获取用户信息
  $.ajax({
      type: 'get',
      url: 'http://localhost:8080/api/v1/admin/user/info',
      success:function(response){
        $('#userPic').attr('src',response.data.userPic);
        $('.userPic').attr('src',response.data.userPic);
        $('#nickname').html('欢迎&nbsp;&nbsp;' + response.data.nickname);
      }
  })