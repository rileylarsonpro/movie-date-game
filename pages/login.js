import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AuthForm from '../components/AuthForm'
import { loginUser } from '../store/auth/action'
import { useDispatch } from 'react-redux'
import Router from 'next/router'

const Login = (props) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.target).entries());
    let loginStatus = await dispatch(loginUser(form))
    // TODO: Feedback to user if login fails. 
    Router.push('/')
  };
  return <AuthForm title="Login" linkTo="/register" linkToName="Create Account" handleSubmit={handleSubmit} />
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: bindActionCreators(loginUser, dispatch),
  }
}

export default connect(null, mapDispatchToProps)(Login)
