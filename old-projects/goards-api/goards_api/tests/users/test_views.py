from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APITestCase

from auth.views import ObtainJSONWebToken, VerifyJSONWebToken, RefreshJSONWebToken
from users.views import UserList, UserDetail
from users.serializers import UserSerializer
from users.models import User


class TestUsers(APITestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()

    def test_post_user_with_username_and_password_and_email(self):
        self.assertTrue(User.objects.all().count() == 0)
        post_data = {
            'username': 'user1',
            'password': 123456789,
            'email': 'test@gmail.com',
        }

        request = self.request_factory.post(reverse('users:user-list'), post_data, format='json')
        view = UserList.as_view()
        response = view(request)
        response.render()
        serializer = UserSerializer(User.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(User.objects.all().count() == 1)

    def test_post_valid_user_with_invalid_email(self):
        self.assertTrue(User.objects.all().count() == 0)
        post_data = {
            'username': 'user1',
            'password': 123456789,
            'email': 'testgmail.com',
        }

        request = self.request_factory.post(reverse('users:user-list'), post_data, format='json')
        view = UserList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(User.objects.all().count() == 0)

    def test_post_user_with_username(self):
        self.assertTrue(User.objects.all().count() == 0)
        post_data = {
            'username': 'user1',
        }
        response = self.client.post(reverse('users:user-list'), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(User.objects.all().count() == 0)

    def test_post_user_with_no_data(self):
        self.assertTrue(User.objects.all().count() == 0)
        post_data = {}
        response = self.client.post(reverse('users:user-list'), post_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(User.objects.all().count() == 0)

    def test_get_all_users_without_proper_authentication(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        user2 = User(username='user2')
        user2.set_password('12345')
        user2.save()

        request = self.request_factory.get(reverse('users:user-list'), format='json')
        force_authenticate(request, user=user1)
        view = UserList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_users(self):
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

        request = self.request_factory.get(
            reverse('users:user-list'), format='json'
        )
        force_authenticate(request, user=user1)
        view = UserList.as_view()
        response = view(request)
        response.render()
        serializer = UserSerializer(User.objects.all(), many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_one_user(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()

        request = self.request_factory.get(reverse('users:user-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()
        serializer = UserSerializer(User.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, response.data)

    def test_get_one_invalid_user(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()

        request = self.request_factory.get(reverse('users:user-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_password(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        update_data = {
            'password': 'abcde',
        }

        request = self.request_factory.patch(reverse('users:user-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # We confirmed that the update response worked, so let's test the new password in authentication
        update_data = {
            'username': user1.username,
            'password': 'abcde',
        }
        request = self.request_factory.post(reverse('auth:token'), update_data, format='json')
        view = ObtainJSONWebToken.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('token'))

    def test_update_username(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        update_data = {
            'username': 'editedUsername',
        }
        self.assertEqual(User.objects.get(pk=1).username, 'user1')

        request = self.request_factory.patch(reverse('users:user-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.get(pk=1).username, 'editedUsername')

    def test_update_first_and_last_name(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        update_data = {
            'first_name': 'Bobby',
            'last_name': 'Jones'
        }
        self.assertFalse(user1.first_name)
        self.assertFalse(user1.last_name)

        request = self.request_factory.patch(reverse('users:user-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()
        user = User.objects.get(pk=1)
        serializer = UserSerializer(user, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, response.data)
        self.assertEqual(user.first_name, update_data.get('first_name'))
        self.assertEqual(user.last_name, update_data.get('last_name'))

    def test_update_email(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        update_data = {
            'email': 'newEmail@gmail.com'
        }
        self.assertFalse(user1.email)

        request = self.request_factory.patch(reverse('users:user-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()
        user = User.objects.get(pk=1)
        serializer = UserSerializer(user, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, response.data)
        self.assertEqual(user.email, update_data.get('email'))

    def test_update_with_invalid_email(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        update_data = {
            'email': 'newEmail.com'
        }
        self.assertFalse(user1.email)

        request = self.request_factory.patch(reverse('users:user-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()
        user = User.objects.get(pk=1)
        serializer = UserSerializer(user, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(user1.email)

    def test_delete_user(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        self.assertTrue(User.objects.all().count() == 1)

        request = self.request_factory.delete(reverse('users:user-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(User.objects.all().count() == 0)

    def test_delete_invalid_user(self):
        user1 = User(username='user1')
        user1.set_password('12345')
        user1.save()
        self.assertTrue(User.objects.all().count() == 1)

        request = self.request_factory.delete(reverse('users:user-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=user1)
        view = UserDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(User.objects.all().count() == 1)
