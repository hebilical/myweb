
import uuid

from Tango_app.models import Category,Article,Article_Author

class helper(object):
    def article_create(self,request):
        # 取页面文章的标题,标签,内容,作者,创建文章
        pass



    @classmethod
    def category_Create(self,category_name):
    # 创建标签
        Category.objects.create(ID=uuid.uuid4(),name=category_name)


    @classmethod
    def author_ceate(self,Au_name):
        # 创建作者
        Article_Author.objects.create(name=Au_name)

    @classmethod
    def Article_mdf(*arg):
        # 文章修改,包括标签内容(如果作者名称有过修改,则同时修改作者名)
        pass


    def category_mdf(*arg):
        # 标签修
        pass


    def author_mdf(*arg):
        # 修改作者信息
        pass
