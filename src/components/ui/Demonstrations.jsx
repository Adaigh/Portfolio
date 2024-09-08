import { lazy, Suspense, useState } from "react"
// import Dijkstra from "../demos/pathfinding/Dijkstra"

const AStar = lazy(() => import("../demos/pathfinding/Astar/AStar"))

const Demonstrations = () => {

    const [show, setShow] = useState(false)

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div className="mx-auto w-fc banner">
                {show && <AStar />}
                <button onClick={() => show ? setShow(false) : setShow(true)} >Show it</button>
            </div>
        </Suspense>
    )
}

export default Demonstrations