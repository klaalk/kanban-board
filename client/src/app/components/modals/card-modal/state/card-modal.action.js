const Type = {
    PostLink: 'POST_LINK',
    UpdateLink: 'UPDATE_LINK',
    DeleteLink: 'DELETE_LINK',

    OpenCardModal: 'OPEN_CARD',
    CloseCardModal: 'CLOSE_CARD',
    SetCardModalMode: 'SET_CARD_MODAL_MODE',
}

export function PostLink(link) {
    return {type: Type.PostLink, link};
}

export function UpdateLink(link) {
    return {type: Type.UpdateLink, link};
}

export function DeleteLink(link) {
    return {type: Type.DeleteLink, link};
}

export function OpenCardModal() {
    return {type: Type.OpenCardModal};
}

export function CloseCardModal() {
    return {type: Type.CloseCardModal};
}

export function SetCardModalMode(mode) {
    return {type: Type.SetCardModalMode, mode};
}


const CardModalAction = {
    Type,
}
export default CardModalAction;
