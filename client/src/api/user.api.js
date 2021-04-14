// USER API
import HTTP, {getErrorObj} from "./http-fetch";
import Board from "../app/models/board.model";

async function getUser() {
    const response = await HTTP.getData('/user');
    if(response.ok){
        return await response.json();
    } else {
        throw getErrorObj(response, 'Error on load authenticated user');
    }
}

async function getUsers() {
    const response = await HTTP.getData('/users');
    if (response.ok) {
        const usersJson = await response.json();
        return usersJson.map((userJson) => ({id: userJson.id, username: userJson.username}));
    } else {
        throw getErrorObj(response, 'Error on load the list of users');
    }
}

async function getBoards(userId, shared) {
    const response = await HTTP.getData('/users/'+userId+'/boards?shared='+(shared === true));
    if (response.ok) {
        const boardsJson = await response.json();
        return boardsJson.map((board) =>
            new Board(board.id, board.userId, board.username, board.title, board.shared, board.sharedDate, board.totalCards, board.expiredCards)
        );
    } else {
        throw getErrorObj(response, 'Error on load boards');
    }
}

const UserAPI = { getUser, getUsers, getBoards };

export default UserAPI;
