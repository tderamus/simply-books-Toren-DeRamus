'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { viewAuthorDetails } from '../../../../api/mergedData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
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

      <Link href={`/author/${authorDetails.firebaseKey}`} passHref>
        <Button variant="primary" className="m-2">
          VIEW
        </Button>
      </Link>
      {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
      <Link href={`/author/edit/${authorDetails.firebaseKey}`} passHref>
        <Button variant="info">EDIT</Button>
      </Link>
      <Button variant="danger" className="m-2">
        DELETE
      </Button>
    </Card>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
