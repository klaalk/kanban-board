class Card {
    constructor(id, laneId, title, position, status, description, deadline) {
        if (id && laneId) {
            this.id = id;
            this.laneId = laneId;

            this.title = title;
            this.position = position;
            this.status = status;
            if (description) {
                this.description = description;
            }
            if (deadline) {
                this.deadline = deadline;
            }
        }
    }
}

module.exports = Card;
