import React from 'react';


export default class ForgotPasswordBtn extends React.Component {
  constructor(props) {
    super(props);


    this.handleBtnClick = this.handleBtnClick.bind(this);
  };

  handleBtnClick() {
    this.props.forgotPassword();
  }



  render() {
    //console.log('ForgotPasswordBtn');
    return (
        <div className="container">
          <div className="form-group row">
            <div className="col-md-4 col-md-offset-4">
              <p className="text-center cursor-hand text-is-link Register-btn-negative-top"
                 onClick={this.handleBtnClick}>Forgot password?</p>
            </div>
          </div>
        </div>
    );
  }
}