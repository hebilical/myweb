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
  var datajson=[];
  $.each(json,function(index, el) {
    var unit_json={
      'blockDes':page_type[el.record.blockType],
      'blocktypeCode':el.record.blockType,
      'date':el.record.date,
      'logoutqty':el.record.dateLogOutQty,
      'logusedqty':el.record.dateLogUsedQty,
      'actusedqty':el.record.actUsedQty,
      'leftqty':el.record.leftQty,
      'checkresult':el.record.checkResult,
    };
    console.log(unit_json);
    datajson.push(unit_json);


  });
  return datajson;

}


function tableInit() {
  $('#blockChecktable').bootstrapTable('destroy');
  $('#blockChecktable').bootstrapTable({
    columns:[
      {
        field:'blockDes',
        title:'版型',
      },
      {
        field:'blocktypeCode',
        title:'物品编号'
      },
      {
        field:'date',
        title:'日期'
      },
      {
        field:'logoutqty',
        title:'登记领用总数'
      },
      {
        field:'logusedqty',
        title:'登记使用总数'
      },
      {
        field:'actusedqty',
        title:'实际使用总数',
      },
      {
        field:'leftqty',
        title:'当日剩余数'
      },
      {
        field:'checkresult',
        title:'核对结果'
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
    showColumns:true,

  });


}





  $('#stardate').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });

  $('#enddate').datetimepicker({
    minView:'month',
    format:'yyyy-mm-dd',
    language:'zh-CN',
    autoclose:true,
    todayBtn:true,
    todayHightlight:true

  });
  $('#check_btn').on('click',  function(event) {
    event.preventDefault();
    var stardate=$('#stardate').val();
    var enddate=$('#enddate').val();

    var paramJson={
      'starDate':stardate,
      'endDate':enddate,
    };

    $.ajax({
      url: '/Tango_app/blockcheck/',
      type: 'POST',
      dataType: 'json',
      data: paramJson,
      success:function (data) {

        var datajson=dataBuild(data);
        // console.log(datajson);
        tableInit();
        $('#blockChecktable').bootstrapTable('load',datajson);

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

    /* Act on the event */
  });

});
