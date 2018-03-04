import React from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { createDeck, fetchDecks, editDeck, deleteDeck } from 'containers/UserPagesContainer/actions/deckActions';
import { createHand, fetchHands, editHand, deleteHand } from 'containers/UserPagesContainer/actions/handActions';
import { createCard, fetchCards, editCard, deleteCard } from 'containers/UserPagesContainer/actions/cardActions';
import { createMiniCard, fetchMiniCards, editMiniCard, deleteMiniCard } from 'containers/UserPagesContainer/actions/miniCardActions';
import { createComment, fetchComments, editComment, deleteComment } from 'containers/UserPagesContainer/actions/commentActions';
import { fetchUser, editUser, deleteUser } from 'containers/UserPagesContainer/actions/userActions';
import { selectDecks, selectHands, selectCards, selectMiniCards, selectComments, selectUser } from 'containers/UserPagesContainer/selectors';

import UserPagesRoutes from 'routes/UserPagesRoutes';

export class UserPagesContainer extends React.Component {
  // Holds all the data for Logged in Users
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    if (this.props && token) {
      // token does not hold pw. Configured by the API.
      const decodedToken = jwtDecode(token);
      if (_.isEmpty(this.props.user)) {
        this.props.fetchUser(decodedToken.user_id, token);
        this.props.fetchDecks(token);
        this.props.fetchHands(token);
        this.props.fetchCards(token);
        this.props.fetchMiniCards(token);
        this.props.fetchComments(token);
      }
    }
  }

  render() {
    if (_.isEmpty(this.props.user)) {
      return <div>Loading User Data...</div>
    }
    return (
      <UserPagesRoutes
        // Decks
        decks={this.props.decks}
        createDeck={this.props.createDeck}
        fetchDecks={this.props.fetchDecks}
        editDeck={this.props.editDeck}
        deleteDeck={this.props.deleteDeck}
        // Hands
        hands={this.props.hands}
        createHand={this.props.createHand}
        fetchHands={this.props.fetchHands}
        editHand={this.props.editHand}
        deleteHand={this.props.deleteHand}
        // Cards
        cards={this.props.cards}
        createCard={this.props.createCard}
        fetchCards={this.props.fetchCards}
        editCard={this.props.editCard}
        deleteCard={this.props.deleteCard}
        // MiniCards
        miniCards={this.props.miniCards}
        createMiniCard={this.props.createMiniCard}
        fetchMiniCards={this.props.fetchMiniCards}
        editMiniCard={this.props.editMiniCard}
        deleteMiniCard={this.props.deleteMiniCard}
        // Comments
        comments={this.props.comments}
        createComment={this.props.createComment}
        fetchComments={this.props.fetchComments}
        editComment={this.props.editComment}
        deleteComment={this.props.deleteComment}
        // Users
        user={this.props.user}
        fetchUser={this.props.fetchUser}
        editUser={this.props.editUser}
        deleteUser={this.props.deleteUser}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: selectDecks(state),
    hands: selectHands(state),
    cards: selectCards(state),
    miniCards: selectMiniCards(state),
    comments: selectComments(state),
    user: selectUser(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // Decks
    createDeck: (token = undefined) => dispatch(createDeck(token)),
    fetchDecks: (token = undefined) => dispatch(fetchDecks(token)),
    editDeck: (deckId = undefined, formSubmitData = {}, token = undefined) => dispatch(editDeck(deckId, formSubmitData, token)),
    deleteDeck: (deckId = undefined, token = undefined) => dispatch(deleteDeck(deckId, token)),
    // Hands
    createHand: (token = undefined) => dispatch(createHand(token)),
    fetchHands: (token = undefined) => dispatch(fetchHands(token)),
    editHand: (handId = undefined, formSubmitData = {}, token = undefined) => dispatch(editHand(handId, formSubmitData, token)),
    deleteHand: (handId = undefined, token = undefined) => dispatch(deleteHand(handId, token)),
    // Cards
    createCard: (token = undefined) => dispatch(createCard(token)),
    fetchCards: (token = undefined) => dispatch(fetchCards(token)),
    editCard: (cardId = undefined, formSubmitData = {}, token = undefined) => dispatch(editCard(cardId, formSubmitData, token)),
    deleteCard: (cardId = undefined, token = undefined) => dispatch(deleteCard(cardId, token)),
    // MiniCards
    createMiniCard: (token = undefined) => dispatch(createMiniCard(token)),
    fetchMiniCards: (token = undefined) => dispatch(fetchMiniCards(token)),
    editMiniCard: (miniCardId = undefined, formSubmitData = {}, token = undefined) => dispatch(editMiniCard(miniCardId, formSubmitData, token)),
    deleteMiniCard: (miniCardId = undefined, token = undefined) => dispatch(deleteMiniCard(miniCardId, token)),
    // Comments
    createComment: (token = undefined) => dispatch(createComment(token)),
    fetchComments: (token = undefined) => dispatch(fetchComments(token)),
    editComment: (commentId = undefined, formSubmitData = {}, token = undefined) => dispatch(editComment(commentId, formSubmitData, token)),
    deleteComment: (commentId = undefined, token = undefined) => dispatch(deleteComment(commentId, token)),
    // Users
    fetchUser: (userId = undefined, token = undefined) => dispatch(fetchUser(userId, token)),
    editUser: (userId = undefined, formSubmitData = {}, token = undefined) => dispatch(editUser(userId, formSubmitData, token)),
    deleteUser: (userId = undefined, token = undefined) => dispatch(deleteUser(userId, token)),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPagesContainer));
