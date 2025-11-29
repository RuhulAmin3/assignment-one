// models/BlogPost.js
export class BlogPost {
  /**
   * Represents a blog post
   * @param {Object} params
   * @param {number} params.id
   * @param {string} params.title
   * @param {string} params.content
   * @param {string} params.author
   * @param {string} params.createdAt - ISO timestamp
   */
  constructor({ id, title, content, author, createdAt }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.createdAt = createdAt;
  }
}
