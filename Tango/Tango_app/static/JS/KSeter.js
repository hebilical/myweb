$(document).ready(function() {
  function dataBuild(data) {
      var json =$.parseJSON(data);
      var datajson=[];
      $.each( json,function(index, el) {
        var kSeter={
          empcode:el.fields.username,
          name:el.fields.first_name,

        };

        datajson.push(kSeter);

      });
      return datajson;

  }

  function tableInit() {
    $('#K_Seters').bootstrapTable('destroy');
    $('#K_Seters').bootstrapTable({
      columns:[
        {
          field:'empcode',
          title:'工号'
        },
        {
          field:'name',
          title:'姓名'
        },
      ]

    });

  }


  $('#add_btn').on('click', function(event) {
    event.preventDefault();
    var emCode=$('#addcode').val();
    $.ajax({
      url: '/Tango_app/KSeters/',
      type: 'POST',

      data: {emp_code: emCode,
        act_type:'ADD'
      },
      success:function (data) {

        var datajson=dataBuild(data);
        tableInit();
        $('#K_Seters').bootstrapTable('load',datajson);

      }
    });




    /* Act on the event */
  });


  $('#rm_btn').on('click', function(event) {
    event.preventDefault();
    var emCode=$('#rmcode').val();
    $.ajax({
      url: '/Tango_app/KSeters/',
      type: 'POST',
      data: {emp_code: emCode,
        act_type:'RM'
      },
      success:function (data) {

        var datajson=dataBuild(data);
        tableInit();
        $('#K_Seters').bootstrapTable('load',datajson);

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


  $('#ser_btn').on('click', function(event) {
    event.preventDefault();
    $.ajax({
      url: '/Tango_app/KSeters/',
      type: 'POST',
      data: {emp_code: '',
        act_type:''
      },
      success:function (data) {

        var datajson=dataBuild(data);
        tableInit();
        $('#K_Seters').bootstrapTable('load',datajson);

      }
    });
    /* Act on the event */
  });

});
