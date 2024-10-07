import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import ListGroup from 'react-bootstrap/ListGroup';
import { deleteSingleAuthor } from '../api/authorData';

function AuthorCard({ authorObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.email}?`)) {
      deleteSingleAuthor(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>{authorObj.first_name}</ListGroup.Item>
        <ListGroup.Item>{authorObj.last_name}</ListGroup.Item>
        <ListGroup.Item>{authorObj.email}</ListGroup.Item>
        <ListGroup.Item>
          {authorObj.favorite && (
            <span>
              FAVORITE
              <br />
            </span>
          )}{' '}
        </ListGroup.Item>
      </ListGroup>

      <Link href={`/author/view/${authorObj.firebaseKey}`} passHref>
        <Button variant="primary" className="m-2">
          VIEW
        </Button>
      </Link>
      {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS  */}
      <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
        <Button variant="info">EDIT</Button>
      </Link>
      <Button variant="danger" className="m-2" onClick={deleteThisAuthor}>
        DELETE
      </Button>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.bool,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
