// alert('ok');
//发送ajax请求,获取文章列表数据
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/admin/article/query',
    success:function(response){
        // console.log(response);
        
        var html = template('articlesTpl',{data:response.data.data});
         //渲染文章数据到页面
         $('#article_listBox').html(html);
        // pageTpl(response.data.totalPage)
        // console.log(response);
        
        // var pageArr = [];
        // for(var i = 1;i<=response.data.totalPage;i++){
        //     pageArr.push(i)
        // };
        // var page = template('pageTpl',{
        //     data:pageArr
        // });
        var page = template('pageTpl',{
            data:response.data
        });
        $('#pageBox').html(page);
    }
});

//页码单击事件的处理函数
function changePage(page){
    console.log(arr);
    var data = {};
    //遍历一下数组,将遍历出来的数组以键值对的形式添加到data对象中
    arr.forEach(function(item){
        var temp = item.split('=');
        data[temp[0]] = temp[1];
    });
    //给data里面添加一个新属性page
    data.page = page;
    $.ajax({
        type:'get',
        url:'http://localhost:8080/api/v1/admin/article/query',
        data:data,
        success:function(response){
            console.log(response);
            response.data.data.currentPage=page;
            response.data.data.pages = response.data.totalPage;
            var html = template('articlesTpl',{
                data:response.data.data
            });
            $('#article_listBox').html(html)
            // console.dir($('#prePage')[0])
            console.log(page==1?page:page - 1)
            var total = response.data.totalPage;
            $('#prePage').attr("onclick","changePage("+(page==1?page:page - 1)+")");
            $('#nextPage').attr("onclick","changePage("+(page==total?total:page + 1)+")");

        }
    })
}
//给删除按钮注册点击事件--利用事件委托
$('#article_listBox').on('click','.delete',function(){
    //弹出删除确认框,以免用户误点删除按钮
    var isConfirm = confirm('是否确认删除?');
    //获取要删除的数据的id
    var id = $(this).attr('data-id');
    // console.log(isConfirm);
    // console.log(id);
    //如果用户点击的是确定按钮
    if(isConfirm){
        //发送ajax请求,删除数据
        $.ajax({
            type:'post',
            url:'http://localhost:8080/api/v1/admin/article/delete',
            data:{
                id:id
            },
            success:function(){
                //重新加载页面
                location.reload();
            }
        });
    }
});



// 向服务器端发送请求 索要分类数据
$.ajax({
    type:'get',
    url:'http://localhost:8080/api/v1/admin/category/list',
    success:function(result){
        // console.log(result);
        var html = template('categoryTpl',{data:result.data});
        $('#selCategory').html(html);
    }
});
var arr = [];
//给筛选按钮注册提交事件
$('#filterForm').on('submit', function() {
    // alert('ok')
    // 获取到管理员选择的过滤条件
    // var formData = $(this).serialize();
    //获取表单项的值,判断是否为-1,如果是-1 ,请求参数就不要携带这一项
    arr = [];
    if($('#selCategory').val()!=-1){
        arr.push('type='+$('#selCategory').val())
    };
    if($('#selStatus').val() != -1){
        arr.push('state='+$('#selStatus').val())
    }
    // console.log(arr.join('&'));
    
    // 向服务器端发送请求 根据条件索要文章列表数据
    $.ajax({
        type:'get',
        url:'http://localhost:8080/api/v1/admin/article/query',
        data: arr.join('&'),
        success:function(response){
            // console.log(response);
            var html = template('articlesTpl',{data:response.data.data});
             //渲染文章数据到页面
             $('#article_listBox').html(html);
            var page = template('pageTpl',{
                data:response.data
            });
            $('#pageBox').html(page);
        }
    });
    // 阻止表单默认提交行为
    return false;
});