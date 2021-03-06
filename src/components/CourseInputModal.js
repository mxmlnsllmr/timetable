import React from 'react';
import Toggle from 'react-bootstrap-toggle';

export default class CourseInputModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      teacher: '',
      description: '',
      place: '',
      courses: null,
      public: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isInputValid = this.isInputValid.bind(this);
    this.onToggle = this.onToggle.bind(this);
  }


  onToggle() {
    this.setState({ public: !this.state.public });
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
    if (this.state.public === false) {
      this.props.createCourseInFirebase(courseData);
    }
    else {
      this.props.createCourseInFirebase(courseData);
      this.props.createCourseInFirebaseAsPublic(courseData);
    }


    this.setState({
      courseName: '',
      teacher: '',
      description: '',
      place: '',
      public: true
    });
    event.preventDefault();
  }

  handleChange(event) {


    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });




    /*const value = target.type === 'checkbox' ? target.checked : target.value;
     this.setState({
     [event.target.name]: event.target.value
     });*/
  }

  isInputValid() {
    return this.state.courseName.length > 0 && this.state.teacher.length > 0 && this.state.place.length > 0;
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <hr />
          </div>
          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"
               aria-labelledby="myModalLabel">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"
                          aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 className="modal-title" id="myModalLabel">Add course</h4>
                </div>
                <div className="modal-body">
                  <div className="input-group">
                    <input type="text" name="courseName" value={this.state.courseName}
                           onChange={this.handleChange} placeholder="coursename"
                           className="form-control"/>
                    <input type="text" name="teacher" value={this.state.teacher}
                           onChange={this.handleChange} placeholder="teacher"
                           className="form-control"/>
                    <input type="text" name="place" value={this.state.place}
                           onChange={this.handleChange} placeholder="place"
                           className="form-control"/>
                    <textarea className="form-control textarea"
                              value={this.state.description} onChange={this.handleChange}
                              name="description" rows="3"
                              placeholder="description"></textarea>
                  </div>
                </div>
                <div className="modal-footer">

                  <div className="pull-left">
                  <Toggle
                          size="sm"
                          name="public"
                          type="checkbox"
                          on="public"
                          off="private"
                          offstyle="danger"
                          onstyle="success"
                          active={this.state.public}
                          checked={this.state.public}
                          onChange={this.handleChange}
                          onClick={this.onToggle} />
                </div>


                  <button type="button" className="btn btn-default btn-sm" data-dismiss="modal">
                    Close
                  </button>
                  <button disabled={!this.isInputValid()} type="submit" value="Submit" className="btn btn-primary btn-sm">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
    );
  }
}