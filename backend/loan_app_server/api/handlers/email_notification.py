import os
import sys
import zipfile
import io
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template
from email.mime.image import MIMEImage


class EmailNotification(object):

    def send_email(self, email_id, email_subject, email_type, data, cc_email_list=None, bcc_email_list=None):
        """
        Sent Mail
        :param email_id:
        :param email_subject:
        :param email_type:
        :param data:
        :return status:
        """
        try:
            logo_image = str(settings.STATIC_ROOT) + "/icons/logo_site.png"
            email_list = [email_id]
            # Email to/from
            to = email_list

            header_color = "#e5eaf5"
            # Email Template
            if email_type == 'new_offer':
                html_template = get_template('email_templates/new_offer.html')
                text_template = get_template('email_templates/new_offer.txt')
                url = ''
            elif email_type == 'acceptance_borrower':
                html_template = get_template('email_templates/acceptance_borrower.html')
                text_template = get_template('email_templates/acceptance_borrower.txt')
                url = ''
            elif email_type == 'acceptance_lender':
                html_template = get_template('email_templates/acceptance_lender.html')
                text_template = get_template('email_templates/acceptance_lender.txt')
                url = ''
            elif email_type == 'new_application':
                html_template = get_template('email_templates/new_application.html')
                text_template = get_template('email_templates/new_application.txt')
                url = ''
            elif email_type == 'rejection_offer':
                html_template = get_template('email_templates/rejection_offer.html')
                text_template = get_template('email_templates/rejection_offer.txt')
                header_color = "#BA372A"
                url = ''
            elif email_type == 'rejection_application':
                html_template = get_template('email_templates/rejection_application.html')
                text_template = get_template('email_templates/rejection_application.txt')
                header_color = "#BA372A"
                url = ''

            # print(settings.EMAIL_HOST_USER)
            # print(settings.EMAIL_HOST_PASSWORD)
            from_email = settings.EMAIL_HOST_USER
            subject = email_subject
            context = {
                       'data': data,
                       'url': url,
                       'logo_image': "cid:" + logo_image,
                       'header_color': header_color
            }
            text_content = text_template.render(context)
            html_content = html_template.render(context)

            # # Rich email message -  text and HTML
            # if  email_type == "acceptance":
            #     msg = EmailMultiAlternatives(subject, text_content, from_email, to, bcc=bcc_email_list, cc=cc_email_list)
            # else:
            msg = EmailMultiAlternatives(subject, text_content, from_email, to)
            msg.attach_alternative(html_content, "text/html")

            # if email_type == "error report":
            #     # atach screenshot to email
            #     if data['screenshot']:
            #         msg.attach_file(data['screenshot'])

            
            # fp = open(logo_image, 'rb')
            # image_1 = MIMEImage(fp.read())
            # fp.close()
            # image_1.add_header('Content-ID', '<' + logo_image + '>')
            # msg.attach(image_1)
            msg.send(fail_silently=False)
            # print("hello")
            return True
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
            print(exc_type, fname, exc_tb.tb_lineno)
            print(str(e))
            return False
