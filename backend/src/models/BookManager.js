const AbstractManager = require("./AbstractManager");

class BookManager extends AbstractManager {
  constructor() {
    super({ table: "book" });
  }

  insert(book) {
    const {
      originalId,
      title,
      author,
      descriptionBook,
      categories,
      cover,
    } = book;
    return this.connection.query(
      `INSERT INTO ${this.table} (originalId, title, author, descriptionBook, categories, cover) VALUES ( ?, ?, ?, ?, ?, ?)`,
      [
        originalId,
        title,
        author,
        descriptionBook,
        categories,
        cover,
      ]
    );
  }
  
  findBooksByUser(id) {
    return this.connection.query(
      `SELECT b.id, b.title, b.originalId, b.author, b.descriptionBook, b.categories, b.cover FROM ${this.table} AS b
      INNER JOIN userBook as ub ON b.id = ub.idBook
      INNER JOIN user as u ON u.id = ub.idUser
      WHERE u.id = ?
      GROUP BY b.originalId`, [id]);
  }
  

  update(book) {
    const {
      id,
      originalId,
      title,
      author,
      descriptionBook,
      categories,
      cover,
    } = book;
    return this.connection.query(
      `UPDATE ${this.table} set originalId = ?, title = ?, author = ?, descriptionBook = ?, categories = ?, cover = ? WHERE id = ?`,
      [
        originalId,
        title,
        author,
        descriptionBook,
        categories,
        cover,
        id
      ]
    );
  }
}




module.exports = BookManager;
