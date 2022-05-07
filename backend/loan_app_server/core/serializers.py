from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


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
    first_name = serializers.CharField(source="user")
    last_name = serializers.CharField(source="user")
    email = serializers.CharField(source="user")

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'email', 'age', 'profile_pic', 'location', 'gender', 'cibil_score', 'verified', 'eligible_amount', ]


class SocialSerializer(serializers.Serializer):
    """
    Serializer which accepts an OAuth2 access token.
    """
    access_token = serializers.CharField(
        allow_blank=False,
        trim_whitespace=True,
    )