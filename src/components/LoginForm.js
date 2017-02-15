import React from 'react';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    this.props.loginUser(this.state.email, this.state.password);
    event.preventDefault();
  }
  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="container">
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="LoginEmail">Email address</label>
              <div className="col-sm-10">
                <input name="email" onChange={this.handleChange} type="email" className="form-control"
                       id="LoginEmail"
                       aria-describedby="emailHelp"
                       placeholder="Enter email" value={this.state.email}/>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label" htmlFor="exampleInputPassword1">Password</label>
              <div className="col-sm-10">
                <input name="password" onChange={this.handleChange} type="password" className="form-control"
                       id="exampleInputPassword1" placeholder="Password" value={this.state.password}/>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
          </div>
        </form>
    );
  }
}