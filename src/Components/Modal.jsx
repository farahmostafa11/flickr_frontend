/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable linebreak-style */
import './Modal.css';
import 'react-responsive-modal/styles.css';
import React, { useState } from 'react';

function Modal(props) {
  return (
    <>

      <div className="modal__backdrop_main" onClick={props.onRequestClose}>
        <div className="modal__container_main">
          <span className="close" onClick={props.onRequestClose}>&times;</span>
          <h3 className="modal__title_main"># selected</h3>
        </div>
      </div>

      {/* <h2>Bottom Modal</h2> */}

      {/* <!-- Trigger/Open The Modal --> */}
      {/* <button id="myBtn">Open Modal</button> */}
      {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal" data-backdrop="false">Large modal</button> */}
      {/* <!-- The Modal --> */}
      {/* <div id="myModal" className="modal modalmain" role="dialog"> */}

      {/* <div className="modal modal-left fade"
        id="bottom_modal" tabIndex="-1" role="dialog" aria-labelledby="bottom_modal"> */}
      {/* <!-- Modal content --> */}
      {/* <div className="modal-dialog modal-frame modal-bottom"> */}

      {/* <div className="modal-content">
          <div className="modal-header">
            <span className="close">&times;</span>
            <h2>Modal Header</h2>
          </div>
          <div className="modal-body">
            <p>Some text in dal Body</p>
            <p>Some other text...</p>
          </div>
          <div className="modal-footer">
            <h3>Modal Footer</h3>
          </div>
        </div>
      </div> */}
      {/* </div> */}

      {/* <script>
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script> */}
    </>
  );
}

export default Modal;
