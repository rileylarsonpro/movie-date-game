import { connect } from 'react-redux'
import GeneralGame from '../components/GeneralGame'
import Nabar from '../components/Navbar'
import { useRouter } from 'next/router'
 


const ListGame = (props) => {
    const router = useRouter()
    const {listId, listName} = router.query
    async function getQuestionAPICall(nextMovieIndex = null){
        if (nextMovieIndex){
            return await await fetch(`api/lists/questions/${listId}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    nextMovieIndex
                })
            })
        }
        else return await fetch(`api/lists/questions/${listId}`)
    }
    return (
    <>
      <Nabar />
      <GeneralGame title={listName} getQuestionAPICall={getQuestionAPICall} isList={true}/>
    </>
    )
}

// Add property to page to make it protected
ListGame.requireAuth = true

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(null, mapDispatchToProps)(ListGame)
