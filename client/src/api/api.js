import HTTP from "./http-fetch";

import UserAPI from "./user.api";
import LaneAPI from "./lane.api";
import BoardAPI from "./board.api";
import CardAPI from "./card.api";
import LinkAPI from "./link.api";

async function login(username, password) {
    return HTTP.postData('/login', { username: username, password: password });
}

async function logout() {
    return HTTP.postData('/logout');
}


const API = { ...UserAPI, ...BoardAPI, ...LaneAPI, ...CardAPI, ...LinkAPI,
    login, logout
};

export default API;
