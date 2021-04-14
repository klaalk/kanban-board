const Type = {
    AddCard: 'ADD_CARD',
    ShowCard: 'SHOW_CARD',
    EditCard: 'EDIT_CARD',

    LoadCards: 'LOAD_CARDS',
    LoadCardsSuccess: 'LOAD_CARDS_SUCCESS',

    GetCard: 'GET_CARD',
    GetCardSuccess: 'GET_CARD_SUCCESS',

    DeleteCard: 'DELETE_CARD',
    DeleteCardSuccess: 'DELETE_CARD_SUCCESS',

    MoveCard: 'MOVE_CARD',
    MoveCardSuccess: 'MOVE_CARD_SUCCESS',

    PostCard: 'POST_CARD',
    PostCardSuccess: 'POST_CARD_SUCCESS',
    PostCardFailed: 'POST_CARD_FAILED',

    UpdateCard: 'UPDATE_CARD',
    UpdateCardSuccess: 'UPDATE_CARD_SUCCESS',
    UpdateCardFailed: 'UPDATE_CARD_FAILED',
}

// CARD ACTIONS

export function AddCard(laneId, position) {
    return {type: Type.AddCard, laneId: laneId, position: position};
}

export function ShowCard(cardId) {
    return {type: Type.ShowCard, cardId: cardId};
}

export function EditCard(cardId) {
    return {type: Type.EditCard, cardId: cardId};
}

export function LoadCards(status, laneId, oldLaneId) {
    return {type: Type.LoadCards, status: status, laneId: laneId, oldLaneId: oldLaneId};
}

export function LoadCardsSuccess(status, lane, oldLane) {
    return {type: Type.LoadCardsSuccess, status, lane, oldLane};
}

export function GetCard(cardId) {
    return {type: Type.GetCard, cardId: cardId};
}

export function GetCardSuccess(card) {
    return {type: Type.GetCardSuccess, card: card};
}

export function DeleteCard(card) {
    return {type: Type.DeleteCard, card: card};
}

export function DeleteCardSuccess(card) {
    return {type: Type.DeleteCardSuccess, card: card};
}

export function MoveCard(card, oldLaneId) {
    return {type: Type.MoveCard, card: card, oldLaneId: oldLaneId};
}

export function MoveCardSuccess(card, oldLaneId) {
    return {type: Type.MoveCardSuccess, card: card, oldLaneId: oldLaneId};
}

export function PostCard(card) {
    return {type: Type.PostCard, card: card};
}

export function PostCardSuccess(card) {
    return {type: Type.PostCardSuccess, card: card};
}

export function PostCardFailed() {
    return {type: Type.PostCardFailed};
}

export function UpdateCard(card) {
    return {type: Type.UpdateCard, card: card};
}

export function UpdateCardSuccess(card) {
    return {type: Type.UpdateCardSuccess, card};
}

export function UpdateCardFailed() {
    return {type: Type.UpdateCardFailed};
}

const LaneAction = {
    Type,
}
export default LaneAction;
