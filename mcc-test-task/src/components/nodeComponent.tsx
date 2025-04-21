import React, { useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { State } from '../redux/state'
import { Node } from '../models/Nodes'

import { edit, select } from '../redux/treeReducer'

export interface NodeProps{
    node: Node
  }
  
export const NodeComponent = (props: NodeProps) => {
    let dispatch = useDispatch()
    let selectedId = useSelector((state: State) => state.selectedId)
    let isEditable = useSelector((state: State) => state.isEditable)

    let name = useRef<HTMLInputElement>(null)

    let handleSelect = (event: React.MouseEvent) => {
        event.stopPropagation()
        if (!(props.node.id == selectedId && isEditable)){
        dispatch(select({selectedNodeId: props.node.id}))
        }
    }

    let handleEdit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.current){
        dispatch(edit({newText: name.current?.value, nodeId: props.node.id}))
        }
    }

    return (
        <li onClick={handleSelect} className={props.node.id == selectedId ? "selected" : ''}>
        {(isEditable && props.node.id == selectedId) && 
        <form onSubmit={handleEdit}>
            <input type={"text"} ref={name} defaultValue={props.node.text}/>
            <button type={"submit"} className={"inline-btn"}>✓</button>
        </form>
        }
        {!(isEditable && props.node.id == selectedId) && props.node.text}
        {props.node.children.length > 0 && 
            <ul>
            {props.node.children.map((el, it) => (
                <NodeComponent node={el} key={it}/>
            ))}
            </ul>
        }
        </li>
    )
}