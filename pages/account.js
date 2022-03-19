import { connect } from 'react-redux'
import IndividualStats from '../components/IndividualStats'
import Nabar from '../components/Navbar'
import UpdateUser from '../components/UpdateUserForm'


const Index = (props) => {
    return (
        <>
            <Nabar />
            <IndividualStats />
            <UpdateUser />
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
