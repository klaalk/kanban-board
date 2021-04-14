import HeaderAction, {LogoutCompleted, SubmitLoginFailed, SubmitLoginSuccess} from "./header.action";
import API from "../../../../api/api";
import {NavigateTo} from "../../../state/app.action";
import {SetBoard} from "../../list-boards/state/list-boards.action";
import TrialBoard from "../../../constants/trial-board.constant";

export function headerEffect(action, dispatch, history) {
    switch (action.type) {
        case HeaderAction.Type.SubmitLogin:
            API.login(action.username, action.password)
                .then((user) => {
                    dispatch(SubmitLoginSuccess(user));
                })
                .catch((err) => {
                    const errorMsg = err && err.errors && err.errors[0] ? err.errors[0].msg : 'Generic error';
                    dispatch(SubmitLoginFailed(errorMsg));
                });
            break;

        case HeaderAction.Type.SubmitLoginSuccess:
            dispatch(NavigateTo('/all-boards'));
            break;

        case HeaderAction.Type.Logout:
            API.logout()
                .then(() => {
                    console.log("User logged out successfully");
                })
                .catch((err) => {
                    console.log("User logged out with errors");
                    console.log(err);
                }).finally(() => dispatch(LogoutCompleted()));
            break;

        case HeaderAction.Type.LogoutCompleted:
            dispatch(SetBoard(TrialBoard));
            break;

        default:
            break;
    }
}
