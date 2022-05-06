from django.contrib import admin
from core.models import Profile, EmailNotificationLog, PaySlip, BankAccount, Document

# Register your models here.
admin.site.register(Profile)
admin.site.register(EmailNotificationLog)
admin.site.register(PaySlip)
admin.site.register(BankAccount)
admin.site.register(Document)