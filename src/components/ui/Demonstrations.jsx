import { lazy, Suspense, useState } from "react"
import SectionHeader from "../utility/SectionHeader"
import { useSiteContext } from "../../context/SiteContext"
import ErrorMessage from "./ErrorMessage"
// import Dijkstra from "../demos/pathfinding/Dijkstra"

const AStar = lazy(() => import("../demos/pathfinding/Astar/AStar"))
const Dijkstra = lazy(() => import("../demos/pathfinding/Dijkstra/Dijkstra"))

const Demonstrations = () => {

    const { demos } = useSiteContext()

    const [show, setShow] = useState(false)
    const [showInd, setShowInd] = useState(0)

    const items = [<Dijkstra />, <AStar />]

    const updateShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const changeIndex = (e) => {
        e.preventDefault()
        setShowInd(current => {
            return (current + 1) % items.length
        })
    }

    if (demos) {
        return (
            <div id="Demonstrations" className="mx-auto mw-1300p banner">

                <SectionHeader
                    title={demos.header.title}
                    message={demos.header.message}
                />

                {!show && <button
                    onClick={(e) => updateShow(e)}
                    className="btn btn-primary d-block mx-auto">
                    Load Demonstrations
                </button>}
                {show && <button
                    onClick={(e) => changeIndex(e)}
                    className="btn btn-primary d-block mx-auto">
                        {showInd == 0 && <>Switch to A*</>}
                        {showInd == 1 && <>Switch to Dijkstra's</>}
                    </button>
                }
                <Suspense fallback={<h1>Loading...</h1>}>
                    {show && <>
                        {items[showInd]}
                    </>}
                </Suspense>
            </div>
        )
    }

    return <ErrorMessage string={"There was an error loading Demonstration data"} />
}

export default Demonstrations