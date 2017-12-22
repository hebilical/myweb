$(document).ready(function() {
  var table_type={
    gw_table:'get_gw',
    prd_table:'get_prd',
    df_table:'get_df',
    zj_table:'get_zj',
    out_table:'get_out',
  };
  var get_type=$('input:radio:checked').val();
  var start_time=$('input[name="start_time"]');
  var end_time=$('input[name="end_time"]');
  $('button[name="serche"]').on('click', function(event) {
    /* Act on the event */
    $.ajax({
      url: '/path/to/file',
      type: 'POST',

      data: {table_type:table_type[get_type],
              start_time:start_time,
              end_time:end_time,
      },
      successe:function (data) {

      }
    });


  });


});
