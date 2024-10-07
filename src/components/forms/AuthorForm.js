'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateAuthor, createAuthor, getAuthors } from '../../api/authorData';

const initialState = {
  email: '',
  favorite: false,
  first_name: '',
  last_name: '',
};

function AuthorForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  // const [authors, setAuthors] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getAuthors(user.uid);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/author/page');
        });
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="text-black">
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

        {/* EMAIL INPUT  */}
        <FloatingLabel controlId="floatingInput1" label="Author Email" className="mb-3">
          <Form.Control type="text" placeholder="Enter Email" name="email" value={formInput.email} onChange={handleChange} required />
        </FloatingLabel>

        {/* FIRST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="First Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* LAST NAME INPUT  */}
        <FloatingLabel controlId="floatingInput3" label="Last Name" className="mb-3">
          <Form.Control type="text" placeholder="Enter Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
        </FloatingLabel>

        {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
        <Form.Check
          className="text-white mb-3"
          type="switch"
          id="favorite"
          name="favorite"
          label="favorite?"
          checked={formInput.favorite}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              favorite: e.target.checked,
            }));
          }}
        />

        {/* SUBMIT BUTTON  */}
        <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} AUTHOR</Button>
      </Form>
    </div>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

export default AuthorForm;
