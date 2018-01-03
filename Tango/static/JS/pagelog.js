$(document).ready(function() {

  function dataBuild(data) {
    var json =$.parseJSON(data);
    var page_type={
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
    var use_type={
      OUT:'领出',
      USED:'使用',
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
        page_type:page_type[el.fields.PageType],
        use_type:use_type[el.fields.UseType],
        workdate:el.fields.Data,
        date_type:date_type[el.fields.WorkTimeType],
        FinishQty:el.fields.Qty,
        remark:el.fields.Remark,
        static_code:static_type[el.fields.StaticCode],
        createBy:el.fields.CreateBy,
        createtime:el.fields.CreateTime,
        deleteBy:el.fields.DeleteBy,
        deleteTime:el.fields.DeleteTime

      };
            datajson.push(unit_json);
    });
    return datajson;

  }


  function tableInit() {
  $('#pagelog_table').bootstrapTable('destroy');
  $('#pagelog_table').bootstrapTable(
    {
      columns:[
        {
          field:'record_id',
          title:'ID',
          class:'record_pk'
        },
        {
        field:'page_type',
        title:'版型',
        class:'page_type'
      },
      {
        field:'use_type',
        title:'用途',
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
        field:'FinishQty',
        title:'数量(张)'
      },
      {
        field:'static_code',
        title:'当前状态'
      },


      {
        field:'remark',
        title:'备注'
      },

      {
        field:'createBy',
        title:'建单人',
      },
      {
        field:'createtime',
        title:'建单时间'
      },
      // {
      //   field:'post_field',
      //   title:'过帐操作',
      //   formatter:function(value,row,index){
      //                       var strHtml ='<button class="k_checked_btn">'+ '过帐' +'</button>';
      //                       return strHtml;
      //                   },
      // },
      {
        field:'del_field',
        title:'删除操作',
        visible:false,
        formatter:function(value,row,index){
                            var strHtml ='<button class="k_checked_btn">'+ '删除' +'</button>';
                            return strHtml;
                        },

      }

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
        showColumns:true,
        search:true,
        editable:true,
        onClickCell:function (field,value,row,$element) {
          var record_id=$element.closest('tr').find('[class="record_pk"]').text();
          // var record_printnum=$element.closest('tr').find('[class="printnum"]').text();

          if (field==='post_field'){
             $.ajax({
               url: '/Tango_app/gwajax/',
               type: 'POST',
               data: {
                 gw_id:record_id,
                 gw_printnum:record_printnum,
                //  start_time:start_time,
                //  end_time:end_time,
                 static_code:'POST'
               },
               success:function (data) {
                 var json =$.parseJSON(data);
                 var page_type={
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
                 var use_type={
                   OUT:'领出',
                   USED:'使用',
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
                     page_type:page_type[el.fields.PageType],
                     use_type:use_type[el.fields.UseType],
                     workdate:el.fields.Data,
                     date_type:date_type[el.fields.WorkTimeType],
                     FinishQty:el.fields.Qty,
                     remark:el.fields.Remark,
                     static_code:static_type[el.fields.StaticCode],
                     createBy:el.fields.createBy,
                     createtime:el.fields.createtime,
                     deleteBy:el.fields.DeleteBy,
                     deleteTime:el.fields.DeleteTime

                   };
                         datajson.push(unit_json);
                 });
                 $('#pagelog_table').bootstrapTable('load',datajson);


               }
             });



           }



          //  console.log(start_time+' '+end_time);
        //  }//过帐按钮事件完结
         if(field==='del_field'){
          //  alert(record_id+' '+ record_printnum);
            $.ajax({
              url: '/Tango_app/pagelogajax/',
              type: 'POST',
              data: {
                record_id:record_id,

                static_code:'DELETED'
              },
              success:function (data) {
                alert(data);
                var json =$.parseJSON(data);
                var page_type={
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
                var use_type={
                  OUT:'领出',
                  USED:'使用',
                };
                var date_type={
                  A:'白班',
                  B:'夜班'
                };

                var datajson=[];
                $.each(json,function(index, el) {

                  var unit_json={
                    record_id:el.pk,
                    page_type:page_type[el.fields.PageType],
                    use_type:use_type[el.fields.UseType],
                    workdate:el.fields.Data,
                    date_type:date_type[el.fields.WorkTimeType],
                    FinishQty:el.fields.Qty,
                    remark:el.fields.Remark,
                    static_code:static_type[el.fields.StaticCode],
                    createBy:el.fields.CreateBy,
                    createtime:el.fields.CreateTime,
                    deleteBy:el.fields.DeleteBy,
                    deleteTime:el.fields.DeleteTime

                  };
                        datajson.push(unit_json);
                });
                $('#pagelog_table').bootstrapTable('load',datajson);


              }
            });

         }//删除按钮事件完结



        },


    }

  );//表格初始化结束





}

  function tableInitDel() {
    $('#pagelog_table').bootstrapTable('destroy');
    $('#pagelog_table').bootstrapTable(
      {
        columns:[{
          field:'page_type',
          title:'版型',
        },
        {
          field:'use_type',
          title:'用途',
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
        // {
        //   field:'worktype',
        //   title:'工作内容',
        // },
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
          title:'数量(张)'
        },
        // {
        //   field:'k_val',
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
          field:'deleteBy',
          title:'删除人',
          visible:false
        },
        {
          field:'deleteTime',
          title:'删除时间',
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

  $('#id_Data').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });


  $.ajax({
    url: '/Tango_app/pagelogajax',
    type: 'GET',
    data: {static_code: 'DRAFT'},
    success:function (data) {
      // alert(data);

      var datajson=dataBuild(data);
      tableInit();
      $('#pagelog_table').bootstrapTable('load',datajson);
    }
  });


  $('#get_allrecord').on('click', function(event) {


    $.ajax({
      url: '/Tango_app/pagelogajax',
      type: 'GET',
      data: {static_code: 'DRAFT'},
      success:function (data) {
        // alert(data);

        var datajson=dataBuild(data);
        tableInit();
        $('#pagelog_table').bootstrapTable('load',datajson);
      }
    });
  });
$('.get_record').on('click', function(event) {


  var class_type=$(this).attr('id');
  var record_type={
    get_post:'POST',
    get_checked:'CHECKED',
    get_del:'DELETED',
  };

  $.ajax({
    url: '/Tango_app/pagelogajax',
    type: 'GET',
    data: {static_code: record_type[class_type]},
    success:function (data) {
      var datajson=dataBuild(data);

      tableInitDel();
      $('#pagelog_table').bootstrapTable('load',datajson);
    }
  });
});
});
