const Type = {
    OpenLogin: 'OPEN_LOGIN',
    CloseLogin: 'CLOSE_LOGIN',
    SubmitLogin: 'SUBMIT_LOGIN',
    SubmitLoginSuccess: 'SUBMIT_LOGIN_SUCCESS',
    SubmitLoginFailed: 'SUBMIT_LOGIN_FAILED',
    Logout: 'LOGOUT',
    LogoutCompleted: 'LOGOUT_COMPLETED',
}


export function OpenLogin() {
    return {type: Type.OpenLogin};
}

export function CloseLogin() {
    return {type: Type.CloseLogin};
}

export function SubmitLogin(username, password) {
    return {type: Type.SubmitLogin, username: username, password: password};
}

export function SubmitLoginSuccess(user) {
    return {type: Type.SubmitLoginSuccess, user: user};
}

export function SubmitLoginFailed(errorMsg) {
    return {type: Type.SubmitLoginFailed, errorMsg: errorMsg};
}

export function Logout() {
    return {type: Type.Logout};
}

export function LogoutCompleted() {
    return {type: Type.LogoutCompleted};
}

const HeaderAction = {
    Type
};

export default HeaderAction;
