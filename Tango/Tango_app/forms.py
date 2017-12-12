
from django.forms import ModelForm,HiddenInput
from Tango_app.models import GW_pre_table,PRO_table,DF_table

class GW_forms(ModelForm):
    class Meta(object):

        """docstring for Meta."""

        model=GW_pre_table
        fields=['PrintNum',
                'PrintName',
                'sidetype',
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
