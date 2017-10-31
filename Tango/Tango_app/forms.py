from django import forms

class Login_form(forms.ModelForm):
    username=forms.CharField(max_length=128,help_text='请输入用户名');
    Password=forms.PasswordInput(help_text='请输入您的密码')



class Register_form(forms.ModelForm):
    username=forms.CharField(max_length=128,help_text='请输入一个用户名');
    Email=forms.EmailInput(null=False);
    Tel=forms.CharField(max_length=15);
    Password=forms.PasswordInput(help_text='请为您的用户设置密码');
    Passwordcheck=forms.PasswordInput(help_text='请再输入一次密码以确认');
