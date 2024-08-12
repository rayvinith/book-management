import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setBooks } from '../redux/slices/booksSlice';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, CircularProgress, Box } from '@mui/material';
import Filter from '../Filter';
import Sort from '../Sort';

const Books = () => {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const categoryFilter = searchParams.get('categories') || '';
        const sortOption = searchParams.get('sort') || '';

        let url = 'https://movie-json-server-bhus.onrender.com/books';
        const queryParams = new URLSearchParams();

        if (categoryFilter) {
          queryParams.append('categories', categoryFilter);
        }

        if (sortOption) {
          queryParams.append('_sort', 'release_year');
          queryParams.append('_order', sortOption);
        }

        if (queryParams.toString()) {
          url += `?${queryParams.toString()}`; // Fixed this line
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        dispatch(setBooks(data));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [dispatch, searchParams]);

  if (!books || books.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Filter categories={['Fiction', 'Non-Fiction']} />
      <Sort />
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book.id}>
            <Card sx={{ backgroundColor: '#e0f7fa', color: '#006064' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.book_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Author: {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {book.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release Year: {book.release_year}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  No. of Chapters: {book.no_of_chapters}
                </Typography>
                
                <Link to={`/books/${book.id}`} style={{ textDecoration: 'none', color: '#006064' }}>
                  View Details
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Books;
