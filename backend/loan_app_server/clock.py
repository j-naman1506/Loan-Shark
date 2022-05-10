from apscheduler.schedulers.blocking import BlockingScheduler
import subprocess

sched = BlockingScheduler()

@sched.scheduled_job('interval', hour=24)
def manage_bills_job():
    subprocess.run(["python", "manage.py", "manage_bills"])

@sched.scheduled_job('cron', day="1st mon")
def manage_cibil_score_job():
    subprocess.run(["python", "manage.py", "manage_cibil_score"])

sched.start()