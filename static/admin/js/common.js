$('#loginout').on('click',function(){
    var jj = confirm('您确定要退出吗?')
    if(jj == true){
      location.href = 'login.html'
    }
  })