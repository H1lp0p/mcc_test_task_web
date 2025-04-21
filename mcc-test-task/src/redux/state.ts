import { Node } from "../models/Nodes"

export interface State {
    root: Node,
    selectedId: number | undefined,
    isEditable: boolean 
}