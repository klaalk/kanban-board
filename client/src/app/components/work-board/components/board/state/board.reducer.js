import BoardAction from "./board.action";

export function boardReducer(state, action) {

    switch (action.type) {
        case BoardAction.Type.GetBoardSuccess:
            return {...state, board: {...state.board, ...action.board}};

        case BoardAction.Type.PostLaneSuccess:
            state.board.lanes.push(action.lane)
            return state;

        case BoardAction.Type.UpdateLaneSuccess:
            const updatedLanes = state.board.lanes.map(lane => lane.id === action.lane.id ? {...lane, ...action.lane} : lane);
            return {...state, board: {...state.board, lanes: updatedLanes}};

        case BoardAction.Type.DeleteLaneSuccess:
            const filteredLanes = state.board.lanes
                .filter(lane => lane.id !== action.lane.id)
                .map(lane => lane.position > action.lane.position ? {...lane, position: lane.position-1} : lane );

            return {...state, board: {...state.board, lanes: filteredLanes}};

        default:
            return state;
    }
}
