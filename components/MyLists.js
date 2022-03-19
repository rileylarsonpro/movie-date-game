import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Table, Button, Form, Row, Col } from 'react-bootstrap'


const MyLists = ({ user }) => {
    const [lists, setLists] = useState([])
    const [formName, setFormName] = useState("")
    const [formPublic, setFormPublic] = useState(false)
    useEffect(async () => {
        await getLists()
    }, [])

    async function getLists() {
        const res = await fetch('api/lists/users')
        let data = await res.json()
        setLists(data)
    }

    async function playList() {

    }

    async function updateList() {
        
    }

    async function deleteList(listId) {
        const res = await fetch(`/api/lists/${listId}`, {
            method: 'DELETE'
        })
        getLists()
    }

    async function createList(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("public", formPublic)
        const res = await fetch(`/api/lists/users/${user._id}`, {
            method: 'POST',
            body: formData
          })
        getLists()
        event.target.reset()
    }

    return (
        <>
            <Container className="pt-5">
                <Card>
                    <div className="w-100 m-2 container-flex text-center"><h2>Your Lists</h2></div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>List Name</th>
                                <th>Visibilty Status</th>
                                <th>Play List</th>
                                <th>Update List</th>
                                <th>Delete List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map((list, index) =>
                                <tr key={list._id}>
                                    <td>{index + 1}</td>
                                    <td>{list.name}</td>
                                    <td>{list.public ? "public" : "private"}</td>
                                    <td><Button onClick={playList} variant="primary">Play List</Button></td>
                                    <td><Button onClick={updateList} variant="info">Update</Button></td>
                                    <td><Button onClick={() => deleteList(list._id)} variant="danger">Delete</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
                <Container className="form-size pt-5 container-flex justify-content-center">
                    <Card >
                        <div className="w-100 m-2 container-flex text-center"><h3>Upload List</h3></div>
                        <Form onSubmit={createList}>
                            <Container>
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>List Name</Form.Label>
                                    <Form.Control onChange={(e) => setFormName(e.target.value)} name="name" type="text" placeholder="Enter list name" required />
                                </Form.Group>
                                <Form.Check
                                    onChange={(e) => setFormPublic(e.target.checked)}
                                    className="mb-2"
                                    label="Make List Public"
                                    type="checkbox"
                                />
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload a .csv file expored from IMDB</Form.Label>
                                    <input name="csv" type="file" required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mb-2" >Upload List</Button>
                            </Container>
                        </Form>
                    </Card>
                </Container>
            </Container>
        </>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
}); 

export default connect(mapStateToProps)(MyLists)