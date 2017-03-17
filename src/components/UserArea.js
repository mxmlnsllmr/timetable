import React from 'react';
import NavBar from './NavBar';
import firebaseApp from '../static/Firebase';


export default class UserArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      data: null
    };

    const user = firebaseApp.auth().currentUser;

    this.firebaseRef = firebaseApp.database().ref('users/' + user.uid + '/data');
    this.onGotData = this.onGotData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onErrData = this.onErrData.bind(this);


  }


  onGotData(data) {
    this.setState({
      data: data.val()
    });
  }

  onErrData(errData) {
    console.log('Error!');
    console.log(errData);
  }

  componentDidMount() {
    this.firebaseRef.on('value', this.onGotData, this.onErrData);
    if (this.state.data !== null) {
      const userData = this.state.data;
      this.setState({
        firstname : userData[Object.keys(userData)].firstname
      });
    }
  }

  // Überprüft ob User eingeloggt
  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(function (user) {

      if (!user) {
        console.log('user not logged in');
        this.context.router.push('/Login');
      }
      else {
        console.log(user.email);
      }
    }.bind(this));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render() {


    //console.log('timetable');
    return (
        <div className="col-md-12">
          <NavBar />
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="firstname" onChange={this.handleChange} type="text" value={this.state.firstname} className="form-control"
                         id="firstname"
                         placeholder="Enter firstname"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="name" onChange={this.handleChange} type="text" className="form-control"
                         id="name"
                         placeholder="Enter name"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="university" onChange={this.handleChange} type="text" className="form-control"
                         id="university"
                         placeholder="Enter university"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="city" onChange={this.handleChange} type="text" className="form-control"
                         id="city"
                         placeholder="Enter city"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="email" onChange={this.handleChange} type="email" className="form-control"
                         id="LoginEmail"
                         aria-describedby="emailHelp"
                         placeholder="Enter email"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <input name="password" onChange={this.handleChange} type="password" className="form-control"
                         id="exampleInputPassword1" placeholder="Password"/>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-4 col-md-offset-4">
                  <button type="submit" className="btn btn-success btn-block">Update</button>
                </div>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

