import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { Card, Container, Button, Row, Col } from 'react-bootstrap'
import Nabar from './Navbar'


const Page = () => {
  const [question, setQuestion] = useState([])
  const [answers, setAnswers] = useState([])
  const [correct, setCorrect] = useState([])

  useEffect(async()=>{
    await getQuestion()
  },[])
  
  async function getQuestion() {
    const res = await fetch('api/questions')
    let data = await res.json()
    setQuestion(data.title)
    setAnswers(data.answers)
    setCorrect(data.correctAnswer)
  }
  return (
    <div>
        <Nabar/>
        <Container className="form-size pt-5 container-flex justify-content-center">
            <Card className="p-3 card-sm">
                <div className="w-100 container-flex text-center"><h2>Movie Triva Game</h2>
                    <div className='question-title-wrapper'><h1 className="primary-color"> {question} </h1></div>
                    <Row><Col>
                    {answers.map( answer =>
                        <Button className='p-2 m-2 big-button' variant="outline-primary">{ answer }</Button>
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
)}

export default connect((state) => state)(Page)
