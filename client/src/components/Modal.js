import React from 'react';

function Modal({ isOpen, onClose, result }) {
  if (!isOpen) {
    return null; 
  }
  const modalMessage = result
    ? `${result}` 
    : "No result received. Please check the device or retry.";


  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Test Result</h2>
        </div>
        <div className="modal-body">
          <p>
            The test result is: <strong>{modalMessage}</strong>
          </p>
        </div>
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
