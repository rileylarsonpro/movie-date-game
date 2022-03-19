import { connect } from 'react-redux'
import AuthForm from '../components/AuthForm'
import { registerUser } from '../store/auth/action'
import { useDispatch } from 'react-redux'
import Router from 'next/router';



const Register = (props) => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
      event.preventDefault();
      const form = Object.fromEntries(new FormData(event.target).entries());
      await dispatch(registerUser(form))
      Router.push('/')
  };

  return <AuthForm title="Register" linkTo="/login" linkToName="Login Here" handleSubmit={handleSubmit}>Register</AuthForm>
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(Register)
