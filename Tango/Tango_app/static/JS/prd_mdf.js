



$(document).ready(function () {

function dataBuild(data) {
    var json =$.parseJSON(data);
    var work_type={
          SJ:'收集',
          ZZJC:'制作检查',
          XT:'修图',
          TD:'褪底',
          ZZ:'制作',
          GB:'改版',
          FP:'发排',
          PDF_FP:'PDF发排',
          PDF_TWJ:'PDF替文件',
          PDF_GB:'PDF改版',
          CSMY:'出数码样',
          CLZ:'出蓝纸',
          KGP:'克光盘',
    };
    var staict_type={
          DRAFT:'初稿',
          POST:'已过帐',
          CHECKED:'已审核',
          DELETED:'已删除',
    };
    var date_type={
      A:'白班',
      B:'夜班'
    };
    var jsondata=[];
    $.each(json,function(index, el) {

      var unit_json={
      record_id:el.pk,
      printnum:el.fields.PrintNum,
      printname:el.fields.PrintName,
      workdate:el.fields.WorkData,
      date_type:date_type[el.fields.WorkTimeType],
      worktype:work_type[el.fields.WorkType],
      work_start_time:el.fields.WorkStartTime,
      work_end_time:el.fields.WorkEndTime,
      FinishQty:el.fields.FinishQty,
      k_val:el.fields.K_val,
      finalqty:el.fields.FinalQty,
      remark:el.fields.remark,
      static_code:staict_type[el.fields.staticcode],
      createBy:el.fields.createBy,
      createtime:el.fields.createtime,
      postby:el.fields.postBy,
      posttime:el.fields.posttime,
      checkBy:el.fields.CheckBy,
      checkTime:el.fields.CheckTime
      };
      jsondata.push(unit_json);

    });
    return jsondata;

  }

function tableInit() {
  $('#prd_table_k').bootstrapTable('destroy');
  $('#prd_table_k').bootstrapTable({
    columns:[
      {
        field:'record_id',
        title:'主键',
        visible:false,

      },
      {
      field:'printnum',
      title:'印号',
      sortable:true,
      order:'desc'
    },
    {
      field:'printname',
      title:'印件名',
      width:220,
    },

    {
      field:'workdate',
      title:'工作日期',
      sortable:true,
      order:'desc'
    },
    {
      field:'date_type',
      title:'班次',
    },
    {
      field:'worktype',
      title:'工作内容',
    },
    {
      field:'work_start_time',
      title:'开始于'
    },
    {
      field:'work_end_time',
      title:'结束于',
    },

    {
      field:'FinishQty',
      title:'完成数'
    },
    {
      field:'k_val',
      title:'难度系数',
      editable:{
        type:'text',
        title:'难度系数',
        validate: function (v) {
                if (isNaN(v)) return '请填写数字';
                var k_val = parseFloat(v);
                if (k_val <= 0) return '必须大于或者等于0';
            },

      }
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
      sortable:true,
      visible:false,
      order:'desc'
    },
    {
      field:'checkBy',
      title:'审核人',
      visible:false,
    },
    {
      field:'checkTime',
      title:'审核时间',
      visible:false,
    },
    {
      field:'operation',
      title:'操作',
      width:100,
      formatter:function(value,row,index){
                          var strHtml ='<button width=50 class="k_checked_btn">'+ '确认' +'</button>';
                          return strHtml;
                      },
    }
    ],
    onEditableSave:function (field,row,oldValue,$el) {
      

    },


    onClickCell:function (field, value, row, $element) {
      if (field==='operation') {
        var k_val= $element.closest('tr').find('a').html();
        $.ajax({
          url: '/Tango_app/prd/modify_ajax/',
          type: 'POST',
          data: {record_id: row.record_id,printnum:row.printnum,k_val:k_val,
            k_set:true//设置系数时候为true,发还为false
          },
          success:function (data) {
            var jsondata=dataBuild(data);
            $('#prd_table_k').bootstrapTable('load',jsondata);
          }
        }
    );
      }
    },//onClickCell事件处理设置完毕
    exportDataType:'all',
    showExport:true,
    exportTypes:['excel'],
    buttonsAlign:'right',
    Icons:'glyphicon-export',
    exportOptions:{
        fileName:'zz_report',
        worksheetName:'sheet1',

    },


    cache:false,
    pagination:true,
    pageSize:5,
    pageList:[5,10,30,50],
    showPaginationSwitch:true,
    showToggle:true,
    paginationHAlign:'left',
    search:true,
    editable:true,
    showColumns:true,
  });//表格初始化完毕



}

function tableInit_NotPost() {
  $('#prd_table_k').bootstrapTable('destroy');

  $('#prd_table_k').bootstrapTable({
    columns:[
      {
        field:'record_id',
        title:'主键',
        visible:false,

      },
      {
      field:'printnum',
      title:'印号',
      sortable:true,
      order:'desc'
    },
    {
      field:'printname',
      title:'印件名',
    },
    {
      field:'workdate',
      title:'工作日期',
      sortable:true,
      order:'desc'
    },
    {
      field:'date_type',
      title:'班次',
    },
    {
      field:'worktype',
      title:'工作内容',
    },
    {
      field:'work_start_time',
      title:'开始于',
    },
    {
      field:'work_end_time',
      title:'结束于',
    },
    {
      field:'FinishQty',
      title:'完成数'
    },
    {
      field:'k_val',
      title:'难度系数',

    },
    {
      field:'finalqty',
      title:'折合数'
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
      sortable:true,
      order:'desc',
      visible:false,
    },
    {
      field:'checkBy',
      title:'审核人',
    },
    {
      field:'checkTime',
      title:'审核时间',
      visible:false,
    },
    {
      field:'operation_to_post',
      title:'操作',
      visible:false,
      width:100,
      formatter:function(value,row,index){
                          var strHtml ='<button class="k_checked_btn">'+'发还'+'</button>';
                          return strHtml;
                      },
    }
    ],
    onClickCell:function (field,value,row,$element) {

      $.ajax({
        url: '/Tango_app/prd/modify_ajax/',
        type: 'POST',

        data: {record_id: row.record_id,printnum:row.printnum,k_set:false},

        success:function (data) {
          var jsondata=dataBuild(data);
          $('#prd_table_k').bootstrapTable('load',jsondata);

        }
      });
    },//onClickCell 事件函数结束
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
    paginationHAlign:'left',
    search:true,
    editable:true,
    showColumns:true,


  });


}


$.ajax({
  url:'/Tango_app/prd/modify_ajax/',
  type:'GET',
  data:{static_code:'POST'},
  success: function (data) {

    var datajson=dataBuild(data);
    tableInit();
    $('#prd_table_k').bootstrapTable('load',datajson);
  }
});

  /* 系数修改按钮点击事件,将信息提交到后台,并且返回修改后的数据  */
  $('.static_btn').on('click',function () {
      /* Act on the event */
      var type_code=$(this).attr('id');
      var btn_type={get_post:'POST',get_k_setted:'CHECKED',get_del:'DELETED'}  ;
      if (btn_type[type_code]==='POST') {
        /* 如果初稿状态,显示操作按钮,允许系数可以编辑 */
        $.ajax({
          url:'/Tango_app/prd/modify_ajax/',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {

            var datajson=dataBuild(data);
            tableInit();
            $('#prd_table_k').bootstrapTable('load',datajson);
          }
      });
      }
      else {
        $.ajax({
          url:'/Tango_app/prd/modify_ajax',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {
            var datajson=dataBuild(data);
            tableInit_NotPost();
            $('#prd_table_k').bootstrapTable('load',datajson);
          }
      });
      }
  });
});
