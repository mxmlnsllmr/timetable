import React from 'react';
import NavBar from './NavBar';
import CoursePreview from './CoursePreview';
import AddCourseBtn from './AddCourseBtn';
import CourseInputModal from './CourseInputModal';
import * as firebase from 'firebase';


export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      teacher: '',
      description: '',
      place: '',
      courses: null
    };

    const config = {
      apiKey: "AIzaSyC7LjL7hd_fSmbxXCpy73w00aerbgLtHLA",
      authDomain: "timetable-cda28.firebaseapp.com",
      databaseURL: "https://timetable-cda28.firebaseio.com",
      storageBucket: "timetable-cda28.appspot.com",
      messagingSenderId: "490238416904"
    };
    firebase.initializeApp(config);
    this.firebaseRef = firebase.database().ref('courses');

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onGotData = this.onGotData.bind(this);
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const courseData =
        {
          name: this.state.courseName,
          teacher: this.state.teacher,
          description: this.state.description,
          place: this.state.place,
          uniqueKey: Date.now()
        }
    this.firebaseRef.push(courseData);
    event.preventDefault();
  }

  componentDidMount() {
    console.log('component did mount');
    this.firebaseRef.on('value', this.onGotData, this.onErrData);
  }

  render() {
    let coursePreviews;
    if (this.state.courses !== null) {
      const courseData = this.state.courses;
      const keys = Object.keys(courseData);
      coursePreviews = keys.map(function (key) {
        return <CoursePreview name={courseData[key].name} teacher={courseData[key].teacher} place={courseData[key].place} key={key}/>
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
              <CourseInputModal  />
              <div className="course-selector">
                <h1>{this.state.name}</h1>
                {coursePreviews}
              </div>
            </div>
          </div>
        </div>
    );
  }
}
