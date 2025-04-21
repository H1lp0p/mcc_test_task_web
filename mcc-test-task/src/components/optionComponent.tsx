import { useSelector, useDispatch } from 'react-redux'
import { State } from '../redux/state'

import { add, remove, reset, setEditable } from '../redux/treeReducer'

export const OptionsComponent = () => {

    let dispatch = useDispatch()
  
    let selectedId = useSelector((state: State) => state.selectedId)
  
    const handleAddNode = (txt: string = "new Node") => {
      dispatch(add({text: txt, parrentId: selectedId ? selectedId : null})) 
    }
  
    const handleEdit = () => {
      dispatch(setEditable())
    } 
  
    const handleReset = () => {
      dispatch(reset())
    }
  
    const handleDelete = () => {
      if (selectedId){
        dispatch(remove({nodeId: selectedId}))
      }
    }
  
    return (
      <div className='options'>
        <button onClick={() => {handleAddNode()}}>add</button>
        <button onClick={() => {handleEdit()}}>edit</button>
        <button onClick={() => {handleDelete()}}>delete</button>
        <button onClick={() => {handleReset()}}>reset</button>
      </div>
    )
  }
  