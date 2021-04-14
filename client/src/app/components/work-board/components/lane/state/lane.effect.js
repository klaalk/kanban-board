import API from "../../../../../../api/api";
import LaneAction, {
    DeleteCardSuccess,
    GetCard,
    GetCardSuccess, LoadCards, LoadCardsSuccess, MoveCardSuccess,
    PostCardFailed,
    PostCardSuccess,
    UpdateCardFailed,
    UpdateCardSuccess,
} from "./lane.action";
import {OpenCardModal} from "../../../../modals/card-modal/state/card-modal.action";
import {CardStatus} from "../../../../../enums/card-status.enum";
import {HandleAppError} from "../../../../../state/app.action";

export function laneEffect(action, dispatch, history) {
    switch (action.type) {

        case LaneAction.Type.AddCard:
            dispatch(OpenCardModal());
            break;

        case LaneAction.Type.ShowCard:
        case LaneAction.Type.EditCard:
            dispatch(GetCard(action.cardId));
            break;

        case LaneAction.Type.LoadCards:
            const newLanePromise = API.getCards(action.laneId, action.status);
            const oldLanePromise = action.oldLaneId ? API.getCards(action.oldLaneId,  action.status) : Promise.resolve();

            Promise.all([newLanePromise, oldLanePromise])
                .then((results) => {
                    dispatch(LoadCardsSuccess(action.status,
                        {id: action.laneId, cards: results[0]},
                        {id: action.oldLaneId, cards: results[1]}));
                })
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case LaneAction.Type.GetCard:
            API.getCard(action.cardId)
                .then((card)=> dispatch(GetCardSuccess(card)))
                .catch((err) => {dispatch(HandleAppError(err))});
            break;

        case LaneAction.Type.GetCardSuccess:
            dispatch(OpenCardModal());
            break;

        case LaneAction.Type.DeleteCard:
            API.deleteCard(action.card.id)
                .then(() => {dispatch(DeleteCardSuccess(action.card))})
                .catch((err) => {dispatch(HandleAppError(err))});
            break;

        case LaneAction.Type.MoveCard:
            API.updateCard(action.card.id, action.card)
                .then(() => dispatch(MoveCardSuccess(action.card, action.oldLaneId)))
                .catch((err) => {dispatch(HandleAppError(err))});
            break;

        case LaneAction.Type.PostCard:
            API.addCard(action.card)
                .then(() =>  dispatch(PostCardSuccess(action.card)))
                .catch(() => dispatch(PostCardFailed()));
            break;

        case LaneAction.Type.UpdateCard:
            API.updateCard(action.card.id, action.card)
                .then(() =>  dispatch(UpdateCardSuccess(action.card)))
                .catch(() => dispatch(UpdateCardFailed()));
            break;

        case LaneAction.Type.PostCardSuccess:
        case LaneAction.Type.UpdateCardSuccess:
        case LaneAction.Type.MoveCardSuccess:
        case LaneAction.Type.DeleteCardSuccess:
            dispatch(LoadCards(CardStatus.Active, action.card.laneId, action.oldLaneId));
            break;

        default:
            break;
    }
}
