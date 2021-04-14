import CardModalAction from "./card-modal.action";
import API from "../../../../../api/api";
import {GetCard} from "../../../work-board/components/lane/state/lane.action";
import {HandleAppError} from "../../../../state/app.action";

export function cardModalEffect(action, dispatch, history) {
    switch (action.type) {
        case CardModalAction.Type.PostLink:
            API.addLink(action.link)
                .then(r => dispatch(GetCard(action.link.cardId)))
                .catch((err) => {dispatch(HandleAppError(err))});
            break;
        case CardModalAction.Type.UpdateLink:
            API.updateLink(action.link.id, action.link)
                .then(r => dispatch(GetCard(action.link.cardId)))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;
        case CardModalAction.Type.DeleteLink:
            API.deleteLink(action.link.id)
                .then(r => dispatch(GetCard(action.link.cardId)))
                .catch((err) => {dispatch(HandleAppError(err))});
            break;
        default:
            break;
    }
}
