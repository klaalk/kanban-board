import API from "../../../../api/api";
import ListBoardsAction,
{
    CloseShareBoard,
    LoadBoards,
    LoadBoardsSuccess,
    ShareBoardFailed,
    ShareBoardSuccess
} from "./list-boards.action";

import {HandleAppError, LoadUsers} from "../../../state/app.action";
import {GetBoard} from "../../work-board/state/work-board.action";

export function listBoardsEffect(action, dispatch, history) {

    switch (action.type) {

        case ListBoardsAction.Type.LoadBoards:
            API.getBoards(action.userId, action.shared)
                .then((boards) => {
                    dispatch(LoadBoardsSuccess(boards));
                    if (action.shared)
                        history.push('/shared-boards');
                    else
                        history.push('/all-boards');
                })
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case ListBoardsAction.Type.PostBoard:
            API.addBoard({title: action.title, userId: action.userId})
                .then(() => dispatch(LoadBoards(action.userId)))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case ListBoardsAction.Type.DeleteBoard:
            API.deleteBoard(action.boardId)
                .then(() => dispatch(LoadBoards(action.userId)))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case ListBoardsAction.Type.SetBoard:
            if (action.board.id)
                dispatch(GetBoard(action.board.id));
            break;


        case ListBoardsAction.Type.ShareBoard:
            API.shareBoard(action.boardId, action.username)
                .then(()=>dispatch(ShareBoardSuccess()))
                .catch(()=> dispatch(ShareBoardFailed("Error on sharing with the user")));
            break;

        case ListBoardsAction.Type.ShareBoardSuccess:
            dispatch(CloseShareBoard());
            break;

        case ListBoardsAction.Type.OpenShareBoard:
            dispatch(LoadUsers());
            break;
        default:
            break;
    }

}
