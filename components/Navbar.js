import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logoutUser } from '../store/auth/action'
import { useDispatch } from 'react-redux'
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap'


export default function Nabar({ }) {
    const [text, setText] = useState([])
    const [question, setQuestion] = useState([])
    const username = useSelector(state => state.auth.user.username)
    const dispatch = useDispatch()

    async function logOut() {
        dispatch(logoutUser())
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Movie Trivia Game</Navbar.Brand>
                    <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                    <Nav.Link href="/lists">Lists</Nav.Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            <NavDropdown.Item href="/account">Account Details</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}