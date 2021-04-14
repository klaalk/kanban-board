import {headerReducer} from "../components/header/state/header.reducer";
import {listBoardsReducer} from "../components/list-boards/state/list-boards.reducer";
import {workBoardReducer} from "../components/work-board/state/work-board.reducer";
import AppAction from "./app.action";
import {AppMode} from "../enums/app-mode.enum";

export function appReducer(actualState, action) {
    let state = {...actualState, action: action};

    state = headerReducer(state, action);
    state = workBoardReducer(state, action);
    state = listBoardsReducer(state, action);

    switch (action.type) {
        case AppAction.Type.GetUserSuccess:
            return {...state, mode: AppMode.Authenticated, user: action.user};

        case AppAction.Type.GetUserFailed:
            return {...state, mode: AppMode.NotAuthenticated, user: null};

        case AppAction.Type.LoadUsersSuccess:
            const users = action.users.filter(user => user.id !== state.user.id);
            return {...state, users: users};

        case AppAction.Type.SetAppMode:
            return {...state, mode: action.mode};

        case AppAction.Type.SetUser:
            return {...state, user: action.user};

        case AppAction.Type.SetAppLoader:
            return {...state, loading: action.loading};

        case AppAction.Type.OpenErrorModal:
            return {...state, errorModal: {show: true, message: action.message}, cardModal: {...state.cardModal, show: false}};

        case AppAction.Type.CloseErrorModal:
            return {...state, errorModal: {show: false, message: ''}};

        default:
            return state;
    }
}
