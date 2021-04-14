import {GetUser} from "./app.action";
import {CardModalMode} from "../enums/card-modal-mode.enum";
import {CardStatus} from "../enums/card-status.enum";
import {AppMode} from "../enums/app-mode.enum";

export const InitLoginModalState = {
    show: false,
    failed: false,
    loading: false,
    errorMsg: '',
    form: {
        username: '',
        password: ''
    },
};

export const InitCardModalState = {
    mode: CardModalMode.Show,
    show: false,
    failed: false,
    loading: false,
    errorMsg: '',
    form: {
        id: null,
        laneId: null,
        position: null,
        title: '',
        description: '',
        status: CardStatus.Active,
        deadline: null,
        links: [],
    }
};

export const InitShareModalState = {
    show: false,
    loading: false,
    failed: false,
    errorMsg: '',
    elementId: null,
}

export const AppState = {
    mode: AppMode.InAuthentication,
    loading: true,
    login: InitLoginModalState,
    boards: [],
    users: [],
    board: null,
    cardModal: InitCardModalState,
    shareModal: InitShareModalState,
    user: null,
    action: GetUser(),
    errorModal: {
        show: false,
        message: '',
    }
};
