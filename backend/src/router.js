const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const bookControllers = require("./controllers/bookControllers");

router.get("/api/books", bookControllers.browse);
router.post("/user/:id/books", bookControllers.postBook, bookControllers.associateUser);
router.get("/user/:id/books", bookControllers.getBooksByUser);
router.put("/book/:id", bookControllers.editBook);
router.delete("/user/:id/book", bookControllers.deleteBookFromUser);

module.exports = router;
