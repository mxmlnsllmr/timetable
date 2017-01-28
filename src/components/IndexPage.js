import React from 'react';
import NavBar from './NavBar';

export default class IndexPage extends React.Component {
  render() {
    return (
      <div className="col-md-12">
        <NavBar />
        <h1> Welcome to our page</h1>
      </div>
    );
  }
}
