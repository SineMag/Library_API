
import { Router, Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";
import { Book } from "../models/book";
import { books, authors } from "../data";
import { NotFoundError, BadRequestError, ConflictError } from "../errors/customErrors";

const router = Router();

// GET all books
router.get("/", (req: Request, res: Response) => {
    res.status(200).json(books);
});

// GET book by ID
router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    const { id } = req.params;
    const book = books.find((book) => book.id === parseInt(id));

    if (!book) {
        return next(new NotFoundError("Book not found"));
    }

    res.status(200).json(book);
});

// POST new book
router.post("/", [
    body("title").isString().withMessage("Title must be a string"),
    body("authorId").isInt().withMessage("authorId must be an integer").custom((value) => {
        const authorExists = authors.some(author => author.id === value);
        if (!authorExists) {
            throw new Error("Author not found");
        }
        return true;
    }),
    body("publishedYear").isInt().withMessage("publishedYear must be an integer"),
], (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    const { title, authorId } = req.body;

    const bookExists = books.some(book => book.title === title && book.authorId === authorId);
    if (bookExists) {
        return next(new ConflictError("Book already exists"));
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
    body("authorId").isInt().optional().custom((value) => {
        if (value) {
            const authorExists = authors.some(author => author.id === value);
            if (!authorExists) {
                throw new Error("Author not found");
            }
        }
        return true;
    }),
    body("publishedYear").isInt().optional(),
], (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));

    if (bookIndex === -1) {
        return next(new NotFoundError("Book not found"));
    }

    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;

    res.status(200).json(updatedBook);
});

// DELETE book
router.delete("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }

    const { id } = req.params;
    const bookIndex = books.findIndex((book) => book.id === parseInt(id));

    if (bookIndex === -1) {
        return next(new NotFoundError("Book not found"));
    }

    books.splice(bookIndex, 1);
    res.status(204).send();
});

export default router;
