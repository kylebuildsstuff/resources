from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework_jwt import views
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


class ObtainJSONWebToken(views.ObtainJSONWebToken):
    """
    API View that receives a POST with a user's username and password.

    Returns a JSON Web Token that can be used for authenticated requests.
    """


class VerifyJSONWebToken(views.VerifyJSONWebToken):
    """
    API View that verifies token. If valid, return token
    """


class RefreshJSONWebToken(views.RefreshJSONWebToken):
    """
    API View that returns a refreshed token (with new expiration) based on
    existing token
    """
