import { useSelector } from "react-redux"

import { State } from '../redux/state'
import { OptionsComponent } from "./optionComponent"
import { NodeComponent } from "./nodeComponent"

export const TreeComponent = () => {
    let root = useSelector((state: State) => state.root)

    return (
        <>
            <OptionsComponent/>
            <ul>
                <NodeComponent node={root}/>
            </ul>
        </>
    )
}