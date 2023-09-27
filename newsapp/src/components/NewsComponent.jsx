import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const NewsComponent = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [status, setStatus] = useState("ok");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const fetchNews = async () => {
    props.setProgress(0);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page}&apiKey=${props.apiKey}`;

    setLoading(true);

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.status === "ok") {
        setArticles(parsedData.articles);
        setTotal(parsedData.totalResults / props.pageSize);
        setStatus(parsedData.status);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
    props.setProgress(100);
  };
  document.title =
    props.category === "general"
      ? "NewsApp - Home"
      : `NewsApp - ${capitalizeFirstLetter(props.category)}`;

  useEffect(() => {
    fetchNews();
    //eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    if (nextPage <= Math.ceil(total) && status !== "error") {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&pageSize=${props.pageSize}&page=${page}&apiKey=${props.apiKey}`;

      try {
        const response = await fetch(url);
        const parsedData = await response.json();

        if (parsedData.status === "ok") {
          setPage(page + 1);
          setArticles(articles.concat(parsedData.articles));
          setTotal(parsedData.totalResults / props.pageSize);
          setStatus(parsedData.status);
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setStatus("error");
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredArticle = articles.filter(
    (element) => element.title !== "[Removed]"
  );

  return (
    <div className="container mx-a my-5">
      <h1 className="text-center">
        Top News - {capitalizeFirstLetter(props.category)}
      </h1>
      <InfiniteScroll
        dataLength={filteredArticle.length}
        next={fetchMoreData}
        hasMore={page < Math.ceil(total)}
        loader={<Spinner />}
      >
        <div className="row container">
          {!loading &&
            filteredArticle.map((data, index) => (
              <div className="col-md-4 my-3" key={data.url + `index=${index}`}>
                <NewsItem
                  title={data.title}
                  description={data.description}
                  articleLink={data.url}
                  imageUrl={data.urlToImage}
                  author={data.author}
                  date={data.publishedAt}
                  source={data.source.name}
                />
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

NewsComponent.propTypes = {
  pageSize: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

NewsComponent.defaultProps = {
  pageSize: 13,
  country: "uk",
  category: "general",
};

export default NewsComponent;
