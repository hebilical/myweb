$(document).ready(function() {
  function gwDataBuild(data) {
    /* 处理后台传回的数据,方便页面表格显示 */
      var json=$.parseJSON(data);
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

  function dfDataBuild(data) {
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

  function prdDataBuild(data) {
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

  function outDataBuild(data) {
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

        var unit_json={
              record_id:el.pk,
              printnum:el.fields.PrintNum,
              printname:el.fields.PrintName,
              machine:machin_type[el.fields.Machine],
              date_type:work_time[el.fields.WorkTimeType],
              workdate:el.fields.WorkData,
              worktype:work_type[el.fields.WorkType],

              work_start_time:el.fields.WorkStartTime,
              work_end_time:el.fields.WorkEndTime,
              FinishQty:el.fields.FinishQty,
              K_val:el.fields.K_val,

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

  function zjDataBuild(data) {
      var json =$.parseJSON(data);
      var work_type={
            JGZ:'激光纸',
            CSG:'查色稿',
            CLZ:'查蓝纸',
            CFL:'查菲林',
            CB:'查版',
            KB:'烤版',
            CSMY:'裁数码样',
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
              K_val:el.fields.K_val,
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







  function zjTableInit() {
      $('#resultTabl').bootstrapTable('destroy');
      $('#resultTabl').bootstrapTable(
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
          {
            field:'work_start_time',
            title:'开始于'
          },
          {
            field:'work_end_time',
            title:'结束于'

          },
          {
            field:'FinishQty',
            title:'完成数'
          },
          {
            field:'K_val',
            title:'难度系数'
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
          // {
          //   field:'createtime',
          //   title:'建单时间'
          // },
          // {
          //   field:'postby',
          //   title:'过帐人',
          // },
          // {
          //   field:'posttime',
          //   title:'过帐时间',
          //   visible:false
          // },
          {
            field:'checkBy',
            title:'审核人',
            // visible:false
          },
          {
            field:'checkTime',
            title:'审核时间',
            // visible:false
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





  function dfTableInit() {
  $('#resultTabl').bootstrapTable('destroy');
  $('#resultTabl').bootstrapTable({
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
    // {
    //   field:'createtime',
    //   title:'建单时间'
    // },
    // {
    //   field:'postby',
    //   title:'过帐人',
    // },
    // {
    //   field:'posttime',
    //   title:'过帐时间',
    //   sortable:true,
    //   order:'desc',
    //   visible:false,
    // },
    {
      field:'checkBy',
      title:'审核人',
    },
    // {
    //   field:'checkTime',
    //   title:'审核时间',
    //   visible:false,
    // },
    // {
    //   field:'operation_to_post',
    //   title:'操作',
    //   visible:false,
    //   width:100,
    //   formatter:function(value,row,index){
    //                       var strHtml ='<button class="k_checked_btn">'+'发还'+'</button>';
    //                       return strHtml;
    //                   },
    // }
    ],
    // onClickCell:function (field,value,row,$element) {
    //   if (field==='operation_to_post') {
    //     $.ajax({
    //       url: '/Tango_app/df/modify_ajax/',
    //       type: 'POST',
    //
    //       data: {record_id: row.record_id,printnum:row.printnum,k_set:false},
    //
    //       success:function (data) {
    //         var jsondata=dataBuild(data);
    //         $('#df_table_k').bootstrapTable('load',jsondata);
    //       }
    //     });
    //
    //
    //
    //   } else {
    //
    //   }
    //     },//onClickCell 事件函数结束
    //

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

  function prdTableInit() {
    $('#resultTabl').bootstrapTable('destroy');
    $('#resultTabl').bootstrapTable(
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
          title:'结束于'

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
        // {
        //   field:'createtime',
        //   title:'建单时间'
        // },
        // {
        //   field:'postby',
        //   title:'过帐人',
        // },
        // {
        //   field:'posttime',
        //   title:'过帐时间',
        //   visible:false
        // },
        {
          field:'checkBy',
          title:'审核人',
          // visible:false
        },
        // {
        //   field:'checkTime',
        //   title:'审核时间',
        //   visible:false
        // },

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
    );
}



  function gwTableInit() {
    $('#resultTabl').bootstrapTable('destroy');
    $('#resultTabl').bootstrapTable(
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
        // {
        //   field:'createtime',
        //   title:'建单时间'
        // },
        // {
        //   field:'postby',
        //   title:'过帐人',
        // },
        // {
        //   field:'posttime',
        //   title:'过帐时间',
        //   visible:false
        // },
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

  function outTableInit() {
    $('#resultTabl').bootstrapTable('destroy');
    $('#resultTabl').bootstrapTable(
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
            field:'machine',
            title:'机型',
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
          field:'work_start_time',
          title:'开始于'
        },
        {
          field:'work_end_time',
          title:'结束于'

        },
        {
          field:'FinishQty',
          title:'完成数'
        },
        // {
        //   field:'K_val',
        //   title:'难度系数'
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



  $('#start_time').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });

  $('#end_time').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });

  $('#ser_button').on('click', function(event) {
    // event.preventDefault();
    /* Act on the event */

    var start_time=$('#start_time').val();
    var end_time=$('#end_time').val();
    var report_type=$('#report_type').val();

    if (report_type==='GW'){
      $.ajax({
        url: '/Tango_app/detilreport/',
        type: 'POST',
        data: {
          start_time:start_time,
          end_time:end_time,
          report_type:report_type,

        },
        success:function (data) {

          var datajson= gwDataBuild(data);
          
          gwTableInit();
          $('#resultTabl').bootstrapTable('load',datajson);

        }
      });



    }
    if (report_type==='PRD'){

      $.ajax({
        url: '/Tango_app/detilreport/',
        type: 'POST',
        data: {
          start_time:start_time,
          end_time:end_time,
          report_type:report_type,

        },
        success:function (data) {
          var datajson= prdDataBuild(data);
          prdTableInit();
          $('#resultTabl').bootstrapTable('load',datajson);

        }
      });



    }
    if (report_type==='DF') {
      $.ajax({
        url: '/Tango_app/detilreport/',
        type: 'POST',
        data: {
          start_time:start_time,
          end_time:end_time,
          report_type:report_type,

        },
        success:function (data) {
          var datajson= dfDataBuild(data);
          dfTableInit();
          $('#resultTabl').bootstrapTable('load',datajson);

        }
      });



    }
    if (report_type==='OUT') {

      $.ajax({
        url: '/Tango_app/detilreport/',
        type: 'POST',
        data: {
          start_time:start_time,
          end_time:end_time,
          report_type:report_type,

        },
        success:function (data) {
          var datajson= outDataBuild(data);
          outTableInit();
          $('#resultTabl').bootstrapTable('load',datajson);

        }
      });



    }
    if (report_type==='ZJ') {

      $.ajax({
        url: '/Tango_app/detilreport/',
        type: 'POST',
        data: {
          start_time:start_time,
          end_time:end_time,
          report_type:report_type,

        },
        success:function (data) {
          var datajson= zjDataBuild(data);
          zjTableInit();
          $('#resultTabl').bootstrapTable('load',datajson);

        }
      });

    }






  });





});
