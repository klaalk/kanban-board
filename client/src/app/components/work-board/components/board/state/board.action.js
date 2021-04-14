const Type = {
    PostLane: 'POST_LANE',
    PostLaneSuccess: 'POST_LANE_SUCCESS',

    UpdateLane: 'UPDATE_LANE',
    UpdateLaneSuccess: 'UPDATE_LANE_SUCCESS',

    DeleteLane: 'DELETE_LANE',
    DeleteLaneSuccess: 'DELETE_LANE_SUCCESS',
}

// LANES ACTIONS

export function PostLane(lane) {
    return {type: Type.PostLane, lane: lane};
}

export function PostLaneSuccess(lane) {
    return {type: Type.PostLaneSuccess, lane: lane};
}

export function UpdateLane(lane) {
    return {type: Type.UpdateLane, lane};
}

export function UpdateLaneSuccess(lane) {
    return {type: Type.UpdateLaneSuccess, lane: lane};
}

export function DeleteLane(lane) {
    return {type: Type.DeleteLane, lane};
}

export function DeleteLaneSuccess(lane) {
    return {type: Type.DeleteLaneSuccess, lane: lane};
}

const BoardAction = {
    Type,
}
export default BoardAction;
