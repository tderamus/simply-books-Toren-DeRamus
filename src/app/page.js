/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getBooks } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  // TODO: Set a state for books
  const [books, setBooks] = useState([]);
  const [searchItem, setSearchItem] = useState('');

  // TODO: Get user ID using useAuth Hook
  const { user } = useAuth();

  // TODO: create a function that makes the API call to get all the books
  const getAllTheBooks = () => {
    getBooks(user.uid).then(setBooks);
  };

  function handleChange(e) {
    setSearchItem(e.target.value);
  }

  const searchResults = books.filter((book) => JSON.stringify(book).toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

  // TODO: make the call to the API to get all the books on component render
  useEffect(() => {
    getAllTheBooks();
  }, []);

  return (
    <>
      <div>
        <input type="search" placeholder="Search For Books" onChange={handleChange} />
      </div>
      <Link href="/book/new" passHref>
        <Button>Add A Book</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over books here using BookCard component */}
        {searchResults.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAllTheBooks} />
        ))}
      </div>
    </>
  );
}

Home.propTypes = {
  items: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
};

export default Home;
