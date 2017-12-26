
$(document).ready(function () {

  function dataBuild(data) {
    var json =$.parseJSON(data);
    var work_type={
           SCAN_FS:'扫描反射稿',
           SCAN_TS:'扫描透射稿',
           SCAN_COPYDOT:'COPYDOT',
           COR_NEW:'调色新作',
           COR_GB:'调色改版',
           COR_ZCTY:'追传统样',
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
      var unit_json={
            record_id:el.pk,
            printnum:el.fields.PrintNum,
            printname:el.fields.PrintName,
            date_type:work_time[el.fields.WorkTimeType],
            workdate:el.fields.WorkData,
            worktype:work_type[el.fields.WorkType],
            work_start_time:el.fields.WorkStartTime,
            work_end_time:el.fields.WorkEndTime,
            FinishQty:el.fields.FinishQty,
            Scan_K_val:el.fields.Scan_K_val,
            Week_val:el.fields.Week_val,
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
      datajson.push(unit_json);
    });
    return datajson;
  }

  function tableInit() {
    $('#df_table_k').bootstrapTable('destroy');

    $('#df_table_k').bootstrapTable({
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
      {
        field:'Scan_K_val',
        title:'扫描系数',
        editable:{
          type:'text',
          title:'设置扫描系数',
          validate: function (v) {
                  if (isNaN(v)) return '请填写数字';
                  var k_val = parseFloat(v);
                  if (k_val <= 0) return '必须大于或者等于0';
              },

        }
      },
      {
        field:'Week_val',
        title:'期刊系数',
        editable:{
          type:'text',
          title:'设置期刊系数',
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
        // editable:{defaultValue:'test'},

      }

      ],


      onClickCell:function (field, value, row, $element) {
        if (field==='operation') {
          var scan_k_val= $element.closest('tr').find('[data-name="Scan_K_val"]').text();
          var week_val=$element.closest('tr').find('[data-name="Week_val"]').text();

          $.ajax({
            url: '/Tango_app/df/modify_ajax/',
            type: 'POST',

            data: {record_id: row.record_id,
              printnum:row.printnum,
              scan_k_val:scan_k_val,
              week_val:week_val,
              k_set:true//设置系数时候为true,发还为false
            },
            success:function (data) {
              var jsondata=dataBuild(data);

              $('#df_table_k').bootstrapTable('load',jsondata);


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
  $('#df_table_k').bootstrapTable('destroy');
  $('#df_table_k').bootstrapTable({
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
    {
      field:'Scan_K_val',
      title:'扫描系数',

    },
    {
      field:'Week_val',
      title:'期刊系数',

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
      if (field==='operation_to_post') {
        $.ajax({
          url: '/Tango_app/df/modify_ajax/',
          type: 'POST',

          data: {record_id: row.record_id,printnum:row.printnum,k_set:false},

          success:function (data) {
            var jsondata=dataBuild(data);
            $('#df_table_k').bootstrapTable('load',jsondata);
          }
        });



      } else {

      }
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
  /* 系数修改按钮点击事件,将信息提交到后台,并且返回修改后的数据  */
  $('.static_btn').on('click',function () {
      /* Act on the event */
      var type_code=$(this).attr('id');
      var btn_type={get_post:'POST',get_k_setted:'CHECKED',get_del:'DELETED'}  ;
      if (btn_type[type_code]==='POST') {
        // 如果初稿状态,显示操作按钮,允许系数可以编辑
        $.ajax({
          url:'/Tango_app/df/modify_ajax/',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {
            tableInit();
            var datajson=dataBuild(data);
            $('#df_table_k').bootstrapTable('load',datajson);
          }
      });


      }

      else {
        /* 非过帐状态可以进行发还操作 */

        $.ajax({
          url:'/Tango_app/df/modify_ajax/',
          type:'GET',
          data:{static_code:btn_type[type_code]},
          success: function (data) {
            tableInit_NotPost();
            var datajson=dataBuild(data);
            $('#df_table_k').bootstrapTable('load',datajson);
          }
      });
      }
  });
});
