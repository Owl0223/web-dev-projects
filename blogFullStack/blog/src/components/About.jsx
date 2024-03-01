import React from "react";
import styles from "../styleModules/Home.module.css";

function About(props) {
  return (
    <div className={styles.homeContent}>
      <h1> Our Mission</h1>
      <p>
        At <em>{props.blogName}</em>, our mission is simple: to inform, inspire,
        and empower individuals through the art of storytelling. We believe that
        words have the power to ignite change, spark imagination, and connect
        people from all walks of life. Through our blog, we aim to share diverse
        perspectives, foster meaningful discussions, and contribute positively
        to the online community.
      </p>

      <h1>Meet the Team</h1>
      <p>
        Behind every article and every word, there's a dedicated team of
        writers, editors, and creators who make [Your Blog Name] possible. Get
        to know the faces and voices behind the screen and discover the passion
        and expertise that drives our work.
      </p>

      <h1>Contact Us</h1>
      <p>
        Have questions, feedback, or suggestions? We'd love to hear from you!
        Feel free to reach out to us via email, social media, or our contact
        form. Your input is invaluable to us as we strive to improve and grow.
      </p>
      <h1>Join Us</h1>
      <p>
        Interested in becoming a contributor to [Your Blog Name]? We're always
        on the lookout for talented writers and passionate storytellers to join
        our team. Whether you're an experienced journalist, a budding blogger,
        or someone with a unique perspective to share, we welcome you to be a
        part of our journey.
      </p>
    </div>
  );
}

export default About;
