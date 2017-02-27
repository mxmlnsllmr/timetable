import React from 'react';



function CoursePreviewPublic(props) {
  return (

  <div className="course-preview list-group">
    <h4 className="name list-group-item active course-preview-top">{props.name}</h4>
    <h4 className="list-group-item course-preview-items">{props.teacher}</h4>
    <h4 className="list-group-item course-preview-items">{props.place}</h4>
  </div>


  );
}
export default CoursePreviewPublic;