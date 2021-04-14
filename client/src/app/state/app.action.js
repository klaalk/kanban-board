import {AppMode} from "../enums/app-mode.enum";

const Type = {
    NavigateTo: 'NAVIGATE_TO',
    GetUser: 'GET_USER',
    GetUserSuccess: 'GET_USER_SUCCESS',
    GetUserFailed: 'GET_USER_FAILED',

    LoadUsers: 'LOAD_USERS',
    LoadUsersSuccess: 'LOAD_USERS_SUCCESS',
    LoadUsersFailed: 'LOAD_USERS_FAILED',

    SetAppMode: 'SET_APP_MODE',
    SetAppLoader: 'SET_APP_LOADER',
    SetUser: 'SET_USER',

    HandleAppError: 'HANDLE_APP_ERROR',

    OpenErrorModal: 'OPEN_ERROR_MODAL',
    CloseErrorModal: 'CLOSE_ERROR_MODAL',
}

export function NavigateTo(path) {
    return { type: Type.NavigateTo, path: path};
}

export function GetUser() {
    return { type: Type.GetUser };
}

export function GetUserSuccess(user) {
    return {type: Type.GetUserSuccess, user: user};
}

export function GetUserFailed() {
    return {type: Type.GetUserFailed};
}

export function LoadUsers() {
    return { type: Type.LoadUsers };
}

export function LoadUsersSuccess(users) {
    return {type: Type.LoadUsersSuccess, users: users};
}

export function LoadUsersFailed() {
    return {type: Type.LoadUsersFailed};
}

export function SetAppMode(mode) {
    return {type: Type.SetAppMode, mode: mode};
}

export function SetAppLoader(loading) {
    return {type: Type.SetAppLoader, loading: loading};
}

export function SetUser(user) {
    return {type: Type.SetUser, user: user, mode: user ? AppMode.Authenticated : AppMode.NotAuthenticated};
}

export function HandleAppError(error) {
    return {type: Type.HandleAppError, error};
}

export function OpenErrorModal(message) {
    return {type: Type.OpenErrorModal, message};
}

export function CloseErrorModal() {
    return {type: Type.CloseErrorModal};
}

const AppAction = {
    Type
};

export default AppAction;
