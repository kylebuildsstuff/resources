from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase

from auth.views import ObtainJSONWebToken, VerifyJSONWebToken, RefreshJSONWebToken
from users.views import UserList, UserDetail
from users.serializers import UserSerializer
from users.models import User


class TestObtainToken(APITestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()

    def test_get_all_users_with_manual_authentication(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.is_superuser = True
        user1.save()
        user2 = User(username='user2')
        user2.set_password('12345')
        user2.save()
        post_data = {
            'username': user1.get_username(),
            'password': '12345'
        }

        # 'Logging in' and getting the JSON web token
        request = self.request_factory.post(
            reverse('auth:token'), post_data, format='json'
        )
        view = ObtainJSONWebToken.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('token'))

        # Performing a 'SuperUser' action

        # With APIClient
        # self.client.credentials(HTTP_AUTHORIZATION='JWT {}'.format(response.data.get('token')))
        # response = self.client.get(
        #     reverse('users:user-list'), format='json'
        # )

        # With APIRequestFactory (more explicit)
        request = self.request_factory.get(
            reverse('users:user-list'), format='json', HTTP_AUTHORIZATION='JWT {}'.format(response.data.get('token'))
        )
        view = UserList.as_view()
        response = view(request)
        response.render()
        serializer = UserSerializer(User.objects.all(), many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
