import React from 'react';
import NavBar from './NavBar';
import firebaseApp from '../static/Firebase';


export default class Timetable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }

  componentWillMount() {
    let user = firebaseApp.auth().currentUser;

    if (user != null) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  render() {

    return (
        <div className="col-md-12">
          {this.state.isLoggedIn ? <div><NavBar /> <h1> timetable</h1></div> : this.context.router.push('/Login')}
        </div>
    );
  }
}

Timetable.contextTypes = {
  router: React.PropTypes.object
};
