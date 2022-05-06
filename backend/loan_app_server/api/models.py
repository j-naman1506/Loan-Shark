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

# Create your models here.
class Application(BaseContent):
	user = models.ForeignKey(User, related_name = "application", on_delete=models.CASCADE)
	amount = models.IntegerField(default=0, null=True, blank=True)
	tenure = models.IntegerField(default=0, null=True, blank=True)
	tenure_type = models.CharField(max_length=1, choices=TENURE_CHOICES, null=True, blank=True)
	rate = models.IntegerField(default=0, null=True, blank=True)
	status = models.CharField(max_length=1, choices=APP_STATUS_CHOICES, null=True, blank=True) 

	class Meta:
		verbose_name = 'Application'
		verbose_name_plural = 'Applications'
		ordering = ['-id']


class Offer(BaseContent):
	application = models.ForeignKey(Application, related_name="application_offer", on_delete=models.CASCADE)
	tenure = models.IntegerField(default=0, null=True, blank=True)
	tenure_type = models.CharField(max_length=1, choices=TENURE_CHOICES, null=True, blank=True)
	rate = models.IntegerField(default=0, null=True, blank=True)
	status = models.CharField(max_length=1, choices=APP_STATUS_CHOICES, null=True, blank=True)
	lender = models.ForeignKey(User, related_name="lender_offer", on_delete=models.CASCADE)

	class Meta:
		verbose_name = 'Offer'
		verbose_name_plural = 'Offers'
		ordering = ['-id']


class Bill(BaseContent):
	offer = models.ForeignKey(Offer, related_name = "bill", on_delete=models.CASCADE)
	due_date = models.DateField(null=True, blank=True)
	due_amount = models.IntegerField(default=0, null=True, blank=True)

	class Meta:
		verbose_name = 'Bill'
		verbose_name_plural = 'Bills'
		ordering = ['-id']
