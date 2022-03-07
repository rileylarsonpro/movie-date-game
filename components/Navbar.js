import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { logoutUser } from '../store/auth/action'
import { useDispatch } from 'react-redux'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'


export default function CallApi({ }) {
    const [text, setText] = useState([])
    const [question, setQuestion] = useState([])
    const username = useSelector(state => state.auth.user.username)
    const dispatch = useDispatch()

    async function logOut() {
        dispatch(logoutUser())
    }

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">Movie Trivia Game</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={username} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            <NavDropdown.Item >Account Details</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}