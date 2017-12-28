$(document).ready(function() {




  function DataBuild(data) {
    /* 处理后台传回的数据,方便页面表格显示 */
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
                    FTP:"FTP下载"
      };
      var size_type={
        1:'4K',
        2:'8K',
        3:'16K',
        4:'32K',
      };
      var date_type={
        A:'白班',
        B:'夜班'
      };
      var static_type={
            DRAFT:'初稿',
            POST:'已过帐',
            CHECKED:'已审核',
            DELETED:'已删除',
      };
      var datajson=[];
      $.each(json,function(index, el) {

        var unit_json={
          record_id:el.pk,
          printnum:el.fields.PrintNum,
          printname:el.fields.PrintName,
          pagesize:size_type[el.fields.sidetype],
          workdate:el.fields.WorkData,
          date_type:date_type[el.fields.WorkTimeType],
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
          finalqty:el.fields.FinalQty,
          checkTime:el.fields.CheckTime

        };
              datajson.push(unit_json);
      });
      return datajson;



  }


  function GW_TableInit () {
  $('#gw_table').bootstrapTable('destroy');
  $('#gw_table').bootstrapTable(
    {
      columns:[
        {
          field:'record_id',
          title:'ID',
          class:'record_pk'
        },
        {
        field:'printnum',
        title:'印号',
        class:'printnum'
      },
      {
        field:'printname',
        title:'印件名',
        width:220,
      },

      {
        field:'workdate',
        title:'工作日期'
      },
      {
        field:'date_type',
        title:'班次'
      },
      {
        field:'worktype',
        title:'工作内容',
      },

      {
        field:'FinishQty',
        title:'完成数',
        editable:{
          type:'text',
          title:'填写完成数',
          validate: function (v) {
                  if (isNaN(v)) return '请填写数字';
                  var k_val = parseInt(v);
                  if (k_val <= 0) return '必须大于或者等于0';
              },

        }
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
        visible:false
      },
      {
        field:'posttime',
        title:'过帐时间',
        visible:false
      },
      {
        field:'checkBy',
        title:'审核人',
        visible:false
      },
      {
        field:'checkTime',
        title:'审核时间',
        visible:false
      },
      {
        field:'post_field',
        title:'过帐操作',
        formatter:function(value,row,index){
                            var strHtml ='<button class="k_checked_btn">'+ '过帐' +'</button>';
                            return strHtml;
                        },
      },
      {
        field:'del_field',
        title:'删除操作',
        formatter:function(value,row,index){
                            var strHtml ='<button class="k_checked_btn">'+ '删除' +'</button>';
                            return strHtml;
                        },
      }

        ],
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
        onClickCell:function (field,value,row,$element) {
          var record_id=$element.closest('tr').find('[class="record_pk"]').text();
          var record_printnum=$element.closest('tr').find('[class="printnum"]').text();
          var finishqty=$element.closest('tr').find('[data-name="FinishQty"]').text();
          if (field==='post_field'){
            /* 如果点击的是过帐 */
             $.ajax({
               url: '/Tango_app/gwajax/',
               type: 'POST',
               data: {
                 gw_id:record_id,
                 gw_printnum:record_printnum,
                 gw_finishqty:finishqty,
                 static_code:'POST'
               },
               success:function (data) {
                 var datajson=DataBuild(data);
                 $('#gw_table').bootstrapTable('load',datajson);
               }
             });
           }
         if(field==='del_field'){
           /* 如果点击的是删除 */
            $.ajax({
              url: '/Tango_app/gwajax/',
              type: 'POST',
              data: {
                gw_id:record_id,
                gw_printnum:record_printnum,
                static_code:'DELETED'
              },
              success:function (data) {
                var datajson=DataBuild(data);
                $('#gw_table').bootstrapTable('load',datajson);
              }
            });

         }
        },
    }
  );//表格初始化结束
  }


  function TableInit_NotDraft() {
    $('#gw_table').bootstrapTable('destroy');
    $('#gw_table').bootstrapTable(
      {
        columns:[{
          field:'printnum',
          title:'印号',
        },
        {
          field:'printname',
          title:'印件名',
          width:200,
        },

        {
          field:'workdate',
          title:'工作日期'
        },
        {
          field:'date_type',
          title:'班次'
        },
        {
          field:'worktype',
          title:'工作内容',
        },
        // {
        //   field:'work_start_time',
        //   title:'开始于'
        // },
        // {
        //   field:'work_end_time',
        //   title:'结束于'
        //
        // },
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
          title:'过帐时间',
          visible:false
        },
        {
          field:'checkBy',
          title:'审核人',
          visible:false
        },
        {
          field:'checkTime',
          title:'审核时间',
          visible:false
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
          showColumns:true,


      }
    );//表格初始化结束


  }

  $('#workdate').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });




  /*工序选择下拉框使用select2 */
  $('#work_type').select2({
    placeholder:'请至少选择一个工序',
    closeOnSelect:false,
    multiple:true,
    maximumSelectionLength:8
  });

$('#submit_btn').on('click',  function(event) {
  event.preventDefault();
  /* 点击提交时候取工务记录的基本信息发送到后台,并取回初稿状态的记录 */

  var printnum=$("#printnum").val();
  var printname=$('#printname').val();
  var pagesize=$('#size').val();
  var reg=/[A-Z]{2}[0-9]{4}$/;

  var workdate=$('#workdate').val();
  var worktimetype=$('#worktimetype').val();
  var work_types=$('#work_type').select2('val').join(";");
  var remark=$('#remark').val();
  if (reg.test(printnum)&&(printname.length!==0&&workdate.length!==0)) {

    $.ajax({
      url: '/Tango_app/gw/',
      type: 'POST',

      data: {
        printnum:printnum,
        printname:printname,
        pagesize:pagesize,
        workdate:workdate,
        worktimetype:worktimetype,
        work_types:work_types,
        remark:remark
      },
      success:function (data) {        
        var datajson= DataBuild(data);
        GW_TableInit();
        $('#gw_table').bootstrapTable('load',datajson);

      }
    });

  } else {
    alert('印号格式不正确,或者 "印件名称" 和 "工作日期" 未填写!');
  }

});

  $('#get_draft').on('click', function(event) {
    /* 取初稿状态的记录 */
    $.ajax({
      url: '/Tango_app/gwajax',
      type: 'GET',
      data: {static_code: 'DRAFT'},
      success:function (data) {
        var datajson=DataBuild(data);
        GW_TableInit ();
        $('#gw_table').bootstrapTable('load',datajson);
      }
    });
  });
  // 处理获取其他状态的按钮点击事件
$('.get_record').on('click', function(event) {
  var class_type=$(this).attr('id');
  var record_type={
    get_post:'POST',
    get_checked:'CHECKED',
    get_del:'DELETED',
  };

  $.ajax({
    url: '/Tango_app/gwajax',
    type: 'GET',
    data: {static_code: record_type[class_type]},
    success:function (data) {
      var datajson=DataBuild(data);
      TableInit_NotDraft();
      $('#gw_table').bootstrapTable('load',datajson);
    }
  });
});
});
