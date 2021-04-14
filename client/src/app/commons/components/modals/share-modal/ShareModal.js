import React, {useEffect, useState} from "react";
import Loader from "react-loader-spinner";
import {Button, Form, Modal} from "react-bootstrap";

import "./ShareModal.css";

function ShareModal({props, users, onSubmit, onCancel}) {
    const {show, loading, failed, errorMsg, elementId} = props;
    const user = users[0] || {};
    const [state, setState] = useState( {username: user.username || ''});

    useEffect(() => {
        if (users[0])
            setState(state => ({...state, username: users[0].username}));
    }, [users]);

    const onChangeUsername = (event) => {
        setState({username:  event.target.value});
    };

    const handleSubmit = (event, onSubmit) => {
        event.preventDefault();
        onSubmit(elementId, state.username);
    }

    return (
        <Modal
            show={show}
            onHide={!loading ? onCancel : () => {}}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Share your board</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(ev) => handleSubmit(ev, onSubmit)}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control as="select"
                                      name="username"
                                      placeholder="Username"
                                      disabled={loading}
                                      value={state.username}
                                      onChange={(ev) => onChangeUsername(ev)} required autoFocus>
                            { users && users.map((user, index) => (<option key={index}>{user.username}</option>)) }
                        </Form.Control>
                    </Form.Group>
                    <div className="app-modal--footer">
                        { !loading && failed  &&
                            <div className="app-modal--error-msg">{errorMsg}</div>
                        }
                        { loading ?
                            <Loader visible={loading} type="ThreeDots" color="#00BFFF" height={50} width={50}/>
                            :
                            <Button variant="primary" size="md" type="submit">Share</Button>
                        }
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
export default ShareModal;
