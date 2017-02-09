import React from 'react';

export default class CoursePreview extends React.Component {

  constructor(props) {
    super(props);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  deleteCourse(event){
    //console.log(this.props.firebaseKey);
    this.props.deleteCourseInFirebase(this.props.firebaseKey);
    event.preventDefault();
  }

  render() {
    return (
        <div className="course-preview list-group">
          <h4 className="name list-group-item active course-preview-top test2">{this.props.name}
            <div className="test">
              <div className="glyphicon glyphicon-remove" onClick={this.deleteCourse}></div>
            </div>
          </h4>
          <h4 className="list-group-item course-preview-items">{this.props.teacher}</h4>
          <h4 className="list-group-item course-preview-items">{this.props.place}</h4>
        </div>
    );
  }
}
