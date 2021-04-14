import React, {useEffect, useState} from 'react';
import {Button, Modal, Form} from "react-bootstrap";
import Loader from 'react-loader-spinner'

import "./LoginModal.css"

function LoginModal({props, onSubmit, onCancel}) {
    const {show, loading, failed, errorMsg, form} = props;

    const [state, setState] = useState( {username: form.username, password: form.password, submitted: false});

    useEffect(() => {
        if (form)
            setState(state => ({...state, ...form}));
    }, [form]);

    const onChangeUsername = (event) => {
        setState({...state, username:  event.target.value});
    };

    const onChangePassword = (event) => {
        setState({...state, password:  event.target.value});
    };

    const handleSubmit = (event, onLogin) => {
        event.preventDefault();
        onLogin(state.username, state.password);
        setState({...state, submitted : true});
    }

    return (
        <Modal show={show} onHide={!loading ? onCancel : () => {}}
            size="md" aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Log-in to your account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(ev) => handleSubmit(ev, onSubmit)}>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" name="username" placeholder="Username" disabled={loading} value={state.username}
                                      onChange={(ev) => onChangeUsername(ev)} required autoFocus/>
                        <Form.Control.Feedback type="invalid">Provide your username</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" disabled={loading} value={state.password}
                                      onChange={(ev) => onChangePassword(ev)} required/>
                        <Form.Control.Feedback type="invalid">Provide your password</Form.Control.Feedback>
                    </Form.Group>
                    <div className="app-modal--footer">
                        {   !loading && failed  &&
                            <div className="app-modal--error-msg">{errorMsg}</div>
                        }
                        {   loading ?
                            <Loader visible={loading} type="ThreeDots" color="#00BFFF" height={50} width={50}/>
                            :
                            <Button variant="primary" size="md" type="submit">Login</Button>
                        }
                    </div>
                    </Form>
            </Modal.Body>
        </Modal>
    );
}
export default LoginModal;
