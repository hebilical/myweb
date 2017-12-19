from django.db import models
from django.contrib.auth.models import User
import datetime
from django.utils.timezone import now

# Create your models here.
class Category(models.Model):
    ID=models.CharField(primary_key=True,max_length=128);
    name=models.CharField(max_length=128);
    createtime=models.DateTimeField(auto_now=True);
    createBy=models.CharField(max_length=128,null=True);
    updatetime=models.DateTimeField(null=True);
    updateBy=models.CharField(max_length=128,null=True);
    remark=models.CharField(max_length=500,null=True);
    def __str__(self):
        return self.name
    class Meta(object):
        permissions=(
        ('category_mdf','Can modify the name and remark about the category'),


        )
class Longined_user(models.Model):
    user=models.ForeignKey(User)
    UserSession=models.CharField(max_length=50,null=False)
    def __str__(self):
        return (user.first_name+ ' ' +user_session)

class Article_Author(models.Model):
    name=models.CharField(max_length=128,null=False);
    Email=models.EmailField(null=True);
    tel=models.CharField(max_length=15,null=True);
    def  __str__(self):
        return self.name
    class Meta(object):
        permissions=(
        ('name_mdf','Can modify the Author_name' ),
        ('Email_mdf','Can modify the Author_Email '),
        ('tel_mdf','Can modify author_tel'),

        )

class Article(models.Model):
    category=models.ManyToManyField(Category);
    title=models.CharField(max_length=200,null=False);
    context=models.CharField(max_length=5000,null=True);
    author=models.ForeignKey(Article_Author);
    createtime=models.DateTimeField(auto_now=True);
    updatetime=models.DateTimeField(auto_now=True);
    views=models.IntegerField(default=0);
    likes=models.IntegerField(default=0);
    def __str__(self):
        return self.title
    class Meta(object):
        permissions=(
        ('category_mdf','can modify Article\'category'),
        ('title_mdf','Can modify Article\' title'),
        ('context_mdf','Can modify Article\' context'),
        )



class GW_pre_table(models.Model):  #公务表
    WORKTYPE_CHOICES=(
        ('SMY',' 数码样'),
        ('LZ','蓝纸'),
        ('CTP','CTP'),
        ('CTF','CTF'),
        ('GB','改版'),
        ('SBL','算倍率'),
        ('COPYDOT','COPYDOT'),
        ('KP','刻盘'),
    )
    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )

    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )


    SIDE_TYPE_CHOICES=(
        (1,'4k'),
        (2,'8K'),
        (3,'16K'),
        (4,'32K'),
    )
    PrintNum=models.CharField(max_length=20,null=False)
    PrintName=models.CharField(max_length=200,null=False)
    sidetype=models.IntegerField(default=1,choices=SIDE_TYPE_CHOICES)
    SubCode=models.CharField(max_length=10,default='A')
    WorkType=models.CharField(max_length=50,choices=WORKTYPE_CHOICES,)
    WorkData=models.DateField(null=False,default=datetime.date.today())
    WorkTimeType=models.CharField(max_length=10,default='A',choices=WORKTIMETYPE_CHOICES)
    FinishQty=models.IntegerField(default=0)
    K_val=models.FloatField(default=0.0)
    createtime=models.DateTimeField(auto_now_add=True)
    createBy=models.CharField(max_length=20,null=True)
    updatetime=models.DateTimeField(auto_now=False,null=True)
    updateBy=models.CharField(max_length=20,null=True)
    posttime=models.DateTimeField(auto_now=False,null=True)
    postBy=models.CharField(max_length=20,null=True)
    CheckTime=models.DateTimeField(auto_now=False,null=True)
    CheckBy=models.CharField(max_length=20,null=True)
    staticcode=models.CharField(max_length=20,default='DRAFT',choices=STATIC_CHOICES)
    menber=models.CharField(max_length=200)
    remark=models.CharField(max_length=300,null=True)
    def __str__(self):
        return (self.PrintNum+'   '+self.PrintName)
    class Meta(object):
        permissions=(
            ('gw_draft_post','工务初稿到过帐'),
            ('gw_post_checked','工务已过帐记录审批'),
            ('gw_post_draft','工务已过帐发还到初稿'),
            ('gw_checked_draft','工务已批核发还到初稿'),
            ('gw_delete','工务初稿删除'),
            ('gw_post_delete','工务已过帐删除'),
            ('gw_checked_delete','工务已批核删除'),
            ('gw_delete_draft','工务已经删除到初稿'),
        )




class PRO_table (models.Model): #制作表
    PRO_WORKTYPE_CHOICES=(
        ('SJ','收集'),
        ('ZZJC','制作检查'),
        ('XT','修图'),
        ('TD','褪底'),
        ('ZZ','制作'),
        ('GB','改版'),
        ('FP','发排'),
        ('PDF_FP','PDF发排'),
        ('PDF_TWJ','PDF替文件'),
        ('PDF_GB','PDF改版'),
        ('CSMY','出数码样'),
        ('CLZ','出蓝纸'),
        ('KGP','克光盘'),
    )

    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )
    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )
    PrintNum=models.CharField(max_length=20,null=False)
    PrintName=models.CharField(max_length=200,null=False)
    SubCode=models.CharField(max_length=10,default='A')
    WorkType=models.CharField(max_length=20,null=False,choices=PRO_WORKTYPE_CHOICES)
    WorkData=models.DateField(null=True)
    WorkTimeType=models.CharField(max_length=10,default='A',choices=WORKTIMETYPE_CHOICES)
    FinishQty=models.IntegerField(default=0)
    K_val=models.FloatField(default=0.0)#难度系数
    LeaderCode=models.CharField(max_length=20)
    LeaderName=models.CharField(max_length=50)
    WorkStartTime=models.DateTimeField(auto_now=False,null=True)
    WorkEndTime=models.DateTimeField(auto_now=False,null=True)
    createtime=models.DateTimeField(auto_now_add=True)
    createBy=models.CharField(max_length=20,null=True)
    updatetime=models.DateTimeField(auto_now=False,null=True)
    updateBy=models.CharField(max_length=20,null=True)
    posttime=models.DateTimeField(auto_now=False,null=True)
    postBy=models.CharField(max_length=20,null=True)
    CheckTime=models.DateTimeField(auto_now=False,null=True)
    CheckBy=models.CharField(max_length=20,null=True)
    staticcode=models.CharField(max_length=20,default='DRAFT',choices=STATIC_CHOICES)
    remark=models.CharField(max_length=200)
    def __str__(self):
        return (self.PrintNum+'   '+self.PrintName)
    class Meta(object):
        permissions=(
            ('prd_draft_post','制作初稿到过帐'),
            ('prd_post_checked','制作已过帐记录审批'),
            ('prd_post_draft','制作已过帐发还到初稿'),
            ('prd_checked_draft','制作已批核发还到初稿'),
            ('prd_delete','制作初稿删除'),
            ('prd_post_delete','制作已过帐删除'),
            ('prd_checked_delete','制作已批核删除'),
            ('prd_delete_draft','制作已经删除到初稿'),
        )


#
class DF_table(models.Model): #电分表
    DF_WORKYTPE_CHOICES=(
        ('SCAN_FS','扫描反射稿'),
        ('SCAN_TS','扫描透射稿'),
        ('SCAN_COPYDOT','COPYDOT'),
        ('COR_NEW','调色新作'),
        ('COR_GB','调色改版'),
        ('COR_ZCTY','追传统样'),

    )

    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )

    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )



    PrintNum=models.CharField(max_length=20,null=False)
    PrintName=models.CharField(max_length=200,null=False)
    SubCode=models.CharField(max_length=10,default='A')
    WorkType=models.CharField(max_length=20,choices=DF_WORKYTPE_CHOICES)
    WorkData=models.DateField(null=True)
    WorkTimeType=models.CharField(max_length=10,default='A',choices=WORKTIMETYPE_CHOICES)
    FinishQty=models.IntegerField(default=0)
    Scan_K_val=models.FloatField(default=0.0)#扫描难度系数
    Week_val=models.FloatField(default=0.0)#期刊难度系数
    LeaderCode=models.CharField(max_length=20)
    LeaderName=models.CharField(max_length=50)
    WorkStartTime=models.DateTimeField(auto_now=False,null=True)
    WorkEndTime=models.DateTimeField(auto_now=False,null=True)
    createtime=models.DateTimeField(auto_now_add=True)
    createBy=models.CharField(max_length=20,null=True)
    updatetime=models.DateTimeField(auto_now=False,null=True)
    updateBy=models.CharField(max_length=20,null=True)
    posttime=models.DateTimeField(auto_now=False,null=True)
    postBy=models.CharField(max_length=20,null=True)
    CheckTime=models.DateTimeField(auto_now=False,null=True)
    CheckBy=models.CharField(max_length=20,null=True)
    staticcode=models.CharField(max_length=20,default='DRAFT',choices=STATIC_CHOICES)
    remark=models.CharField(max_length=200)
    def __str__(self):
        return (self.PrintNum+'   '+self.PrintName)
    class Meta(object):
        permissions=(
            ('df_draft_post','电分初稿到过帐'),
            ('df_post_checked','电分已过帐记录审批'),
            ('df_post_draft','电分已过帐发还到初稿'),
            ('df_checked_draft','电分已批核发还到初稿'),
            ('df_delete','电分初稿删除'),
            ('df_post_delete','电分已过帐删除'),
            ('df_checked_delete','电分已批核删除'),
            ('df_delete_draft','电分已经删除到初稿'),
        )

#
class OUT_table(models.Model):#输出表
    MACHINE_CHIOCES=(
        ('1','1号机(Lotem800)'),
        ('2','2号机(Magnus800)'),
        ('3','3号机(Magnus800)'),
    )
    OUT_WORKTYPE_CHOICES=(
        ('CTP_PB','CTP拼版'),
        ('CTP_CLZ','CTP出蓝纸'),
        ('PS_PB','PS拼版'),
        ('PS_CLZ','PS出蓝纸'),
        ('CTP_CB','CTP出版'),
        ('CTP_BB','CTP补版'),
        ('CTP_CSB','CTP测试版'),
    )
    PS_TYPE=(
        ('IM500668','CTP华光(1030X800)'),
        ('IM500536','CTP华光(1030X790)'),
        ('IM501521','CTP版富士(1030X800)'),
        ('IM501520','CTP版富士(1030X790)'),
        ('IM501524','CTP版富士(968X584)'),
        ('IM503335','CTP版柯达免冲洗(1030X790)'),
        ('IM500035','CTP版柯达(968X604)'),
        ('IM500746','PS版河南光华(1030X800)'),
        ('IM500041','PS版河南光华(1030X790)'),
        ('IM500990','PS版河南光华(968X604)'),
        ('IM500989','PS版河南光华(968X584)'),
    )
    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )

    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )
    Machine=models.CharField(max_length=20,choices=MACHINE_CHIOCES)
    PrintNum=models.CharField(max_length=20,null=False)
    PrintName=models.CharField(max_length=200,null=False)
    SubCode=models.CharField(max_length=10,default='A')
    WorkType=models.CharField(max_length=20,choices=OUT_WORKTYPE_CHOICES)
    WorkData=models.DateField(null=True)
    WorkTimeType=models.CharField(max_length=10,choices=WORKTIMETYPE_CHOICES)
    PS_Type=models.CharField(max_length=20,choices=PS_TYPE)
    FinishQty=models.IntegerField(default=0)
    LeaderCode=models.CharField(max_length=20)
    LeaderName=models.CharField(max_length=50)
    WorkStartTime=models.DateTimeField(auto_now=False,null=True)
    WorkEndTime=models.DateTimeField(auto_now=False,null=True)
    createtime=models.DateTimeField(auto_now=True)
    createBy=models.CharField(max_length=20,null=True)
    updatetime=models.DateTimeField(auto_now=False,null=True)
    updateBy=models.CharField(max_length=20,null=True)
    posttime=models.DateTimeField(auto_now=False,null=True)
    postBy=models.CharField(max_length=20,null=True)
    CheckTime=models.DateTimeField(auto_now=False,null=True)
    CheckBy=models.CharField(max_length=20,null=True)
    staticcode=models.CharField(max_length=20,default='DRAFT',choices=STATIC_CHOICES)
    remark=models.CharField(max_length=200)
    def __str__(self):
        return (self.PrintNum+'   '+self.PrintName)
    class Meta(object):
        permissions=(
            ('out_draft_post','输出初稿到过帐'),
            ('out_post_checked','输出表已过帐记录审批'),
            ('out_post_draft','输出表已过帐发还到初稿'),
            ('out_checked_draft','输出表已批核发还到初稿'),
            ('out_delete','输出表初稿删除'),
            ('out_post_delete','输出表已过帐删除'),
            ('out_checked_delete','输出表已批核删除'),
            ('out_delete_draft','输出表已经删除到初稿'),
        )
#
class ZJ_table(models.Model):
    ZJ_WORKTYPE_CHOICES=(
        ('JGZ','激光纸'),
        ('CSG','查色稿'),
        ('CLZ','查蓝纸'),
        ('CFL','查菲林'),
        ('CB','查版'),
        ('KB','烤版'),
        ('CSMY','裁数码样'),

    )

    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )

    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )
    PrintNum=models.CharField(max_length=20,null=False)
    PrintName=models.CharField(max_length=200,null=False)
    SubCode=models.CharField(max_length=10,default='A')
    WorkType=models.CharField(max_length=20,choices=ZJ_WORKTYPE_CHOICES)
    WorkData=models.DateField(null=True)
    WorkTimeType=models.CharField(max_length=10,choices=WORKTIMETYPE_CHOICES)
    FinishQty=models.IntegerField(default=0)
    K_val=models.FloatField(default=0.0)
    LeaderCode=models.CharField(max_length=20)
    LeaderName=models.CharField(max_length=50)
    WorkStartTime=models.DateTimeField(auto_now=False,null=True)
    WorkEndTime=models.DateTimeField(auto_now=False,null=True)
    createtime=models.DateTimeField(auto_now=True)
    createBy=models.CharField(max_length=20,null=True)
    updatetime=models.DateTimeField(auto_now=False,null=True)
    updateBy=models.CharField(max_length=20,null=True)
    posttime=models.DateTimeField(auto_now=False,null=True)
    postBy=models.CharField(max_length=20,null=True)
    CheckTime=models.DateTimeField(auto_now=False,null=True)
    CheckBy=models.CharField(max_length=20,null=True)
    staticcode=models.CharField(max_length=20,default='DRAFT',choices=STATIC_CHOICES)
    remark=models.CharField(max_length=200)
    def __str__(self):
        return (self.PrintNum+'   '+self.PrintName)
    class Meta(object):
        permissions=(
            ('zj_draft_post','制作初稿到过帐'),
            ('zj_post_checked','制作已过帐记录审批'),
            ('zj_post_draft','制作已过帐发还到初稿'),
            ('zj_checked_draft','制作已批核发还到初稿'),
            ('zj_delete','制作初稿删除'),
            ('zj_post_delete','制作已过帐删除'),
            ('zj_checked_delete','制作已批核删除'),
            ('zj_delete_draft','制作已经删除到初稿'),
        )
class Page_loged(models.Model):
    PS_TYPE_CHOICES=(
        ('IM500668','CTP华光(1030X800)'),
        ('IM500536','CTP华光(1030X790)'),
        ('IM501521','CTP版富士(1030X800)'),
        ('IM501520','CTP版富士(1030X790)'),
        ('IM501524','CTP版富士(968X584)'),
        ('IM503335','CTP版柯达免冲洗(1030X790)'),
        ('IM500035','CTP版柯达(968X604)'),
        ('IM500746','PS版河南光华(1030X800)'),
        ('IM500041','PS版河南光华(1030X790)'),
        ('IM500990','PS版河南光华(968X604)'),
        ('IM500989','PS版河南光华(968X584)'),
    )
    USE_TYPE_CHOICES=(
    ('OUT','领出'),
    ('USED','使用')
    )
    WORKTIMETYPE_CHOICES=(
        ('A','白班'),
        ('B','夜班'),
    )
    STATIC_CHOICES=(
        ('DRAFT','初稿'),
        ('POST','已过帐'),
        ('CHECKED','已审核'),
        ('DELETED','已删除'),
    )
    PageType=models.CharField(max_length=20,choices=PS_TYPE_CHOICES)
    UseType=models.CharField(max_length=20,choices=USE_TYPE_CHOICES)
    Data=models.DateField(null=True)
    WorkTimeType=models.CharField(max_length=20,default='A',choices=WORKTIMETYPE_CHOICES)
    Handler=models.CharField(max_length=20)
    Qty=models.IntegerField(default=0)
    CreateTime=models.DateTimeField(auto_now_add=True)
    CreateBy=models.CharField(max_length=20)
    StaticCode=models.CharField(max_length=20,choices=STATIC_CHOICES,default='CHECKED')
    Remark=models.CharField(max_length=200)
    DeleteBy=models.CharField(max_length=20,null=True )
    DeleteTime=models.DateTimeField(null=True )
    def __str__(self):
        return (self.CreateBy+'   '+str(self.Data)+' '+str(self.Qty))
