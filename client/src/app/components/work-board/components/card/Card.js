import React from "react";
import {MdEdit, MdClose,MdArrowDownward, MdArrowUpward,
    MdKeyboardArrowUp, MdKeyboardArrowDown, MdKeyboardArrowLeft, MdKeyboardArrowRight} from "react-icons/all";
import {CardStatus} from "../../../../enums/card-status.enum";

import "./Card.css";

function Card({card, isStatic, isTop, isBottom, isLeft, isRight,
                  onShow, onEdit, onMove, onDelete, onArchive, onUnArchive}) {

    const isArchived = card.status === CardStatus.NotActive;
    const classArchived = isArchived ? "--archived" : "";
    const classStatic = (isStatic) ? "--static" : "";


    const moveCard = (direction) => {
        if (!isArchived) {
            let canMove = true;

            if(isTop && direction==='up')
                canMove = false;
            if(isBottom && direction==='down')
                canMove = false;
            if(isLeft && direction==='left')
                canMove = false;
            if(isRight && direction==='right')
                canMove = false;

            if(canMove  && !isStatic) {
                onMove(direction);
            }

        }
    };

    const showCard = () => {
        if (!isArchived && !isStatic) {
            onShow();
        }
    };

    const editCard = () => {
        if (!isArchived && !isStatic) {
            onEdit();
        }
    };

    const deleteCard = () => {
        if (!isArchived && !isStatic) {
            onDelete();
        }
    };

    const archiveCard = () => {
        if (!isArchived && !isStatic) {
            onArchive();
        }
    };

    const unArchiveCard = () => {
        if (isArchived && !isStatic) {
            onUnArchive();
        }
    };

    const CardArrow = ({blocked, action, children}) => (
        <div className={`app-card--arrow-icon${(blocked) ? "--blocked" : ""}`}
             onClick={action}>{children}</div>
    );

    return (
        <div className={`app-card${classArchived}${classStatic}`}>
            <CardArrow blocked={isTop} action={() => moveCard('up')}><MdKeyboardArrowUp/></CardArrow>
            <div className="app-card--wrapper">
                <CardArrow blocked={isLeft} action={() => moveCard('left')}><MdKeyboardArrowLeft/></CardArrow>
                <div className="app-card--container">
                    <div className="app-card--header">
                        <div className="app-card--title" onClick={() => showCard()}>{card.title}</div>
                        {
                            !isArchived ?
                                <>
                                    <div className="app-card--icon" onClick={() => archiveCard()}><MdArrowDownward/></div>
                                    <div className="app-card--icon" onClick={() => editCard()}><MdEdit/></div>
                                    <div className="app-card--icon" onClick={() => deleteCard()}><MdClose/></div>
                                </>
                                :
                                <div className="app-card--icon" onClick={() => unArchiveCard()}><MdArrowUpward/></div>
                        }
                    </div>
                    <div className="app-card--description" onClick={() => showCard()}>{card.description}</div>
                </div>
                <CardArrow blocked={isRight} action={()=> moveCard('right')}><MdKeyboardArrowRight/></CardArrow>
            </div>
            <CardArrow blocked={isBottom} action={()=> moveCard('down')}><MdKeyboardArrowDown/></CardArrow>
        </div>
    );
}

export default Card;
