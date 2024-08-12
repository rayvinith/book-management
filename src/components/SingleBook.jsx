import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBook } from '../redux/slices/booksSlice';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SingleBook = () => {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.find((book) => book.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://movie-json-server-bhus.onrender.com/books/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(deleteBook(parseInt(id)));
        navigate('/books');
      } else {
        alert('Failed to delete the book');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (!book) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Book not found.</Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" sx={{ p: 3 }}>
      <Card sx={{ maxWidth: 600, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" component="div" gutterBottom>
            {book.book_name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Author: {book.author}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Release Year: {book.release_year}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No. of Chapters: {book.no_of_chapters}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Chapters: {book.chapters.join(', ')}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/books/edit/${id}`)}
            startIcon={<EditIcon />}
            sx={{ marginRight: 1 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDialogOpen}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </CardActions>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the book "{book.book_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SingleBook;
