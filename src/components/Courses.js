import React from 'react';
import NavBar from './NavBar';
import CoursePreview from './CoursePreview';
import AddCourseBtn from './AddCourseBtn';
import CourseInputModal from './CourseInputModal';
import firebaseApp from '../static/Firebase';
import LoadingSpinner from './LoadingSpinner';
import NoCourses from './NoCourses';


export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      courses: null
    };

    this.firebaseRef = firebaseApp.database().ref('courses');

    this.onGotData = this.onGotData.bind(this);
    this.createCourseInFirebase = this.createCourseInFirebase.bind(this);
    this.deleteCourseInFirebase = this.deleteCourseInFirebase.bind(this);
    this.updateCourseInFirebase = this.updateCourseInFirebase.bind(this);
  }

  onGotData(data) {
    this.setState({
      loadingData: false,
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

    var updates = {}
    updates['/-KcZ3NYYs2SUedkeLRKX/'] = {'name':'update yeah die dritte','teacher':'Old McDonald','place':'Kiel'};
    this.firebaseRef.update(updates);
  }

  createCourseInFirebase(objectCourses) {
    this.firebaseRef.push(objectCourses);
  }

  deleteCourseInFirebase(data) {
    this.firebaseRef.child(data).remove();
  }

  updateCourseInFirebase(keyValue) {
    <CourseInputModal keyValue={keyValue}/>;
    console.log(keyValue);
  }

  render() {

    let loading;
    if (this.state.loadingData) {
      loading = <LoadingSpinner />
    }



    let coursePreviews;
    if (this.state.courses !== null) {
      const courseData = this.state.courses;
      const firebaseKeys = Object.keys(courseData);
      coursePreviews = firebaseKeys.map(firebaseKey => <CoursePreview
          deleteCourseInFirebase={this.deleteCourseInFirebase} updateCourseInFirebase={this.updateCourseInFirebase} firebaseKey={firebaseKey}
          name={courseData[firebaseKey].name} teacher={courseData[firebaseKey].teacher}
          place={courseData[firebaseKey].place} key={firebaseKey}/>
      );
    }
    else if (this.state.courses === null && !this.state.loadingData)
      coursePreviews = <NoCourses/>;

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
                {loading}
                {coursePreviews}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
