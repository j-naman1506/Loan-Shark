from api.handlers.email_notification import EmailNotification
from core.models import EmailNotificationLog

class EmailHandler():
    disable = True

    def __init__(self, to, cc_list, bcc_list, data):
        self.en = EmailNotification()
        self.to = to
        self.cc_list = cc_list
        self.bcc_list = bcc_list
        self.data = data

    def log_status(self, email_status, email_type):
        EmailNotificationLog.objects.create(
                sent_to=self.to,
                status=email_status,
                type=email_type
                )
        if email_status:
            message = "Data submitted successfully"
            # status_ = status.HTTP_200_OK
        else:
            message = "Email sending failed. Please try again."
            # status_ = status.HTTP_422_UNPROCESSABLE_ENTITY
        print(message)

    def new_application_email(self):
        if self.disable:
            return
        email_type = "new_application"
        email_status = self.en.send_email(email_id=self.to.email, email_subject="Loan Application posted", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)

    def new_offer_email(self):
        if self.disable:
            return
        email_type = "new_offer"
        email_status = self.en.send_email(email_id=self.to.email, email_subject="New Offer on your application!", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)

    def counter_offer_email(self):
        if self.disable:
            return
        email_type = "counter_offer"
        email_status = self.en.send_email(email_id=self.to.email, email_subject="Counter Offer has been made", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)

    def acceptance_email(self):
        if self.disable:
            return
        if type(self.to)!=list:
            print("borrower or lender email is missing")
        email_type = "acceptance_borrower"
        email_status = self.en.send_email(email_id=self.to[0].email, email_subject="Congratulations! Your loan has been approved!", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)
        email_type = "acceptance_lender"
        email_status = self.en.send_email(email_id=self.to[1].email, email_subject="Your offer has been accepted", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)

    def rejection_offer_email(self):
        if self.disable:
            return
        email_type = "rejection_offer"
        email_status = self.en.send_email(email_id=self.to.email, email_subject="Your offer/application has been rejected", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)

    def rejection_application_email(self):
        if self.disable:
            return
        email_type = "rejection_application"
        email_status = self.en.send_email(email_id=self.to.email, email_subject="Your offer/application has been rejected", email_type=email_type, data=self.data)
        self.log_status(email_status, email_type)