import { Suspense, useState } from "react"
import { lload } from "../loader"
// import Dijkstra from "../demos/pathfinding/Dijkstra"

const Dijkstra = lload('./demos/pathfinding/Dijkstra')

const Demonstrations = () => {

    const [show, setShow] = useState(false)

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            {show && <Dijkstra />}
            <button onClick={() => show ? setShow(false) : setShow(true)} >Show it</button>
        </Suspense>
    )
}

export default Demonstrations