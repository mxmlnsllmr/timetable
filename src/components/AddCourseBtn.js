import React from 'react';


export default class AddCourseBtn extends React.Component {

  render() {
    return (
        <button type="button" className="btn btn-primary btn-lg glyphicon glyphicon-plus-sign"
                data-toggle="modal" data-target="#myModal">
        </button>
    );
  }
}