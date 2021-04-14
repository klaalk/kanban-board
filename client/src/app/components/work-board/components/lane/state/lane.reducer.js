import LaneAction from "./lane.action";
import {InitCardModalState} from "../../../../../state/app.state";
import {CardModalMode} from "../../../../../enums/card-modal-mode.enum";
import {CardStatus} from "../../../../../enums/card-status.enum";

const updateArchivedCards = (lane, cards) => ({...lane, archivedCards: cards});
const updateCards = (lane, cards) => ({...lane, cards: cards});
const updateLane = (lane, id, status, cards) => {
    if (lane.id === id) {
        if (status === CardStatus.NotActive)
            return updateArchivedCards(lane, cards);
        else if (status === CardStatus.Active)
            return updateCards(lane, cards);
    }
    return lane;
}

export function laneReducer(state, action) {

    switch (action.type) {

        case LaneAction.Type.AddCard:
            return {...state,
                cardModal: {...state.cardModal, mode: CardModalMode.Add,
                        form: {...state.cardModal.form, laneId: action.laneId, position: action.position}
            }};
        case LaneAction.Type.ShowCard:
            return {...state, cardModal: {...state.cardModal, mode: CardModalMode.Show}};

        case LaneAction.Type.EditCard:
            return {...state, cardModal: {...state.cardModal, mode: CardModalMode.Edit}};

        case LaneAction.Type.LoadCardsSuccess:
            let updatedLanes = state.board.lanes.map(lane => updateLane(lane, action.lane.id, action.status, action.lane.cards));
            if (action.oldLane)
                updatedLanes = updatedLanes.map(lane => updateLane(lane, action.oldLane.id, action.status, action.oldLane.cards));

            return {...state, board: {...state.board, lanes: updatedLanes}};

        case LaneAction.Type.GetCardSuccess:
            return {...state, cardModal: {...state.cardModal, form: {...state.cardModal.form, ...action.card}}};

        case LaneAction.Type.DeleteCard:
        case LaneAction.Type.PostCard:
        case LaneAction.Type.UpdateCard:
            return {...state, cardModal: {...state.cardModal, loading: true, failed: false}};

        case LaneAction.Type.DeleteCardSuccess:
        case LaneAction.Type.PostCardSuccess:
        case LaneAction.Type.UpdateCardSuccess:
            return {...state, cardModal: InitCardModalState};

        case LaneAction.Type.PostCardFailed:
        case LaneAction.Type.UpdateCardFailed:
            return {...state, cardModal: {...state.cardModal, loading: false, failed: true}};

        default:
            return state;
    }
}
