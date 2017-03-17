import React from 'react';
import {Link} from 'react-router';
import firebaseApp from '../static/Firebase';




export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }



  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.setState({
          email: user.email
        });
      }
    }.bind(this));
  }

  render() {
    return (

        <nav className="navbar navbar-default">
          <div className="container-fluid">
          <ul className="nav nav-pills">
            <li role="presentation" className="navbar-left"><Link to="/timetable">Timetable</Link></li>
            <li role="presentation" className="navbar-left"><Link to="/courses">Courses</Link></li>
            <li role="presentation" className="navbar-right"><Link to="/logout">Logout</Link></li>
            <li className="navbar-right"><Link to="/userarea">{this.state.email}</Link></li>

          </ul>
          </div>
        </nav>

    );
  }
}
