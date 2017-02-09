import React from 'react';
import CourseInputModal from './CourseInputModal';

export default class CoursePreview extends React.Component {

  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
  }

  deleteCourse(event){
    this.props.deleteCourseInFirebase(this.props.firebaseKey);
    event.preventDefault();
  }
  updateCourse(event) {
    this.props.updateCourseInFirebase(this.props.firebaseKey);
    event.preventDefault();
  }

  render() {
    return (
        <div className="course-preview list-group edit-remove-btns-hover">
          <h4 className="name list-group-item active course-preview-top">{this.props.name}
            <div className="edit-remove-btns">
              <div className="glyphicon glyphicon-remove" onClick={this.deleteCourse}></div>
            </div>
          </h4>
          <h4 className="list-group-item course-preview-items">{this.props.teacher}</h4>
          <h4 className="list-group-item course-preview-items" onClick={this.updateCourse}>{this.props.place}
          <div className="edit-remove-btns">
            <div className="glyphicon glyphicon-pencil color-blue"></div>
          </div>
          </h4>
        </div>
    );
  }
}
