$(document).ready(function() {

  function dataBuild(data) {
    var json =$.parseJSON(data);
    var jsondata=[];
    $.each(json,function(index, el) {
      if (el.record.name!==null && el.record.finalqty!==null) {
        var unit_json={
          name:el.record.name,
          finalqty:el.record.finalqty,
        };

        jsondata.push(unit_json);
      } else {

      }




    });

    return jsondata;

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

    $.ajax({
      url: '/Tango_app/report/',
      type: 'POST',
      data: {
        start_time:start_time,
        end_time:end_time,
        report_type:report_type,

      },
      success:function (data) {

        // var json =$.parseJSON(data);
        // alert(json);
        var datajson=dataBuild(data);
        // alert(datajson);
        $('#resultTabl').bootstrapTable('destroy');
        $('#resultTabl').bootstrapTable({
            columns:[
              {field:'name', title:'姓名'},
              {field:'finalqty',title:'完成数'}

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
            paginationHAlign:'left',
            search:true,



          }
        );
        $('#resultTabl').bootstrapTable('load',datajson);


      }
    });


  });

});
