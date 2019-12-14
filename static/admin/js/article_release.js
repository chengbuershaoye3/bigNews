// alert('ok')
//发送ajax请求,获取文章分类数据
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/admin/category/list',
    success:function(response){
        console.log(response);
        var html = template('categoryTpl',{data:response.data});
        $('#category').html(html);
        
    }
});

//给文件控件注册onchange事件
$('#exampleInputFile').on('change',function(){
    //图片的预览
    var file = this.files[0];
    var imgURL = URL.createObjectURL(file);
    $('#preview').prop('src',imgURL);
});

//给发布按钮注册点击事件
$('#article_form').on('click','#publish',function(){
    // alert('ok')
    // console.log(1);
    var form = document.querySelector('#article_form')
    //1-创建formdata对象
    var formData = new FormData(form);
    // formData.append('title',$('#inputEmail3').val());
    // formData.append('cover',$('#exampleInputFile')[0].files[0]);
    // formData.append('type',$('#category').val());
    // formData.append('date',$('#dateinput').val());
    formData.set('content',tinyMCE.activeEditor.getContent());
    formData.append('state','已发布');
    // console.log(formData.get('title'));
    // console.log(formData.get('cover'));
    // console.log(formData.get('type'));
    // console.log(formData.get('date'));
    // console.log(formData.get('content'));
    // console.log(formData.get('state'));

    
    //发送ajax请求
    $.ajax({
        type:'post',

        url:'http://localhost:8080/api/v1/admin/article/publish',
        data:formData,
        //告诉ajax方法不要解析参数 
        processData:false,
        //告诉ajax方法不要设置参数类型
        contentType:false,
        success:function(result){
            // console.log(result);
            location.href = '/admin/article_list.html'
        }
    })
    //阻止表单默认的提交行为
    return false;
});

//给存为草稿按钮注册点击事件
$('#article_form').on('click','#save',function(){
    // alert('ok')
    var form = document.querySelector('#article_form');
    //1-创建formdata对象
    var formData = new FormData(form);
    // formData.append('content',tinyMCE.activeEditor.getContent())
    //获取富文本编辑器里面的内容
    formData.set('content',tinyMCE.activeEditor.getContent());
    formData.append('state','存为草稿');
    // var formData = $(this).serialize();
    // console.log(formData);
    
    //发送ajax请求
    $.ajax({
        type:'post',

        url:'http://localhost:8080/api/v1/admin/article/publish',
        data:formData,
        //告诉ajax方法不要解析参数 
        processData:false,
        //告诉ajax方法不要设置参数类型
        contentType:false,
        success:function(result){
            // console.log(result);
            location.href = '/admin/article_list.html'
        }
    })
    //阻止表单默认的提交行为
    return false;
});

