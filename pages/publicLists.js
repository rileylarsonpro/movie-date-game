import { connect } from 'react-redux'
import Nabar from '../components/Navbar'
import PublicLists from '../components/PublicLists'


const Index = (props) => {
    return (
        <>
            <Nabar />
            <PublicLists />
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
