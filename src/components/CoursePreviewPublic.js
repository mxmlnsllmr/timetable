import React from 'react';

function clicked() {
  let el = document.getElementById('test');
  el.style.backgroundColor
}


function CoursePreviewPublic(props) {
  return (
      <div ref="test" onClick={clicked}>{props.name}</div>
  );
}
export default CoursePreviewPublic;