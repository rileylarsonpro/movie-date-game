import { connect, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { on } from "../store/customEvents";
import { Card, Container, Button, Row, Col } from 'react-bootstrap'



const Page = () => {
    const userId = useSelector(state => state.auth.user._id)
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
        const res = await fetch(`api/stats/${userId}`)
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
                   Total Questions Answered: {totalQuestionsAnswered}
                   <br></br>
                   Total Correct Answers: {correctAnswers}
                   <br></br>
                   Total Incorrect Answers: {incorrectAnswers}
                   <br></br>
                   Current Streak: {currentStreak}
                   <br></br>
                   Longest Streak: {longestStreak}
                   <br></br>
                </Card>
            </Container>
        </div>
    )
}

export default connect((state) => state)(Page)
