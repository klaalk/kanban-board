import React from "react";
import {MdClose, MdPersonAdd} from "react-icons/all";
import EditableLabel from "../buttons/editable-label/EditableLabel";
import "./BoardPreview.css"

function BoardPreview({block, focus, board, owned,
                          onOpenBoard, onEditBoard, onResetBoard, onDeleteBoard, onOpenShareBoard}) {

    const {title, totalCards, expiredCards, shared} = board;
    return (
        <div className="app-board-prev">
            <div className="app-board-prev--header">
                <EditableLabel block={block}
                               focus={focus}
                               title={title}
                               onLabelClick={onOpenBoard}
                               onSubmit={onEditBoard}
                               onReset={onResetBoard}/>
                <div className="app-board-prev--icon-close" onClick={onDeleteBoard}><MdClose/></div>
            </div>
            <div className="app-board-prev--body">
                <div className="app-board-prev--info">
                    {   shared === 1 && !owned &&
                    <div>
                        <div className="app-board-prev--label">Created by {board.username}</div>
                        <div className="app-board-prev--label">Shared at {board.sharedDate}</div>
                    </div>
                    }

                    <div><div className="app-board-prev--label"> {shared === 1 && owned &&"Shared"}</div></div>
                    <div>
                        <div className="app-board-prev--label">Cards: {totalCards || 0}</div>
                        <div className="app-board-prev--label">Expired cards: {expiredCards || 0}</div>
                    </div>


                </div>

                <div className="app-board-prev--actions">
                    <div className="app-board-prev--icon-add-person" onClick={onOpenShareBoard}><MdPersonAdd/></div>
                </div>
            </div>
        </div>
    );
}

export default BoardPreview;
