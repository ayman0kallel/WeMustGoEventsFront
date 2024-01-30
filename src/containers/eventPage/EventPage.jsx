/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import './eventPage.css'
import axios from 'axios';


export default function EventPage({ match }) {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/article/${match.params.id}`);
            setArticle(response.data);
        } catch (error) {
            console.error('Error fetching article:', error);
        }
        };

        fetchArticle();
    }, [match.params.id]);
  return (
    <div>
      {article && (
        <>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          {/* Render other article details */}
        </>
      )}
    </div>
  )
}
