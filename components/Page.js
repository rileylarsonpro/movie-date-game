import Link from 'next/link'
import { connect } from 'react-redux'
import CallApi from './CallApi'
import { useSelector } from 'react-redux'


const Page = ({ title, linkTo }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  return (
  <div>
    <h1>{title}</h1>
    <div> LoggedIn: {loggedIn ? 'true' : 'false'} </div>
    {<CallApi />}
    <nav>
      <Link href={linkTo}>
        <a>Navigate</a>
      </Link>
    </nav>
  </div>
)}

export default connect((state) => state)(Page)
