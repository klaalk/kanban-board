import HeaderAction from "./header.action";
import {AppMode} from "../../../enums/app-mode.enum";
import {InitLoginModalState} from "../../../state/app.state";

export function headerReducer(state, action) {

    switch (action.type) {

        case HeaderAction.Type.OpenLogin:
            return {...state, login: {...state.login, show: true, errorMsg: ''}};

        case HeaderAction.Type.CloseLogin:
            return {...state, login: InitLoginModalState};

        case HeaderAction.Type.SubmitLogin:
            return {...state, login: {...state.login, loading: true, form: {username: action.username, password: action.password}}};

        case HeaderAction.Type.SubmitLoginSuccess:
            return {...state, mode: AppMode.Authenticated, login: InitLoginModalState, user: action.user};

        case HeaderAction.Type.SubmitLoginFailed:
            return {...state, mode: AppMode.NotAuthenticated,
                login: {...state.login, failed: true, loading: false, errorMsg: action.errorMsg }
            };
        case HeaderAction.Type.Logout:
            return  {...state, mode: AppMode.NotAuthenticated};

        case HeaderAction.Type.LogoutCompleted:
            return {...state, boards: [], board: null};

        default:
            return state;
    }
}
