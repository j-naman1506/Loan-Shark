import os
import sys
from django.conf import settings
from requests.exceptions import HTTPError
from api.serializers import DocumentSerializer, PaySlipSerializer, ApplicationSerializer, OfferSerializer, BankAccountSerializer, BillSerializer, TransactionSerializer
from core.models import Document, PaySlip, Profile, BankAccount
from api.models import Application, Offer, Bill, Transaction
from core.renderers import Response
from rest_framework import status, authentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from api.handlers.email_handler import EmailHandler
from datetime import date
from dateutil.relativedelta import relativedelta
from uuid import uuid4

class BankAccountView(GenericViewSet):
	"""
	Bank Account View
	"""

	serializer_class = BankAccountSerializer
	authentication_classes = [authentication.TokenAuthentication]
	permission_classes = (IsAuthenticated,)

	def get(self, request, *args, **kwargs):
		"""
		Get bank details
		"""
		data = ""
		account = ''
		message = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			account = BankAccount.objects.get(user=request.user)
			serializer = BankAccountSerializer(account)
			data = serializer.data
			message = "Successful"
			_status = status.HTTP_200_OK
		except BankAccount.DoesNotExist:
			message = "Bank Account Details doesn't exist"
			_status = status.HTTP_204_NO_CONTENT
			pass
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)
	
	def post(self, request, *args, **kwargs):
		"""
		Add or update bank details
		data = {
			"account_number":"",
			"ifsc_code":"",
			"holder_name":"",
			"branch_name":""
		}
		"""
		data = ""
		account = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			account, created = BankAccount.objects.get_or_create(user=request.user)
			serializer = BankAccountSerializer(account, data=request.data)
			if serializer.is_valid():
				serializer.save()
				data = serializer.data
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				message = "bad field values"
				_status = status.HTTP_400_BAD_REQUEST
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)


class DocumentView(GenericViewSet):
	"""
	Documents of User View
	"""

	serializer_class = DocumentSerializer
	authentication_classes = [authentication.TokenAuthentication]
	permission_classes = (IsAuthenticated,)

	def delete(self, request, format=None):
		"""
		Delete document
		"""
		data = ''
		status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
		message = ''
		try:
			if request.user:
				document = Document.objects.get(user=request.user)
				document.delete()
				status_ = status.HTTP_200_OK
				message = "Deleted successfully"
		except Document.DoesNotExist:
			message = "Document data does not exist"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data, status=status_, message=message)

	def get(self, request, format=None):
		"""
		Get documents of user
		"""
		data = ''
		status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
		message = ''
		try:
			if request.user:
				document, created = Document.objects.get_or_create(user=request.user)
				data = DocumentSerializer(document).data
				status_ = status.HTTP_200_OK
				message = "success"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data, status=status_, message=message)

	def post(self, request, format=None):
		"""
		Post documents of user
		form-data = {
			"gov_id_num" : "",
			"gov_id" : FILE,
			"pan_card_num" : "",
			"pan_card" : FILE,
			"pay_slips" : <FILE>[]
		}
		"""
		data = ''
		status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
		message = ''
		created = ''
		try:
			if request.user:
				# print(request.data)
				document, created = Document.objects.get_or_create(user=request.user)
				doc_serializer = DocumentSerializer(document, request.data)
				if doc_serializer.is_valid(raise_exception=True):
					# print(doc_serializer.validated_data)
					doc_serializer.save()
					pay_slips_files = request.FILES.getlist('pay_slips')
					# print(pay_slips_files)
					if len(pay_slips_files):
						PaySlip.objects.filter(document=document).delete()
					for slip in pay_slips_files:
						PaySlip.objects.create(document=document, file=slip)
					data = doc_serializer.data
					status_ = status.HTTP_200_OK
					message = "success"
					
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			if created:
				document.delete()
			message = "failure"
		return Response(data, status=status_, message=message)


class PaySlipView(ModelViewSet):
	"""
	Pay Slip Model View
	"""
	# queryset = PaySlip.objects.all()
	serializer_class = PaySlipSerializer
	permission_classes = [IsAuthenticated,]

	def get_queryset(self):
		document = Document.objects.get(user=self.request.user)
		return PaySlip.objects.filter(document=document)

	@action(detail=False, methods=['delete',], url_path="delete-all")
	def delete_all(self, request):
		"""
			Delete all payslips associated with document
		"""
		data = ""
		try:
			for instance in self.get_queryset():
				instance.delete()
			message = "Successfully deleted all payslips"
		except HTTPError:
			message = "Not Found Error Occured"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=status.HTTP_204_NO_CONTENT)

	def destroy(self, request, pk=None):
		"""
			Delete pay slip by id
		"""
		data = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			instance = self.get_object()
			if instance.document.user == request.user:
				self.perform_destroy(instance)
				message = "Successfully deleted"
				data = PaySlipSerializer(instance).data
				_status = status.HTTP_204_NO_CONTENT
			else:
				message = "Unauthorized access"
				_status = status.HTTP_401_UNAUTHORIZED
		except HTTPError:
			message = "Not Found Error Occured"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)


class ApplicationViewSet(ModelViewSet):
	"""
	Application View Set
	"""

	serializer_class = ApplicationSerializer
	permission_classes = [IsAuthenticated,]

	def get_queryset(self):
		return Application.objects.all()

	def list(self, request, *args, **kwargs):
		"""
			Get all applications
		"""
		data = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			my_applications = self.get_queryset()
			if my_applications:
				my_applications = my_applications.exclude(user=request.user).exclude(status__in=['A', 'C', 'R'])
			data = ApplicationSerializer(my_applications, many=True).data
			message = "Successful"
			_status = status.HTTP_200_OK
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=False, methods=['get',], url_path="me")
	def get_my_applications(self, request):
		"""
			Get my applied applications
		"""
		data = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			my_applications = Application.objects.filter(user=request.user)
			data = ApplicationSerializer(my_applications, many=True).data
			message = "Successful"
			_status = status.HTTP_200_OK
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)
	
	def create(self, request, *args, **kwargs):
		"""
			Add a new application
			data = {
				amount: 0
				tenure: 0
				rate: 0
			}
		"""
		data = ""
		application = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			application = Application.objects.create(user=request.user)
			eligible_amount = Profile.objects.get(user=request.user).eligible_amount
			if request.data["amount"] <= eligible_amount:
				serializer = ApplicationSerializer(application, data=request.data)
				if serializer.is_valid(raise_exception=True):
					serializer.save()
					data = serializer.data
					email_data = {
						"application_data" : data,
					}
					eh = EmailHandler(
						to=request.user,
						cc_list=[],
						bcc_list=[],
						data = email_data,
					)
					eh.new_application_email()
					message = "Successful"
					_status = status.HTTP_200_OK
				else:
					application.delete()
					message = "bad field values"
					_status = status.HTTP_400_BAD_REQUEST
			else:
				application.delete()
				message = "Amount is greater than eligible amount"
				_status = status.HTTP_406_NOT_ACCEPTABLE
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			if application:
				application.delete()
			message = "failure"
		return Response(data=data, message=message, status=_status)

	def destroy(self, request, *args, **kwargs):
		"""
			Delete application
		"""
		data = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			instance = self.get_object()
			if instance.user == request.user:
				self.perform_destroy(instance)
				message = "Successfully deleted"
				data = ApplicationSerializer(instance).data
				_status = status.HTTP_204_NO_CONTENT
			else:
				message = "Authorized access"
				_status = status.HTTP_401_UNAUTHORIZED
		except HTTPError:
			message = "Not Found Error Occured"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',])
	def accept(self, request, pk=None, *args, **kwargs):
		"""
		Accept the application directly
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			application = self.get_object()
			if application.user != request.user:
				application.status = 'A'
				offer = Offer.objects.create(
					application = application, 
					lender = request.user,
					status = 'A',
					offered_by=request.user,
					tenure = application.tenure,
					rate = application.rate,
					)
				offer.save()
				application.save()
				other_offers = Offer.objects.filter(application=offer.application, lender=offer.lender, active=True).exclude(id=offer.id)
				for other_offer in other_offers:
					other_offer.status = "R"
				serializer = OfferSerializer(offer)
				data = serializer.data
				# send email to user applicationa accepted
				email_data = {
					"loan_data" : data,
				}
				eh = EmailHandler(
					to=[offer.application.user, offer.lender],
					cc_list=[],
					bcc_list=[],
					data = email_data,
				)
				eh.acceptance_email()
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only lender can accept"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, url_path="offers")
	def get_offers(self, request, pk=None, *args, **kwargs):
		"""
		Get list of offers for my application
		"""
		data = ""
		offers = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			application = self.get_object()
			offers = Offer.objects.filter(application=application)
			# print(offers)
			serializer = OfferSerializer(offers, many=True)
			data = serializer.data
			message = "Successful"
			_status = status.HTTP_200_OK
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',])
	def reject(self, request, pk=None, *args, **kwargs):
		"""
		Reject the application directly
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			application = self.get_object()
			if application.user != request.user:
				application.status = 'R'
				application.save()
				serializer = ApplicationSerializer(application)
				data = serializer.data
				#send email to user that application rejected
				email_data = {
					"loan_data" : data,
				}
				eh = EmailHandler(
					to=request.user,
					cc_list=[],
					bcc_list=[],
					data = email_data,
				)
				eh.rejection_application_email()
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only lender can reject"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)


class OfferViewSet(ModelViewSet):
	"""
	Offer View Set
	"""

	serializer_class = OfferSerializer
	permission_classes = [IsAuthenticated,]

	def get_queryset(self):
		return Offer.objects.all()

	def list(self, request, pk=None, *args, **kwargs):
		"""
		Get list of offered
		"""
		data = ""
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			previous_offers = Offer.objects.filter(lender=self.request.user)
			serializer = OfferSerializer(previous_offers, many=True)
			data = serializer.data
			message = "Successful"
			_status = status.HTTP_200_OK
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	# def retrieve(self, request, pk=None, *args, **kwargs):
	# 	"""
	# 	Get Offer details with history
	# 	"""
	# 	data = ""
	# 	offer = ''
	# 	_status = status.HTTP_500_INTERNAL_SERVER_ERROR
	# 	try:
	# 		offer = self.get_object()
	# 		previous_offers = Offer.objects.filter(application=offer.application, lender=offer.lender)
	# 		serializer = OfferSerializer(previous_offers, many=True)
	# 		data = serializer.data
	# 		message = "Successful"
	# 		_status = status.HTTP_200_OK
	# 	except Exception as e:
	# 		exc_type, exc_obj, exc_tb = sys.exc_info()
	# 		fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
	# 		print(exc_type, fname, exc_tb.tb_lineno)
	# 		print(str(e))
	# 		message = "failure"
	# 	return Response(data=data, message=message, status=_status)

	@action(detail=False, methods=['post',], url_path="make-offer")
	def create_offer(self, request, *args, **kwargs):
		"""
			Create a new offer by lender
			data = {
				application_id: 2
				tenure: 0
				rate: 0
			}
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			if not request.data['application_id']:
				message = "Provide valid application Id"
				_status = status.HTTP_404_NOT_FOUND
				return Response(data=data, message=message, status=_status)
			# print(request.data)
			# import pdb; pdb.set_trace()
			application = Application.objects.get(id=request.data['application_id'])
			if application.user == request.user:
				message = "User cannot self offer"
				_status = status.HTTP_406_NOT_ACCEPTABLE
				return Response(data=data, message=message, status=_status)
			offer, created = Offer.objects.get_or_create(
				application=application, 
				offered_by=request.user, 
				lender=request.user, 
				active=True
				)
			serializer = OfferSerializer(offer, data=request.data)
			if serializer.is_valid():
				serializer.save()
				data = serializer.data
				#send email to user new offer
				email_data = {
					"loan_data" : data,
				}
				eh = EmailHandler(
					to=request.user,
					cc_list=[],
					bcc_list=[],
					data = email_data,
				)
				eh.new_offer_email()
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				message = "bad field values"
				_status = status.HTTP_400_BAD_REQUEST
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',])
	def counter_offer(self, request, pk=None, *args, **kwargs):
		"""
		Counter offer
		data = {
				tenure: 0
				rate: 0
			}
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			offer = self.get_object()
			# if request.user != offer.lender:
			# 	applicant_eligible_amount = Profile.objects.get(offer.application.user).eligible_amount
			# 	if request.data["amount"] > applicant_eligible_amount:
			# 		_status = status.HTTP_406_NOT_ACCEPTABLE
			# 		message = "Amount asked is greater than eligible amount"
			# 		return Response(data=data, message=message, status=_status)
			offer.active = False
			offer.status = 'R'
			offer.save()
			offer = Offer.objects.create(application=offer.application, offered_by=request.user, lender=offer.lender, active=True)
			serializer = OfferSerializer(offer, data=request.data)
			if serializer.is_valid():
				serializer.save()
				#TODO: send email to user new counter offer
				data = serializer.data
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				message = "bad field values"
				_status = status.HTTP_400_BAD_REQUEST
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',])
	def accept(self, request, pk=None, *args, **kwargs):
		"""
		Accept the offer
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			offer = self.get_object()
			if offer.application.user == request.user:
				offer.status = 'A'
				# offer.active = False
				offer.save()
				offer.application.status = 'A'
				offer.application.save()
				other_offers = Offer.objects.filter(application=offer.application, active=True).exclude(id=offer.id)
				print(other_offers)
				for other_offer in other_offers:
					other_offer.status = "R"
					other_offer.active = False
					other_offer.save()
				serializer = OfferSerializer(offer)
				data = serializer.data
				#send email to user offer has been accepted
				email_data = {
					"loan_data" : data,
				}
				eh = EmailHandler(
					to=[offer.application.user, offer.lender],
					cc_list=[],
					bcc_list=[],
					data = email_data,
				)
				eh.acceptance_email()
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only borrower can accept"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',])
	def reject(self, request, pk=None, *args, **kwargs):
		"""
		Reject the offer
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			offer = self.get_object()
			if offer.application.user == request.user:
				offer.status = 'R'
				offer.active = False
				offer.save()
				serializer = OfferSerializer(offer)
				data = serializer.data
				# send email to user offer has been rejected
				email_data = {
					"loan_data" : data,
				}
				eh = EmailHandler(
					to=offer.lender,
					cc_list=[],
					bcc_list=[],
					data = email_data,
				)
				eh.rejection_offer_email()
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only borrower can reject"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)

	@action(detail=True, methods=['post',], url_path="pay")
	def pay_amount(self, request, *args, **kwargs):
		"""
		Pay the borrower
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			offer = self.get_object()
			if offer.lender == request.user and offer.status=="A":
				#TODO: implement payment gateway here
				offer.is_paid = True
				offer.save()
				total_return_amount = (offer.application.amount*(offer.rate+100))/100
				emi_amount = total_return_amount/offer.tenure
				due_date = date.today() + relativedelta(months=1)
				bill, created = Bill.objects.get_or_create(
					offer=offer,
					due_amount=emi_amount,
					due_date=due_date,
					sender=offer.application.user,
					reciever=offer.lender
					 )
				serializer = OfferSerializer(offer)
				data = serializer.data
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only lender can pay amount"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)


class BillViewSet(ModelViewSet):
	"""
	Application View Set
	"""

	serializer_class = BillSerializer
	permission_classes = [IsAuthenticated,]

	def get_queryset(self):
		return Bill.objects.filter(sender=self.request.sender)

	@action(detail=True, methods=["post",], url_path="pay")
	def pay(self, request, *args, **kwargs):
		"""
		Pay the borrower
		"""
		data = ""
		offer = ''
		_status = status.HTTP_500_INTERNAL_SERVER_ERROR
		try:
			bill = self.get_object()
			if bill.sender == request.user:
				#TODO: implement gateway here
				bill.is_paid = True
				transaction, created = Transaction.objects.get_or_create(
					bill = bill,
					transaction_id = uuid4(),
					status = "C"
				)
				serializer = BillSerializer(bill)
				data = serializer.data
				message = "Successful"
				_status = status.HTTP_200_OK
			else:
				_status = status.HTTP_401_UNAUTHORIZED
				message = "Only borrower can reject"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=_status)