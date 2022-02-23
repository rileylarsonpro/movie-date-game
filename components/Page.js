import Link from 'next/link'
import { connect } from 'react-redux'
import Clock from './Clock'
import AddCount from './AddCount'
import CallApi from './CallApi'
import { useSelector } from 'react-redux'


const Page = ({ title, linkTo, tick }) => {
  const loggedIn = useSelector(state => state.auth.loggedIn)
  return (
  <div>
    <h1>{title}</h1>
    <div> LoggedIn: {loggedIn ? 'true' : 'false'} </div>
    {/*<Clock lastUpdate={tick.lastUpdate} light={tick.light} />*/}
    {/*<AddCount />*/}
    {<CallApi />}
    <nav>
      <Link href={linkTo}>
        <a>Navigate</a>
      </Link>
    </nav>
  </div>
)}

export default connect((state) => state)(Page)
