import datetime

from dateutil.relativedelta import relativedelta
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from django.test import TestCase
from django.urls import reverse

from users.models import User
from goals.views import DeckList, DeckDetail, HandList, HandDetail, CardList, CardDetail, \
                        MiniCardList, MiniCardDetail, CommentList, CommentDetail
from goals.models import Deck, Hand, Card, MiniCard, Comment
from goals.serializers import DeckSerializer, HandSerializer, CardSerializer, MiniCardSerializer, CommentSerializer


class TestDecks(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.user = User(username='testuser1')
        self.user.set_password('12345')
        self.user.save()

    def test_get_all_decks(self):
        deck = Deck(name='deck', user=self.user)
        deck.save()
        decks = Deck.objects.all()

        request = self.request_factory.get(reverse('goals:deck-list'), format='json')
        force_authenticate(request, user=self.user)
        view = DeckList.as_view()
        response = view(request)
        response.render()
        serializer = DeckSerializer(decks, many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)

        request = self.request_factory.get(reverse('goals:deck-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=2)
        response.render()
        serializer = DeckSerializer(deck, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_deck_with_bad_data(self):
        deck1 = Deck(name='testdeck1', user=self.user)
        deck1.save()

        request = self.request_factory.get(reverse('goals:deck-detail', kwargs={'pk': 2}))
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_deck(self):
        post_data = {
            'name': 'testdeck',
        }
        request = self.request_factory.post(reverse('goals:deck-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = DeckList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_deck_with_invalid_data(self):
        post_data = {}
        request = self.request_factory.post(reverse('goals:deck-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = DeckList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)
        update_data = {
            'name': 'editedDeck2',
        }

        request = self.request_factory.put(reverse('goals:deck-detail', kwargs={'pk': 2}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=2)
        response.render()
        serializer = DeckSerializer(deck, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data.get('name', None), 'editedDeck2')
        self.assertTrue(serializer.data.get('name', None), 'editedDeck2')

    def test_update_deck_with_bad_data(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)
        update_data = {
            'bad': 'editedDeck2',
        }

        request = self.request_factory.put(reverse('goals:deck-detail', kwargs={'pk': 2}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_update_invalid_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)
        update_data = {'name': 'editedDeck2'}

        request = self.request_factory.put(reverse('goals:deck-detail', kwargs={'pk': 3}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=3)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)
        self.assertTrue(Deck.objects.all().count() == 2)

        request = self.request_factory.delete(reverse('goals:deck-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(Deck.objects.all().count() == 1)
        self.assertTrue(Deck.objects.all()[0].pk == 1)

    def test_delete_invalid_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        deck = Deck.objects.get(pk=2)
        self.assertTrue(Deck.objects.all().count() == 2)

        request = self.request_factory.delete(reverse('goals:deck-detail', kwargs={'pk': 3}), format='json')
        force_authenticate(request, user=self.user)
        view = DeckDetail.as_view()
        response = view(request, pk=3)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Deck.objects.all().count() == 2)


class TestHands(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.user = User(username='testuser1')
        self.user.set_password('12345')
        self.user.save()

    def test_get_all_hands(self):
        hand1 = Hand(name='hand', user=self.user)
        hand1.save()

        request = self.request_factory.get(reverse('goals:hand-list'), format='json')
        force_authenticate(request, user=self.user)
        view = HandList.as_view()
        response = view(request)
        response.render()
        serializer = HandSerializer(Hand.objects.all(), many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_hand(self):
        hand1 = Hand(name='hand1', user=self.user)
        hand2 = Hand(name='hand2', user=self.user)
        hand1.save()
        hand2.save()
        hand = Hand.objects.get(pk=2)

        request = self.request_factory.get(reverse('goals:hand-detail', kwargs={'pk': 2}))
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=2)
        response.render()
        serializer = HandSerializer(hand, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_hand(self):
        hand1 = Hand(name='hand1', user=self.user)
        hand1.save()

        request = self.request_factory.get(reverse('goals:hand-detail', kwargs={'pk': 2}))
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_hand(self):
        self.assertTrue(Hand.objects.all().count() == 0)
        post_data = {
            'name': 'handyman',
        }
        request = self.request_factory.post(reverse('goals:hand-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Hand.objects.get(name='handyman'))

    def test_post_hand_with_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck1.save()
        post_data = {
            'name': 'hand1',
            'deck': {
                'id': deck1.pk
            }
        }
        request = self.request_factory.post(reverse('goals:hand-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Hand.objects.get(name='hand1').deck.name == 'deck1')

    def test_post_hand_with_invalid_data(self):
        self.assertTrue(Hand.objects.all().count() == 0)
        post_data = {}
        request = self.request_factory.post(reverse('goals:hand-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(Hand.objects.all().count() == 0)

    def test_delete_hand(self):
        hand = Hand(name='handyhand', user=self.user)
        hand.save()
        self.assertTrue(Hand.objects.all().count() == 1)
        request = self.request_factory.delete(reverse('goals:hand-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(Hand.objects.all().count() == 0)

    def test_delete_invalid_hand(self):
        hand1 = Hand(name='hand1', user=self.user)
        hand1.save()
        self.assertTrue(Hand.objects.all().count() == 1)
        request = self.request_factory.delete(reverse('goals:hand-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=2)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Hand.objects.all().count() == 1)

    def test_deleting_hand_will_cascade_and_delete_cards(self):
        hand = Hand(name='hand', user=self.user)
        hand.save()
        card = Card(name='card', user=self.user, hand=hand)
        card.save()
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Card.objects.all().count() == 1)
        self.assertTrue(hand.cards.get(pk=1) == card)
        request = self.request_factory.delete(reverse('goals:hand-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(Hand.objects.all().count() == 0)
        self.assertTrue(Card.objects.all().count() == 0)

    def test_update_plain_property(self):
        hand = Hand(name='handyhand', user=self.user)
        hand.save()
        update_data = {
            'name': 'handy'
        }
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Hand.objects.get(pk=1).name == 'handyhand')
        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(Hand.objects.get(pk=1).name == 'handy')

    def test_update_plain_property_with_invalid_hand(self):
        # If you update a valid hand with an invalid property, it'll still 200 OK but nothing will update
        hand = Hand(name='handyhand', user=self.user)
        hand.save()
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Hand.objects.get(pk=1).name == 'handyhand')
        update_data = {
            'name': 'hand'
        }
        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 2}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=2)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck2 = Deck(name='deck2', user=self.user)
        deck1.save()
        deck2.save()
        hand1 = Hand(name='hand', deck=deck1, user=self.user)
        hand1.save()
        self.assertTrue(hand1.deck.name == 'deck1')
        update_data = {
            'updated_deck': {
                'id': 2
            }
        }
        self.assertTrue(deck1.hands.get(name='hand'))
        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        serializer = HandSerializer(Hand.objects.get(deck__name='deck2'), context={'request': request})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_deck_from_no_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck1.save()
        hand1 = Hand(name='hand', user=self.user)
        hand1.save()
        self.assertTrue(Hand.objects.get(pk=1).deck is None)
        update_data = {
            'updated_deck': {
                'id': 1
            }
        }
        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        serializer = HandSerializer(Hand.objects.get(deck__name='deck1'), context={'request': request})
        self.assertTrue(Hand.objects.get(pk=1).deck is not None)
        self.assertTrue(Hand.objects.get(pk=1).deck.name == 'deck1')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_deck_of_hand_with_card(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck1.save()
        deck2 = Deck(name='deck2', user=self.user)
        deck2.save()
        hand1 = Hand(name='hand1', deck=deck1, user=self.user)
        hand1.save()
        card1 = Card(name='card1', hand=hand1, user=self.user)
        card1.save()
        hand = Hand.objects.get(pk=1)
        card = Card.objects.get(pk=1)
        self.assertEqual(hand.deck, deck1)
        self.assertEqual(card.hand, hand1)
        self.assertTrue(Deck.objects.all().count() == 2)
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Card.objects.all().count() == 1)
        update_data = {
            'updated_deck': {
                'id': deck2.pk
            }
        }
        self.assertTrue(Card.objects.get(pk=1).hand.deck.name == 'deck1')

        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        serializer = HandSerializer(Hand.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        hand = Hand.objects.get(pk=1)
        card = Card.objects.get(pk=1)
        self.assertEqual(hand.deck, deck2)
        self.assertEqual(card.hand, hand1)
        self.assertTrue(Deck.objects.all().count() == 2)
        self.assertTrue(Hand.objects.all().count() == 1)
        self.assertTrue(Card.objects.all().count() == 1)

    def test_update_with_invalid_deck(self):
        hand1 = Hand(name='hand', user=self.user)
        hand1.save()
        update_data = {
            'updated_deck': {
                'id': 2,
            }
        }
        request = self.request_factory.patch(reverse('goals:hand-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = HandDetail.as_view()
        response = view(request, pk=1)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('deck'), None)


class TestCards(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.user = User(username='testuser1')
        self.user.set_password('12345')
        self.user.save()

    def test_get_all_cards(self):
        card1 = Card(name='card1', user=self.user)
        card2 = Card(name='card2', user=self.user)
        card1.save()
        card2.save()
        cards = Card.objects.all()

        self.assertTrue(cards.count() == 2)
        request = self.request_factory.get(reverse('goals:card-list'), format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()
        serializer = CardSerializer(cards, many=True, context={'request': request})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_card(self):
        card1 = Card(name='card1', user=self.user)
        card2 = Card(name='card2', user=self.user)
        card1.save()
        card2.save()
        card = Card.objects.get(name='card2')

        self.assertTrue(Card.objects.all().count() == 2)
        request = self.request_factory.get(reverse('goals:card-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=2)
        response.render()
        serializer = CardSerializer(card, context={'request': request})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_invalid_card(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()

        self.assertTrue(Card.objects.all().count() == 1)
        request = self.request_factory.get(reverse('goals:card-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=2)
        response.render()
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_post_plain_card(self):
        self.assertTrue(Card.objects.all().count() == 0)
        post_data = {
            'name': 'card1',
        }
        request = self.request_factory.post(reverse('goals:card-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()
        serializer = CardSerializer(Card.objects.get(pk=1), context={'request': request})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(Card.objects.all().count() == 1)

    def test_post_card_with_hand_with_no_deck(self):
        hand1 = Hand(name='hand1', user=self.user)
        hand1.save()
        post_data = {
            'name': 'card1',
            'hand': {
                'id': hand1.pk
            }
        }
        request = self.request_factory.post(reverse('goals:card-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()
        serializer = CardSerializer(Card.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(response.data.get('hand') == 'hand1')

    def test_post_card_with_hand_with_deck(self):
        deck1 = Deck(name='deck1', user=self.user)
        deck1.save()
        hand1 = Hand(name='hand1', deck=deck1, user=self.user)
        hand1.save()
        post_data = {
            'name': 'card1',
            'hand': {
                'id': hand1.pk
            }
        }
        self.assertTrue(Hand.objects.get(name='hand1').deck.pk == 1)

        request = self.request_factory.post(reverse('goals:card-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()
        serializer = CardSerializer(Card.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        card = Card.objects.get(pk=1)
        self.assertEqual(card.hand.name, 'hand1')
        self.assertEqual(card.hand.deck.name, 'deck1')

    def test_post_card_with_invalid_data(self):
        post_data = {
            'bad_property': 'nope',
            # 'name': 'hand' # NOTE: 'name' is a required property, so omitting it will cause this data to be invalid
        }
        request = self.request_factory.post(reverse('goals:card-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_card_with_invalid_hand(self):
        post_data = {
            'name': 'card1',
            'hand': {
                'id': 1,
            }
        }
        self.assertTrue(Hand.objects.all().count() == 0)
        self.assertTrue(Card.objects.all().count() == 0)
        request = self.request_factory.post(reverse('goals:card-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardList.as_view()
        response = view(request)
        response.render()
        serializer = CardSerializer(Card.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Hand.objects.all().count() == 0)
        self.assertTrue(Card.objects.all().count() == 1)
        self.assertEqual(serializer.data, response.data)
        self.assertEqual(response.data.get('hand'), None)
        self.assertEqual(Card.objects.get(pk=1).hand, None)

    def test_update_card_name(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        update_data = {
            'name': 'editedCardName',
        }
        card = Card.objects.get(pk=1)
        self.assertTrue(Card.objects.all().count() == 1)
        self.assertTrue(card.name == 'card1')
        request = self.request_factory.patch(reverse('goals:card-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)

        card = Card.objects.get(pk=1)  # need to bind to object again because old 'card' name references an old object
        serializer = CardSerializer(Card.objects.get(pk=1), context={'request': request})
        self.assertTrue(Card.objects.all().count() == 1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data, response.data)
        self.assertTrue(card.name == 'editedCardName')

    def test_update_card_due_date(self):
        today = datetime.datetime.today()
        card1 = Card(name='card1', user=self.user)
        card1.save()
        update_data = {
            'due_date': (today + relativedelta(days=40)).isoformat()
        }
        self.assertEqual(card1.due_date, None)
        request = self.request_factory.patch(reverse('goals:card-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        card = Card.objects.get(pk=1)
        serializer = CardSerializer(card, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(card.due_date is not None)

    def test_update_card_is_completed(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        update_data = {
            'is_completed': 'True'  # Will serializers coerce too?
        }
        self.assertEqual(card1.is_completed, False)
        request = self.request_factory.patch(reverse('goals:card-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        card = Card.objects.get(pk=1)
        serializer = CardSerializer(card, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(card.is_completed is True)  # Yes, serializers also coerce

    def test_update_hand_of_card(self):
        hand1 = Hand(name='hand1', user=self.user)
        hand1.save()
        card1 = Card(name='card1', user=self.user)
        card1.save()
        update_data = {
            'is_completed': True,  # Can I update a relationship and plain property simultaneously?
            'updated_hand': {
                'id': hand1.pk
            }
        }
        self.assertTrue(Card.objects.get(pk=1).hand is None)

        request = self.request_factory.patch(reverse('goals:card-detail', kwargs={'pk': 1}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        card = Card.objects.get(pk=1)
        serializer = CardSerializer(card, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(card.is_completed, True)  # Yes I can
        self.assertTrue(card.hand == hand1)

    def test_update_invalid_card(self):
        # If you update a valid card with an invalid property, it'll still 200 OK but nothing will update
        card1 = Card(name='card1', user=self.user)
        card1.save()
        update_data = {
            'name': 'editedName',
        }

        request = self.request_factory.patch(reverse('goals:card-detail', kwargs={'pk': 2}), update_data, format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=2)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        card = Card.objects.get(pk=1)
        self.assertTrue(card.name, 'card1')

    def test_delete_plain_card(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        self.assertTrue(Card.objects.all().count() == 1)

        request = self.request_factory.delete(reverse('goals:card-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(Card.objects.all().count() == 0)

    def test_delete_card_of_hand(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        self.assertTrue(Card.objects.all().count() == 1)

        request = self.request_factory.delete(reverse('goals:card-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertTrue(Card.objects.all().count() == 0)

    def test_delete_card_will_cascade_deleting_minicards_and_comments(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard = MiniCard(name='minicard1', card=card1)
        minicard.save()
        comment = Comment(comment='blah', user=self.user, card=card1)
        comment.save()
        self.assertEqual(Card.objects.all().count(), 1)
        self.assertEqual(MiniCard.objects.all().count(), 1)
        self.assertEqual(Comment.objects.all().count(), 1)

        request = self.request_factory.delete(reverse('goals:card-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Card.objects.all().count(), 0)
        self.assertEqual(MiniCard.objects.all().count(), 0)
        self.assertEqual(Comment.objects.all().count(), 0)

    def test_delete_invalid_card(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        self.assertTrue(Card.objects.all().count() == 1)

        request = self.request_factory.delete(reverse('goals:card-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = CardDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Card.objects.all().count() == 1)


class TestMiniCards(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.user = User(username='testuser1')
        self.user.set_password('12345')
        self.user.save()

    def test_post_minicard_with_card_and_name(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'name': 'minicard1',
            'card': {
                'id': card1.pk
            }
        }

        request = self.request_factory.post(reverse('goals:minicard-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardList.as_view()
        response = view(request)
        response.render()
        minicard = MiniCard.objects.get(pk=1)
        serializer = MiniCardSerializer(MiniCard.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(minicard.card == card1)

    def test_post_minicard_with_no_card(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'name': 'minicard1',
        }

        request = self.request_factory.post(reverse('goals:minicard-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(MiniCard.objects.all().count() == 0)

    def test_post_minicard_with_no_name(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'card': {
                'id': card1.pk
            }
        }

        request = self.request_factory.post(reverse('goals:minicard-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(MiniCard.objects.all().count() == 0)

    def test_get_all_minicards(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        minicard2 = MiniCard(name='minicard2', card=card1)
        minicard2.save()
        minicard3 = MiniCard(name='minicard3', card=card1)
        minicard3.save()

        request = self.request_factory.get(reverse('goals:minicard-list'), format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardList.as_view()
        response = view(request)
        serializer = MiniCardSerializer(MiniCard.objects.all(), many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_minicard(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        minicard2 = MiniCard(name='minicard2', card=card1)
        minicard2.save()

        request = self.request_factory.get(reverse('goals:minicard-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=2)
        serializer = MiniCardSerializer(MiniCard.objects.get(pk=2), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_single_minicard(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()

        request = self.request_factory.get(reverse('goals:minicard-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=2)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_minicard_name(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        update_data = {
          'name': 'what',
        }
        self.assertTrue(minicard1.name == 'minicard1')

        request = self.request_factory.patch(
            reverse('goals:minicard-detail', kwargs={'pk': 1}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=1)
        serializer = MiniCardSerializer(MiniCard.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(MiniCard.objects.get(pk=1).name == 'what')

    def test_update_minicard_is_completed(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        update_data = {
          'is_completed': 'True',
        }
        self.assertTrue(minicard1.is_completed is False)

        request = self.request_factory.patch(
            reverse('goals:minicard-detail', kwargs={'pk': 1}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=1)
        serializer = MiniCardSerializer(MiniCard.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(MiniCard.objects.get(pk=1).is_completed is True)

    def test_update_card_of_minicard(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        card2 = Card(name='card2', user=self.user)
        card2.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        update_data = {
            'card': {
                'id': '2'  # will it coerce too?
            }
        }
        self.assertTrue(minicard1.card.pk == 1)

        request = self.request_factory.patch(
            reverse('goals:minicard-detail', kwargs={'pk': 1}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=1)
        serializer = MiniCardSerializer(MiniCard.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(MiniCard.objects.get(pk=1).card.pk == 2)  # yes it does

    def test_update_invalid_minicard(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        update_data = {
          'is_completed': 'True',
        }
        self.assertTrue(minicard1.is_completed is False)

        request = self.request_factory.patch(
            reverse('goals:minicard-detail', kwargs={'pk': 2}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=2)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_minicard_of_card(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()
        self.assertEqual(MiniCard.objects.all().count(), 1)

        request = self.request_factory.delete(
            reverse('goals:minicard-detail', kwargs={'pk': 1}), format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=1)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(MiniCard.objects.all().count(), 0)

    def test_delete_invalid_minicard(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        minicard1 = MiniCard(name='minicard1', card=card1)
        minicard1.save()

        request = self.request_factory.delete(
            reverse('goals:minicard-detail', kwargs={'pk': 2}), format='json'
        )
        force_authenticate(request, user=self.user)
        view = MiniCardDetail.as_view()
        response = view(request, pk=2)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class TestComments(TestCase):

    def setUp(self):
        self.request_factory = APIRequestFactory()
        self.user = User(username='testuser1')
        self.user.set_password('12345')
        self.user.save()

    def test_post_comment_with_user_and_card_and_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'comment': 'This is a comment',
            'card': {
                'id': card1.pk,
            },
        }
        self.assertTrue(Comment.objects.all().count() == 0)

        request = self.request_factory.post(reverse('goals:comment-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CommentList.as_view()
        response = view(request)
        response.render()
        serializer = CommentSerializer(Comment.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(Comment.objects.all().count() == 1)

    def test_post_comment_without_card(self):
        post_data = {
            'comment': 'This is a comment',
        }
        self.assertTrue(Comment.objects.all().count() == 0)

        request = self.request_factory.post(reverse('goals:comment-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CommentList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(Comment.objects.all().count() == 0)

    def test_post_comment_without_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'card': {
                'id': card1.pk,
            },
        }
        self.assertTrue(Comment.objects.all().count() == 0)

        request = self.request_factory.post(reverse('goals:comment-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CommentList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(Comment.objects.all().count() == 0)

    def test_post_comment_with_single_space_for_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        post_data = {
            'comment': ' ',
            'card': {
                'id': card1.pk,
            },
        }
        self.assertTrue(Comment.objects.all().count() == 0)

        request = self.request_factory.post(reverse('goals:comment-list'), post_data, format='json')
        force_authenticate(request, user=self.user)
        view = CommentList.as_view()
        response = view(request)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertTrue(Comment.objects.all().count() == 0)

    def test_get_all_comments_from_user(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        comment2 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment2.save()

        request = self.request_factory.get(reverse('goals:comment-list'), format='json')
        force_authenticate(request, user=self.user)
        view = CommentList.as_view()
        response = view(request)
        response.render()
        serializer = CommentSerializer(Comment.objects.all(), many=True, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_single_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()

        request = self.request_factory.get(reverse('goals:comment-detail', kwargs={'pk': 1}), format='json')
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=1)
        response.render()
        serializer = CommentSerializer(Comment.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_get_invalid_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()

        request = self.request_factory.get(reverse('goals:comment-detail', kwargs={'pk': 2}), format='json')
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        update_data = {
            'comment': 'updated_comment',
        }
        self.assertEqual(Comment.objects.get(pk=1).comment, 'This is a comment')

        request = self.request_factory.patch(
            reverse('goals:comment-detail', kwargs={'pk': 1}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=1)
        response.render()
        serializer = CommentSerializer(Comment.objects.get(pk=1), context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(Comment.objects.get(pk=1).comment, 'updated_comment')

    def test_update_edited_date(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        update_data = {
            'edited_date': datetime.datetime.now(),
        }
        self.assertEqual(Comment.objects.get(pk=1).edited_date, None)

        request = self.request_factory.patch(
            reverse('goals:comment-detail', kwargs={'pk': 1}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=1)
        response.render()
        comment = Comment.objects.get(pk=1)
        serializer = CommentSerializer(comment, context={'request': request})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
        self.assertTrue(comment.edited_date)

    def test_update_invalid_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        update_data = {
            'edited_date': datetime.datetime.now(),
        }
        self.assertEqual(Comment.objects.get(pk=1).edited_date, None)

        request = self.request_factory.patch(
            reverse('goals:comment-detail', kwargs={'pk': 2}), update_data, format='json'
        )
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=2)
        response.render()
        comment = Comment.objects.get(pk=1)

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertFalse(comment.edited_date)

    def test_delete_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        self.assertEqual(Comment.objects.all().count(), 1)

        request = self.request_factory.delete(
            reverse('goals:comment-detail', kwargs={'pk': 1}), format='json'
        )
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=1)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Comment.objects.all().count(), 0)

    def test_delete_invalid_comment(self):
        card1 = Card(name='card1', user=self.user)
        card1.save()
        comment1 = Comment(comment='This is a comment', card=card1, user=self.user)
        comment1.save()
        self.assertEqual(Comment.objects.all().count(), 1)

        request = self.request_factory.delete(
            reverse('goals:comment-detail', kwargs={'pk': 2}), format='json'
        )
        force_authenticate(request, user=self.user)
        view = CommentDetail.as_view()
        response = view(request, pk=2)
        response.render()

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(Comment.objects.all().count(), 1)
