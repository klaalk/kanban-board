class Link {
    constructor(id, cardId, value) {
        if (id && cardId) {
            this.id = id;
            this.cardId = cardId;
            this.value = value;
        }
    }
}
module.exports = Link;
