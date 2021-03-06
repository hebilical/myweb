



$(document).ready(function () {

function dataBuild(data) {
  var json =$.parseJSON(data);
  var machin_type={
        1:'1号机(Lotem800)',
        2:'2号机(Magnus800)',
        3:'3号机(Magnus800)',
  };
  var work_type={
        CTP_PB:'CTP拼版',
        CTP_CLZ:'CTP出蓝纸',
        PS_PB:'PS拼版',
        PS_CLZ:'PS出蓝纸',
        CTP_CB:'CTP出版',
        CTP_BB:'CTP补版',
        CTP_CSB:'CTP测试版',
  };
  var ps_type={
        IM500668:'CTP华光(1030X800)',
        IM500536:'CTP华光(1030X790)',
        IM501521:'CTP版富士(1030X800)',
        IM501520:'CTP版富士(1030X790)',
        IM501524:'CTP版富士(968X584)',
        IM503335:'CTP版柯达免冲洗(1030X790)',
        IM500035:'CTP版柯达(968X604)',
        IM500746:'PS版河南光华(1030X800)',
        IM500041:'PS版河南光华(1030X790)',
        IM500990:'PS版河南光华(968X604)',
        IM500989:'PS版河南光华(968X584)',
  };
  var work_time={
    A:'白班',
    B:'夜班',
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
    var unit_json={
          record_id:el.pk,
          printnum:el.fields.PrintNum,
          printname:el.fields.PrintName,
          date_type:work_time[el.fields.WorkTimeType],
          machine:machin_type[el.fields.Machine],
          workdate:el.fields.WorkData,
          worktype:work_type[el.fields.WorkType],
          work_start_time:el.fields.WorkStartTime,
          work_end_time:el.fields.WorkEndTime,
          FinishQty:el.fields.FinishQty,
          // K_val:el.fields.K_val,

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

    // console.log(datajson);
  });
  return datajson;



}

function tableInit() {
  $('#output_table_k').bootstrapTable('destroy');

  $('#output_table_k').bootstrapTable({
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
      field:'machine',
      title:'机型',
    },

    {
      field:'workdate',
      title:'工作日期',
      sortable:true,
      order:'desc'
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
    // {
    //   field:'K_val',
    //   title:'难度系数',
    //   editable:{
    //     type:'text',
    //     title:'设置难度系数',
    //     validate: function (v) {
    //             if (isNaN(v)) return '请填写数字';
    //             var k_val = parseFloat(v);
    //             if (k_val <= 0) return '必须大于或者等于0';
    //         },
    //
    //   }
    // },

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
      // editable:{defaultValue:'test'},

    }

    ],


    onClickCell:function (field, value, row, $element) {



      if (field==='operation') {
        // var k_val= $element.closest('tr').find('[data-name="K_val"]').text();


        $.ajax({
          url: '/Tango_app/out/modify_ajax/',
          type: 'POST',

          data: {record_id: row.record_id,
            printnum:row.printnum,
            // k_val:k_val,

            k_set:true//设置系数时候为true,发还为false
          },
          success:function (data) {

            var json=$.parseJSON(data);
            var jsondata=[];
            $.each(json,function(index, el) {

              var unit_json={
                    record_id:el.pk,
                    printnum:el.fields.PrintNum,
                    printname:el.fields.PrintName,
                    date_type:work_time[el.fields.WorkTimeType],
                    machine:machin_type[el.fields.Mach],
                    workdate:el.fields.WorkData,
                    worktype:work_type[el.fields.WorkType],
                    work_start_time:el.fields.WorkStartTime,
                    work_end_time:el.fields.WorkEndTime,
                    FinishQty:el.fields.FinishQty,
                    // K_val:el.fields.K_val,

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

            $('#output_table_k').bootstrapTable('load',jsondata);


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
  $('#output_table_k').bootstrapTable('destroy');

  $('#output_table_k').bootstrapTable({
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
      field:'machine',
      title:'机型'
    },
    {
      field:'workdate',
      title:'工作日期',
      sortable:true,
      order:'desc'
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
    // {
    //   field:'K_val',
    //   title:'难度系数',
    //
    // },

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
      width:100,
      formatter:function(value,row,index){
                          var strHtml ='<button class="k_checked_btn">'+'发还'+'</button>';
                          return strHtml;
                      },
    }
    ],
    onClickCell:function (field,value,row,$element) {

      $.ajax({
        url: '/Tango_app/out/modify_ajax/',
        type: 'POST',

        data: {record_id: row.record_id,printnum:row.printnum,k_set:false},

        success:function (data) {

          var jsondata=dataBuild(data);
          $('#output_table_k').bootstrapTable('load',jsondata);

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
  url:'/Tango_app/out/modify_ajax/',
  type:'GET',
  data:{static_code:'POST'},
  success: function (data) {

    var datajson=dataBuild(data);
    tableInit();
    $('#output_table_k').bootstrapTable('load',datajson);

  }
});



  /* 系数修改按钮点击事件,将信息提交到后台,并且返回修改后的数据  */
  $('.static_btn').on('click',function () {
      /* Act on the event */
      var type_code=$(this).attr('id');
      var btn_type={get_post:'POST',get_k_setted:'CHECKED',get_del:'DELETED'}  ;
      if (btn_type[type_code]==='POST') {
        // 如果初稿状态,显示操作按钮,允许系数可以编辑
        $.ajax({
          url:'/Tango_app/out/modify_ajax/',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {

            var datajson=dataBuild(data);
            tableInit();
            $('#output_table_k').bootstrapTable('load',datajson);

          }
      });


      }

      else {


        $.ajax({
          url:'/Tango_app/out/modify_ajax/',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {
            var datajson=dataBuild(data);
            tableInit_NotPost();
            $('#output_table_k').bootstrapTable('load',datajson);
          }
      });
      }
  });
});
