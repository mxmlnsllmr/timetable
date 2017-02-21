import React from 'react';
import firebaseApp from '../static/Firebase';
import Login from './Login';

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      name: '',
      university: '',
      city: '',
      email: '',
      password: '',
      backToLogin: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBackToLoginBtn = this.handleBackToLoginBtn.bind(this);


  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.registerUser(this.state.email, this.state.password);

    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.firebaseRef = firebaseApp.database().ref('users/' + user.uid + '/data');
        console.log('clear');
        const dataObject = {
          firstname: this.state.firstname,
          name: this.state.name,
          city: this.state.city,
          university: this.state.university
        };
         console.log(dataObject);
        this.firebaseRef.push(dataObject);
        this.context.router.push('/Timetable');

      } else {
        this.context.router.push('/Login');
      }
    }.bind(this));

    event.preventDefault();
  }



  handleBackToLoginBtn(event){
    this.setState({
      backToLogin: true
    });
    event.preventDefault();
  }

  render() {
    return (
        <div>
          {this.state.backToLogin ? <Login /> :
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="container">
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="firstname" onChange={this.handleChange} type="text" className="form-control"
                               id="firstname"
                               placeholder="Enter firstname" value={this.state.firstname}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="name" onChange={this.handleChange} type="text" className="form-control"
                               id="name"
                               placeholder="Enter name" value={this.state.name}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="university" onChange={this.handleChange} type="text" className="form-control"
                               id="university"
                               placeholder="Enter university" value={this.state.university}/>
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <input name="city" onChange={this.handleChange} type="text" className="form-control"
                               id="city"
                               placeholder="Enter city" value={this.state.city}/>
                      </div>
                    </div>
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
                        <button type="submit" className="btn btn-success btn-block">Sign up</button>
                      </div>
                    </div>
                  </div>
                </form>

                <form onSubmit={this.handleBackToLoginBtn}>
                  <div className="container Register-btn-negative-top">
                    <div className="form-group row">
                      <div className="col-md-4 col-md-offset-4">
                        <button type="submit" className="btn btn-default btn-block">back to login</button>
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

RegisterForm.contextTypes = {
  router: React.PropTypes.object
};