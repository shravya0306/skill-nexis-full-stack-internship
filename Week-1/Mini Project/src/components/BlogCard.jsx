function BlogCard({ post }) {
  return (
    <div className="blog-card">
      <h2>{post.title}</h2>

      <p className="category">{post.category}</p>

      <p>{post.content}</p>

      <small>
        By {post.author} | {post.date}
      </small>
    </div>
  );
}

export default BlogCard;