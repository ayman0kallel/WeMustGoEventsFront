/* eslint-disable react/prop-types */
import './article.css';
import { Link } from 'react-router-dom';

const Article = ({ id, imgUrl, date, text }) => (
  <div className="events-container_article">
    <div className="events-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="events-container_article-content">
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <Link to={`/article/${id}`}>Découvrir</Link>
    </div>
  </div>
);

export default Article;
