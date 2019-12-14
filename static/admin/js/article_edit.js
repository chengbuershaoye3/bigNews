// alert('ok')
//发送ajax请求,获取到当前要编辑的文章的数据
var id = location.search.substr(1).split('=')[1];
console.log(id);

$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/admin/article/search',
    data:{
        id:id
    },
    success:function(response){
        console.log(response.data);//获取到的是一个对象
        //分别将获取到的数据渲染到对应的表单项中
        $('#article_form input[name="title"]').val(response.data.title);
        $('#article_form img[id="img"]').prop('src',response.data.cover);
        $('#article_form input[name="date"]').val(response.data.date);
        $('#article_form input[id="rich_content"]').val(response.data.content);
        //发送ajax请求,获取文章分类数据
        $.ajax({
            type:'get',
            url:'http://localhost:8080/api/v1/admin/category/list',
            success:function(result){
                // console.log(result);
                var html = template('categoryTpl',{data:result.data,categoryId: response.data.categoryId});
                $('#category').html(html);
            }
        });

    }
});

//给修改按钮注册submit事件--利用事件委托
$('#article_form').on('submit',function(){
    // alert('ok')
    //获取修改之后的表单数据
    var formData = new FormData(this);
    formData.append('id',id);
    formData.set('content',tinyMCE.activeEditor.getContent());
    $.ajax({
        type:'post',
        url:'http://localhost:8080/api/v1/admin/article/edit',
        data:formData,
        processData:false,
        contentType:false,
        success:function(result){
            // console.log(result);
            location.href='article_list.html'
            
        }
    })
    


    //阻止表单默认的提交行为
    return false;
})

