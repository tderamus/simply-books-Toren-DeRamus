/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/" className="navbar-brand">
          Simply Books
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link className="nav-link" href="/">
              Books
            </Link>
            <Link className="nav-link" href={`/author/${user.uid}`}>
              Authors
            </Link>
            <Link className="nav-link" href={`/author/createNew/${user.uid}`}>
              Create Author
            </Link>
            <Link className="nav-link" href={`/author/${user.uid}`}>
              Profile
            </Link>
          </Nav>
          <Button variant="danger" onClick={signOut}>
            Sign Out
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
