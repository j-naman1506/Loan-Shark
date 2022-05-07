from email import message
import os
import sys
from requests.exceptions import HTTPError
from django.conf import settings
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from core.renderers import Response
from datetime import datetime
from social_django.utils import psa

from rest_framework import status, authentication, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate

from core.models import Profile
from core.serializers import ProfileSerializer, ChangePasswordSerializer, UserSerializer, SocialSerializer
# Create your views here.

def response_format(data, status, message):
    """
    api response formatting function
    :param data:
    :param status:
    :param message:
    :return:
    """
    result = dict()
    result['status'] = status
    result['message'] = message
    if status == 'success':
        result['data'] = data
    else:
        result['errors'] = data
    return result

# TODO: verify oauth login
@csrf_exempt
@api_view(http_method_names=['POST'])
@permission_classes([permissions.AllowAny,])
@psa
def oauth_login(request):
    """
    Login Function
    :param request:
    :return:
    """
    data = {}
    serializer = SocialSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # set up non-field errors key
        # http://www.django-rest-framework.org/api-guide/exceptions/#exception-handling-in-rest-framework-views
        try:
            nfe = settings.NON_FIELD_ERRORS_KEY
        except AttributeError:
            nfe = 'non_field_errors'

        try:
            user = request.backend.do_auth(serializer.validated_data['access_token'])
        except HTTPError as e:
            return Response(
                data=data,
                message="Invalid access code",
                data_status="failure",
                status=status.HTTP_400_BAD_REQUEST,
            )

        if user:
            if user.is_active:
                token, _ = Token.objects.get_or_create(user=user)
                profile, created = Profile.objects.get_or_create(user=user)
                profile_data = ProfileSerializer(profile).data
                data_status_ = "success"
                status_ = status.HTTP_200_OK
                data = {
                    'token': token.key,
                    'profile': profile_data
                    }
            else:
                message="User not active"
                status_=status.HTTP_400_BAD_REQUEST,
        else:
            message = "Some error with data"
            status_ = status.HTTP_500_INTERNAL_SERVER_ERROR

    return Response(data=data, status=status_, data_status=data_status_, message=message)


@csrf_exempt
@api_view(["POST"])
@permission_classes((permissions.AllowAny,))
def login(request):
    """
    Login Function
    :param request:
    :return:
    """

    email = request.data.get("email")
    password = request.data.get("password")
    data = {}
    status_ = status.HTTP_400_BAD_REQUEST
    message = ""
    _data_status = "failure"
    if email is None or password is None:
        message = 'Please provide both email and password''Please provide both email and password'
    else:
        user = authenticate(username=email, password=password)
        if not user:
            status_ = status.HTTP_404_NOT_FOUND
            message = 'Invalid Credentials'
        else:
            token, _ = Token.objects.get_or_create(user=user)
            profile, created = Profile.objects.get_or_create(user=user)
            status_ = status.HTTP_200_OK
            _data_status = "success"
            message = "User logged in"
            data = {
                'token': token.key,
                'profile': ProfileSerializer(profile).data
                }
    # data = response_format(data, status="success", message='Logged in')
    return Response(data=data, status=status_, data_status=_data_status, message=message)

@csrf_exempt
@api_view(["GET"])
@permission_classes((permissions.AllowAny,))
def get_logged_user(request):
    """
    Get logged in user details
    """

    data = {}
    status_ = "success"
    try:
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            profile = ProfileSerializer(profile)
            token, _ = Token.objects.get_or_create(user=request.user)
            data = {
                'token': token,
                'profile': profile.data
                }
            message = "Profile successful"
    except Profile.DoesNotExist:
        message = "Profile doesn't exist"
    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print(exc_type, fname, exc_tb.tb_lineno)
        print(str(e))
        status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
        data_status_ = "failed"
        message = "Server error 500 !"
    return Response(data = data, status=status_, data_status=data_status_, message=message)


class Logout(APIView):
    """
    Logout
    """
    authentication_classes = (authentication.TokenAuthentication,)  # authentication.TokenAuthentication,
    permission_classes = (permissions.IsAuthenticated,)  # permissions.IsAuthenticated,

    def get(self, request):
        data = {}
        message = ''
        data_status_ = 'success'
        status_ = status.HTTP_200_OK
        try:
            token, _ = Token.objects.get_or_create(user=request.user)
            res = token.delete()
            message = "Logout Successfully"
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
            data_status_ = "failed"
            message = "Server error 500 !"
        # data = response_format(data, status_, message)
        return Response(data=data, status=status_, data_status=data_status_, message=message)


class ChangePasswordView(generics.UpdateAPIView):
    """
    API for changing password.
    """
    serializer_class = ChangePasswordSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        serializer_data = {
            'old_password': request.data.get('old_password'),
            'new_password': request.data.get('new_password')
        }

        serializer = self.serializer_class(
            request.user, data=serializer_data, partial=True
        )
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            message = "Password changed successfully"
            response = response_format({}, 'success', message)
        except ValidationError as e:
            message = "Wrong password"
            response = response_format({}, 'error', message)
        return Response(response, status=status.HTTP_200_OK)


class ResetUserPwdAPIView(APIView):
    """
    API for changing user password.
    """
    authentication_classes = (authentication.TokenAuthentication,)  # authentication.TokenAuthentication,
    permission_classes = (permissions.IsAuthenticated,)  # permissions.IsAuthenticated,

    def post(self, request):
        data = {}
        status_ = "success"
        message = ''
        try:
            username = request.POST.get('username', '')
            new_password = request.POST.get('new_password', '')
            try:
                user = User.objects.get(username=username)
                user.set_password(new_password)
                user.save()
                message = "Password changed successfully"
                data = response_format(data, status_, message)
            except :
                status_ = "failed"
                message = 'Something went wrong!. Please try again!'
                data = response_format(data, status_, message)
        except ValidationError as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            status_ = "failed"
            if not message:
                message = "Server error 404 !"
            data = response_format(data, status_, message)
        return Response(data, status=status.HTTP_200_OK)


class ProfileAPIView(APIView):
    authentication_classes = (authentication.TokenAuthentication,)  # authentication.TokenAuthentication,
    permission_classes = (permissions.IsAuthenticated,)  # permissions.IsAuthenticated,

    def get(self, request):
        """
        Get profile of user
        """
        data = ''
        data_status_ = "success"
        message = ''
        status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
        try:
            profile_obj, created = Profile.objects.get_or_create(user=request.user)
            serializer = ProfileSerializer(profile_obj)
            status_ = status.HTTP_200_OK
            data = serializer.data
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            status_ = status.HTTP_404_NOT_FOUND
            data_status_ = "failed"
            message = "Server error 404!"
        return Response(data = data, status=status_, data_status=data_status_, message=message)

    def post(self, request):
        """
        Update profile data / Uploaded  profile image
        """
        data = ""
        try:
            user = request.user
            userprofile = Profile.objects.get_or_create(user=user)
            serializer = ProfileSerializer(userprofile, data=request.POST)
            if serializer.is_valid():
                serializer.save()
                data = serializer.data()
                data_status_ = "success"
                status_ = status.HTTP_200_OK
                message = "Profile updated successfully."
            else:
                data_status_ = "error"
                status_ = status.HTTP_400_BAD_REQUEST
                message = 'Profile update failed.'
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
            data_status_ = "failed"
            message = "Server error 404 !"
        # data = response_format(data, status_, message)
        return Response(data=data, status=status_, data_status=data_status_, message=message)


class AddUserAPIView(APIView):
    """
    Add User details
    """
    authentication_classes = (authentication.TokenAuthentication,)  # authentication.TokenAuthentication,
    permission_classes = (permissions.AllowAny,)  # permissions.IsAuthenticated,

    def post(self, request):
        data = ''
        data_status_ = "success"
        status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
        message = ''
        user = ''
        try:
            # username = request.POST.get('username', '')
            email = request.POST.get('email', '')
            password = request.POST.get('password', '')
            if email and password:
                try:
                    user = User.objects.create_user(username=email,
                                                    email=email,
                                                    password=password)
                except IntegrityError as e:
                    data_status_ = "failed"
                    print(e)
                    if 'UNIQUE constraint' in str(e):
                        message = "Username already exist!."
                    else:
                        message = str(e)
                except Exception as e:
                    data_status_ = "failed"
                    message = "something went wrong!"
                    print(e)
            if user:
                user.first_name = request.POST.get('first_name', '')
                user.last_name = request.POST.get('last_name', '')
                user.save()
                profile, created = Profile.objects.get_or_create(user=user)
                profile.age = request.POST.get('age', '')
                serializer = ProfileSerializer(profile)
                if serializer.is_valid():
                    data = {
                        "profile": serializer.data
                    }
                    message = "User details saved successfully"
                    status_ = status.HTTP_201_CREATED
                else:
                    message = "Invalid data"
                    status_ = status.HTTP_400_BAD_REQUEST
                    data_status_ = "failure"
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            data_status_ = "failed"
            if not message:
                message = "Server error 404 !"
        return Response(data, status=status_, data_status=data_status_, message=message)


class DeleteUserAPIView(APIView):
    """
    delete User details
    """
    authentication_classes = (authentication.TokenAuthentication,)  # authentication.TokenAuthentication,
    permission_classes = (permissions.IsAuthenticated,)  # permissions.IsAuthenticated,

    def post(self, request):
        data = ''
        data_status_ = "success"
        status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
        message = ''
        try:
            obj = Profile.objects.get(user=request.user)
            obj.user.delete()
            obj.delete()
            queryset = Profile.objects.filter(is_active=True)
            serializer = ProfileSerializer(queryset, many=True)
            message = "User details deleted successfully"
            status_ = status.HTTP_200_OK
            data = serializer.data
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            data_status_ = "failed"
            if not message:
                message = "Server error 404 !"
        return Response(data=data, status=status_, data_status=data_status_, message=message)