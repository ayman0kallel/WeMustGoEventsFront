import { TableCell } from '@mui/material'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { AiOutlineDrag } from "react-icons/ai";
import './adminPage.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function AdminPage() {

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

  
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const newArticles = [...articles];
    let [source_data] = newArticles.splice(e.source.index, 1);
    newArticles.splice(e.destination.index, 0, source_data);
    setArticles(newArticles);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table sx={{ minWidth: 650, backgroundColor: '#FFFFFF', width: '70%', height: '30%', padding: '16px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Liste des événements</TableCell>
            <TableCell align="left">Titre</TableCell>
            <TableCell align="left">Lieu</TableCell>
            <TableCell align="left">date</TableCell>
            <TableCell align="left">description</TableCell>
            <TableCell align="left">image</TableCell>
          </TableRow>
        </TableHead>
        <Droppable droppableId="droppable-1">
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {articles.map((article, index) => (
                <Draggable key={article.id} draggableId={article.id.toString()} index={index}>
                  {(provided) => (
                    <TableRow
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <TableCell>
                        <AiOutlineDrag />
                      </TableCell>
                      <TableCell>{article.title}</TableCell>
                      <TableCell align="left">{article.location}</TableCell>
                      <TableCell align="left">{article.date}</TableCell>
                      <TableCell align="left">{article.description}</TableCell>
                      <TableCell align="left">{article.image}</TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
        
      </Table>
    </DragDropContext>
  )
}
