from email import message
import os
from pydoc import doc
import sys
from requests.exceptions import HTTPError
from django.conf import settings
from django.db import IntegrityError
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from api.serializers import DocumentSerializer, PaySlipSerializer
from core.models import Document, PaySlip
from core.renderers import Response
from social_django.utils import psa
from django.contrib.auth import authenticate

from rest_framework import status, authentication, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError
from rest_framework.viewsets import GenericViewSet, ModelViewSet

class DocumentView(GenericViewSet):
	"""
	Documents of User View
	"""

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
		"""
		data = ''
		status_ = status.HTTP_500_INTERNAL_SERVER_ERROR
		message = ''
		created = ''
		try:
			if request.user:
				# print(request.FILES)
				document, created = Document.objects.get_or_create(user=request.user)
				doc_serializer = DocumentSerializer(document, request.data)
				if doc_serializer.is_valid():
					# print(doc_serializer.validated_data)
					doc_serializer.save()
					pay_slips_files = request.FILES.getlist('pay_slips')
					# print(pay_slips_files)
					for slip in pay_slips_files:
						pay_slip = PaySlip.objects.create(document=document, file=slip)
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
		data = ""
		try:
			instance = self.get_object()
			self.perform_destroy(instance)
			message = "Successfully deleted"
			data = PaySlipSerializer(instance).data
		except HTTPError:
			message = "Not Found Error Occured"
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
			message = "failure"
		return Response(data=data, message=message, status=status.HTTP_204_NO_CONTENT)

		