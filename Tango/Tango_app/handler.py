from Tango_app.models import Category,Page
import uuid


class CP_Handler(object):
    @classmethod
    def save(self,C_name='visitor',P_title='about Tango',P_url='',P_views=0):
        c=Category(name=C_name,ID=uuid.NAMESPACE_DNS).save();
        Page(Category=c,title=P_title,url=P_url,views=P_views).save()
