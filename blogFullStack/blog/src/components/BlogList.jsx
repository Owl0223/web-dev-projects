import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import styles from "../styleModules/BlogList.module.css";

function BlogList() {
  const [blogs, setblogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const rsp = await fetch("http://127.0.0.1:3300/api/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "applicatio/json",
        },
      });
      const parsedData = await rsp.json();
      setblogs(parsedData.allBlogs);
    } catch (error) {
      console.log("Error in fetch:" + error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  
  return (
    <>
      <h1 id={styles.blogHead}>Blogs</h1>
      <div className={styles.blogList}>
        {blogs.map((item, index) => {
          return (
              <BlogCard
                title={item.title}
                author={item.author}
                date={item.date}
                key={index}
                id={item._id}
                link={`/blog/${item._id}`}
              />
          );
        })}
      </div>
    </>
  );
}

export default BlogList;
