class User {
    constructor(id, name, surname, username, email, hash) {
        if (id)
            this.id = id;
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.hash = hash;
    }
}

module.exports = User;
