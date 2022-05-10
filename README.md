Django Server Setup - 

1. Install virtual environment
    > pip install virtualenv
2. Create virtual environment
    > virtualenv venv
3. Activate the environment
    On windows-
    > ./venv/Scripts/activate
    On Linux/Mac-
    > source venv/bin/activate
    
    To deactivate-
    > deactivate

4. Install all python required packages-
    > pip3 install -r requirements.txt

5. Cd into loan_app_server directory
    > cd ./loan_app_server

6. Add .env file in the directory with following variables
    > touch .env
    > GOOGLE_OAUTH2_KEY=""
    > GOOGLE_OAUTH2_SECRET=""
    > EMAIL_HOST_USER=""
    > EMAIL_HOST_PASSWORD=""

    

7. Run migrations
    > python manage.py migrate

8. Create super user
    > python manage.py createsuperuser

9. Run the server
    > python manage.py runserver
