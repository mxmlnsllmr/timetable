import React from 'react';
import NavBar from './NavBar';
import CoursePreview from './CoursePreview';
import AddCourseBtn from './AddCourseBtn';
import CourseInputModal from './CourseInputModal';
import firebaseApp from '../static/Firebase';
import LoadingSpinner from './LoadingSpinner';
import NoCourses from './NoCourses';
import SearchForCourses from './SearchForCourses'
import CourseSearchModal from './CourseSearchModal';


export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingData: true,
      courses: null,
      publicCourses: null
    };


    let user = firebaseApp.auth().currentUser;


    this.firebaseRef = firebaseApp.database().ref('users/' + user.uid + '/courses');
    this.firebaseRefPublic = firebaseApp.database().ref('public/courses/fh-kiel/iue/2/courses');

    this.onGotData = this.onGotData.bind(this);
    this.onGotDataPublic = this.onGotDataPublic.bind(this);
    this.createCourseInFirebase = this.createCourseInFirebase.bind(this);
    this.deleteCourseInFirebase = this.deleteCourseInFirebase.bind(this);
    this.updateCourseInFirebase = this.updateCourseInFirebase.bind(this);
    this.createCourseInFirebaseAsPublic = this.createCourseInFirebaseAsPublic.bind(this);
    this.pushPublicCourse = this.pushPublicCourse.bind(this);
  }

  onGotData(data) {
    this.setState({
      loadingData: false,
      courses: data.val()
    });
  }
  onGotDataPublic(data){
    this.setState({
      loadingData: false,
      publicCourses: data.val()
    });
  }

  onErrData(errData) {
    console.log('Error!');
    console.log(errData);
  }

  pushPublicCourse(publicCourses){
    this.firebaseRef.push(publicCourses);
  }

  componentDidMount() {
    this.firebaseRef.on('value', this.onGotData, this.onErrData);
    this.firebaseRefPublic.on('value', this.onGotDataPublic, this.onErrData);
  }

  componentWillMount(){
    firebaseApp.auth().onAuthStateChanged(function (user) {
      if (!user) {
        this.context.router.push('/Login');

      }
    }.bind(this));
  }

  createCourseInFirebase(objectCourses) {
    this.firebaseRef.push(objectCourses);
  }

  createCourseInFirebaseAsPublic(objectCourses) {
    this.firebaseRefPublic.push(objectCourses);
  }

  deleteCourseInFirebase(data) {
    this.firebaseRef.child(data).remove();
  }

  updateCourseInFirebase(updateData) {
    let updates = {};
    updates[updateData.firebaseKey] = {
      'name': updateData.name,
      'teacher': updateData.teacher,
      'place': updateData.place
    };
    this.firebaseRef.update(updates);
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
          deleteCourseInFirebase={this.deleteCourseInFirebase} updateCourseInFirebase={this.updateCourseInFirebase}
          firebaseKey={firebaseKey}
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
              <SearchForCourses />
              <CourseSearchModal publicCourses={this.state.publicCourses} pushPublicCourse={this.pushPublicCourse} />
              <CourseInputModal createCourseInFirebaseAsPublic={this.createCourseInFirebaseAsPublic} createCourseInFirebase={this.createCourseInFirebase}/>
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
Courses.contextTypes = {
  router: React.PropTypes.object
};