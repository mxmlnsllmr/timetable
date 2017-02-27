import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.props.gotMail(event.target.value);
  }

  handleSubmit(event) {
    this.props.loginUser(this.state.email, this.state.password);
    event.preventDefault();
  }

  componentWillUnmount(){
    this.setState({
      email:'',
      password: ''
    });
  }

  render() {
    //console.log('LoginForm');
    return (
        <div>
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
        </div>
    );
  }
}