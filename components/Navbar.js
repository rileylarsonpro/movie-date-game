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
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end text-right">
                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/publicLists">Lists</Nav.Link>
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/account">Account Details</NavDropdown.Item>
                            <NavDropdown.Item href="/myLists">My Lists</NavDropdown.Item>
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}