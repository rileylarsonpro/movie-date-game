import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Table, Button, Form, Row, Col } from 'react-bootstrap'
import Router from 'next/router'


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

    async function playList(list) {
        Router.push({
            pathname: '/listGame',
            query: { listId: list._id, listName: list.name },
        })
    }

    async function updateListItem(list, newBody) {
        list.name = newBody.name
        const res = await fetch(`/api/lists/${list._id}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(newBody)
        })
        getLists()
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
                    <div className="w-100 m-2 container-flex text-center"><h2>{user.username}'s Lists</h2></div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>List Name</th>
                                <th>Visibilty Status</th>
                                <th>Play List</th>
                                <th>Delete List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map((list, index) =>
                                <tr key={list._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Form.Control
                                            onChange={
                                                (e) => { setLists(lists.map(el => (el._id === list._id ? {...el, name: e.target.value} : el)))}
                                            }
                                            onBlur={(e) => updateListItem(list, { name: e.target.value, public: list.public })}
                                            value={list.name}
                                            name="name"
                                            type="text"
                                        />
                                    </td>
                                    <td>
                                        <Form.Check
                                            onChange={(e) => updateListItem(list, { name: list.name, public: e.target.checked })}
                                            className="mb-2"
                                            label="Make List Public"
                                            type="checkbox"
                                            checked={list.public}
                                        />
                                    </td>
                                    <td><Button onClick={() => playList(list)} variant="primary">Play List</Button></td>
                                    <td><Button onClick={() => deleteList(list._id)} variant="danger">Delete</Button></td>
                                </tr>

                            )}
                        </tbody>
                    </Table>
                </Card>
                <Container className="form-size pt-5 container-flex justify-content-center">
                    <Card >
                        <div className="w-100 m-2 container-flex text-center"><h2>Upload List</h2></div>
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