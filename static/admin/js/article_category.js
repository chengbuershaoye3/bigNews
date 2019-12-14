// 1.给新增按钮注册点击事件

$('#model_add').on('click', function() {
    // 2.获取表单的内容
    var formata = $(this).parent().siblings('.modal-body').find('#fenleiForm').serialize()
        // 3.发送请求
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/category/add',
        data: formata,
        success: function(response) {
            console.log(response);
            // 4. 渲染页面
            location.reload()
                // console.log(response);
                // 准备一个空formData对象
        }
    })
    return false;
})


// 5.发送请求
$.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/category/list',
        success: function(response) {
            // console.log(response);
            // 准备模板引擎拼接
            var html = template('fenleiTpl', response)
                // console.log(html);
                // 将拼接好的html代码渲染到页面
            $('#fenlei').html(html)
        },
    })
    // 为编辑按钮注册点击事件---事件委托
$('.container-fluid').on('click', '.edit', function() {
    var id = $(this).attr('data-id')
        // console.log(id);
        // 发送请求,服务器根据id返回数据
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/category/search',
        data: {
            id: id
        },
        success: function(response) {
            // console.log(response);

            // console.log(response.data[0]);//得到是一个对象

            var html = template('lxdmodifyTpl', {
                        data: response.data
                    }
                    // 
                    // data: response.data[0]

                )
                // console.log(response.data);
            console.log(html)
            $('.modal-dialog').html(html)
            $('#addModal').modal('show')
            $('#model_shutoff').on('click', function() {
                $('#addModal').modal('hide')
            })
        }
    })

})

// 点击修改发送请求
$('#addModal').on('click', '#model_modi', function() {
    var id = $(this).attr('data-id')
    console.log(id);
    var messages1 = $('#recipient-name1').val()
    var messages2 = $('#recipient-name2').val()
        // console.log(messages1);
        // 发送请求
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/category/edit',
        data: {
            id: id,
            name: messages1,
            slug: messages2
        },
        success: function() {
            location.reload()
        }

    })


})

// // 为编辑按钮注册点击事件--事件委托
// $('#fenlei').on('click', '.edit', function() {

//     var id = $(this).attr('data-id')
//         //     console.log(id);
//     $.ajax({
//         type: 'get',
//         url: 'http://localhost:8080/api/v1/admin/category/search',
//         data: {
//             id: id
//         },
//         success: function(data) {
//             //  console.log(response);
//             // console.log(response.data);
//             // console.log(response.data[0]);
//             // var html = template('motaiTpl', {
//             //     data: data.data
//             // })
//             console.log(data.data);
//             console.log(data.data[0]);
//             var bb = data.data[0].name
//             var cc = data.data[0].slug
//             $('#recipient-name1').val(bb)
//             $('#recipient-name2').val(cc)
//             $('.btn-primary').html('修改')
//             $('.modal-title').html('修改分类')
//             console.log(bb);
//             console.log(cc);
//             $('#addModal').modal('show')
//         }
//     })
// })



// $('.btn-primary').on('click', function() {
//     //     // var formata = $(this).parent().siblings('.modal-body').find('#fenleiForm').serialize()
//     //     //         //         console.log(formata);
//     //     // alert('ok')
//     var messages1 = $('#recipient-name1').val()
//     var messages2 = $('#recipient-name2').val()
//     var id = $(this).parents('#addModal').siblings('.container-fluid').find('.edit').attr('data-id')
//     console.log(id);

//     //     // var messages1 = $('#recipient-name1').val()
//     //     // var messages2 = $('#recipient-name2').val()
// })


// $('#bigBox').on('submit', '#fenleiForm', function() {
//         // var formdata = $(this).serialize()
//         var messages1 = $('#recipient-name1').val()
//         var messages2 = $('#recipient-name2').val()
//         var id = $(this).attr('data-id')
//         $.ajax({
//             url: 'http://localhost:8080/api/v1/admin/category/edit',
//             type: 'post',
//             data: {
//                 name: messages1,
//                 slug: messages2,
//                 id: id
//             },
//             success: function(data) {
//                 location.reload()
//             }
//         })
//         return false;
//     })
//         //     // 获取当前要编辑的id
//         // var formata = $(this).parent().siblings('.modal-body').find('#fenleiForm').serialize()
//         //     // console.log(formata);

//     //     var id = $(this).attr('data-id')
//     //     console.log(id);




//     //     //     // 获取对应的分类信息
//     //     //     // 发送请求

//     $.ajax({
//         type: 'get',
//         url: 'http://localhost:8080/api/v1/admin/category/list',
//         //         data: {
//         //             id: id
//         //         },


//         //         success: function(response) {

//         //             var arr = response.data

//         //                 //   利用find方法获取到数组里与当前id相等的元素
//         //             let yuansu = arr.find((item, index) => item.id == id)
//         //                 // console.log(yuansu);
//         //                 // console.log($(this).attr('data-id'));

//         //             $('.btn-primary').attr('data-id', $(this).attr('data-id'))
//         //                 // console.log(yuansu.name);



// // 给表单注册提交事件

//         var messages1 = $('#recipient-name1').val()
//         console.log(messages1);

//         var messages2 = $('#recipient-name2').val()
//         console.log(messages2);
//         // var ids = $('#fenleiForm').attr('data-id')
//         // console.log(ids);

//         var id = $(this).attr('data-id')
//         console.log(id);

//         $.ajax({

//             type: 'post',
//             url: 'http://localhost:8080/api/v1/admin/category/edit',
//             data: {
//                 name: messages1,
//                 slug: messages2,
//                 id: id
//             }

//             ,
//             success: function(response) {
//                 // alert('ok')
//                 console.log(response);

//                 // var html = template('fenleiTpl', response)
//                 //     // console.log(html)

//                 //         // $('#fenlei').html(html)
//                 //         console.log(response);

//             }


//         })



//     })
//     // var formdata = $(this).serialize()














// 删除分类

$('#fenlei').on('click', '.delete', function() {

    if (confirm('您确定要删除此项吗?')) {
        // 获取当前要删除的id
        var id = $(this).attr('data-id')
        console.log(id);
        // 发送请求,服务器根据id删除对应数据
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/category/delete',
            data: {
                id: id
            },
            success: function(response) {
                // console.log(response);
                location.reload()
            }
        })
    }

})