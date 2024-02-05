import { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router';
import './addArticleForm.css'
import { Navbar } from '../../components';

const AddArticleForm = ({ onArticleAdded }) => {
    const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/article/create', newArticle);
      onArticleAdded(response.data);
      setNewArticle({
        title: '',
        location: '',
        date: '',
        description: '',
        image: '',
      });
      navigate('/');
      
    } catch (error) {
      console.error('Error adding article:', error);
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="events-heading">
            <h1 className="gradient__text">Ajouter un nouvel événement</h1>
        </div>
        <Box
        sx={{
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '10px',
            width: '300px',
            margin: 'auto',
            marginTop: '50px',
        }}
        >
        <form onSubmit={handleSubmit}>
            <TextField
            label="Title"
            name="title"
            value={newArticle.title}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
            />
            <TextField
            label="Location"
            name="location"
            value={newArticle.location}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
            />
            <TextField
            label="Date"
            name="date"
            type="date"
            value={newArticle.date}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
            />
            <TextField
            label="Description"
            name="description"
            value={newArticle.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: '10px' }}
            />
            <TextField
            label="Image"
            name="image"
            value={newArticle.image}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: '10px' }}
            />
            <Button type="submit" variant="contained" color="primary">
            Ajouter Evénément
            </Button>
        </form>
        </Box>
    </div>
  );
};

export default AddArticleForm;
