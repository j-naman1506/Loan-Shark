from django.core.management.base import BaseCommand
from api.models import Bill
from datetime import date
from dateutil.relativedelta import relativedelta
import sys
import os

class Command(BaseCommand):
	help = 'Checks all outstanding bills and issues new bills'

	def add_arguments(self, parser):
		pass

	def handle(self, *args, **options):
		print("Bills Handler started...")
		try:
			bills = Bill.objects.filter(is_recent=True)
			print("Checking all latest bills....")
			for bill in bills:
				if bill.due_date <= date.today():
					bill.is_outstanding = True
					bill.is_recent = False
					bill.save()
					if bill.offer.emi_passed_count < bill.offer.tenure:
						new_due_date = date.today() + relativedelta(months=1)
						new_bill = Bill.objects.create(
							offer=bill.offer,
							due_amount=bill.due_amount,
							due_date=new_due_date,
							sender=bill.sender,
							reciever=bill.reciever
							)
						bill.offer.increament_emi_passed()
						print(f"New bill generated for offer with id({bill.offer.id})....")
			print("Checking done....")
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
		print("Bills Handler done...")
		# self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))