import { connect } from 'react-redux'
import GeneralGame from '../components/GeneralGame'
import IndividualStats from '../components/IndividualStats'
import Nabar from '../components/Navbar'

async function getQuestionAPICall() {
  return await fetch('api/questions')
}

const Index = (props) => {
  
  return (
    <>
      <Nabar />
      <GeneralGame title="Movie Release Dates" getQuestionAPICall={getQuestionAPICall}/>
      <IndividualStats />
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
