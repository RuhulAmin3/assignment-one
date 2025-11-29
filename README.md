# Blog Post API (Express + Zod)

Simple homework project: create and retrieve blog posts with validation.

## Files

## Requirements implemented
  - Validates title, content, author using `zod`
  - Title min length: 3
  - Content min length: 10
  - Author required
  - `createdAt` automatically generated
  - Returns `201 Created` with created post on success
  - Returns `400 Bad Request` with descriptive errors if invalid
  - Sanitizes (strips HTML tags) from title and content (bonus)

  - Returns `200 OK` with post when found
  - Returns `404 Not Found` if not found
  - Returns `400 Bad Request` for invalid ID format

## How to run
1. Install dependencies:
   ```bash
   npm install
```
# Blog Post API (Express + Zod)

Simple homework project: create and retrieve blog posts with validation.

**Files**
- `server.js` - Express server with endpoints
- `model.js` - BlogPost class
- `package.json` - dependencies & scripts

**Implemented endpoints**
- `POST /posts` — create a new blog post
  - Validates `title`, `content`, `author` using `zod`
  - Title min length: 3
  - Content min length: 10
  - `author` required
  - `createdAt` automatically generated
  - Returns `201 Created` with created post on success
  - Returns `400 Bad Request` with descriptive errors if invalid
  - Strips HTML from `title` and `content` (sanitization)

- `GET /posts/:id` — retrieve a blog post by ID
  - Returns `200 OK` with post when found
  - Returns `404 Not Found` if not found
  - Returns `400 Bad Request` for invalid ID format

**Postman API documentation**

You can view and interact with the API documentation (Postman) here:

https://documenter.getpostman.com/view/27533695/2sB3dLUBsL

**How to run (local)**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start in development mode (uses `nodemon`):
   ```bash
   npm run dev
   ```
3. If port 3000 is already in use, either stop the other process or change the port in `server.js`.

**Notes**
- The project uses ES modules; `package.json` includes `"type": "module"`.
- If you want me to open the Postman collection or add example requests to this README, tell me which format you prefer.
