import API from "../../../../../../api/api";
import BoardAction, {
    DeleteLaneSuccess,
    PostLaneSuccess,
    UpdateLaneSuccess
} from "./board.action";
import {HandleAppError} from "../../../../../state/app.action";

export function boardEffect(action, dispatch, history) {
    switch (action.type) {

        case BoardAction.Type.PostLane:
            API.addLane(action.lane)
                .then((body) => dispatch(PostLaneSuccess({...action.lane, id: body.id, cards: []})))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case BoardAction.Type.UpdateLane:
            API.updateLane(action.lane.id, {title: action.lane.title})
                .then(() => dispatch(UpdateLaneSuccess(action.lane)))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        case BoardAction.Type.DeleteLane:
            API.deleteLane(action.lane.id)
                .then(() => dispatch(DeleteLaneSuccess(action.lane)))
                .catch((err) => {dispatch(HandleAppError(err))});

            break;

        default:
            break;
    }
}
