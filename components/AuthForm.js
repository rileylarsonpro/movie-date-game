import Link from 'next/link'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import { Card, Form, Container, Button } from 'react-bootstrap'


const AuthForm = ({ title, linkTo, linkToName, handleSubmit }) => {
    const loggedIn = useSelector(state => state.auth.loggedIn)

    return (
        <Container className="pt-5 container-flex justify-content-center">
            <Card className="p-3 card-sm">
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
                    <Button variant="primary" type="submit" className="w-100" >{title}</Button>
                </Form>
                <nav>
                    <Link href={linkTo}>
                        <a>{linkToName}</a>
                    </Link>
                </nav>
                <div> LoggedIn: {loggedIn ? 'true' : 'false'} </div>
            </Card>
        </Container>
    )
}

export default connect((state) => state)(AuthForm)
