
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import DocumentView, PaySlipView, BankAccountView, ApplicationViewSet, OfferViewSet, BillViewSet

document_view = DocumentView.as_view({
    'get': 'get',
    'post': 'post',
    'delete': 'delete'
})

bank_account_view = BankAccountView.as_view({
    'get': 'get',
    'post': 'post'
})

router = DefaultRouter()
router.register('pay-slip', PaySlipView, basename="pay-slip")
router.register('application', ApplicationViewSet, basename="application")
router.register('offer', OfferViewSet, basename="offer")
router.register('bill', BillViewSet, basename="bill")

urlpatterns = [
    path("document/", document_view, name="document"),
    path("account/", bank_account_view, name="bank-account"),
    path('', include(router.urls)),
]
