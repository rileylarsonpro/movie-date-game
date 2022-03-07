import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { Card, Container, Button, Row, Col } from 'react-bootstrap'
import Nabar from './Navbar'


const Page = () => {
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [correct, setCorrect] = useState([])
    const [movieId, setMovieId] = useState([])
    const [disabled, setDisabled] = useState(false)
    const [wrongAnswerCount, setCount] = useState(0)

    useEffect(async () => {
        await getQuestion()
    }, [])

    async function getQuestion() {
        setDisabled(false)
        setCount(0)
        const res = await fetch('api/questions')
        let data = await res.json()
        setQuestion(data.title)
        data.answers = data.answers.map(answer => ({ date: answer, variant: "outline-primary" }));
        setAnswers(data.answers)
        setCorrect(data.correctAnswer)
        setMovieId(data.movieId)
    }
    async function answerQuestion(answer, index) {
        // Correct answer known by process of elemination
        if(wrongAnswerCount === (answers.length - 2)){
            setDisabled(true)
        }
        // update button visualy 
        if (answer.date === correct) {
            answer.variant = "success"
            setDisabled(true)
        }
        else {
            answer.variant = "danger"
            setCount(wrongAnswerCount + 1)
        }
        let newArr = [...answers]; // copying the old datas array
        newArr[index] = answer;
        setAnswers(newArr);

        // Update stats in database
        const res = await fetch(`/api/questions/movies/${movieId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                answer: answer.date,
                correctAnswer: correct,
            })
        })
        let data = await res.json()
        //console.log(data)
    }
    return (
        <div>
            <Nabar />
            <Container className="form-size pt-5 container-flex justify-content-center">
                <Card className="p-3 card-sm">
                    <div className="w-100 container-flex text-center"><h2>Movie Release Dates</h2>
                        <div className='question-title-wrapper'><h1 className="primary-color"> {question} </h1></div>
                        <Row><Col>
                            {answers.map((answer, index) =>
                                <Button onClick={() => answerQuestion(answer, index)} key={answer.date} className='p-2 m-2 big-button' variant={answer.variant} disabled={disabled}>{answer.date}</Button>
                            )}</Col></Row>
                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    <Button onClick={getQuestion} variant="primary" type="submit" className="w-100 btn-lg" >Get Next Question</Button>
                </Card>
            </Container>
        </div>
    )
}

export default connect((state) => state)(Page)
