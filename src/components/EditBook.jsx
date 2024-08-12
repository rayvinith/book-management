import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateBook } from '../redux/slices/booksSlice';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const EditBook = () => {
  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.find((book) => book.id === parseInt(id))
  );
  const [bookName, setBookName] = useState(book.book_name);
  const [author, setAuthor] = useState(book.author);
  const [releaseYear, setReleaseYear] = useState(book.release_year);
  const [noOfChapters, setNoOfChapters] = useState(book.no_of_chapters);
  const [chapters, setChapters] = useState(book.chapters.join(', '));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = async () => {
    const updatedBook = {
      id: book.id,
      book_name: bookName,
      author,
      release_year: releaseYear,
      no_of_chapters: noOfChapters,
      chapters: chapters.split(',').map(chapter => chapter.trim()),
    };

    try {
      const response = await fetch(`https://movie-json-server-bhus.onrender.com/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(updateBook(data));
        navigate('/books');
      } else {
        alert('Failed to update the book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Box display="flex"  alignItems="center" height="100vh" justifyContent={'space-between'}>
      <Card sx={{ maxWidth: 600 }} display="flex">
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Edit Book
          </Typography>
          <TextField
            label="Book Name"
            fullWidth
            margin="normal"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <TextField
            label="Author"
            fullWidth
            margin="normal"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <TextField
            label="Release Year"
            fullWidth
            margin="normal"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          <TextField
            label="Number of Chapters"
            fullWidth
            margin="normal"
            value={noOfChapters}
            onChange={(e) => setNoOfChapters(e.target.value)}
          />
          <TextField
            label="Chapters (comma-separated)"
            fullWidth
            margin="normal"
            value={chapters}
            onChange={(e) => setChapters(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update Book
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/books')}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default EditBook;
