const axios = require("axios");
const models = require("../models");

const browse = async (req, res) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.q}&printType=books&startIndex=${req.query.start}&maxResults=${req.query.max}&key=${process.env.API_KEY}`)
        res.status(200).json(response.data)
    } catch (error) {
        console.error(error)
    }
}

const postBook = (req, res, next) => {
    const book = req.body.infoBook;

  models.book
    .insert(book)
      .then(([result]) => {
          req.body.idBook = result.insertId;
          next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const associateUser = (req, res) => {
    const userBook = req.body;
  models.userBook
    .insertUserBook(userBook)
    .then(() => {
      const message = `Book created`;
      res.status(201).json(message);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const getBooksByUser = (req, res) => {
    models.book
    .findBooksByUser(req.params.id)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const editBook = (req, res) => {
  const book = req.body;
  book.id = parseInt(req.params.id, 10);
  models.book
    .update(book)
    .then(([result]) => {
     if (result.affectedRows === 0) {
        res.status(404).json({
          error: "Livre non trouvé",
        });
      } else {
        const message = "Livre modifié avec succès";
        res.status(200).json({ message });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
};

const deleteBookFromUser = (req, res) => {
  const userBook = req.body;
  userBook.idUser = parseInt(req.params.id, 10);
  models.userBook
    .deleteFromUser(userBook)
    .then(([result]) => {
        if (result.affectedRows === 0) {
          const message = "Aucun livre trouvé.";
          res.status(404).json(message);
      } else {
          const message =
        "Livre supprimé de la liste d'envies de l'utilisateur avec succès";
      res.status(200).json(message);
        }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
}

module.exports = {
    browse,
    postBook,
    associateUser,
  getBooksByUser,
  editBook,
    deleteBookFromUser,
};
