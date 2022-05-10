from email.mime import application
from rest_framework import serializers
from api.models import Application, Offer, Bill, Transaction
from core.models import Profile
from core.serializers import UserSerializer

from core.models import Document, PaySlip, BankAccount

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

class ApplicationSerializer(serializers.ModelSerializer):
	"""
	Applications Serializer
	"""
	user = UserSerializer(read_only=True)
	offers_count = serializers.SerializerMethodField()
	cibil_score = serializers.SerializerMethodField()

	def get_offers_count(self, instance):
		return Offer.objects.filter(application=instance).count()

	def get_cibil_score(self, instance):
		return Profile.objects.get(user=instance.user).cibil_score

	class Meta:
		model = Application
		fields = '__all__'
		read_only_fields = ('user', 'status',)

class OfferSerializer(serializers.ModelSerializer):
	"""
	Offer serializer
	"""
	application = ApplicationSerializer(read_only=True)
	lender = UserSerializer(read_only=True)
	amount = serializers.CharField(source='application.amount', read_only=True)

	class Meta:
		model = Offer
		fields = '__all__'
		read_only_fields = ('lender', 'application', 'status', 'active')


class BankAccountSerializer(serializers.ModelSerializer):
	"""
	Bank Account Serializer
	"""

	class Meta:
		model = BankAccount
		fields = "__all__"
		read_only_fields = ("user", )


class BillSerializer(serializers.ModelSerializer):
	"""
	Bill Serializer
	"""
	
	class Meta:
		model = Bill
		fields = "__all__"

class TransactionSerializer(serializers.ModelSerializer):
	"""
	Transaction Serializer
	"""
	
	class Meta:
		model = Transaction
		fields = "__all__"