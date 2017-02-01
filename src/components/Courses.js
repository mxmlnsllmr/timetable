import React from 'react'
import NavBar from './NavBar';
import CoursePreview from './CoursePreview';
import firebase from 'firebase'
import { connect } from 'react-firebase'

  var config = {
    apiKey: "AIzaSyC7LjL7hd_fSmbxXCpy73w00aerbgLtHLA",
    authDomain: "timetable-cda28.firebaseapp.com",
    databaseURL: "https://timetable-cda28.firebaseio.com",
    storageBucket: "timetable-cda28.appspot.com",
    messagingSenderId: "490238416904"
  };
  firebase.initializeApp(config);




var firebaseRef = firebase.database().ref().child('courses');
var courses = new Array();

export default class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      teacher: '',
      description: '',
      place: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    courses.push(
      {
        name: this.state.courseName,
        teacher: this.state.teacher,
        description: this.state.description,
        place: this.state.place,
        key: Date.now()
      }
    );
    for (var i = 0; i < courses.length; i++) {
      console.log(courses[i]);
    }
    firebaseRef.set(courses);
    event.preventDefault();
    this.forceUpdate();
  }

  updateView() {
    const rootRef = firebase.database().ref().child('courses');
    rootRef.on('value', snap => {
      this.setState({
        name: snap.val()
      });
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <NavBar />
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Courses</h3>
          </div>
          <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
            <button type="button" className="btn btn-primary btn-lg glyphicon glyphicon-plus-sign" data-toggle="modal" data-target="#myModal">
              <span></span>
            </button>
            <div><hr />
            </div>
              <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                      <h4 className="modal-title" id="myModalLabel">Add course</h4>
                    </div>
                    <div className="modal-body">
                      <div className="input-group">
                        <input type="text" name="courseName" value={this.state.courseName} onChange={this.handleChange} placeholder="coursename" className="form-control" />
                        <input type="text" name="teacher" value={this.state.teacher} onChange={this.handleChange} placeholder="teacher" className="form-control" />
                        <input type="text" name="place" value={this.state.place} onChange={this.handleChange} placeholder="place" className="form-control" />
                        <textarea className="form-control textarea" value={this.state.description} onChange={this.handleChange} name="description" rows="3" placeholder="description"></textarea>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                      <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="course-selector">
              <h1>{this.state.name}</h1>
              {courses.map(courseData => <CoursePreview key={courses.key} {...courseData} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
