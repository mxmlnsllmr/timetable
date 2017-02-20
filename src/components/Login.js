import React from 'react';
import NavBar from './NavBar';
import firebaseApp from '../static/Firebase';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.loginUser = this.loginUser.bind(this);
  };


  loginUser(email, password) {
    console.log('logged in');
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });


    if (firebaseApp.auth().currentUser != null)
      this.context.router.push('/Timetable');
  }




  componentWillMount(){
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.context.router.push('/Timetable');

      }
    }.bind(this));
  }


  render() {
    return (
        <div className="col-md-12 ">
          <div><LoginForm loginUser={this.loginUser}/></div>
        </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};
