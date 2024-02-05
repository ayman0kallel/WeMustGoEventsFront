import { useEffect, useState } from 'react';
import axios from 'axios';
import './favourite.css';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navbar } from '../../components';

export default function Favourite() {
  const [favouriteArticles, setFavouriteArticles] = useState([]);

  useEffect(() => {
    const fetchFavouriteArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/favorite/articles');
        setFavouriteArticles(response.data);
      } catch (error) {
        console.error('Error fetching favorite articles:', error);
      }
    };

    fetchFavouriteArticles();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const frenchDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return frenchDate;
  };

  const toggleFavorite = async (articleId) => {
    try {
      // Find the article to update
      const articleToUpdate = favouriteArticles.find((article) => article.id === articleId);
      if (!articleToUpdate) return; // Exit if article is not found
  
      // Toggle the favorite status
      const updatedArticle = { ...articleToUpdate, favorite: !articleToUpdate.favorite };
  
      // Update the local state
      const updatedArticles = favouriteArticles.map((article) => {
        if (article.id === articleId) {
          return updatedArticle;
        }
        return article;
      });
      setFavouriteArticles(updatedArticles);
  
      // Toggle favorite status on the backend
      await axios.put(`http://127.0.0.1:8000/article/${articleId}`, updatedArticle);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
    }
  };

  return (
    <div>
    <Navbar/>
    <div className="container">
      {favouriteArticles.length === 0 ? (
        <Typography variant="body1">Vous n'avez pas encore d'article favoris.</Typography>
      ) : (
        favouriteArticles.map((article) => (
          <div key={article.id}>
            <Card sx={{ maxWidth: 300 }}>
            <CardMedia
              component="img"
              alt="Article image"
              height="200"
              sx={{
                objectFit: 'cover', // Adjust the object-fit property to cover the fixed height
              }}
              image={article.image}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {article.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {formatDate(article.date)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary" size="small" onClick={() => toggleFavorite(article.id)}>
                {article.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </CardActions>
          </Card>
          </div>
        ))
      )}
    </div>
  </div>
    
  );
}
