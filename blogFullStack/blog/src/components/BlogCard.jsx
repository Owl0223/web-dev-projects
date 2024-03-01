import React from "react";
import styles from "../styleModules/BlogCard.module.css";
import { Link } from "react-router-dom";

function BlogCard(props) {
  const date = new Date(props.date);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <div className={styles.blogCard}>
      <Link to={props.link}>
      <p className={styles.blogTitle}>{props.title}</p>
      <div>
        <p>Author: {props.author}</p>
        <p>Date: {formattedDate}</p>
      </div>
    </Link>
    </div>
  );
}

export default BlogCard;
