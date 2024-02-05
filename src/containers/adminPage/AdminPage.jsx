
import { DataGrid } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './adminPage.css'
import { Navbar } from '../../components';

export default function AdminPage() {

  const [articles, setArticles] = useState([]);
  const [snackbar, setSnackbar] = useState(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/article');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  

  const updateArticle = async (updatedRow) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/article/${updatedRow.id}`, updatedRow);
      setSnackbar({ children: 'Article updated successfully', severity: 'success' });
      setEditedRow(null);
      return response.data;
    } catch (error) {
      console.error('Error updating article:', error);
      setSnackbar({ children: 'Failed to update article', severity: 'error' });
      return null;
    }
  };

  const deleteArticle = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/article/${id}`);
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      setSnackbar({ children: 'Article deleted successfully', severity: 'success' });
    } catch (error) {
      console.error('Error deleting article:', error);
      setSnackbar({ children: 'Failed to delete article', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowEdit = (newRow) => {
    newRow.date = parseFrenchDate(newRow.date);
    console.log(newRow);
    setEditedRow(newRow);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setEditedRow(null);
  };

  const handleConfirmDialogYes = async () => {
    if (editedRow) {
      await updateArticle(editedRow);
    }
    setConfirmDialogOpen(false);
  };
  const parseFrenchDate = (frenchDateString) => {
    // Divisez la chaîne de date française en parties (jour, mois, année)
    const frenchDateParts = frenchDateString.split(' ');

    // Récupérez le jour et l'année
    const day = parseInt(frenchDateParts[0]);
    const year = parseInt(frenchDateParts[2]);

    // Convertissez le mois en nombre en utilisant une table de correspondance
    const monthNames = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    const month = monthNames.indexOf(frenchDateParts[1].toLowerCase());

    // Créez un nouvel objet Date avec les parties de la date
    const dateObject = new Date(year, month, day);

    return dateObject;
};
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const frenchDate = new Date(dateString).toLocaleDateString('fr-FR', options);
    return frenchDate;
  };

  const columns = [
    { field: 'title', headerName: 'Titre', width: 200, editable: true },
    { field: 'location', headerName: 'Lieu', width: 200, editable: true },
    { field: 'date', headerName: 'Date', width: 150, editable: true,valueGetter: (params) => formatDate(params.value) },
    { field: 'description', headerName: 'Description', width: 300, editable: true },
    { field: 'image', headerName: 'Image', width: 300, editable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div >
          <Button sx={{marginRight:'5px'}} variant="contained" color="primary" onClick={() => handleRowEdit(params.row)}>Edit</Button>
          <Button variant="contained" color="primary" onClick={() => deleteArticle(params.row.id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div >
      <Navbar/>
      <div className="events-heading">
            <h1 className="gradient__text">Voici la liste des événements</h1>
      </div>
      <DataGrid
        rows={articles}
        columns={columns}
        editMode="row"
        sx={{ backgroundColor: '#FFFFFF', borderRadius: '20px', marginLeft:'50px',marginRight:'300px' }}
      />
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirmer la modification</DialogTitle>
        <DialogContent>
          Vous etes sur de changer cet événement?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleConfirmDialogClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleConfirmDialogYes}>Yes</Button>
        </DialogActions>
      </Dialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <Button variant="contained" color="primary" sx={{marginLeft:'50px',marginTop:'10px'}} onClick={()=>navigate('/createEvent')}>Ajouter événement</Button>
    </div>
  );
}
