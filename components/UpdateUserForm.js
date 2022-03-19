import { connect, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { on } from "../store/customEvents";
import { updateUser, deleteUser } from '../store/auth/action'
import { Card, Container, Button, Form, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'



const UpdateUserForm = () => {
    const user = useSelector(state => state.auth.user)
    const [username, setUsername] = useState(user.username)
    const [newPassword, setNewPassword] = useState("")
    const dispatch = useDispatch()


    async function handleSubmit(event) {
        event.preventDefault();
        let body = { username }
        if (newPassword !== "") body.password = newPassword
        await dispatch(updateUser(user._id, body))
        setNewPassword("")
    }

    async function handleDeleteUser() {
        await dispatch(deleteUser(user._id))
    }

    function usernameChanged(event) {
        setUsername(event.target.value)
    }

    function passowrdChanged(event) {
        setNewPassword(event.target.value)
    }

    return (
        <div>
            <Container className="form-size pt-5 container-flex justify-content-center">
                <Card className="p-3 card-sm">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={username} onChange={usernameChanged} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control value={newPassword} onChange={passowrdChanged} type="password" placeholder="New Password" />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Update Account
                        </Button>
                    </Form>
                </Card>
                <br></br>
                <Card className="p-3 card-sm" >
                    <Button variant="danger" className="w-100" onClick={handleDeleteUser}>
                        Delete Account
                    </Button>
                </Card>

            </Container>
        </div>
    )
}

export default connect((state) => state)(UpdateUserForm)
