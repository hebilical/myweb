function getCookie(name) {
  var cookiValue=null;
  if(document.cookie&&document.cookie!==''){
    var cookies=document.cookie.split(';');
    for(var i=0;i<cookies.length;i++){
      var cookie=jQuery.trim(cookies[i]);
      if (cookie.substring(0,name.length+1)===(name+'=')){
        cookieValue=decodeURIComponent(cookie.substring(name.length+1));
        break;
      }
    }
  }
return cookieValue;
}



$(document).ready(function () {

  // $('#gw_table tr').css('background','');

  /* 系数修改按钮点击事件,将信息提交到后台,并且返回修改后的数据  */
  $('#gw_table tr').on('click',function () {

    $(this).find('.K_btn').click(function(event) {
      /* Act on the event */
      var currentrow= $(this).closest('tr');
      var record_id=currentrow.find('.record_id').html();
      var printnum=currentrow.find('.printnum').html();
      var k_val=$(this).siblings('.k_val').val();
      $.ajax({
        url:'/Tango_app/gw/modify/',
        type:'POST',
        data:{
          'k_val':k_val,
          'record_id':record_id,
          'printnum':printnum,
        },
        success: function (data) {
          var json =$.parseJSON(data);
          var work_type={
                        SMY:"数码样",
                        LZ:"蓝纸",
                        CTP:"CTP",
                        CTF:"CTF",
                        GB:"改版",
                        SBL:"算倍率",
                        COPYDOT:"COPTDOT",
                        KP:"刻盘",
          };
          var size_type={
            1:'4K',
            2:'8K',
            3:'16K',
            4:'32K',
          };
          var static_type={
            DRAFT:'初稿',
            POST:'已过帐',
            CHECKED:'已审核',
            DELETED:'已删除',
          };
          // 下面进行表格初始化
          $('#gw_table_k').bootstrapTable('destroy');
          $('#gw_table_k').bootstrapTable({
            columns:[{
              field:'printnum',
              title:'印号',
            },
            {
              field:'printname',
              title:'印件名',
            },
            {
              field:'pagesize',
              title:'开本',
            },
            {
              field:'workdate',
              title:'工作日期'
            },
            {
              field:'worktype',
              title:'工作内容',
            },
            {
              field:'FinishQty',
              title:'完成数'
            },
            {
              field:'k_val',
              title:'难度系数'
            },
            {
              field:'remark',
              title:'备注'
            },
            {
              field:'static_code',
              title:'当前状态'
            },
            {
              field:'createBy',
              title:'建单人',
            },
            {
              field:'createtime',
              title:'建单时间'
            },
            {
              field:'postby',
              title:'过帐人',
            },
            {
              field:'posttime',
              title:'过帐时间'
            },
            {
              field:'checkBy',
              title:'审核人',
            },
            {
              field:'checkTime',
              title:'审核时间',
            }

            ],
            cache:false,
            pagination:true,
            pageSize:5,
            pageList:[5,10,30,50],
            showPaginationSwitch:true,
            showToggle:true,
            paginationHAlign:'left',
            search:true,


          });
          var datajson=[];
          $.each(json,function(index, el) {
// 创建和json对象存放单条记录
            var unit_json={
              printnum:el.fields.PrintNum,
              printname:el.fields.PrintName,
              pagesize:size_type[el.fields.sidetype],
              workdate:el.fields.WorkData,
              worktype:work_type[el.fields.WorkType],
              FinishQty:el.fields.FinishQty,
              remark:el.fields.remark,
              k_val:el.fields.K_val,
              static_code:static_type[el.fields.staticcode],
              createBy:el.fields.createBy,
              createtime:el.fields.createtime,
              postby:el.fields.postBy,
              posttime:el.fields.posttime,
              checkBy:el.fields.CheckBy,
              checkTime:el.fields.CheckTime

            };
            datajson.push(unit_json);

          });
          $('#gw_table_k').bootstrapTable('load',datajson);
        }
    });
    });
  });
  // $('#gw_table_k').on('click','tr',  function(event) {
  //   alert($(this).text());
  // /* Act on the event */
  // });

  // $('body').on('mouseover', 'tr', function(event) {
  //   $(this).css('background','#987');
  //
  //
  // });
  // $('body').on('mouseout', 'tr', function(event) {
  //   $(this).css('background','');
  //
  //
  // });
});
