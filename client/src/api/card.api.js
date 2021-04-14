import Card from "../app/models/card.model";
import Link from "../app/models/link.model";
import HTTP, {getErrorObj} from "./http-fetch";

async function getCard(cardId) {
    const response = await HTTP.getData('/cards/'+cardId);
    if(response.ok){
        const cardJson = await response.json();
        const card = new Card(cardJson.id, cardJson.laneId, cardJson.title, cardJson.position, cardJson.status, cardJson.description, cardJson.deadline);
        card.links = cardJson.links.map((linkJson) => new Link(linkJson.id, linkJson.cardId, linkJson.value))
        return card;
    } else {
        throw getErrorObj(response, 'Error on load card info');  // An object with the error coming from the server
    }
}

async function addCard(card) {
    return HTTP.postData('/cards', card);
}

async function updateCard(cardId, card) {
    return HTTP.putData('/cards/'+cardId, card);
}

async function deleteCard(cardId) {
    return HTTP.deleteData('/cards/'+cardId);
}
const CardAPI = {
    getCard, addCard, updateCard, deleteCard
} ;

export default CardAPI;
