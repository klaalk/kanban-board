import WorkBoardAction from "./work-board.action";
import {boardReducer} from "../components/board/state/board.reducer";
import {laneReducer} from "../components/lane/state/lane.reducer";
import {cardModalReducer} from "../../modals/card-modal/state/card-modal.reducer";

export function workBoardReducer(state, action) {

    state = boardReducer(state, action);
    state = laneReducer(state, action);
    state = cardModalReducer(state, action);

    switch (action.type) {
        case WorkBoardAction.Type.GetBoardSuccess:
            return {...state, board: {...state.board, ...action.board}};

        default:
            return state;
    }
}
