import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { trigger } from "../store/customEvents";
import { Card, Container, Button, Row, Col } from 'react-bootstrap'
import Router from 'next/router'


const GeneralGame = ({ title, getQuestionAPICall, isList = false }) => {
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [correct, setCorrect] = useState([])
    const [movieId, setMovieId] = useState("list")
    const [disabled, setDisabled] = useState(false)
    const [wrongAnswerCount, setCount] = useState(0)
    const [nextMovieIndex, setnextMovieIndex] = useState(null)
    const [isEnd, setIsEnd] = useState(false)

    useEffect(async () => {
        await getQuestion()
    }, [])

    async function getQuestion() {
        if (nextMovieIndex === -1) { // if end of list
            setIsEnd(true)
            return
        }
        setDisabled(false)
        setCount(0)
        let res = null
        if (nextMovieIndex != null) {
          
            res = await getQuestionAPICall(nextMovieIndex)
        }
        else {
            res = await getQuestionAPICall()
        }
        let data = await res.json()
        setQuestion(data.title)
        data.answers = data.answers.map(answer => ({ date: answer, variant: "outline-primary" }));
        setAnswers(data.answers)
        setCorrect(data.correctAnswer)
        if (data.movieId) setMovieId(data.movieId)
        if (data.nextMovieIndex) setnextMovieIndex(data.nextMovieIndex)

    }
    async function answerQuestion(answer, index) {
        // Correct answer known by process of elemination
        if (wrongAnswerCount === (answers.length - 2)) {
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

        if (!isList) {
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
            // Triggers change event in stats component
            trigger("statsChanged")
        }

    }
    return (
        <>
            <Container className="form-size pt-5 container-flex justify-content-center">
                <Card className="p-3 card-sm">
                    <div className="w-100 container-flex text-center"><h2>{title}</h2>
                        {isEnd ? 
                            <h2>You have finished the list!</h2>
                            :
                            <div><div className='question-title-wrapper'><h1 className="primary-color"> {question} </h1></div>
                                <Row><Col>
                                    {answers.map((answer, index) =>
                                        <Button onClick={() => answerQuestion(answer, index)} key={answer.date} className='p-2 m-2 big-button' variant={answer.variant} disabled={disabled}>{answer.date}</Button>
                                    )}</Col></Row></div>
                        }

                    </div>
                    <br>
                    </br>
                    <br>
                    </br>
                    { isEnd ? 
                        <Button onClick={() => {Router.push('/myLists')}} variant="primary" type="submit" className="w-100 btn-lg" >Back to My Lists</Button>
                    :
                        <Button onClick={getQuestion} variant="primary" type="submit" className="w-100 btn-lg" >Get Next Question</Button>
                    }
                </Card>
            </Container>
        </>
    )
}

export default connect((state) => state)(GeneralGame)
