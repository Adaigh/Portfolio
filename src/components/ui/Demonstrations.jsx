import { lazy, Suspense, useState } from "react"
// import Dijkstra from "../demos/pathfinding/Dijkstra"

const Dijkstra = lazy(() => import("../demos/pathfinding/Dijkstra"))

const Demonstrations = () => {

    const [show, setShow] = useState(false)

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div className="mx-auto w-fc banner">
                {show && <Dijkstra />}
                <button onClick={() => show ? setShow(false) : setShow(true)} >Show it</button>
            </div>
        </Suspense>
    )
}

export default Demonstrations