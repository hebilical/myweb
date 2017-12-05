$(document).ready(function() {



//标识当前行
  $('body').on('mouseover', 'tr', function(event) {
    $(this).css('background','#987');
  });

  $('body').on('mouseout', 'tr', function(event) {
    $(this).css('background','');
  });

//







  $('#get_post').on('click', function(event) {
    $.ajax({
      url: '/Tango_app/gwajax',
      type: 'GET',
      data: {staict_code: 'POST'},
      success:function (data) {

        $('#gw_table').html("<tr> "+
                            '<th rowspan="1" width="50">印号</th>'+
                            '<th>印件名陈</th>'+'<th>开本</th>'+
                            '<th>日期</th>'+'<th>工作内容</th>'+
                            '<th>完成数</th>'+'<th>备注</th>'+
                            '<th>难度系数</th>'+
                            '<th>创建人</th>'+
                            '<th>创建时间</th>'+
                             '<th>当前状态</th>'+
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
        var staict_type={
              DRAFT:'初稿',
              POST:'已过帐',
              CHECKED:'已审核',
              DELETED:'已删除',
        };

        $.each(json,function(index, el) {
          $('#gw_table').append('<tr>'+'<td class="record_id">'+el.fields.PrintNum+'</td>'+
                                '<td class="printnum">'+el.fields.PrintName+'</td>'+
                                '<td>'+size_type[el.fields.sidetype] +'</td>'+
                                // '<td>'+el.fields.SubCode+'</td>'+

                                '<td>'+el.fields.WorkData+'</td>'+
                                '<td>'+work_type[el.fields.WorkType] +'</td>'+
                                '<td>'+el.fields.FinishQty+'</td>'+
                                '<td>'+el.fields.remark+'</td>'+
                                '<td>'+el.fields.K_val+'</td>'+
                                '<td>'+el.fields.createBy+'</td>'+
                                '<td>'+el.fields.createtime+'</td>'+
                                '<td>'+staict_type[el.fields.staticcode]+
                                '</td>'
                              );


        });

      }
    });



  });
});
