import API from "../../api/api";
import AppAction, {
    GetUserSuccess,
    GetUserFailed,
    SetAppLoader,
    LoadUsersSuccess,
    LoadUsersFailed,
    OpenErrorModal
} from "./app.action";
import {headerEffect} from "../components/header/state/header.effect";
import {listBoardsEffect} from "../components/list-boards/state/list-boards.effect";
import {workBoardEffect} from "../components/work-board/state/work-board.effect";
import {Logout} from "../components/header/state/header.action";

export function appEffect(action, dispatch, history) {
    console.log("Effect: " + JSON.stringify(action));

    switch (action.type) {

        case AppAction.Type.NavigateTo:
            history.push(action.path);
            break;

        case AppAction.Type.GetUser:
            dispatch(SetAppLoader(true));
            API.getUser()
                .then((user) => {
                    dispatch(GetUserSuccess( user));
                })
                .catch((err) => {
                    dispatch(GetUserFailed());
                })
                .finally(() =>
                    setTimeout(()=> dispatch(SetAppLoader(false)), 300)
                );
            break;

        case AppAction.Type.LoadUsers:
            API.getUsers()
                .then(users => dispatch(LoadUsersSuccess(users)))
                .catch(() => dispatch(LoadUsersFailed()));
            break;

        case AppAction.Type.HandleAppError:
            if (action.error.status === 401)
                dispatch(OpenErrorModal('Sorry, you are not authenticated. Try after login.'));
            else
                dispatch(OpenErrorModal('Sorry, we cannot perform your request. You are logged out, please try later.'));
            break;

        case AppAction.Type.CloseErrorModal:
            dispatch(Logout());
            break;

        default:
            break;
    }

    headerEffect(action, dispatch, history);
    listBoardsEffect(action, dispatch, history);
    workBoardEffect(action, dispatch, history);
}
