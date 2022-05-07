from rest_framework.response import Response

class Response(Response):
    """

    in success mode call:
    return Response(data=serializer.data, message='Done', data_status='success', status=200)

    in failure mode call:
    return Response(data=serializer.errors, message='Create User Failed', data_status='failure', status=400)
    """

    def __init__(self, data=None, message=None, data_status=None, status=None,
                 template_name=None, headers=None, exception=False, content_type=None):

        data_content = {
            'status': data_status,
            'data': data,
            'message': message,
        }
        super(Response, self).__init__(
            data=data_content,
            status=status,
            template_name=template_name,
            headers=headers,
            exception=exception,
            content_type=content_type
        )
