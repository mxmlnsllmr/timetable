import React from 'react';
import NavBar from './NavBar';
import CoursePreview from './CoursePreview';
import AddCourseBtn from './AddCourseBtn';
import CourseInputModal from './CourseInputModal';
import firebaseApp from '../static/Firebase';


export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };

    this.firebaseRef = firebaseApp.database().ref('courses');

    this.onGotData = this.onGotData.bind(this);
    this.createCourseInFirebase = this.createCourseInFirebase.bind(this);
    this.deleteCourseInFirebase = this.deleteCourseInFirebase.bind(this);
  }

  onGotData(data) {
    this.setState({
      courses: data.val()
    });
  }

  onErrData(errData) {
    console.log('Error!');
    console.log(errData);
  }


  componentDidMount() {
    console.log('component did mount');
    this.firebaseRef.on('value', this.onGotData, this.onErrData);
  }

  createCourseInFirebase(objectCourses) {
    this.firebaseRef.push(objectCourses);
  }

  deleteCourseInFirebase(data){
    this.firebaseRef.child(data).remove();
  }

  render() {
    let coursePreviews;
    if (this.state.courses !== null) {
      const courseData = this.state.courses;
      const keys = Object.keys(courseData);
      coursePreviews = keys.map(function (key) {
        return <CoursePreview name={courseData[key].name} teacher={courseData[key].teacher}
                              place={courseData[key].place} key={key} deleteCourseInFirebase={this.deleteCourseInFirebase}/>
      });
    }


    return (
        <div className="col-md-12">
          <NavBar />
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Courses</h3>
            </div>
            <div className="panel-body">
              <AddCourseBtn />
              <CourseInputModal createCourseInFirebase={this.createCourseInFirebase}/>
              <div className="course-selector">
                {coursePreviews}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
