
import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Book } from "../models/book";

const router = Router();

let books: Book[] = [
    {id: 1, title: "Harry Potter", authorId: 1, publishedYear: 1997},
    {id: 2, title: "1984", authorId: 2, publishedYear: 1949},
];

// GET all books
router.get("/", (req: Request, res: Response) => {
    res.status(200).json(books);
});

// GET book by ID
router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.status(200).json(book);
});

// POST new book
router.post("/", [
    body("title").isString().withMessage("Title must be a string"),
    body("authorId").isInt().withMessage("authorId must be an integer"),
    body("publishedYear").isInt().withMessage("publishedYear must be an integer"),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newBook: Book = {
        id: books.length + 1,
        title: req.body.title,
        authorId: req.body.authorId,
        publishedYear: req.body.publishedYear,
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update book
router.put("/:id", [
    param("id").isInt().withMessage("ID must be an integer"),
    body("title").isString().optional(),
    body("authorId").isInt().optional(),
    body("publishedYear").isInt().optional(),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).send("Book not found");
    }

    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;

    res.status(200).json(updatedBook);
});

// DELETE book
router.delete("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));

    if (bookIndex === -1) {
        return res.status(404).send("Book not found");
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});

export default router;
