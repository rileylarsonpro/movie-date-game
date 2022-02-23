import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import RegisterForm from '../components/RegisterForm'
import { loginUser } from '../store/auth/action'

const Register = (props) => {
  return <RegisterForm title="Register" linkTo="/login" />
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),    
  }
}

export default connect(null, mapDispatchToProps)(Register)
