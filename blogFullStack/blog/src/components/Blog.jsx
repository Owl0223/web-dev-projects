import React, { useEffect, useState } from "react";
import styles from "../styleModules/Blog.module.css";
import { useParams } from "react-router-dom";

function Blog() {
  const [content, setcontent] = useState({
    title: "",
    blog: [],
    author: "",
    date: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const rsp = await fetch(`http://127.0.0.1:3300/api/fetch/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const parsedData = await rsp.json();
        setcontent(parsedData.blog);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, [id]);
  return (
    <div className={styles.blogSpace}>
      <h1 className={styles.blogTitle}>{content.title}</h1>
      <div className={styles.blogContent}>
        {content.blog.map((para, index) => {
          // one section = subtitle+content
          return (
            <section key={index}>
              <h2>{para.subtitle}</h2>
              {para.content.map((subPara, index) => {
                // for different paragraphs in one section
                return (
                  <p className={styles.blogPara} key={index}>
                    {subPara}
                  </p>
                );
              })}
            </section>
          );
        })}
      </div>
      <div className={styles.blogMeta}>
        <div>
          <h3>Author</h3>
          <p>{content.author}</p>
        </div>
        <div>
          <h3>Published On</h3>
          <p>{content.date}</p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
