from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import DocumentView, PaySlipView

document_view = DocumentView.as_view({
    'get': 'get',
    'post': 'post',
    'delete': 'delete'
})

router = DefaultRouter()
router.register('pay-slip', PaySlipView, basename="pay-slip")

urlpatterns = [
    path("document/", document_view, name="document"),
    path('', include(router.urls)),
]
