import CardModalAction from "./card-modal.action";
import {InitCardModalState} from "../../../../state/app.state";

export function cardModalReducer(state, action) {

    switch (action.type) {

        case CardModalAction.Type.OpenCardModal:
            return {...state, cardModal: {...state.cardModal, show: true}};

        case CardModalAction.Type.CloseCardModal:
            return {...state, cardModal: InitCardModalState};

        case CardModalAction.Type.SetCardModalMode:
            return {...state, cardModal: {...state.cardModal, mode: action.mode, loading: false, failed: false}};

        default:
            return state;
    }
}
