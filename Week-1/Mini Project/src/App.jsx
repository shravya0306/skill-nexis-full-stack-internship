import { useState } from "react";
import BlogCard from "./components/BlogCard";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import posts from "./data/posts.json";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <h1>My React Blog</h1>
      <p>Explore my latest posts</p>

      <div className="controls">
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          category={category}
          setCategory={setCategory}
        />
      </div>

      <div className="blog-container">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default App;