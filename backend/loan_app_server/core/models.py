from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
# from django.utils.timezone import get_current_timezone
# from django.utils import timezone
# from datetime import datetime, timedelta
import uuid

GENDER_CHOICES = (
		('M', 'Male'),
		('F', 'Female'),
	)

TYPE_EMAIL = [
	("verification", "verification"),
	("reset password", "reset password"),
	("need help", "need help"),
	("contact us", "contact us"),
]

class BaseContent(models.Model):
	"""
		Captures BaseContent as created On and modified On and active field.
		common field accessed for the following classes.
	"""

	created_on = models.DateTimeField(auto_now_add=True)
	last_modified = models.DateTimeField(auto_now=True)
	active = models.BooleanField(default=True)

	class Meta:
		abstract = True

	def __str__(self):
		return self.id


class BankAccount(BaseContent):
	user = models.ForeignKey(User, related_name="bank_account", on_delete=models.CASCADE)
	account_no = models.CharField(max_length=18, null=True, blank=True)
	ifsc_code = models.CharField(max_length=20, null=True, blank=True)
	branch_name = models.CharField(max_length=30, null=True, blank=True)
	holder_name = models.CharField(max_length=30, null=True, blank=True)

	class Meta:
		verbose_name = 'Bank Account'
		verbose_name_plural = 'Bank Accounts'
		ordering = ['-id']


class Document(BaseContent):
	def user_directory_path(instance, filename):
		return 'user_{0}/{1}'.format(instance.user.id, uuid.uuid4())

	user = models.OneToOneField(User, related_name="documents", on_delete=models.CASCADE)
	pan_card = models.FileField(upload_to=user_directory_path)
	gov_id = models.FileField(upload_to=user_directory_path)

	class Meta:
		verbose_name = 'Document'
		verbose_name_plural = 'Documents'
		ordering = ['-id']


class PaySlip(BaseContent):
	def user_directory_path(instance, filename):
		return 'user_{0}/{1}'.format(instance.document.user.id, uuid.uuid4())

	document = models.ForeignKey(Document, related_name="pay_slips", on_delete=models.CASCADE)
	file = models.FileField(upload_to=user_directory_path)

	class Meta:
		verbose_name = 'Pay Slip'
		verbose_name_plural = 'Pay Slips'
		ordering = ['-id']


class Profile(BaseContent):
	user = models.OneToOneField(User, related_name = "profile", on_delete=models.CASCADE)
	profile_pic = models.ImageField(upload_to="profile/", null=True)
	dob = models.DateField(null=True, blank=True)
	age = models.CharField(max_length=3, null=True, blank=True)
	gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
	is_active = models.BooleanField(default=True)
	location = models.CharField(max_length=200, null=True, blank=True)
	cibil_score = models.IntegerField(default=0, null=True, blank=True)
	verified = models.BooleanField(default=False)
	eligible_amount = models.IntegerField(default=0, null=True, blank=True)

	class Meta:
		verbose_name = 'Profile'
		verbose_name_plural = 'Profiles'
		ordering = ['-id']

	def __str__(self):
		return self.user.username


class EmailNotificationLog(BaseContent):
	sent_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, db_index=True)
	status = models.BooleanField(_('status'), default=False)
	# expires_at = models.DateTimeField(_('expires at'), blank=True, null=True)
	type = models.CharField(_('type'), max_length=50, choices=TYPE_EMAIL, blank=True, null=True)

	class Meta:
		verbose_name = 'EmailNotificationLog'
		verbose_name_plural = 'EmailNotificationLogs'
		ordering = ['-id']

	def __str__(self):
		return '%s' % self.sent_to

	# def save(self, **kwargs):
	# 	self.expires_at = datetime.now(tz=get_current_timezone())+timedelta(days=1)
	# 	super(EmailNotificationLog, self).save(**kwargs)