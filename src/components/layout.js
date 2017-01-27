import React from 'react';
import { Link } from 'react-router';

export default class Layout extends React.Component {
  render () {
    return (
      <div className="app-container">
        <header className="page-header">
          <Link to="/">
            <h1 className="text-center">Timetable</h1>
          </Link>
        </header>
        <div className="app-content">{this.props.children}</div>
      </div>
    );
  }
}
