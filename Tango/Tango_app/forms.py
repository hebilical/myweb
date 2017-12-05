
from django.forms import ModelForm,HiddenInput
from Tango_app.models import GW_pre_table

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
