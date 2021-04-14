import ListBoardsAction from "./list-boards.action";
import {InitShareModalState} from "../../../state/app.state";

export function listBoardsReducer(state, action) {
    switch (action.type) {

        case ListBoardsAction.Type.LoadBoardsSuccess:
            return {...state, boards: action.boards};

        case ListBoardsAction.Type.SetBoard:
            return {...state, board: action.board};

        case ListBoardsAction.Type.ShareBoard:
            return {...state, shareModal: {...state.shareModal, loading: true, failed: false}};

        case ListBoardsAction.Type.ShareBoardSuccess:
            return {...state, shareModal: {...state.shareModal, loading: false, failed: false}};

        case ListBoardsAction.Type.ShareBoardFailed:
            return {...state, shareModal: {...state.shareModal, loading: false, failed: true, errorMsg: action.errorMsg}};

        case ListBoardsAction.Type.OpenShareBoard:
            return {...state,
                shareModal: {...state.shareModal, show: true, elementId: action.boardId}};

        case ListBoardsAction.Type.CloseShareBoard:
            return {...state, shareModal: InitShareModalState};

        default:
            return state;
    }
}
