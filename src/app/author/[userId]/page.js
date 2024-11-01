'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import AuthorCard from '@/components/AuthorCard';
import { getAuthors } from '../../../api/authorData';

/* eslint-disable react-hooks/exhaustive-deps */
function ShowAuthors({ params }) {
  // Set a state for authors
  const [authors, setAuthors] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  // create a function that makes the API call to get all the authors
  const getAllTheAuthors = () => {
    getAuthors(params.uid).then(setAuthors);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = authors.filter((author) => JSON.stringify(author).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  // make the call to the API to get all the autors on component render
  useEffect(() => {
    getAllTheAuthors();
  }, []);

  return (
    <>
      <div>
        <input type="search" placeholder="Search For Authors" onChange={handleChange} />
      </div>
      <div className="text-center my-4">
        <Link href="/author/new" passHref>
          <Button type="button">Add An Author</Button>
        </Link>
        <div className="d-flex flex-wrap">
          {/* map over authors here using AuthorCard component */}
          {searchResults.map((author) => (
            <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
          ))}
        </div>
      </div>
    </>
  );
}

ShowAuthors.propTypes = {
  params: PropTypes.string.isRequired,
};

export default ShowAuthors;
