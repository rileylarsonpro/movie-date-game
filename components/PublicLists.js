import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Table, Button, Form, Row, Col } from 'react-bootstrap'
import Router from 'next/router'


const PublicLists = ({ user }) => {
    const [lists, setLists] = useState([])
    useEffect(async () => {
        await getLists()
    }, [])

    async function getLists() {
        const res = await fetch('api/lists')
        let data = await res.json()
        setLists(data)
    }

    async function playList(list) {
        Router.push({
            pathname: '/listGame',
            query: { listId: list._id, listName: list.name },
        })
    }
    return (
        <>
            <Container className="pt-5">
                <Card>
                    <div className="w-100 m-2 container-flex text-center"><h2>Movie Lists</h2></div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>List Name</th>
                                <th>List Owner</th>
                                <th>Play List</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.map((list, index) =>
                                <tr key={list._id}>
                                    <td>{index + 1}</td>
                                    <td>{list.name}</td>
                                    <th>{list.owner.username}</th>
                                    <td><Button onClick={() => playList(list)} variant="primary">Play List</Button></td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>    
            </Container>
        </>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(PublicLists)