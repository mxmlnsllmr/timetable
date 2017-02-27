import React from 'react';


export default class SignUpBtn extends React.Component {
  constructor(props) {
    super(props);


    this.handleBtnClick = this.handleBtnClick.bind(this);
  };

  handleBtnClick() {
    this.props.signUp();
  }

  render() {
    //console.log('SignUpBtn');
    return (
        <div className="container">
          <div className="form-group row">
            <div className="col-md-4 col-md-offset-4">
              <button onClick={this.handleBtnClick}
                      type="submit" className="btn btn-default btn-block Register-btn-negative-top">Sign up
              </button>
            </div>
          </div>
        </div>
    );
  }
}