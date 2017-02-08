import React from 'react';
import {Link} from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-default">
          <ul className="nav nav-pills">
            <li role="presentation"><Link to="/timetable">Timetable</Link></li>
            <li role="presentation"><Link to="/courses">Courses</Link></li>
          </ul>
        </nav>
    );
  }
}
