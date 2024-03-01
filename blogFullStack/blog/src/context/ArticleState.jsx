import React, { useState } from "react";
import ArticlesContext from "./ArticlesContext";

const ArticleState = (props) => {
  const url = "http://127.0.0.1:3300/api/fetch";
  const [articles, setArticles] = useState([]);

  const fetchBlogs = async () => {
    try {
      const rsp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const parsedData = await rsp.json();
      setArticles(parsedData.allBlogs);
    } catch (error) {
      console.log("Error in fetch:" + error);
    }
  };
    useEffect(() => {
      fetchBlogs();
    }, []);
  return (
    <ArticlesContext.Provider value={{ articles }}>
      {props.children}
    </ArticlesContext.Provider>
  );
};

export default ArticleState;
