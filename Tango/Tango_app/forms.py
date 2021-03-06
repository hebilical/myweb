
from django.forms import ModelForm,HiddenInput
from Tango_app.models import GW_pre_table,PRO_table,DF_table,ZJ_table,OUT_table,Page_loged

class GW_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=GW_pre_table
        fields=['PrintNum',
                'PrintName',
                'sidetype',
                'WorkType',
                'WorkData',
                'WorkTimeType',
                'FinishQty',
                'K_val',
                'createBy',
                'postBy',
                'CheckBy',
                'remark']
        labels={'PrintNum':'印号',
                'PrintName':'印件名',
                'sidetype':'开本',
                'WorkType':'工作内容',
                'WorkData':'工作日期',
                'WorkTimeType':'班次',
                'FinishQty':'完成数量',
                'K_val':'难度系数',
                'remark':'备注'
                }
        widgets={
                'createBy': HiddenInput(),
                'postBy':HiddenInput(),
                'CheckBy':HiddenInput(),
                'K_val':HiddenInput(),
        }
    def __init__(self,*args,**kwargs):
        super(GW_forms,self).__init__(*args,**kwargs)
        self.fields['createBy'].required=False
        self.fields['postBy'].required=False
        self.fields['CheckBy'].required=False
        self.fields['remark'].required=False


class PRO_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=PRO_table
        fields=['PrintNum',
                'PrintName',
                'WorkTimeType',
                'WorkType',

                'WorkData',
                'FinishQty',
                'K_val',
                'createBy',
                'postBy',
                'CheckBy',
                'remark']
        labels={'PrintNum':'印号',
                'PrintName':'印件名',
                'sidetype':'开本',
                'WorkType':'工作内容',
                'WorkData':'工作日期',
                'WorkTimeType':'班次',
                'FinishQty':'完成数量',
                'K_val':'难度系数',
                'remark':'备注'
                }
        widgets={
                'createBy': HiddenInput(),
                'postBy':HiddenInput(),
                'CheckBy':HiddenInput(),
                'K_val':HiddenInput(),
        }
    def __init__(self,*args,**kwargs):
        super(PRO_forms,self).__init__(*args,**kwargs)
        self.fields['createBy'].required=False
        self.fields['postBy'].required=False
        self.fields['CheckBy'].required=False
        self.fields['remark'].required=False

class DF_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=DF_table
        fields=['PrintNum',
                'PrintName',

                'WorkType',
                'WorkData',
                'WorkTimeType',
                'FinishQty',
                'Scan_K_val',
                'Week_val',
                'createBy',
                'postBy',
                'CheckBy',
                'remark']
        labels={'PrintNum':'印号',
                'PrintName':'印件名',

                'WorkType':'工作内容',
                'WorkData':'工作日期',
                'WorkTimeType':'班次',
                'FinishQty':'完成数量',
                'Scan_K_val':'扫描系数',
                'Week_val':'期刊系数',
                'remark':'备注'
                }
        widgets={
                'createBy': HiddenInput(),
                'postBy':HiddenInput(),
                'CheckBy':HiddenInput(),
                'Scan_K_val':HiddenInput(),
                'Week_val':HiddenInput(),
        }
    def __init__(self,*args,**kwargs):
        super(DF_forms,self).__init__(*args,**kwargs)
        self.fields['createBy'].required=False
        self.fields['postBy'].required=False
        self.fields['CheckBy'].required=False
        self.fields['remark'].required=False



class ZJ_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=ZJ_table
        fields=['PrintNum',
                'PrintName',
                'WorkTimeType',
                'WorkType',
                'WorkData',
                'FinishQty',
                'K_val',
                'createBy',
                'postBy',
                'CheckBy',
                'remark']
        labels={'PrintNum':'印号',
                'PrintName':'印件名',

                'WorkType':'工作内容',
                'WorkData':'工作日期',
                'WorkTimeType':'班次',
                'FinishQty':'完成数量',
                'K_val':'难度系数',
                'remark':'备注'
                }
        widgets={
                'createBy': HiddenInput(),
                'postBy':HiddenInput(),
                'CheckBy':HiddenInput(),
                'K_val':HiddenInput(),
        }
    def __init__(self,*args,**kwargs):
        super(ZJ_forms,self).__init__(*args,**kwargs)
        self.fields['createBy'].required=False
        self.fields['postBy'].required=False
        self.fields['CheckBy'].required=False
        self.fields['remark'].required=False




class OUT_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=OUT_table
        fields=['PrintNum',
                'PrintName',
                'WorkTimeType',
                'WorkType',
                'PS_Type',
                'WorkData',
                'Machine',
                'FinishQty',

                # 'K_val',
                'createBy',
                'postBy',
                'CheckBy',
                'remark']
        labels={'PrintNum':'印号',
                'PrintName':'印件名',
                'WorkTimeType':'班次',
                'Machine':'机器',
                'WorkType':'工作内容',
                'WorkData':'工作日期',
                'PS_Type':'版型',
                'FinishQty':'完成数量',
                # 'K_val':'难度系数',
                'remark':'备注'
                }
        widgets={
                'createBy': HiddenInput(),
                'postBy':HiddenInput(),
                'CheckBy':HiddenInput(),
                # 'K_val':HiddenInput(),
        }
    def __init__(self,*args,**kwargs):
        super(OUT_forms,self).__init__(*args,**kwargs)
        self.fields['createBy'].required=False
        self.fields['postBy'].required=False
        self.fields['CheckBy'].required=False
        self.fields['remark'].required=False
        self.fields['PS_Type'].required=False
class PageLogForms(ModelForm):
    class Meta(object):
        model=Page_loged
        fields=[
        'PageType',
        'UseType',
        'Data',
        'Qty',
        'WorkTimeType',
        'Remark',
        ]

        labels={'PageType':'版型',
        'UseType':'用途',
        'Data':'日期',
        'Qty':'数量(张)',
        'WorkTimeType':'班次',
        'Remark':'备注',}
    def __init__(self,*args,**kwargs):
        super(PageLogForms,self).__init__(*args,**kwargs)
        self.fields['Remark'].required=False
