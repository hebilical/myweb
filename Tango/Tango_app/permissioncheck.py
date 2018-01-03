from django.contrib.auth.models import User,Group



def addK_seter(user):
    group=Group.objects.get(name='K_Seters')
    user.groups.set([group])


def rmK_Seters(user):
    group=Group.objects.get(name='K_Seters')
    user.groups.remove(group)

def isK_Seter(user):
    group=Group.objects.get(name='K_Seters')
    return (group in user.groups.all())
