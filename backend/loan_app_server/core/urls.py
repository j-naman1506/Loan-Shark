from django.urls import path

from .views import *

urlpatterns = [
	path('login/', login),
	path('logged-user/', get_logged_user),
    path('logout/', Logout.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('reset-user-password/', ResetUserPwdAPIView.as_view(), name='reset-user-password'),
    # path('user-list/', ProfileAPIView.as_view(), name='user-list'),
	path('add-user/', AddUserAPIView.as_view(), name='add-user'),
    path('delete-user/', DeleteUserAPIView.as_view(), name='delete-user'),
]
