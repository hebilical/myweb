from  Tango_app.models import GW_pre_table



def gw_maker(work_types,recordIfo,**kwargs):
    if work_types:
        work_types_list=work_types.split(';')
        for item in work_types_list:
            try:
                GW_pre_table.objects.create(PrintNum=recordIfo['gw_printnum'],PrintName=recordIfo['gw_printname'],sidetype=recordIfo['pagesize'],WorkData=recordIfo['gw_workdate'],WorkType=item,createBy=recordIfo['creator'],remark=recordIfo['gw_remark'])
            except Exception as e:
                print('工务记录生成失败')
                return False
            finally:
                pass

            # print(work_types_list);
        return True
    else:
        return False
