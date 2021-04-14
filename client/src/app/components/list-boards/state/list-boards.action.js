const Type = {
    LoadBoards: 'LOAD_BOARDS',
    LoadBoardsSuccess: 'LOAD_BOARDS_SUCCESS',
    LoadBoardsFailed: 'LOAD_BOARDS_FAILED',

    PostBoard: 'POST_BOARD',
    DeleteBoard: 'DELETE_BOARD',
    SetBoard: 'SET_BOARD',
    ShareBoard: 'SHARE_BOARD',
    ShareBoardSuccess: 'SHARE_BOARD_SUCCESS',
    ShareBoardFailed: 'SHARE_BOARD_FAILED',
    OpenShareBoard: 'OPEN_SHARE_BOARD',
    CloseShareBoard: 'CLOSE_SHARE_BOARD',
}

export function LoadBoards(userId, shared) {
    return {type: Type.LoadBoards, userId: userId, shared: shared};
}

export function LoadBoardsSuccess(boards) {
    return {type: Type.LoadBoardsSuccess, boards: boards};
}

export function LoadBoardsFailed() {
    return {type: Type.LoadBoardsFailed};
}

export function PostBoard(title, userId) {
    return {type: Type.PostBoard, title: title, userId: userId};
}

export function DeleteBoard(userId, boardId) {
    return {type: Type.DeleteBoard, userId: userId, boardId: boardId};
}

export function ShareBoard(boardId, username) {
    return {type: Type.ShareBoard, boardId: boardId, username: username};
}

export function ShareBoardSuccess() {
    return {type: Type.ShareBoardSuccess};
}

export function ShareBoardFailed(errorMsg) {
    return {type: Type.ShareBoardFailed, errorMsg: errorMsg};
}

export function SetBoard(board) {
    return {type: Type.SetBoard, board: board};
}

export function OpenShareBoard(boardId) {
    return {type: Type.OpenShareBoard, boardId: boardId};
}

export function CloseShareBoard() {
    return {type: Type.CloseShareBoard};
}


const ListBoardsAction = {
    Type,
}

export default ListBoardsAction;
