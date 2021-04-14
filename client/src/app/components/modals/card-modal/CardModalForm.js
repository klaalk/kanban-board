import React, {useEffect, useState} from 'react';
import Loader from 'react-loader-spinner';
import {Button, Modal, Form} from "react-bootstrap";
import {
    CloseCardModal,
    SetCardModalMode,
} from "./state/card-modal.action";
import {CardModalMode} from "../../../enums/card-modal-mode.enum";
import {useStateValue} from "../../../state/state.provider";
import {PostCard, UpdateCard} from "../../work-board/components/lane/state/lane.action";

import "./CardModal.css";

function CardModalForm() {
    const [state, dispatch] = useStateValue();

    const {failed, loading, show, mode} = state.cardModal;
    const card = state.cardModal.form;

    const [localCard, setLocalCard] = useState( {...card, submitted: false});

    useEffect(() =>
        setLocalCard((localCard) => ({...localCard, ...card})), [card]);

    const onChangeTitle = (event) => {
        setLocalCard({...localCard, title:  event.target.value});
    };

    const onChangeDescription = (event) => {
        setLocalCard({...localCard, description:  event.target.value});
    };

    const onChangeDeadline = (event) => {
        setLocalCard({...localCard, deadline:  event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isValidForm()) {
            const updateCard = {
                id: card.id,
                laneId: card.laneId,
                position: card.position,
                title: localCard.title,
                description: localCard.description,
                deadline: localCard.deadline,
                status: localCard.status,
            }
            updateCard.id ? dispatch(UpdateCard(updateCard)) : dispatch(PostCard(updateCard));
            setLocalCard({...localCard, submitted : true});
        }
    }

    const isValidForm = () => {
        return localCard.title.trim() !== '' && localCard.description.trim() !== '';
    }

    const handleCancel = () => {
        if (!loading) {
            dispatch(CloseCardModal());
        }
    }

    return (
        <Modal
            show={show && mode !== CardModalMode.Show}
            onHide={handleCancel}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {card.id ? "Edit your card" : "Add a new card"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={(ev) => handleSubmit(ev)}>
                    <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control name="title" placeholder="Insert title" type="text"
                                      disabled={loading} value={localCard.title}
                                      onChange={(ev) => onChangeTitle(ev)} required autoFocus/>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" placeholder="Insert description" as="textarea" rows="3"
                                      maxLength={255}
                                      disabled={loading} value={localCard.description}
                                      onChange={(ev) => onChangeDescription(ev)} required/>
                    </Form.Group>
                    <Form.Group controlId="deadline">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control name="deadline" placeholder="Expire in" type="date"
                                      disabled={loading} value={localCard.deadline || ''}
                                      onChange={(ev) => onChangeDeadline(ev)}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <div className="app-modal--footer">
                    { loading ?
                        <Loader visible={loading} type="ThreeDots"  color="#00BFFF"  height={40}  width={40} />
                        :
                        <>
                            <div className="app-modal--footer-buttons">
                                {
                                    mode === CardModalMode.Edit &&
                                    <div style={{paddingRight: "8px"}}>
                                        <Button variant="outline-secondary" size="md"
                                            onClick={() => dispatch(SetCardModalMode(CardModalMode.Show))}>Back</Button>
                                    </div>
                                }

                            </div>
                            <div className="app-modal--error-msg">{failed  &&  "Connection error"}</div>
                            <Button variant="primary" size="md" disabled={!isValidForm()}
                                    type="submit" onClick={(ev) => handleSubmit(ev)}>Save</Button>
                        </>
                    }
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default CardModalForm;
