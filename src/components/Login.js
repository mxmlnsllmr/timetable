import React from 'react';
import firebaseApp from '../static/Firebase';
import LoginForm from './LoginForm';
import SignUpBtn from './SignUpBtn';
import RegisterForm from './RegisterForm';
import ForgotPasswordBtn from './ForgotPasswordBtn';


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registerUser: false,
      email: ''
    };
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.signUp = this.signUp.bind(this);
    this.gotMail = this.gotMail.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.createUserData = this.createUserData.bind(this);
  };

  signUp() {
    this.setState({
      registerUser: true
    });
  }

  componentWillUnmount(){
    this.setState({
      email:'',
      registerUser: false
    });
  }


  loginUser(email, password) {
    firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
  }

  registerUser(email, password) {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
  }

  forgotPassword() {
    const email = this.state.email;
    firebaseApp.auth().sendPasswordResetEmail(email).catch(function (error) {
      alert('bitte E-Mail Adresse eingeben');
    });
  }

  gotMail(email) {
    this.setState({
      email: email
    });
  }

  createUserData(firstname, name, city, university){
    this.setState({
      registerUser: false
    });
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.firebaseRef = firebaseApp.database().ref('users/' + user.uid + '/data');
        const dataObject = {
          firstname: firstname,
          name: name,
          city: city,
          university: university
        };
        console.log(dataObject);
        this.firebaseRef.push(dataObject);
        this.context.router.push('/Timetable');

      } else {
        this.context.router.push('/Login');
      }
    }.bind(this));
  }

  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('über login');
        this.context.router.push('/Timetable');

      }
    }.bind(this));
  }

  render() {
    //console.log('Login');
    return (
        <div className="col-md-12 ">
          {this.state.registerUser ? <RegisterForm createUserData={this.createUserData} registerUser={this.registerUser}/> :
              <div><LoginForm loginUser={this.loginUser} gotMail={this.gotMail}/>
                <SignUpBtn signUp={this.signUp}/> <ForgotPasswordBtn forgotPassword={this.forgotPassword}/></div>}
        </div>
    );
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
};
