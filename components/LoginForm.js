import Link from 'next/link'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/auth/action'
import { Card, Form, Container, Button } from 'react-bootstrap'


const LoginForm = ({ title, linkTo }) => {
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        dispatch(loginUser())
    };

    return (
        <Container className="pt-5 container-flex justify-content-center">
            <Card className="p-3 card-sm">
                <div className="w-100 container-flex text-center"><h1>{title}</h1></div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100" >Login</Button>
                </Form>
                <nav>
                    <Link href={linkTo}>
                        <a>Create Account</a>
                    </Link>
                </nav>
                <div> LoggedIn: {loggedIn ? 'true' : 'false'} </div>
            </Card>
        </Container>
    )
}

export default connect((state) => state)(LoginForm)
