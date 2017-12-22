$(document).ready(function() {
  $('#work_type').select2({

    placeholder:'请选择工序',
    maximumSelectionLength:4,
    closeOnSelect:false,
    multiple:true,
  });
  $('#submit_btn').on('click', function(event) {

    event.preventDefault();
    var values=$('#work_type').select2('val').join(";");

    var printnum=$("#printnum").val();
    alert(printnum);
    var printname=$('#printname').val();
    alert(printname);
    var workdate=$('#workdate').val();
    alert(workdate);
    // alert(printnum+' '+printname+' '+ workdate+' ');



    $.ajax({
      url: '/Tango_app/select/',
      type: 'POST',

      data: {
        values: values,
        workdate:workdate,
        printnum:printnum,
        printname:printname,

      },

    })
    .done(function() {
      console.log("success"+values);
    })
    .fail(function() {
      console.log("error"+values);
    })
    .always(function() {
      console.log("complete"+values);
    });

    //  $('form').submit();

    /* Act on the event */
  });
});
