from core.models import Profile, BankAccount
from api.models import Bill

class CibilScore():

    def __init__(self, profile: Profile):
        self.profile = profile
        self.score = profile.cibil_score
    
    def set_initial_cibil_score(self):
        if self.profile.verified:
            user = self.profile.user
            bank_acc = BankAccount.objects.get(user=user)
            self.profile.cibil_score = 450
            self.profile.eligible_amount = (bank_acc.ctc*0.4)//12
            self.profile.save()

    def recalculate_cibil_score(self):
        if self.profile.verified:
            user = self.profile.user
            bills_paid_on_time = Bill.objects.filter(sender=user, is_paid=True, is_outstanding=False)
            bills_paid_late = Bill.objects.filter(sender=user, is_paid=True, is_outstanding=False)
            bills_overdue = Bill.objects.filter(sender=user, is_paid=False, is_outstanding=True)

            bills_paid_on_time_count = bills_paid_on_time.count()
            bills_paid_late_count = bills_paid_late.count()
            bills_overdue_count = bills_overdue.count()

            amount_paid_on_time = 0
            for i in range(bills_paid_on_time_count):
                amount_paid_on_time += bills_paid_late_count[i].due_amount

            amount_paid_late = 0
            for i in range(bills_paid_late_count):
                amount_paid_late += bills_paid_late_count[i].due_amount

            amount_overdue = 0
            for i in range(bills_overdue_count):
                amount_overdue += bills_overdue[i].due_amount

            total_amount = amount_paid_late+amount_paid_on_time+amount_overdue
            f1 = amount_paid_on_time/total_amount
            f2 = amount_paid_late/total_amount
            f3 = amount_overdue/total_amount

            self.score += 3.5*f1 + 1.5*f2 - 2.5*f3
            self.score = min(max(self.score, 300), 700)
            self.profile.cibil_score = self.score
            self.profile.save()


