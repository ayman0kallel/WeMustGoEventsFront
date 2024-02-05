import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './eventPage.css';
import axios from 'axios';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Navbar } from '../../components';


export default function EventPage() {
  const [article, setArticle] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const { eventId } = useParams();

  useEffect(() => {
    // Function to fetch user information upon component mount
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in local storage');
          return;
        }
        const response = await axios.get('http://127.0.0.1:8000/loggedUser', {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        setUserRole(response.data.roles);
        setIsLoggedIn(true);

      } catch (error) {
        console.error('Error fetching user data!!!!', error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/article/${eventId}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [eventId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const frenchDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return frenchDate;
  };

  const toggleFavorite = async () => {
    try {
        // Toggle the favorite status
        const updatedArticle = { ...article, favorite: !article.favorite };
        await axios.put(`http://127.0.0.1:8000/article/${eventId}`, updatedArticle);
        
        // Update the local state
        setArticle(updatedArticle);
    } catch (error) {
        console.error('Error toggling favorite status:', error);
    }
};

  return (
    <div>
      <Navbar/>
      <Container maxWidth="md">
        <Paper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              {article && (
                <img src={article.image} alt={article.title} style={{ width: '100%' }} />
              )}
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box p={3}>
                <Typography variant="h4" gutterBottom>
                  {article ? article.title : 'Loading...'}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                  {article ? formatDate(article.date) : ''}
                </Typography>
                <Typography variant="body1">
                  {article ? article.description : ''}
                </Typography>
                {isLoggedIn && userRole[0]=== "ROLE_USER"? 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleFavorite}
                  startIcon={article?.favorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                >
                  {article?.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </Button> :''}  
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
