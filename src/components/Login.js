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
      password: '',
      registerUser: false
    };

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.callRegisterForm = this.callRegisterForm.bind(this);

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

  registerUser(email, password) {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
  }


  callRegisterForm() {
    this.setState({
      registerUser: true,
    });
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
        <div className="col-md-12">
          {this.state.registerUser ? null : <div><h1>Login</h1> <LoginForm loginUser={this.loginUser}/></div>}
          <p onClick={this.callRegisterForm}>register</p>
          {this.state.registerUser ? <RegisterForm registerUser={this.registerUser}/> : null}
        </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};
