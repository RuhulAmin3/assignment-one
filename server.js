// server.js
import express from "express";

import z from "zod";

import { BlogPost } from "./src/model.js";

const app = express();
app.use(express.json());

// In-memory storage for posts
const posts = [];
let nextId = 1;

/**
 * Simple sanitization: strip HTML tags.
 */
function stripHtmlTags(str) {
  if (typeof str !== "string") return str;
  return str.replace(/<\/?[^>]+(>|$)/g, "");
}

/**
 * Zod schema for incoming POST /posts body
 */

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
  author: z.string().min(1, { message: "Author is required" }),
});

// POST /posts - create a new blog post
app.post("/posts", (req, res) => {
  // Validate input
  const parseResult = createPostSchema.safeParse(req.body);
  if (!parseResult.success) {
    // Extract user-friendly messages
    const errors = parseResult.error.errors.map((e) =>
      e.message ? e.message : `${e.path.join(".")} is invalid`
    );
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors });
  }

  // Sanitization (bonus): strip HTML tags from content and title
  const raw = parseResult.data;
  const title = stripHtmlTags(raw.title).trim();
  const content = stripHtmlTags(raw.content).trim();
  const author = raw.author.trim();

  // Re-validate sanitized lengths to be safe
  if (title.length < 3) {
    return res
      .status(400)
      .json({
        error: "Validation failed",
        details: [
          "Title must be at least 3 characters long after sanitization",
        ],
      });
  }

  if (content.length < 10) {
    return res
      .status(400)
      .json({
        error: "Validation failed",
        details: [
          "Content must be at least 10 characters long after sanitization",
        ],
      });
  }
  
  if (author.length === 0) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: ["Author is required"] });
  }

  // Create post
  const createdAt = new Date().toISOString();
  const post = new BlogPost({
    id: nextId++,
    title,
    content,
    author,
    createdAt,
  });

  posts.push(post);

  return res.status(201).json({
    message: "Blog post created successfully",
    post,
  });
});

// GET /posts/:id - retrieve a blog post by ID
app.get("/posts/:id", (req, res) => {
  const idStr = req.params.id;
  // validate that id is a positive integer
  const id = Number(idStr);
  if (!Number.isInteger(id) || id <= 0) {
    return res
      .status(400)
      .json({ error: `Invalid ID: ${idStr}. ID must be a positive integer.` });
  }

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ error: `Blog post with ID ${id} not found` });
  }

  return res.status(200).json(post);
});

// Basic root route
app.get("/", (req, res) => {
  res.json({
    message: "Blog Post API is up. Use POST /posts and GET /posts/:id",
  });
});

// Error handler (catch-all)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Blog Post API listening on port ${PORT}`);
});
