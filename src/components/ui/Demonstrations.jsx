import { lazy, Suspense, useState } from "react"
import SectionHeader from "../utility/SectionHeader"
// import Dijkstra from "../demos/pathfinding/Dijkstra"

const AStar = lazy(() => import("../demos/pathfinding/Astar/AStar"))

const Demonstrations = () => {

    const [show, setShow] = useState(false)

    const updateShow = (e) => {
        e.preventDefault()
        show ? setShow(false) : setShow(true)
    }

    return (
        <div id="Demonstrations" className="mx-auto mw-1300p banner">

            <SectionHeader
                title={"Demonstrations"}
                message={[
                    "This section contains demonstrations for various programming concepts",
                    "To begin, I've created a visualization of the A* pathfinding algorithm",
                    "These take advantage of client-side rendering, all the magic happens on your machine!",
                    "For performance, these demonstartions won't load until you click the button"
                ]}
            />

            <button
                onClick={(e) => updateShow(e)}
                className="btn btn-primary d-block mx-auto">
                {!show && <>Load A* Demonstration</>}
                {show && <>Hide A* Demonstration</>}
            </button>
            <Suspense fallback={<h1>Loading...</h1>}>
                {show && <AStar />}
            </Suspense>
        </div>
    )
}

export default Demonstrations