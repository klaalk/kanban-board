class Lane {
    constructor(id, boardId, title, position) {
        if (id && boardId) {
            this.id = id;
            this.boardId = boardId;
        }
        this.title = title;
        this.position = position;
        this.cards = [];
        this.archivedCards = [];
    }

    addCard(card) {
        if (card && card.id) {
            this.cards.push(card);
        }
    }

    addArchivedCard(card) {
        if (card && card.id) {
            this.archivedCards.push(card);
        }
    }
}

module.exports = Lane;
