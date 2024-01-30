import Article from '../../components/article/Article';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './events.css';

const Events = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Function to fetch articles from backend
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/article'); 
        setArticles(response.data); 
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    // Call the fetchArticles function
    fetchArticles();
  }, []);
  return (
    <div className="events section__padding" id="events">
      <div className="events-heading">
        <h1 className="gradient__text">Prêt à commencer l&apos; aventure ? <br/> Explorez nos événements dès maintenant !</h1>
      </div>
      <div className="events-container">
        <div className="events-container_groupB">
        {articles.map(article => (
            <Article
              key={article.id} 
              id={article.id}
              imgUrl={article.image} 
              date={article.date} 
              text={article.title} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;
