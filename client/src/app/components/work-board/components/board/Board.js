import React from "react";
import Lane from "../lane/Lane";
import AddLane from "../../../../commons/components/add-lane/AddLane";
import {useStateValue} from "../../../../state/state.provider";
import CardModalInfo from "../../../modals/card-modal/CardModalInfo";
import CardModalForm from "../../../modals/card-modal/CardModalForm";
import {
    DeleteLane,
    PostLane,
    UpdateLane,
} from "./state/board.action";
import "./Board.css";
import {MdPersonAdd} from "react-icons/all";
import {OpenShareBoard} from "../../../list-boards/state/list-boards.action";
import {GetBoard} from "../../state/work-board.action";

function Board({board}) {

    const dispatch = useStateValue()[1];

    const title = board.title || '';
    const lanes = board.lanes || [];
    const isBlocked = board.static;

    const classBlocked = isBlocked ? "--blocked" : "";
    return (
        <div className="app-board">
            <div className={`app-board--header${classBlocked}`}>
                <div className="app-board--title" onClick={() => { if (!isBlocked) dispatch(GetBoard(board.id)) }}>{title}</div>
                <div className="app-board--icon-add-person"
                     onClick={() => { if (!isBlocked) dispatch(OpenShareBoard(board.id))} }><MdPersonAdd/></div>
            </div>
            <div className="app-board--body">
                {
                    lanes.sort((a,b) => a.position - b.position)
                        .map((lane, index) => (
                        <div className="app-board--element" key={lane.id}>
                            <Lane
                                  lane={lane}
                                  isStatic={isBlocked}
                                  rightLane={lanes[index+1]}
                                  leftLane={lanes[index-1]}
                                  onSubmitLane={(title) => dispatch(UpdateLane({...lane, title}))}
                                  onDeleteLane={() => dispatch(DeleteLane(lane))}
                            />
                            {
                                index === lanes.length-1 &&
                                <AddLane
                                    disabled={isBlocked}
                                    onAddLane={(title) => dispatch(PostLane({boardId: board.id, position: index+1, title}))}/>
                            }
                        </div>
                        )
                    )
                }
                {
                    lanes.length === 0 &&
                    <AddLane disabled={isBlocked}
                        onAddLane={(title) => dispatch(PostLane({boardId: board.id, position: 0, title}))}/>
                }
            </div>
            <CardModalInfo/>
            <CardModalForm/>
        </div>
    );
}

export default Board;
