/**
*
* HomePage
*
*/

import React from 'react';

import styles from './styles.css';
import SideBar from '../SideBar';
import HomePageMainSection from '../HomePageMainSection';
import NavBar from '../NavBar';

function HomePage(props) {
  return (
    <div className={styles.homePageWrapper}>
      <div className={`${styles.navbar} col-xs-12`}>
        <NavBar />
      </div>
      <div className={`${styles.sidebar} col-xs-3`}>
        <SideBar
          createTodo={props.createTodo}
          fetchTodos={props.fetchTodos}
        />
      </div>
      <div className={`${styles.mainsection} col-xs-9`}>
        <HomePageMainSection
          todos={props.todos}
          fetchTodos={props.fetchTodos}
          updateTodo={props.updateTodo}
          deleteTodo={props.deleteTodo}
        />

      </div>

    </div>
  );
}

HomePage.propTypes = {
  createTodo: React.PropTypes.func,
  fetchTodos: React.PropTypes.func,
  updateTodo: React.PropTypes.func,
  deleteTodo: React.PropTypes.func,
  todos: React.PropTypes.object,
};

export default HomePage;
