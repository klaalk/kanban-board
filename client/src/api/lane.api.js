import Card from "../app/models/card.model";
import HTTP, {getErrorObj} from "./http-fetch";


async function addLane(lane) {
    return HTTP.postData('/lanes', lane);
}

async function updateLane(laneId, lane) {
    return HTTP.putData('/lanes/'+laneId, lane);
}

async function deleteLane(laneId) {
    return HTTP.deleteData('/lanes/'+laneId);
}

async function getCards(laneId, status) {
    const response = await HTTP.getData('/lanes/'+laneId+'/cards?status='+status);
    if (response.ok) {
        const cardsJson = await response.json();
        return cardsJson.map((cardJson) =>
            new Card(cardJson.id, cardJson.laneId, cardJson.title, cardJson.position, cardJson.status, cardJson.description, cardJson.deadline));
    } else {
        throw getErrorObj(response, 'Error on load cards');  // An object with the error coming from the server
    }
}



const LaneAPI = {
    addLane, updateLane, deleteLane, getCards,
} ;

export default LaneAPI;
