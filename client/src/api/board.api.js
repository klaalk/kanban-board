import Board from "../app/models/board.model";
import Lane from "../app/models/lane.model";
import Card from "../app/models/card.model";
import HTTP, {getErrorObj} from "./http-fetch";

async function addBoard(board) {
    return HTTP.postData('/boards', board);
}

async function shareBoard(boardId, username) {
    return HTTP.postData('/boards/'+boardId+'/users', {username: username});
}

async function deleteBoard(boardId) {
    return HTTP.deleteData('/boards/'+boardId);
}

async function getBoard(boardId) {
    const response = await HTTP.getData('/boards/'+boardId);
    if(response.ok){
        const boardJson = await response.json();
        const board = new Board(boardJson.id, boardJson.userId, boardJson.username, boardJson.title)
        board.lanes = boardJson.lanes.map((laneJson) => {
            const cards = laneJson.cards.map((cardJson) =>
                new Card(cardJson.id, cardJson.laneId, cardJson.title, cardJson.position, cardJson.status, cardJson.description, cardJson.deadline));

            return new Lane(laneJson.id, laneJson.boardId, laneJson.title, laneJson.position, cards);
        });
        return board;
    } else {
        throw getErrorObj(response, 'Error on load board');
    }
}

const BoardAPI = {
    getBoard, addBoard, shareBoard, deleteBoard,
} ;

export default BoardAPI;
