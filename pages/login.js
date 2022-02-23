import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import LoginForm from '../components/LoginForm'
import { loginUser } from '../store/auth/action'

const Register = (props) => {
  return <LoginForm title="Login" linkTo="/register" />
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),    
  }
}

export default connect(null, mapDispatchToProps)(Register)
