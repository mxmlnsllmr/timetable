import React from 'react';
import Toggle from 'react-bootstrap-toggle';


export default class CoursePreviewPublic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      toggle: false
    };

    this.expandContent = this.expandContent.bind(this);
    this.onToggle = this.onToggle.bind(this);


  }

//Erweitert den Bereich für restliche Informationen bei Klick
  expandContent() {
    if(this.state.isOpen) {
      this.setState({
        isOpen: false
      });
    }
    else {
      this.setState({
        isOpen: true
      });
    }
  }

  //Toggelfunktion
  onToggle() {
    this.setState({ toggle: !this.state.toggle });
  }

  render() {

    var style = {
      display: "inline"
    };


    return (
        <div>
          <ul className="list-group">

            <li onClick={this.expandContent} className="list-group-item"><h3 style={style}><span
                className="label label-info">{this.props.name}</span></h3>

              <div className="pull-right">
                <Toggle
                    onClick={this.onToggle}
                    size="sm"
                    off="Add"
                    on="added"
                    onstyle="success"
                    active={this.state.toggle}/>
              </div>

              {this.state.isOpen ? <div><h4>{this.props.teacher}</h4><h4>{this.props.place}</h4><h4>{this.props.description}</h4></div>
                  : null}


            </li>
          </ul>
        </div>
    );
  }
}
