import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const Filter = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.get('categories');
    if (params) {
      setSelectedCategories(params.split(','));
    }
  }, [searchParams]);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    const newSelectedCategories = selectedCategories.includes(value)
      ? selectedCategories.filter((category) => category !== value)
      : [...selectedCategories, value];

    setSelectedCategories(newSelectedCategories);
    setSearchParams({ categories: newSelectedCategories.join(',') });
  };

  return (
    <FormControl component="fieldset" sx={{ m: 2 }}>
      <FormLabel component="legend">Filter by Category</FormLabel>
      <FormGroup>
        {categories.map((category) => (
          <FormControlLabel
            key={category}
            control={
              <Checkbox
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                value={category}
              />
            }
            label={category}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Filter;
