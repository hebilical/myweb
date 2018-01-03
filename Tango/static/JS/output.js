$(document).ready(function() {

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

function tableInit() {
  $('#out_table').bootstrapTable('destroy');
  $('#out_table').bootstrapTable(
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
        title:'开始于',
        class:'start_time',
        editable:{
          type:'datetime',
          title:'开始时间',
          datetimepicker:{
            language:'zh-CN',
            todayBtn:true,
            todayHightlight:true,

          },


        }
      },
      {
        field:'work_end_time',
        title:'结束于',
        class:'end_time',
        editable:{
          type:'datetime',
          title:'结束时间',
          datetimepicker:{
            language:'zh-CN',
            todayBtn:true,
            todayHightlight:true,

          },


        }
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
        onClickCell:function (field,value,row,$element) {
          var record_id=$element.closest('tr').find('[class="record_pk"]').text();
          var record_printnum=$element.closest('tr').find('[class="printnum"]').text();
          if (field==='post_field'){

           var start_time=  $element.closest('tr').find('[class="start_time"]').text();
           var end_time=  $element.closest('tr').find('[class="end_time"]').text();

           if (start_time==='Empty' ||end_time==='Empty'){
             alert('请检查起止时间!');
           }

           else{

             $.ajax({
               url: '/Tango_app/outputAjax/',
               type: 'POST',
               data: {
                 prd_id:record_id,
                 prd_printnum:record_printnum,
                 start_time:start_time,
                 end_time:end_time,
                 static_code:'POST'
               },
               success:function (data) {
                var datajson=dataBuild(data);
                 $('#out_table').bootstrapTable('load',datajson);


               }
             });



           }



           console.log(start_time+' '+end_time);
         }//过帐按钮事件完结
         if(field==='del_field'){

            $.ajax({
              url: '/Tango_app/outputAjax/',
              type: 'POST',
              data: {
                prd_id:record_id,
                prd_printnum:record_printnum,
                static_code:'DELETED'
              },
              success:function (data) {
                var datajson=dataBuild(data);
                $('#out_table').bootstrapTable('load',datajson);


              }
            });

         }//删除按钮事件完结



        },


    }

  );//表格初始化结束

}


function tableInit_Notdraft() {
  $('#out_table').bootstrapTable('destroy');
  $('#out_table').bootstrapTable(
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

  $('#id_WorkData').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });


  $('#get_draft').on('click', function(event) {

    /* 点击查看初稿则刷新当前页 */
    $.ajax({
      url: '/Tango_app/outputAjax',
      type: 'GET',
      data: {staict_code: 'DRAFT'},
      success:function (data) {
        var datajson=dataBuild(data);
        tableInit();
        $('#out_table').bootstrapTable('load',datajson);
      }
    });


    // location.reload();
  });


  // 处理获取其他状态的按钮点击事件
$('.get_record').on('click', function(event) {

  /* Act on the event */
  var class_type=$(this).attr('id');
  var record_type={
    get_post:'POST',
    get_checked:'CHECKED',
    get_del:'DELETED',
  };

  $.ajax({
    url: '/Tango_app/outputAjax',
    type: 'GET',
    data: {staict_code: record_type[class_type]},
    success:function (data) {
      var datajson=dataBuild(data);
      tableInit_Notdraft();

      $('#out_table').bootstrapTable('load',datajson);
    }
  });
});
});
