from django.db import models
from core.models import BaseContent
from django.contrib.auth.models import User

TENURE_CHOICES = (
	('Y', 'Year'),
	('M', 'Month'),
)

APP_STATUS_CHOICES = (
	('P', 'Pending'),
	('A', 'Accepted'),
	('R', 'Rejected'),
	('D', 'Due'),
	('C', 'Completed')
)

PAYMENT_STATUS_CHOICES = (
	('P', 'Pending'),
	('C', 'Completed'),
	('F', 'Failed'),
	('R', 'Rejected')
)

# Create your models here.
class Application(BaseContent):
	user = models.ForeignKey(User, related_name = "application", on_delete=models.CASCADE)
	amount = models.IntegerField(default=0, null=True, blank=True)
	tenure = models.IntegerField(default=0, null=True, blank=True)
	# tenure_type = models.CharField(max_length=1, choices=TENURE_CHOICES, null=True, blank=True)
	rate = models.DecimalField(max_digits=5, decimal_places=2, default=0, null=True, blank=True)
	status = models.CharField(max_length=1, choices=APP_STATUS_CHOICES, null=True, blank=True) 

	class Meta:
		verbose_name = 'Application'
		verbose_name_plural = 'Applications'
		ordering = ['-id']


class Offer(BaseContent):
	application = models.ForeignKey(Application, related_name="application_offer", on_delete=models.CASCADE)
	tenure = models.IntegerField(default=0, null=True, blank=True)
	offered_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
	# tenure_type = models.CharField(max_length=1, choices=TENURE_CHOICES, null=True, blank=True)
	rate = models.DecimalField(max_digits=5, decimal_places=2, default=0, null=True, blank=True)
	status = models.CharField(max_length=1, choices=APP_STATUS_CHOICES, null=True, blank=True)
	lender = models.ForeignKey(User, related_name="lender_offer", on_delete=models.CASCADE)
	is_paid = models.BooleanField(default=False, null=True, blank=True)
	emi_passed_count = models.IntegerField(default=0, null=True, blank=True)

	class Meta:
		verbose_name = 'Offer'
		verbose_name_plural = 'Offers'
		ordering = ['-id']

	def increament_emi_passed(self):
		if self.emi_passed_count < self.tenure:
			self.emi_passed_count += 1
			self.save()


class Bill(BaseContent):
	offer = models.ForeignKey(Offer, related_name = "bill", on_delete=models.CASCADE)
	reciever = models.ForeignKey(User, related_name = "bill_reciever", on_delete=models.CASCADE, default=1)
	sender = models.ForeignKey(User, related_name = "bill_sender", on_delete=models.CASCADE, default=1)
	due_date = models.DateField(null=True, blank=True)
	due_amount = models.IntegerField(default=0, null=True, blank=True)
	is_outstanding = models.BooleanField(default=False, null=True, blank=True)
	is_paid = models.BooleanField(default=False, null=True, blank=True)
	is_recent = models.BooleanField(default=True, null=True, blank=True)

	class Meta:
		verbose_name = 'Bill'
		verbose_name_plural = 'Bills'
		ordering = ['-id']


class Transaction(BaseContent):
	bill = models.ForeignKey(Bill, related_name="transaction", on_delete=models.CASCADE)
	transaction_id = models.CharField(max_length=20, null=True, blank=True)
	status = models.CharField(max_length=1, choices=PAYMENT_STATUS_CHOICES, null=True, blank=True)

	class Meta:
		verbose_name = 'Transaction'
		verbose_name_plural = 'Transactions'
		ordering = ['-id']