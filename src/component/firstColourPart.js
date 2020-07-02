import React, { useEffect } from 'react';
function FirstColourPart(props) {

  useEffect(() => {
    display("#containerelement", props.sortedArray)
  });

  function display(selector, arr) {
    selector = document.querySelector(selector)
    arr.forEach((e) => {
      var el = document.createElement("div");
      el.style.backgroundColor = "rgb(" + e.join(", ") + ")";
      selector.appendChild(el);
    })
  }
  return (
    <div id="containerelement"></div>
  )
}
export default FirstColourPart;