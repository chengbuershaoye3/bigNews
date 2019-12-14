function pageTpl(num,current_page,type,state){
    current_page = current_page==undefined ? '1':current_page
    var pageTpl = `
        <li class="page-item first {{current_page == 1 ? 'disabled':''}}">
        <a href="javascript:;" class="page-link" data-page="1" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}">首页</a>
        </li>
        <li class="page-item prev {{current_page == 1 ? 'disabled':''}}">
        <a href="javascript:;" class="page-link" data-page="{{current_page-1}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}">上一页</a>
        </li>
        <% for(var i=1;i<=page;i++) {%>
        <li class="page-item {{current_page==i?'active':''}}">
        <a href="javascript:;" class="page-link" data-page="{{i}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}">{{i}}</a>
        </li>
        <%}%>
        <li class="page-item next {{current_page==page?'disabled':''}}">
        <a href="javascript:;" class="page-link" data-page="{{current_page==page?'0':current_page-0+1}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}">下一页</a>
        </li>
        <li class="page-item last {{current_page==page?'disabled':''}}">
        <a href="javascript:;" class="page-link" data-page="{{page}}" data-type="{{type==''?'':type}}" data-state="{{state==''?'':state}}">尾页</a>
        </li>
    `
    var html = template.render(pageTpl,{
        page:num,
        current_page:current_page,
        type:type,
        state:state
    })
    $('#pageBox').html(html)

};
// pageTpl(num,current_page,type,state);