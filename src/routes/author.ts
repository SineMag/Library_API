
import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Author } from "../models/author";

const router = Router();

let authors: Author[] = [
    {id: 1, name: "J.K. Rowling", bio: "British author"},
    {id: 2, name: "George Orwell", bio: "English novelist"},
];

// GET all authors
router.get("/", (req: Request, res: Response) => {
    res.status(200).json(authors);
});

// GET author by ID
router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const author = authors.find((author) => author.id === parseInt(id));

    if (!author) {
        return res.status(404).send("Author not found");
    }

    res.status(200).json(author);
});

// POST new author
router.post("/", [
    body("name").isString().withMessage("Name must be a string"),
    body("bio").isString().withMessage("Bio must be a string"),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newAuthor: Author = {
        id: authors.length + 1,
        name: req.body.name,
        bio: req.body.bio,
    };

    authors.push(newAuthor);
    res.status(201).json(newAuthor);
});

// PUT update author
router.put("/:id", [
    param("id").isInt().withMessage("ID must be an integer"),
    body("name").isString().optional(),
    body("bio").isString().optional(),
], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const authorIndex = authors.findIndex((author) => author.id === parseInt(id));

    if (authorIndex === -1) {
        return res.status(404).send("Author not found");
    }

    const updatedAuthor = { ...authors[authorIndex], ...req.body };
    authors[authorIndex] = updatedAuthor;

    res.status(200).json(updatedAuthor);
});

// DELETE author
router.delete("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const authorIndex = authors.findIndex((author) => author.id === parseInt(id));

    if (authorIndex === -1) {
        return res.status(404).send("Author not found");
    }

    authors.splice(authorIndex, 1);
    res.status(204).send();
});

export default router;
