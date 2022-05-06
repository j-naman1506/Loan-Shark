from django.contrib import admin
from api.models import Application, Offer, Bill

# Register your models here.
admin.site.register(Application)
admin.site.register(Offer)
admin.site.register(Bill)