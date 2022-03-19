import { connect } from 'react-redux'
import Nabar from '../components/Navbar'
import MyLists from '../components/MyLists'


const Index = (props) => {
    return (
        <>
            <Nabar />
            <MyLists />
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
