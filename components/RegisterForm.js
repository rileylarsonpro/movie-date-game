import Link from 'next/link'
import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/auth/action'
import { Card, Form, Container, Button } from 'react-bootstrap'
import Router from 'next/router';


const RegisterForm = ({ title, linkTo }) => {
    const loggedIn = useSelector(state => state.auth.loggedIn)
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = Object.fromEntries(new FormData(event.target).entries());
        console.log("form", form)
        const res = await fetch('/api/users', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                username: form.username,
                password: form.password,
            })
        })
        let data = await res.json()
        console.log(data)

        dispatch(loginUser())
        Router.push('/')
    };

    return (
        <Container className="pt-5 container-flex justify-content-center">
            <Card className="p-3">
                <div className="w-100 container-flex text-center"><h1>{title}</h1></div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" type="text" placeholder="Enter username" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button type="submit" className="w-100" >Create Account</Button>
                </Form>
                <nav>
                    <Link href={linkTo}>
                        <a>Login Here</a>
                    </Link>
                </nav>
                <div> LoggedIn: {loggedIn ? 'true' : 'false'} </div>
            </Card>
        </Container>
    )
}

export default connect((state) => state)(RegisterForm)
