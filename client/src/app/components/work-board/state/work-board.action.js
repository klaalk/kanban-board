const Type = {
    GetBoard: 'GET_BOARD',
    GetBoardSuccess: 'GET_BOARD_SUCCESS',
    GetBoardFailed: 'GET_BOARD_FAILED',
}

// BOARD ACTIONS
export function GetBoard(boardId) {
    return {type: Type.GetBoard, boardId: boardId};
}

export function GetBoardSuccess(board) {
    return {type: Type.GetBoardSuccess, board: board};
}

export function GetBoardFailed() {
    return {type: Type.GetBoardFailed};
}


const WorkBoardAction = {
    Type,
}
export default WorkBoardAction;
