import React from 'react';
import CoursePreviewPublic from './CoursePreviewPublic';


export default class CourseSearchModal extends React.Component{
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.pushPUBLIC = this.pushPUBLIC.bind(this);

  }


  pushPUBLIC(publicCourses){
    console.log(publicCourses);
    this.props.pushPublicCourse(publicCourses);
  }

  onSubmit(event){
    //this.props.pushPublicCourse();
    event.preventDefault();
  }


  render() {
    let publicC;

    if (this.props.publicCourses !== null) {
      const courseData = this.props.publicCourses;
      const firebaseKeysPublic = Object.keys(courseData);
      publicC = firebaseKeysPublic.map(firebaseKey => <CoursePreviewPublic
          firebaseKey={firebaseKey}
          name={courseData[firebaseKey].name} teacher={courseData[firebaseKey].teacher} place={courseData[firebaseKey].place} key={firebaseKey} uniqueKey={courseData[firebaseKey].uniqueKey} pushPUBLIC={this.pushPUBLIC}/>
      );
    }
    return(
        <form onSubmit={this.onSubmit}>
      <div>
        <hr />
      </div>
      <div className="modal fade" id="myCourseSearchModal" tabIndex="-1" role="dialog"
           aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"
                      aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title" id="myModalLabel">Search for courses</h4>
            </div>
            <div className="modal-body">
              {publicC}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
              <button type="submit" value="Submit" className="btn btn-primary">Submit
              </button>




            </div>
          </div>
        </div>
      </div>
    </form>
    );
  }
}