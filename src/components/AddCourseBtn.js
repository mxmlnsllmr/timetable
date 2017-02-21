import React from 'react';


export default class AddCourseBtn extends React.Component {

  render() {
    return (
        <button type="button" className="btn btn-primary btn-lg glyphicon glyphicon-plus-sign btn-margin-right"
                data-toggle="modal" data-target="#myModal">
        </button>
    );
  }
}