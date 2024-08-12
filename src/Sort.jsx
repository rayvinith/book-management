import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const Sort = () => {
  const [selectedSort, setSelectedSort] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = searchParams.get('sort');
    if (params) {
      setSelectedSort(params);
    }
  }, [searchParams]);

  const handleSortChange = (event) => {
    const { value } = event.target;
    setSelectedSort(value);
    setSearchParams({ sort: value });
  };

  return (
    <FormControl component="fieldset" sx={{ m: 2 }}>
      <FormLabel component="legend">Sort by Release Year</FormLabel>
      <RadioGroup
        aria-label="sort"
        name="sort"
        value={selectedSort}
        onChange={handleSortChange}
      >
        <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
        <FormControlLabel value="desc" control={<Radio />} label="Descending" />
      </RadioGroup>
    </FormControl>
  );
};

export default Sort;
