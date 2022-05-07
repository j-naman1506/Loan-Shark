from django.urls import path, include, re_path
from rest_framework import permissions
from core.views import *
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Auth API",
        default_version='v1',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    re_path(r'^doc(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('doc/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
	path('login/', login),
	path('logged-user/', get_logged_user),
    path('logout/', Logout.as_view(), name='logout'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('profile/', ProfileAPIView.as_view(), name='profile'),
    path('reset-user-password/', ResetUserPwdAPIView.as_view(), name='reset-user-password'),
	path('add-user/', AddUserAPIView.as_view(), name='add-user'),
    path('delete-user/', DeleteUserAPIView.as_view(), name='delete-user'),
    # 'auth/social/google-oauth2/'
    path('', include('social_django.urls', namespace='social')),
]
