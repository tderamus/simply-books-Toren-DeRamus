'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { viewAuthorDetails } from '@/api/mergedData';
import { getAuthorBooks } from '../../../../api/authorData';
import BookCard from '../../../../components/BookCard';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});
  const [authorBooks, setAuthorBooks] = useState([]);

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
    getAuthorBooks(firebaseKey).then(setAuthorBooks);
  }, [firebaseKey]);

  const getAuthorBookDetail = () => {
    getAuthorBooks(firebaseKey).then(setAuthorBooks);
    console.log(authorBooks);
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>{authorDetails.first_name}</ListGroup.Item>
          <ListGroup.Item>{authorDetails.last_name}</ListGroup.Item>
          <ListGroup.Item>{authorDetails.email}</ListGroup.Item>
          <ListGroup.Item>
            {authorDetails.favorite && (
              <span>
                FAVORITE
                <br />
              </span>
            )}{' '}
          </ListGroup.Item>
        </ListGroup>
      </Card>
      <div className="d-flex flex-wrap">
        {authorBooks.map((authorBook) => (
          <BookCard key={authorBooks.firebaseKey} bookObj={authorBook} onUpdate={getAuthorBookDetail} />
        ))}
      </div>
    </>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
