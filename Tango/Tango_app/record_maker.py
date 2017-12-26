from  Tango_app.models import GW_pre_table,PRO_table,DF_table,ZJ_table



def gw_maker(work_types,recordIfo,**kwargs):
    #生成工务记录
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


def prdMaker(work_types,recordIfo,**kwargs):
    if work_types:
        work_types_list=work_types.split(';')
        for item in work_types_list:
            try:
                PRO_table.objects.create(PrintNum=recordIfo['printnum'],PrintName=recordIfo['printname'],WorkTimeType=recordIfo['workdatetype'],WorkData=recordIfo['workdate'],WorkType=item,createBy=recordIfo['creator'],remark=recordIfo['remark'])
            except Exception as e:
                print('制作记录生成失败')
                return False
            finally:
                pass
        return True
    else:
        return False


def dfMaker(work_types,recordIfo,**kwargs):
    if work_types:
        work_types_list=work_types.split(';')
        for item in work_types_list:
            try:
                DF_table.objects.create(PrintNum=recordIfo['printnum'],PrintName=recordIfo['printname'],WorkData=recordIfo['workdate'],WorkTimeType=recordIfo['workdatetype'],WorkType=item,createBy=recordIfo['creator'],remark=recordIfo['remark'])
            except Exception as e:
                print('电分记录创建失败')
                return False
            finally:
                pass
        return True
    else:
        return False


def zjMaker(work_types,recordIfo,**kwargs):
    if work_types:
        work_types_list=work_types.split(';')
        for item in work_types_list:
            try:
                ZJ_table.objects.create(PrintNum=recordIfo['printnum'],PrintName=recordIfo['printname'],WorkData=recordIfo['workdate'],WorkType=item,WorkTimeType=recordIfo['workdatetype'],createBy=recordIfo['creator'],remark=recordIfo['remark'])
            except Exception as e:
                print('质检记录创建失败')
                return False
            finally:
                pass
        return True
    else:
        return False


def set_gwFinalQty(record):
    # 设置工务记录的折合数
    k_dict={
    'SMY':0.5,
    'LZ':0.3,
    'CTP':0.2,
    'CTF':0.2,
    'FTP':0.2,
    'GB':0.6,
    'SBL':0.6,
    'COPYDOT':0.2,
    'KP':0.3
    }
    if record:
        print(k_dict[record.WorkType])
        print(record.FinishQty)
        print(record.K_val)
        record.FinalQty=float(record.FinishQty)*k_dict[record.WorkType]*float(record.K_val)
        record.save()
    else:
        print("折合数设置失败")
        pass



def set_prdFinalQty(record):
# 设置制作记录的折合数
    k_dict={
    'SJ':1,
    'ZZJC':2.5,
    'XT':2,
    'TD':4,
    'ZJ':4,
    'GB':2.5,
    'FP':1.5,
    'PDF_FP':1,
    'PDF_TWJ':1.5,
    'PDF_GB':2,
    'CSMY':1.5,
    'CLZ':1,
    'KGP':3,
    }
    if record:
        record.FinalQty=float(record.FinishQty)*k_dict[record.WorkType]*float(record.K_val)
        record.save()
    else:
        pass


def set_dfFinalQty(record):
    # 设置电分记录的折合数
    k_dict={
    'SCAN_FS':3,
    'SCAN_TS':3,
    }
    scan_list=['SCAN_FS','SCAN_TS']
    if record.WorkType in scan_list:
        record.FinalQty=k_dict[record.WorkType]*float(record.FinishQty)*float(record.Scan_K_val)
    else:
        if record.WorkType=='SCAN_COPYDOT':
            record.FinalQty=float(record.FinishQty)*100
        if record.WorkType=='COR_NEW' or record.WorkType=='COR_GB':
            print()
            record.FinalQty=float(record.FinishQty)*float(record.Week_val)
        if record.WorkType=='COR_ZCTY':
            record.FinalQty=record.FinishQty*30    
    record.save()




def set_zjFinalQty(record):
    k_dict={
    'JGZ':3,
    'CSG':2,
    'CLZ':2.5,
    'CFL':2.5,
    'CB':3,
    'KB':5,
    'CSMY':1
    }

    k_list=['JGZ','CSG','CLZ']
    if record.WorkType in k_list:
        record.FinalQty=float(record.FinishQty)*float(record.K_val)*k_dict[record.WorkType]
        record.save()
    else:
        record.FinalQty=float(record.FinalQty)*k_dict[record.WorkType]
        record.save()
