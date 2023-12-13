import React from 'react';

const JobDetail = ({ isOpen, closeModal, data}) =>{
    if(!isOpen){
        return null;
    } else {
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Modal Content</h2>
                {/* Dis play data received from the parent component */}
                <p>{data.title}</p>
                <p>{data.description}</p>
                <button onClick={closeModal}>Close Modal</button>
            </div>
        </div>
    }
}

export default JobDetail;