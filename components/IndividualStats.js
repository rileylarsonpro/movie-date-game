import { connect, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { on } from "../store/customEvents";
import { Card, Container, Button, Row, Col } from 'react-bootstrap'



const IndividualStats = ({ user }) => {
    const [totalQuestionsAnswered, setTotalQuestions] = useState(0)
    const [correctAnswers, setCorrect] = useState(0)
    const [incorrectAnswers, setIncorrect] = useState(0)
    const [currentStreak, setCurrent] = useState(0)
    const [longestStreak, setlongestStreak] = useState(0)

    useEffect(async () => {
        await getStats()
        on("statsChanged", getStats);

    }, [])

    async function getStats() {
        const res = await fetch(`api/stats/${user._id}`)
        let { totalQuestionsAnswered, correctAnswers, currentStreak, incorrectAnswers, longestStreak } = await res.json()
        setTotalQuestions(totalQuestionsAnswered)
        setCorrect(correctAnswers)
        setIncorrect(incorrectAnswers)
        setCurrent(currentStreak)
        setlongestStreak(longestStreak)
    }

    return (
        <div>
            <Container className="form-size pt-5 container-flex justify-content-center">
                <Card className="p-3 card-sm">
                    <div className="w-100 container-flex text-center"><h2>Your Stats</h2></div>
                    <Row>
                        <Col className='justify-content-center text-center'>
                            <h1 className="text-center">{currentStreak}</h1>
                            {currentStreak ?
                             <p className='success-color'>Current Streak</p> :
                             <p className='danger-color'>Current Streak</p>
                             }
                           
                        </Col>
                        <Col className='justify-content-center text-center'>
                            <h1 className="text-center">{longestStreak}</h1>
                            <p className='primary-color'>Longest Streak</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='justify-content-center text-center'>
                            <h3 className="text-center">{totalQuestionsAnswered}</h3>
                            <p className='primary-color'>Total Questions Answered</p>
                        </Col>
                        <Col className='justify-content-center text-center'>
                            <h3 className="text-center">{correctAnswers}</h3>
                            <p className='success-color'>Total Correct Answers</p>
                        </Col>
                        <Col className='justify-content-center text-center'>
                            <h3 className="text-center">{incorrectAnswers}</h3>
                            <p className='danger-color'>Total Incorrect Answers</p>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps)(IndividualStats)
