/* eslint-disable react/prop-types */
import './article.css';
import { Link } from 'react-router-dom';

const Article = ({ id, imgUrl, date, text, description }) => (
  <div className="events-container_article">
    <div className="events-container_article-image">
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className="events-container_article-content">
      <div>
        <h3>
          {text}<br/>
          <p>{date}</p>
          <p>{description}</p>
        </h3>
      </div>
      <Link to={`/article/${id}`}><p>Découvrir</p></Link>
    </div>
  </div>
);

export default Article;
