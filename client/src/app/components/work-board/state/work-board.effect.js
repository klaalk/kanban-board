import API from "../../../../api/api";
import WorkBoardAction, {
    GetBoardSuccess,
} from "./work-board.action";
import {boardEffect} from "../components/board/state/board.effect";
import {laneEffect} from "../components/lane/state/lane.effect";
import {cardModalEffect} from "../../modals/card-modal/state/card-modal.effect";
import {HandleAppError} from "../../../state/app.action";

export function workBoardEffect(action, dispatch, history) {

    boardEffect(action, dispatch, history);
    laneEffect(action, dispatch, history);
    cardModalEffect(action, dispatch, history);

    switch (action.type) {
        case WorkBoardAction.Type.GetBoard:
            API.getBoard(action.boardId)
                .then((board) => dispatch(GetBoardSuccess(board)))
                .catch((err) => {dispatch(HandleAppError(err))});
            break;

        case WorkBoardAction.Type.GetBoardSuccess:
            history.push('/board/' + action.board.id);
            break;

        default:
            break;
    }
}
