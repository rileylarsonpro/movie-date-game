import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import Nabar from '../components/Navbar'
import { Table, Container, Card, Row, Col } from 'react-bootstrap'


const Index = (props) => {
    const [stats, setStats] = useState([])

    useEffect(async () => {
        await getStats()
    }, [])

    async function getStats() {
        const res = await fetch('api/stats')
        let data = await res.json()
        setStats(data)
    }
    return (
        <>
            <Nabar />
            <Container className="pt-5">
                <Card>
                <div className="w-100 m-2 container-flex text-center"><h2>Movie Release Dates Leaderboard</h2></div>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Username</th>
                                <th>Correct Answers</th>
                                <th>Longest Streak</th>
                                <th>Total Questions Answered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((row, index) =>
                                <tr key={row.username}>
                                    <td>{index + 1}</td>
                                    <td>{row.username}</td>
                                    <td>{row.stats.correctAnswers}</td>
                                    <td>{row.stats.longestStreak}</td>
                                    <td>{row.stats.totalQuestionsAnswered}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            </Container>
        </>
    )
}

// Add property to page to make it protected
Index.requireAuth = true

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(null, mapDispatchToProps)(Index)
