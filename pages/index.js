import { connect } from 'react-redux'
import GeneralGame from '../components/GeneralGame'


const Index = (props) => {
  return  <GeneralGame />
}

// Add property to page to make it protected
Index.requireAuth = true

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(Index)
