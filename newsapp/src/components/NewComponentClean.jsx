import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

class NewsComponent extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      total: 1,
      status: "ok",
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    const { pageSize, country } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/everything?q=everything&from=2023-09-20&to=2023-09-20&sortBy=popularity&apiKey=cab0152cea7e40e4923d6ca93053cf0f&pageSize=${pageSize}&page=${page}&country=${country}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const parsedData = await response.json();

      if (parsedData.status === "ok") {
        this.setState({
          articles: parsedData.articles,
          total: parsedData.totalResults / pageSize,
          status: parsedData.status,
        });
      } else {
        this.setState({ status: "error" });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ status: "error" });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleNextClick = () => {
    if (
      this.state.page + 1 <= Math.ceil(this.state.total) &&
      this.state.status !== "error"
    ) {
      this.setState(
        (prevState) => ({
          page: prevState.page + 1,
        }),
        this.fetchNews
      );
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
        }),
        this.fetchNews
      );
    }
  };

  render() {
    const { articles, loading, page, total, status } = this.state;

    return (
      <div className="container mx-5 my-5">
        <h1 className="text-center">Top News</h1>
        {loading && <Spinner />}
        <div className="d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-primary"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(total) || status === "error"}
            type="button"
            className="btn btn-primary"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
        <div className="row">
          {articles.map((data) => (
            <div className="col-md-4 my-3" key={data.url}>
              <NewsItem
                title={data.title}
                description={data.description}
                articleLink={data.url}
                imageUrl={data.urlToImage}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

NewsComponent.propTypes = {
  pageSize: PropTypes.number.isRequired,
  country: PropTypes.string.isRequired,
};

export default NewsComponent;
