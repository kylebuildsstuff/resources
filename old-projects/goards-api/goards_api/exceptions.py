from rest_framework import status
from rest_framework.exceptions import APIException


class ServiceUnavailable(APIException):
    status_code = status.HTTP_503_SERVICE_UNAVAILABLE
    default_detail = 'Service temporarily unavailable, try again later.'
    default_code = 'service_unavailable'


class DeckNotFound(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'required deck ID was either invalid or missing'
    default_code = 'deck_not_found'


class HandNotFound(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'required hand ID was either invalid or missing'
    default_code = 'hand_not_found'


class CardNotFound(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = 'required card ID was either invalid or missing'
    default_code = 'card_not_found'
