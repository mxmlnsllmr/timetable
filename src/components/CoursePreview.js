import React from 'react'
import NavBar from './NavBar';

export default class CoursePreview extends React.Component {
  render() {
    return (
        <div className="course-preview list-group">
          <h4 className="name list-group-item active course-preview-top">{this.props.name}</h4>
          <h4 className="list-group-item course-preview-items">{this.props.teacher}</h4>
          <h4 className="list-group-item course-preview-items">{this.props.place}</h4>
        </div>
    );
  }
}
