

$(document).ready(function() {




  // 点击提交按钮时触发
  // $('#sub_btn').on('click', function(event) {
  //   event.preventDefault();
  //   /* Act on the event */
  // });

  $('#get_draft').click(function() {
     location.reload();
 });


$('.get_record').on('click', function(event) {
  // event.preventDefault();
  /* Act on the event */
  var record_type={
    get_post:'POST',
    get_checked:'CHECKED',
    get_del:'DELETED',
  };
  var class_type=$(this).attr('id');
  $.ajax({
    url: '/Tango_app/gwajax',
    type: 'GET',

    data: {staict_code: record_type[class_type]},
    success:function (data) {
      // alert(data);
      var json =$.parseJSON(data);
      var work_type={
                    SMY:"数码样",
                    LZ:"蓝纸",
                    CTP:"CTP",
                    CTF:"CTF",
                    GB:"改版",
                    SBL:"算倍率",
                    COPYDOT:"COPYDOT",
                    KP:"刻盘",
      };
      var size_type={
        1:'4K',
        2:'8K',
        3:'16K',
        4:'32K',
      };
      var staict_type={
            DRAFT:'初稿',
            POST:'已过帐',
            CHECKED:'已审核',
            DELETED:'已删除',
      };
      var datajson=[];
      $.each(json,function(index, el) {
        // 创建和json对象存放单条记录
        // alert('进入循环');
        var unit_json={
              printnum:el.fields.PrintNum,
              printname:el.fields.PrintName,
              pagesize:size_type[el.fields.sidetype],
              workdate:el.fields.WorkData,
              worktype:work_type[el.fields.WorkType],
              FinishQty:el.fields.FinishQty,
              k_val:el.fields.K_val,
              remark:el.fields.remark,
              static_code:staict_type[el.fields.staticcode],
              createBy:el.fields.createBy,
              createtime:el.fields.createtime,
              postby:el.fields.postBy,
              posttime:el.fields.posttime,
              checkBy:el.fields.CheckBy,
              checkTime:el.fields.CheckTime
              };
        datajson.push(unit_json);
      });
      $('#gw_table').bootstrapTable('destroy');
      $('#gw_table').bootstrapTable({
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
        },
        ],
        // 导出设置
        exportDataType:'all',
        showExport:true,
        exportTypes:['excel'],
        buttonsAlign:'right',
        Icons:'glyphicon-export',
        exportOptions:{
            fileName:'gw_report',
            worksheetName:'sheet1',

        },



        cache:false,
        pagination:true,
        pageSize:5,
        pageList:[5,10,30,50],
        showPaginationSwitch:true,
        showToggle:true,
        showFooter:false,
        paginationHAlign:'left',
        search:true,
        editable:true,


      });


      $('#gw_table').bootstrapTable('load',datajson);




    }
  });


});

// 处理点击表格内操作按钮的事件,发送请求,更新记录状态为删除或者过帐
  $('#gw_table tr').on('click', '.mdf_btn', function(event) {

    var gw_id=  $(this).closest('tr').find('.gw_pk').html();
    var gw_printnum=$(this).closest('tr').find('.gw_printnum').html();
    var modify_type={
      del_button:'DELETED',
      post_button:'POST',
    };
    var staict_code=$(this).attr('name');

    $.ajax({
      url: '/Tango_app/gwajax',
      type: 'POST',
      data: {
        gw_id:gw_id,
        gw_printnum:gw_printnum,
        staict_code: modify_type[staict_code],

      }
    })
    .done(function() {
      console.log("success");
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");
    });

  });
});
