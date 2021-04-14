import React from "react";
import {Modal} from "react-bootstrap";

import "./ErrorModal.css";

function ErrorModal({show, message, onSubmit}) {

    return (
        <Modal
            show={show}
            onHide={onSubmit}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <div>
                        {message}
                    </div>
            </Modal.Body>
        </Modal>
    );
}
export default ErrorModal;
