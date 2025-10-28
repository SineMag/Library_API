
import { Author } from "./models/author";
import { Book } from "./models/book";

export let authors: Author[] = [
    {id: 1, name: "J.K. Rowling", bio: "British author"},
    {id: 2, name: "George Orwell", bio: "English novelist"},
];

export let books: Book[] = [
    {id: 1, title: "Harry Potter", authorId: 1, publishedYear: 1997},
    {id: 2, title: "1984", authorId: 2, publishedYear: 1949},
];
