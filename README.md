# Library API

This is a RESTful API for managing a library system with two resources: Authors and Books.

## API Endpoints

### Authors

#### Get all authors

- **Endpoint:** `/v1/authors`
- **Method:** `GET`
- **Description:** Retrieves a list of all authors.
- **Example Request:**
  ```
  GET /v1/authors
  ```
- **Example Response:**
  ```json
  [
    {"id":1,"name":"J.K. Rowling","bio":"British author"},
    {"id":2,"name":"George Orwell","bio":"English novelist"}
  ]
  ```

#### Get author by ID

- **Endpoint:** `/v1/authors/:id`
- **Method:** `GET`
- **Description:** Retrieves a single author by their ID.
- **Example Request:**
  ```
  GET /v1/authors/1
  ```
- **Example Response:**
  ```json
  {"id":1,"name":"J.K. Rowling","bio":"British author"}
  ```

#### Create a new author

- **Endpoint:** `/v1/authors`
- **Method:** `POST`
- **Description:** Creates a new author.
- **Example Request:**
  ```
  POST /v1/authors
  Content-Type: application/json

  {
    "name":"New Author",
    "bio":"Author bio"
  }
  ```
- **Example Response:**
  ```json
  {"id":3,"name":"New Author","bio":"Author bio"}
  ```

#### Update an author

- **Endpoint:** `/v1/authors/:id`
- **Method:** `PUT`
- **Description:** Updates an existing author by their ID.
- **Example Request:**
  ```
  PUT /v1/authors/1
  Content-Type: application/json

  {
    "name":"J.K. Rowling Updated"
  }
  ```
- **Example Response:**
  ```json
  {"id":1,"name":"J.K. Rowling Updated","bio":"British author"}
  ```

#### Delete an author

- **Endpoint:** `/v1/authors/:id`
- **Method:** `DELETE`
- **Description:** Deletes an author by their ID.
- **Example Request:**
  ```
  DELETE /v1/authors/1
  ```
- **Example Response:**
  ```
  204 No Content
  ```

#### Get all books by an author

- **Endpoint:** `/v1/authors/:id/books`
- **Method:** `GET`
- **Description:** Retrieves all books written by a specific author.
- **Example Request:**
  ```
  GET /v1/authors/1/books
  ```
- **Example Response:**
  ```json
  [
    {"id":1,"title":"Harry Potter","authorId":1,"publishedYear":1997}
  ]
  ```

### Books

#### Get all books

- **Endpoint:** `/v1/books`
- **Method:** `GET`
- **Description:** Retrieves a list of all books.
- **Example Request:**
  ```
  GET /v1/books
  ```
- **Example Response:**
  ```json
  [
    {"id":1,"title":"Harry Potter","authorId":1,"publishedYear":1997},
    {"id":2,"title":"1984","authorId":2,"publishedYear":1949}
  ]
  ```

#### Get book by ID

- **Endpoint:** `/v1/books/:id`
- **Method:** `GET`
- **Description:** Retrieves a single book by its ID.
- **Example Request:**
  ```
  GET /v1/books/1
  ```
- **Example Response:**
  ```json
  {"id":1,"title":"Harry Potter","authorId":1,"publishedYear":1997}
  ```

#### Create a new book

- **Endpoint:** `/v1/books`
- **Method:** `POST`
- **Description:** Creates a new book.
- **Example Request:**
  ```
  POST /v1/books
  Content-Type: application/json

  {
    "title":"New Book",
    "authorId":1,
    "publishedYear":2023
  }
  ```
- **Example Response:**
  ```json
  {"id":3,"title":"New Book","authorId":1,"publishedYear":2023}
  ```

#### Update a book

- **Endpoint:** `/v1/books/:id`
- **Method:** `PUT`
- **Description:** Updates an existing book by its ID.
- **Example Request:**
  ```
  PUT /v1/books/1
  Content-Type: application/json

  {
    "title":"Harry Potter Updated"
  }
  ```
- **Example Response:**
  ```json
  {"id":1,"title":"Harry Potter Updated","authorId":1,"publishedYear":1997}
  ```

#### Delete a book

- **Endpoint:** `/v1/books/:id`
- **Method:** `DELETE`
- **Description:** Deletes a book by its ID.
- **Example Request:**
  ```
  DELETE /v1/books/1
  ```
- **Example Response:**
  ```
  204 No Content
  ```