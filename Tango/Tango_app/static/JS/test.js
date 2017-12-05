function getCookie(name) {
  var cookiValue=null;
  if(document.cookie&&document.cookie!==''){
    var cookies=document.cookie.split(';');
    for(var i=0;i<cookies.length;i++){
      var cookie=jQuery.trim(cookies[i]);
      if (cookie.substring(0,name.length+1)===(name+'=')){
        cookieValue=decodeURIComponent(cookie.substring(name.length+1));
        break;
      }
    }
  }
return cookieValue;
}



$(document).ready(function () {
  $('#gw_table tr').css('background','');

  /* 印号搜索按钮点击事件,将印号传递到后台,返回查询结果 */
  // $('.S_button').on('click',  function() {
    // var printnum= $('.S_printnum').val();
    // var worker_num=$('.worker_num').val();
    // $.ajax({
    //   url: '/Tango_app/gw/modify/',
    //   type: 'GET',
    //   data: {s_printnum:printnum,
    //          s_workernum:worker_num,
    //         }
    // })
    // .done(function() {
    //   console.log("success");
    //   alert(printnum);
    // })
    // .fail(function() {
    //   console.log("error");
    // })
    // .always(function() {
    //   console.log("complete");
    // });

    // });


    /* Act on the event */


  /* 系数修改按钮点击事件,将信息提交到后台,并且返回修改后的数据  */
  $('#gw_table tr').on('click',function () {

    $(this).find('.K_btn').click(function(event) {
      /* Act on the event */
      var currentrow= $(this).closest('tr');
      var record_id=currentrow.find('.record_id').html();
      var printnum=currentrow.find('.printnum').html();
      var k_val=$(this).siblings('.k_val').val();
      $.ajax({
        url:'/Tango_app/gw/modify/',
        type:'POST',
        data:{
          'k_val':k_val,
          'record_id':record_id,
          'printnum':printnum,
        },
        success: function (data) {

          $('#gw_table_k').html("<tr> "+
                              '<th rowspan="1" width="50">印号</th>'+
                              '<th>印件名陈</th>'+'<th>开本</th>'+
                              '<th>日期</th>'+'<th>工作内容</th>'+
                              '<th>完成数</th>'+'<th>备注</th>'+
                              '<th>难度系数</th>'+
                              '<th>创建人</th>'+
                              '<th>创建时间</th>'+
                              // '<th>填写系数</th>'+
                              '</tr>'
                            );

          var json =$.parseJSON(data);
          var work_type={
                        SMY:"数码样",
                        LZ:"蓝纸",
                        CTP:"CTP",
                        CTF:"CTF",
                        GB:"改版",
                        SBL:"算倍率",
                        COPYDOT:"COPTDOT",
                        KP:"刻盘",
          };
          var size_type={
            1:'4K',
            2:'8K',
            3:'16K',
            4:'32K',
          };
          $.each(json,function(index, el) {


            $('#gw_table_k').append('<tr>'+'<td class="record_id">'+el.fields.PrintNum+'</td>'+
                                  '<td class="printnum">'+el.fields.PrintName+'</td>'+
                                  '<td>'+size_type[el.fields.sidetype] +'</td>'+
                                  // '<td>'+el.fields.SubCode+'</td>'+

                                  '<td>'+el.fields.WorkData+'</td>'+
                                  '<td>'+work_type[el.fields.WorkType] +'</td>'+
                                  '<td>'+el.fields.FinishQty+'</td>'+
                                  '<td>'+el.fields.remark+'</td>'+
                                  '<td>'+el.fields.K_val+'</td>'+
                                  '<td>'+el.fields.createBy+'</td>'+
                                  '<td>'+el.fields.createtime+'</td>'
                                  //
                                  // '<td>'+
                                  // '<input type="text" class="k_val" value="">'+
                                  // '<button type="button" class="K_btn">确定</button>'+
                                  // '</td>'+
                                  // '</tr>'

                                );
          });
        }
    });
    });
  });
  $('#gw_table_k').on('click','tr',  function(event) {
    alert($(this).text());
  /* Act on the event */
  });

  $('body').on('mouseover', 'tr', function(event) {
    $(this).css('background','#987');


  });
  $('body').on('mouseout', 'tr', function(event) {
    $(this).css('background','');


  });
});
