from django.core.management.base import BaseCommand
from core.models import Profile
from core.utils import CibilScore
import sys
import os

class Command(BaseCommand):
	help = 'Updates cibil score'

	def add_arguments(self, parser):
		pass

	def handle(self, *args, **options):
		print("Cibil score handler started...")
		try:
			profiles = Profile.objects.filter(verified=True)
			print("Checking all profiles....")
			for profile in profiles:
				cs = CibilScore(profile=profile)
				cs.recalculate_cibil_score()
			print("Checking done....")
		except Exception as e:
			exc_type, exc_obj, exc_tb = sys.exc_info()
			fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
			print(exc_type, fname, exc_tb.tb_lineno)
			print(str(e))
		print("Cibil score Handler done...")
		# self.stdout.write(self.style.SUCCESS('Successfully closed poll "%s"' % poll_id))