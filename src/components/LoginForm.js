import React from 'react';
import firebaseApp from '../static/Firebase';
import RegisterForm from './RegisterForm';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      registerUser: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.loginUser(this.state.email, this.state.password);

    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.context.router.push('/Timetable');

      } else {
        console.log('not logged in');
      }
    }.bind(this));

    event.preventDefault();
  }


  registerUser(email, password) {
    firebaseApp.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
  }

  handleRegister(event) {
    this.setState({
      registerUser: true
    });
    event.preventDefault();
  }

  forgotPassword() {
    const email = this.state.email;
    firebaseApp.auth().sendPasswordResetEmail(email).catch(function (error) {
      alert('bitte E-Mail Adresse eingeben');
    });

  }

  render() {
    return (
        <div>
          {this.state.registerUser ? <RegisterForm registerUser={this.registerUser}/> : <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="container">
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="email" onChange={this.handleChange} type="email" className="form-control"
                               id="LoginEmail"
                               aria-describedby="emailHelp"
                               placeholder="Enter email" value={this.state.email}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="password" onChange={this.handleChange} type="password" className="form-control"
                               id="exampleInputPassword1" placeholder="Password" value={this.state.password}/>
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                      </div>
                    </div>
                  </div>
                </form>

                <form onSubmit={this.handleRegister}>
                  <div className="container Register-btn-negative-top">
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <button type="submit" className="btn btn-default btn-block">Sign up</button>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <p className="text-center cursor-hand text-is-link Register-btn-negative-top" onClick={this.forgotPassword}>Forgot Password?</p>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

          }

        </div>



    );
  }
}

LoginForm.contextTypes = {
  router: React.PropTypes.object
};