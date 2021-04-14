class Lane {
    constructor(id, boardId, title, position, cards = []) {
        if (id && boardId) {
            this.id = id;
            this.boardId = boardId;
        }
        this.title = title;
        this.position = position;
        this.cards = cards;
        this.archivedCards = [];
    }
}

module.exports = Lane;
