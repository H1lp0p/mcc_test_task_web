import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { Node } from "../models/Nodes"
import { State } from "./state"

let id_counter = 0

const initialState: State = {
    root: {
        id: ++id_counter,
        text: "root",
        children: [
            {
                id: ++id_counter,
                text: `node 1`,
                children: [
                    {
                        id: ++id_counter,
                        text: "node 2",
                        children: []
                    }
                ]
            },
            {
                id: ++id_counter,
                text: "node 3",
                children: []
            },
            {
                id: ++id_counter,
                text: "node 4",
                children: []
            },
            {
                id: ++id_counter,
                text: "node 5",
                children: []
            }
        ]
    },
    selectedId: undefined,
    isEditable: false,
}

const findNode = (state: State, id: number) : Node | undefined => {
    let queue = [state.root]
    
    for (let node of queue){
        if (node.id == id){
            return node
        }
        else{
            queue.push(...node.children)
        }
    }
    return undefined
}

const findParent = (state: State, id: number): Node | undefined => {
    let queue = [state.root]
    
    for (let node of queue){
        if (node.children.findIndex((it) => it.id == id) > -1){
            return node
        }
        else{
            queue.push(...node.children)
        }
    }
    return undefined
}

const treeSlice = createSlice({
    name: "tree",
    initialState: initialState,
    reducers: {
        add: (state, action : PayloadAction<{text: string, parrentId: number| null}>) => {
            let newNode : Node = {
                id: ++id_counter,
                text: action.payload.text,
                children: []
            } 
            let parrent = action.payload.parrentId ? findNode(state, action.payload.parrentId) : state.root

            console.log(action.payload.parrentId);
            
            parrent?.children.push(newNode)
        },
        remove: (state, action: PayloadAction<{nodeId: number}>) => {
            let node = findParent(state, action.payload.nodeId)
            if (node){
                node.children = node.children.filter((it) => it.id != action.payload.nodeId)
                state.selectedId = undefined
                state.isEditable = false
            }            
        },
        reset: (state) => {
            state.root = {...initialState.root}
            state.selectedId = undefined
            state.isEditable = false
        },
        move: (state, action: PayloadAction<{nodeId: number, newParentId: number}>) => {
            let nowParent = findParent(state, action.payload.nodeId)
            let nowNode = findNode(state, action.payload.nodeId)

            if (nowNode && nowParent){
                let newParent = findNode(state, action.payload.newParentId)
                if (newParent){
                    nowParent.children = nowParent.children.filter(it => it.id != nowNode.id)
                    newParent.children.push(nowNode)
                }
            }
        },
        edit: (state, action: PayloadAction<{nodeId: number, newText: string}>) => {
            let node = findNode(state, action.payload.nodeId)
            if (node){
                node.text = action.payload.newText
                state.isEditable = false
            }
        },
        select: (state, action: PayloadAction<{selectedNodeId: number}>) => {
            
            if (state.selectedId == action.payload.selectedNodeId){
                state.selectedId = undefined
            }
            else{
                if (findNode(state, action.payload.selectedNodeId)){
                    state.selectedId = action.payload.selectedNodeId
                    state.isEditable = false
                }
            }
        },
        setEditable: (state) => {
            if (state.selectedId){
                state.isEditable = !state.isEditable
            }
        }
    }
})

const reducer = treeSlice.reducer

export const { add, remove, reset, edit, move, select, setEditable } = treeSlice.actions
export default reducer