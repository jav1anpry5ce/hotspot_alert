from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model
from rest_framework.decorators import parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.authtoken.models import Token
from .models import ResetAccount, ActivateAccount
from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.models import Site
from post.models import Author
from django.utils import timezone
import random
import string
from validate_email import validate_email
from functions import validate_password_strength

User = get_user_model()
site = Site.objects.get_current()

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def create(request):
    try:
        password = ''.join(random.choice(string.printable) for i in range(8))
        if request.user.is_admin:
            if validate_email(request.data.get('email')):
                if not User.objects.filter(email=request.data.get('email')).exists():
                    if not User.objects.filter(username=request.data.get('username')).exists():
                        user = User.objects.create_user(email=request.data.get('email'), username=request.data.get('username'), 
                        name=request.data.get('name'), password=password)
                        if request.data.get('is_admin'):
                            user.is_admin = True
                        if request.FILES.get('image'):
                            user.profile_photo = request.FILES.get('image')
                        user.save()
                        Author.objects.create(account=user)
                        activatToken = ActivateAccount.objects.create(user=user)
                        subject, from_email, to = 'Account Activation!', 'donotreply@localhost', user.email
                        html_content = f'''
                        <html>
                            <body>
                                <p>Hello {user.name}, welcome to our system!</p>
                                <p>Please go to the following link to activate your account.</p>
                                <p><a href="{site}account/activation/{activatToken.activate}/{activatToken.token}">{site}account/activation/{activatToken.activate}/{activatToken.token}</a></p>
                            </body>
                        </html>
                        '''
                        text_content = ""
                        msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                        msg.attach_alternative(html_content, "text/html")
                        msg.content_subtype = "html"
                        msg.send()
                        return Response({"Message": "Account successfully created!"})
                    return Response({"Message": "This username is already taken!"}, status=status.HTTP_400_BAD_REQUEST)
                return Response({"Message": "This email is already registered!"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"Message": "Email is not valid"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message': 'You are not authorized to create a new account.'}, status=status.HTTP_400_BAD)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def activate(request):
    try:
        activate = request.data.get('activate')
        token = request.data.get('token')
        if ActivateAccount.objects.get(activate=activate, token=token):
            if request.data.get('password') == request.data.get('con_password'):
                if validate_password_strength(request.data.get('password')):
                    user = ActivateAccount.objects.get(activate=activate).user
                    user.is_active = True
                    user.set_password(request.data.get('password'))
                    user.save()
                    ActivateAccount.objects.get(user=user).delete()
                    subject, from_email, to = 'Account Activated!', 'donotreply@localhost', user.email
                    html_content = f'''
                    <html>
                        <body>
                            <p>Hello {user.name} your account has been sucessfully activated!</p>
                        </body>
                    </html>
                    '''
                    text_content = ""
                    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
                    msg.attach_alternative(html_content, "text/html")
                    msg.content_subtype = "html"
                    msg.send()
                    return Response(status=status.HTTP_202_ACCEPTED)
                return Response({'Message': 'password must contain at least one digit.\npassword must contain at least one special character.\npassword must contain at least one upper case letter'} ,status=status.HTTP_400_BAD_REQUEST)
            return Response({'Message': 'Password and confirm password must be the same!'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    try:
        try:
            user = User.objects.get(username=request.data.get('username'))
            if user.check_password(request.data.get('password')) and user.is_active:
                token = Token.objects.create(user=user)
                user.last_login = timezone.now()
                user.save()
                return Response({
                    "auth_token": token.key, 
                    "username": user.name,
                    "is_admin": user.is_admin,
                    'security_token': '5090de76-fdf0-47ee-8c69-8735be0807b7',
                    }, status=status.HTTP_200_OK)
            return Response({'Message': 'Check username and/or password'}, status=status.HTTP_400_BAD_REQUEST)
        except:
            user = User.objects.get(username=request.data.get('username'))
            if user.check_password(request.data.get('password')):
                token = Token.objects.get(user=user)
                user.last_login = timezone.now()
                user.save()
                return Response({
                    "auth_token": token.key, 
                    "username": user.name, 
                    "is_admin": user.is_admin, 
                    'security_token': '5090de76-fdf0-47ee-8c69-8735be0807b7',
                    })
            return Response({'Message': 'Check username and/or password'}, status=status.HTTP_404_NOT_FOUND)
    except:
        return Response({'Message': 'Check username and/or password'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def logout(request):
    try:
        Token.objects.get(user=request.user).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def resetRequest(request):
    try:
        try:
            user = User.objects.get(username=request.data.get('username'), email=request.data.get('email'))
        except:
            return Response({'Message': 'username and/or email provided does not match any in our records!'}, status=status.HTTP_404_NOT_FOUND)
        if ResetAccount.objects.get(user=user).delete():
            reset = ResetAccount.objects.create(user=user)
            subject, from_email, to = 'Reset Request', 'donotreply@localhost', user.email
            text_content = 'This is an important message.'
            html_content = f'''
            <html>
                <body>
                    <p>We have received your reset request. attached you will find the reset link.</p>
                    <a href="{site}account/password/reset/{reset.token}">{site}account/password/reset/{reset.token}</a>
                </body>
            </html>
            '''
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            reset = ResetAccount.objects.create(user=user)
            subject, from_email, to = 'Reset Request', 'donotreply@localhost', user.email
            text_content = 'This is an important message.'
            html_content = f'''
            <html>
                <body>
                    <p>We have received your reset request. attached you will find the reset link.</p>
                    <a href="{site}account/password/reset/{reset.token}">{site}account/password/reset/{reset.token}</a>
                </body>
            </html>
            '''
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response(status=status.HTTP_204_NO_CONTENT)
    except:
        try:
            reset = ResetAccount.objects.create(user=user)
            subject, from_email, to = 'Reset Request', 'donotreply@localhost', user.email
            text_content = 'This is an important message.'
            html_content = f'''
            <html>
                <body>
                    <p>We have received your reset request. attached you will find the reset link.</p>
                    <a href="{site}account/password/reset/{reset.token}">{site}account/password/reset/{reset.token}</a>
                </body>
            </html>
            '''
            msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({'Message': 'Something went wrong.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resetPassword(request):
    try:
        user = ResetAccount.objects.get(token=request.data.get('reset_token')).user
        if request.data.get('new_password') == request.data.get('con_password'):
            if validate_password_strength(request.data.get('new_password')):
                user.set_password(request.data.get('new_password'))
                user.save()
                ResetAccount.objects.get(token=request.data.get('reset_token')).delete()
                return Response(status=status.HTTP_202_ACCEPTED)
            return Response({'Message': 'password must contain at least one digit.\npassword must contain at least one special character.\npassword must contain at least one upper case letter'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message': 'Confirm password must match password!'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'Message': 'Invalid Token!'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def changePassword(request):
    try:
        user = request.user
        if user.check_password(request.data.get('old_password')):
            if validate_password_strength(request.data.get('new_password')):
                if request.data.get('new_password') == request.data.get('con_password'):
                    if not request.data.get('new_password') == request.data.get('old_password'):
                        user.set_password(request.data.get('new_password'))
                        user.save()
                        return Response({'Message': 'Your password was sucessfully changed!'}, status=status.HTTP_204_NO_CONTENT)
                    return Response({'Message': 'New Password cannot be the same as old password!'}, status=status.HTTP_400_BAD_REQUEST)
                return Response({'Message': 'Password does not match!'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'Message': 'password must contain at least one digit.\npassword must contain at least one special character.\npassword must contain at least one upper case letter'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Message': 'The password you entered does not match the one on file!'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
