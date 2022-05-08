from rest_framework import serializers
from core.serializers import UserSerializer

from core.models import Document, PaySlip

class DocumentSerializer(serializers.ModelSerializer):
    """
    Document Serializers
    """
    user = UserSerializer(read_only=True)
    pay_slips = serializers.SerializerMethodField()

    def get_pay_slips(self, instance):
        document_pay_slips_objs = PaySlip.objects.filter(document=instance)
        document_pay_slips = PaySlipSerializer(document_pay_slips_objs, many=True)
        return document_pay_slips.data
        
    class Meta:
        model = Document
        fields = '__all__'

class PaySlipSerializer(serializers.ModelSerializer):
    """
    Pay Slip Serializers
    """

    class Meta:
        model = PaySlip
        exclude = ['document',]
