import React from 'react';
import Loader from 'react-loader-spinner'
import {Button, Modal} from "react-bootstrap";
import {CardStatus} from "../../../enums/card-status.enum";
import {CardModalMode} from "../../../enums/card-modal-mode.enum";
import {useStateValue} from "../../../state/state.provider";
import EditableLink from "../../../commons/components/buttons/editable-link/EditableLink";

import {DeleteCard, UpdateCard} from "../../work-board/components/lane/state/lane.action";
import {
    CloseCardModal, DeleteLink,
    PostLink,
    SetCardModalMode,
    UpdateLink
} from "./state/card-modal.action";
import "./CardModal.css";

function CardModalInfo() {

    const [state, dispatch] = useStateValue();
    const {failed, loading, show, mode} = state.cardModal;
    const card = state.cardModal.form;

    const onSaveLink = (link) => dispatch(link.id ? UpdateLink(link) : PostLink(link));
    const onDeleteLink = (link) => dispatch(DeleteLink(link));
    const onArchiveCard = (card) => {
        dispatch(UpdateCard({
            id: card.id,
            laneId: card.laneId,
            position: card.position,
            status: CardStatus.NotActive}))
    };
    return (
        <Modal
            show={show && mode === CardModalMode.Show}
            onHide={!loading ? () => dispatch(CloseCardModal()) : () => {}}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Card information
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="app-modal">
                    <div className="app-modal-info--box">
                        <div className="app-modal-info--label">Title</div>
                        <div className="app-modal-info--value">{card.title}</div>
                    </div>
                    <div className="app-modal-info--box">
                        <div className="app-modal-info--label">Deadline</div>
                        <div className="app-modal-info--value">{card.deadline || '-'}</div>
                    </div>
                    <div className="app-modal-info--box">
                        <div className="app-modal-info--label">Description</div>
                        <div className="app-modal-info--value">{card.description}</div>
                    </div>
                    <div className="app-modal-links--container">
                        <div className="app-modal-links--header">Links ({card.links.length})</div>
                        <div className="app-modal-links--body">
                            <div className="app-modal-links--input">
                                <EditableLink
                                    link={{value: '', cardId: card.id}}
                                    disabled={loading}
                                    editable={true}
                                    lock={true}
                                    onSaveLink={onSaveLink}
                                    onDeleteLink={onDeleteLink}/>
                            </div>
                            {
                                card.links.length > 0 &&
                                card.links.map((link) => (
                                    <EditableLink
                                        key={link.id}
                                        link={link}
                                        disabled={loading}
                                        editable={false}
                                        onSaveLink={onSaveLink}
                                        onDeleteLink={onDeleteLink}/>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="app-modal--footer">
                    {
                        loading ?
                        <Loader visible={loading} type="ThreeDots"  color="#00BFFF"  height={40}  width={40} />
                        :
                        <>
                            <div className="app-modal--footer-buttons">
                                <div style={{paddingRight: "8px"}}>
                                    <Button variant="outline-danger" size="md"
                                            onClick={() => dispatch(DeleteCard(card))}>Delete</Button>
                                </div>
                                <div style={{paddingRight: "8px"}}>
                                    <Button variant="outline-success" size="md"
                                            onClick={() => onArchiveCard(card)}>Archive</Button>
                                </div>
                            </div>
                            <div className="app-modal--error-msg">{failed && "Connection error"}</div>
                            <Button type="button" size="md" onClick={() => dispatch(SetCardModalMode(CardModalMode.Edit))}>Edit</Button>
                        </>

                    }
                </div>
            </Modal.Footer>
        </Modal>
    );
}
export default CardModalInfo;
