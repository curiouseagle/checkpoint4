const AbstractManager = require("./AbstractManager");

class UserBookManager extends AbstractManager {
  constructor() {
    super({ table: "userBook" });
  }

insertUserBook(userBook) {
    const { id, idBook } = userBook;
    return this.connection.query(
      `INSERT INTO ${this.table} (idUser, idBook) VALUES (?, ?)`,
      [id, idBook]
    );
}
  
  deleteFromUser(userBook) {
    const { idUser, idBook } = userBook;
    return this.connection.query(
      `DELETE FROM ${this.table} WHERE idUser = ? AND idBook = ?`,
      [idUser, idBook]
    );
  }
  
}

module.exports = UserBookManager;
