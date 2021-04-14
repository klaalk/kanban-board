class Board {
    constructor(id, userId, username, title, shared, sharedDate, totalCards, expiredCards) {
        if (id && userId) {
            this.id = id;
            this.userId = userId;
            this.username = username;
        }
        this.title = title;
        this.shared = shared;
        this.sharedDate = sharedDate;
        this.totalCards = totalCards;
        this.expiredCards = expiredCards;
    }
}

module.exports = Board;
