import React from 'react';
import NavBar from './NavBar';
import firebaseApp from '../static/Firebase';


export default class Timetable extends React.Component {


  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(function (user) {

      if (!user) {
        console.log('user not logged in - timetableComponent');
        this.context.router.push('/Login');
      }
      else {
        console.log(user.email);
      }
    }.bind(this));
  }

  render() {
    return (
        <div className="col-md-12">
          <NavBar />
          <h1> timetable</h1>
        </div>
    );
  }
}

Timetable.contextTypes = {
  router: React.PropTypes.object
};
