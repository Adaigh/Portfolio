import { lazy, Suspense, useState } from "react"
import SectionHeader from "../utility/SectionHeader"
import { useSiteContext } from "../../context/SiteContext"
import ErrorMessage from "./ErrorMessage"
import { useCreateGrid } from "../demos/utility/useCreateGrid"
import { useAStar, useDijkstra } from "../demos/pathfinding/hooks/usePathfinder"

const SquareGridCanvas = lazy(() => import("../demos/pathfinding/SquareGridCanvas"))

const Demonstrations = () => {

    const { demos } = useSiteContext()

    const [show, setShow] = useState(false)
    const [showInd, setShowInd] = useState(0)

    const [width, setWidth] = useState(10)
    const { createGrid } = useCreateGrid()
    const [demoGrid, setDemoGrid] = useState(createGrid(10))

    const { dijkstraPathfinder } = useDijkstra()
    const { aStarPathfinder } = useAStar()
    const funcs = [dijkstraPathfinder, aStarPathfinder]
    const breakpoint = 1200

    const updateWidth = (val) => {
        setWidth(val)
        setDemoGrid(createGrid(val))
    }

    const updateShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const changeIndex = (e) => {
        e.preventDefault()
        setShowInd(current => {
            return (current + 1) % funcs.length
        })
    }

    if (demos) {
        return (
            <div id="Demonstrations" className="banner">
                <div className="mx-auto mw-1300p">
                    <SectionHeader
                        title={demos.header.title}
                        message={demos.header.message}
                    />

                    {!show && <button
                        onClick={(e) => updateShow(e)}
                        className="btn btn-primary d-block mx-auto">
                        Load Demonstrations
                    </button>}
                    {show && <>
                        <div className="d-flex light-bg gap-3 p-3 rounded w-lg-50">
                            <button
                                onClick={(e) => changeIndex(e)}
                                className="btn btn-primary"
                                style={{ width: '180px' }}>
                                {showInd == 0 && <>Switch to A*</>}
                                {showInd == 1 && <>Switch to Dijkstra's</>}
                            </button>

                            <label htmlFor="widthSlider" className="form-label d-block">Grid width {width}</label>
                            <input type="range" className="form-range w-lg-50" id="widthSlider" min={5} max={window.innerWidth > breakpoint ? 20 : 10} onChange={(e) => updateWidth(e.target.value)} value={width}></input>
                        </div>

                        <Suspense fallback={<div style={{ textAlign: "center" }}><h1>Loading...</h1></div>}>
                            <h1 className="p-3">{showInd == 0 ? demos.dijkstra.title : demos.astar.title}</h1>
                            <SquareGridCanvas inGrid={demoGrid} gridUpdate={setDemoGrid} method={funcs[showInd]}>
                                {showInd == 0 ? demos.dijkstra.description : demos.astar.description}
                            </SquareGridCanvas>
                        </Suspense>
                    </>
                    }
                </div>
            </div>
        )
    }

    return <ErrorMessage string={"There was an error loading Demonstration data"} />
}

export default Demonstrations