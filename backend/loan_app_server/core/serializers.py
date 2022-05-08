from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Document


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    class Meta:
        model = User

    def update(self, instance, validated_data):
        password_valid = instance.check_password(validated_data.get('old_password'))
        if not password_valid:
            error = {'error': "Wrong password"}
            raise serializers.ValidationError(
                error
            )

        instance.set_password(validated_data.get('new_password'))
        instance.save()

        return instance


class UserSerializer(serializers.ModelSerializer):
    """Handles serialization and deserialization of User objects."""

    class Meta:
        model = User
        fields = (
            'pk', 'email', 'username', 'first_name', 'last_name',
        )

        read_only_fields = ('token', 'email')

    def update(self, instance, validated_data):
        """Performs an update on a User."""

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        instance.save()

        return instance


class ProfileSerializer(serializers.ModelSerializer):
    """ User Profile Serializer """
    # user = UserSerializer(read_only=True)
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    # doc_num = serializers.SerializerMethodField()

    def get_first_name(self, instance):
        return instance.user.first_name

    def get_last_name(self, instance):
        return instance.user.last_name
    
    def get_email(self, instance):
        return instance.user.email

    # def get_doc_num(self, instance):
    #     data = {}
    #     try:
    #         document = Document.objects.get(user=instance.user)
    #         data = {
    #             'pan_num' : document.pan_card_num,
    #             'gov_id_num' : document.gov_id_num
    #         }
    #     except Document.DoesNotExist:
    #         pass
    #     return data

    class Meta:
        model = Profile
        exclude = ['user',]


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    accessToken = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )