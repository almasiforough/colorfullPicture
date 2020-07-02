import React, { useEffect } from 'react';
function SecondColourPart(props) {

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
export default SecondColourPart;