import React from 'react';
import CourseUpdateModal from './CourseUpdateModal';

export default class CoursePreview extends React.Component {

  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);
    //this.updateCourse = this.updateCourse.bind(this);
    this.modalIdCourse = this.modalId.bind(this);
  }

  deleteCourse(event){
    this.props.deleteCourseInFirebase(this.props.firebaseKey);
    event.preventDefault();
  }
  /*updateCourse(event) {
    const obj = {
      firebaseKey: this.props.firebaseKey,
      courseName: this.props.name,
      teacher: this.props.teacher,
      place: this.props.place,
      description: this.props.description
    };
    this.props.updateCourseInFirebase(obj);
    event.preventDefault();
  }*/

  modalId(){
    return 'myUpdateModal' + this.props.firebaseKey;
  }
  courseID(){
    return '#myUpdateModal' + this.props.firebaseKey;
  }

  render() {
    console.log(this.modalId());
    return (
        <div className="course-preview list-group edit-remove-btns-hover">
          <h4 className="name list-group-item active course-preview-top">{this.props.name}
            <div className="edit-remove-btns">
              <div className="glyphicon glyphicon-remove" onClick={this.deleteCourse}></div>
            </div>
          </h4>
          <h4 className="list-group-item course-preview-items">{this.props.teacher}</h4>
          <h4 className="list-group-item course-preview-items" data-toggle="modal" data-target={this.courseID()}>{this.props.place}
          <div className="edit-remove-btns">
            <div className="glyphicon glyphicon-pencil color-blue"></div>
          </div>
          </h4>
          <CourseUpdateModal id={this.modalId()} courseName={this.props.name} teacher={this.props.teacher} place={this.props.place}/>
        </div>
    );
  }
}
