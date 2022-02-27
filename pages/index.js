import { connect } from 'react-redux'
import Page from '../components/Page'


const Index = (props) => {
  return  <Page title="Index Page" linkTo="/login" />
}

Index.requireAuth = true

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(Index)
