import React from "react";
import placeholder from "../static/img/placeholder.png";

const NewsItem = (props) => {
  let { title, description, imageUrl, articleLink, author, date, source } =
    props;

  date = new Date(date);
  let formatedDate = `${date.toGMTString()}`; //converting to readable date in GMT

  return (
    <div className="card">
      <span className="position-absolute top-0 start-0 rounded-circle">
        <span className="badge rounded-pill text-bg-danger text-dark fw-bold">
          {source}
        </span>
      </span>
      <img
        src={imageUrl !== null ? imageUrl : placeholder}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">{title.slice(0, 43)}...</h5>
        <p className="card-text">
          {description !== null ? description.slice(0, 89) : "..."}...
        </p>

        <a
          href={articleLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary"
        >
          Read More...
        </a>
        <p className="card-text my-3">
          <small className="text-info-emphasis">
            By {author ? author : "Unknown"} on {formatedDate}
          </small>
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
