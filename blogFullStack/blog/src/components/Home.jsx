import React from "react";
import styles from "../styleModules/Home.module.css";
import Blog from "./Blog";
import home from "../assets/img/homeImg.jpg";

function Home(props) {
  const blogName = props.blogName;
  return (
    <div className={styles.homeContent}>
      <div className={styles.homeImg}>
        <img src={home} alt="" />
      </div>
      <h1>Welcome to {blogName}</h1>

      <p>
        Welcome to <em>{blogName}</em>, your go-to destination for insightful
        articles, engaging stories, and thought-provoking discussions. Whether
        you're a seasoned writer, an avid reader, or someone simply looking for
        inspiration, you'll find a wealth of content here to satisfy your
        curiosity and broaden your horizons.
      </p>

      <h1>Explore Diverse Topics</h1>
      <p>
        Our blog covers a wide range of topics, including technology, science,
        literature, travel, lifestyle, and much more. From in-depth analysis
        pieces to light-hearted anecdotes, there's something for everyone. Dive
        into our diverse collection of articles and discover new perspectives on
        the world around us.
      </p>

      <h1>Join the Conversation</h1>
      <p>
        We believe in the power of community and the value of dialogue. Feel
        free to share your thoughts, opinions, and experiences in the comments
        section of each post. Let's foster meaningful discussions, exchange
        ideas, and learn from one another.
      </p>

      <h1>Stay Updated</h1>
      <p>
        Never miss out on the latest content by subscribing to our newsletter.
        Get notified about new articles, special features, and exclusive offers
        delivered straight to your inbox. Join our growing community of readers
        and writers today!
      </p>
    </div>
  );
}

export default Home;
