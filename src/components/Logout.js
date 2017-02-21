import React from 'react';
import firebaseApp from '../static/Firebase';


export default class Logout extends React.Component {


  componentDidMount() {
    firebaseApp.auth().signOut();
    window.location.reload(true); //TODO refreshes the page and this is not good
    this.context.router.push('/Login');
  }


  render() {
    return (
        <div></div>
    );
  }
}

Logout.contextTypes = {
  router: React.PropTypes.object
};