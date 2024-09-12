import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useRef, useState } from "react"
import { useCreateGrid } from "../utility/useCreateGrid"

const breakpoint = 1200

export const SquareGridCanvas = ({ grid, method }) => {

    const colors = [[150, 150, 150], [0, 0, 0], [50, 50, 200], [50, 200, 50]]
    const animationColors = {
        'analyzing': [250, 0, 0],
        'heaped': [150, 0, 0],
        'back': [50, 150, 150],
        'path': [100, 200, 200]
    }

    const [width, setWidth] = useState(10)
    const currentMode = useRef(1)

    const { createGrid } = useCreateGrid()

    useEffect(() => {
        const monitorBreakpoint = () => {
            window.innerWidth > breakpoint ? setWidth(20) : setWidth(10)
        }
        monitorBreakpoint()
        window.addEventListener('resize', monitorBreakpoint)
        return () => window.removeEventListener('resize', monitorBreakpoint)
    }, [])

    let thisCanvas = {}
    let start = [null, null]
    let end = [null, null]
    let animationSequence = []

    function playAnimation() {
        thisCanvas.setup()
        animationSequence = method(grid, start, end)
        thisCanvas.loop()
    }

    function clearGrid() {
        let n = width
        grid = createGrid(n)
        thisCanvas.setup()
    }

    function sketch(p5) {
        thisCanvas = p5
        let n = 0
        let step = 30
        let pad = 2

        function roundedSquare(x, y, fillColor) {
            p5.fill(fillColor[0], fillColor[1], fillColor[2])
            return p5.square(x * step + pad, y * step + pad, (step - (2 * pad)), 3)
        }

        p5.setup = () => {
            p5.createCanvas(n * step, n * step)
            p5.fill(150)
            p5.noStroke()
            for (let row in grid) {
                for (let col in grid[row]) {
                    roundedSquare(row, col, colors[grid[row][col]])
                }
            }
            p5.noLoop()
        }

        p5.updateWithProps = () => {
            if (!grid) {
                n = width
                grid = createGrid(n)
            }
            else {
                n = grid.length
            }
            p5.setup()
        }

        function interact() {
            return () => {

                // Retrieve mouse coords
                let loc_x = Math.floor(p5.mouseX / step)
                let loc_y = Math.floor(p5.mouseY / step)

                // Validation
                if (loc_x < 0 || loc_x >= n || loc_y < 0 || loc_y >= n) return
                if (grid[loc_x][loc_y] === currentMode.current) return

                // Erase and Barrier mode reset the start or endpoints if clicked
                if (currentMode.current === 0 || currentMode.current === 1) {
                    if (start[0] === loc_x && start[1] == loc_y) {
                        start = [null, null]
                    }
                    if (end[0] === loc_x && end[1] === loc_y) {
                        end = [null, null]
                    }
                }

                // Start mode updates the start position
                if (currentMode.current === 2) {
                    if (start[0] !== null) {
                        grid[start[0]][start[1]] = 0
                        p5.fill(150)
                        roundedSquare(start[0], start[1], colors[0])
                    }
                    start = [loc_x, loc_y]
                }

                // End mode updates the end position
                if (currentMode.current === 3) {
                    if (end[0] !== null) {
                        grid[end[0]][end[1]] = 0
                        p5.fill(150)
                        roundedSquare(end[0], end[1], colors[0])
                    }
                    end = [loc_x, loc_y]
                }

                // All modes update the current cell
                grid[loc_x][loc_y] = currentMode.current
                roundedSquare(loc_x, loc_y, colors[currentMode.current])
            }
        }

        // Register interaction function to both click and drag
        p5.mouseDragged = interact()
        p5.mousePressed = interact()


        p5.draw = () => {
            if (animationSequence.length == 0) {
                let startColor = colors[2]
                roundedSquare(start[0], start[1], startColor)
                let endColor = colors[3]
                roundedSquare(end[0], end[1], endColor)
                p5.noLoop()
                return
            }
            let nextStep = animationSequence.shift()
            let stepColor = animationColors[nextStep.step]
            roundedSquare(nextStep.x, nextStep.y, stepColor)
        }
    }

    return (
        <>
            <div>
                <div className="d-flex flex-column flex-md-row px-3 gap-3 align-items-center justify-content-around">

                    <Controls
                        currentMode={currentMode}
                        n={width}
                        updateN={setWidth}
                        playfunc={playAnimation}
                        clearfunc={clearGrid}
                    >
                        <ul>
                            <li>This is a demonstration of the A* pathfinding algorithm</li>
                            <li>The heuristic used is the standard point-distance function</li>
                            <li>This version explores the 2D grid in four directions (NSEW)</li>
                            <li>- Barrier cells are drawn in <span style={{ color: `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})` }}>Black</span></li>
                            <li>- Start cell is drawn in <span style={{ color: `rgb(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]})` }}>Blue</span></li>
                            <li>- End cell is drawn in <span style={{ color: `rgb(${colors[3][0]}, ${colors[3][1]}, ${colors[3][2]})` }}>Green</span></li>
                            <li>- Cells being analyzed are <span style={{ color: `rgb(${animationColors['analyzing'][0]}, ${animationColors['analyzing'][1]}, ${animationColors['analyzing'][2]})` }}>Red</span></li>
                            <li>- Cells on the heap are <span style={{ color: `rgb(${animationColors['heaped'][0]}, ${animationColors['heaped'][1]}, ${animationColors['heaped'][2]})` }}>Dark Red</span></li>
                            <li>- Cells found in backtracking are <span style={{ color: `rgb(${animationColors['back'][0]}, ${animationColors['back'][1]}, ${animationColors['back'][2]})` }}>Dark Teal</span></li>
                            <li>- Cells on the final path are <span style={{ color: `rgb(${animationColors['path'][0]}, ${animationColors['path'][1]}, ${animationColors['path'][2]})` }}>Teal</span></li>
                            {/* <li>Use the following controls to draw on the grid:</li> */}
                        </ul>
                    </Controls>
                    <ReactP5Wrapper sketch={sketch} />
                </div>
            </div>
        </>
    )
}

export const Controls = ({ currentMode, n, updateN, playfunc, clearfunc, children }) => {

    const modes = ['erase', 'barrier', 'start', 'end']

    const [cntlMode, setCntlMode] = useState(null)


    useEffect(() => {
        setCntlMode(currentMode.current)
    }, [])

    const changeMode = (val) => {
        setCntlMode(val)
        currentMode.current = val
    }

    return (
        <div className="">
            {children}
            <div className="p-2 rounded bg-secondary-subtle">
                <label htmlFor="widthSlider" className="form-label d-block">Grid width {n}</label>
                <input type="range" className="form-range" id="widthSlider" min={5} max={window.innerWidth > breakpoint ? 20 : 10} onChange={(e) => updateN(e.target.value)} value={n}></input>
                <div>
                    <span>Click Mode: </span>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="cntlRadio"
                            id="cntlRadio1"
                            checked={cntlMode == 0}
                            value={0}
                            onChange={() => changeMode(0)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="cntlRadio1">
                            Eraser
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="cntlRadio"
                            id="cntlRadio2"
                            checked={cntlMode == 1}
                            value={1}
                            onChange={() => changeMode(1)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="cntlRadio2">
                            Barrier
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="cntlRadio"
                            id="cntlRadio3"
                            checked={cntlMode == 2}
                            value={2}
                            onChange={() => changeMode(2)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="cntlRadio3">
                            Start Position
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="cntlRadio"
                            id="cntlRadio4"
                            checked={cntlMode == 3}
                            value={3}
                            onChange={() => changeMode(3)}
                        />
                        <label
                            className="form-check-label"
                            htmlFor="cntlRadio4">
                            End Position
                        </label>
                    </div>
                </div>
                <button className="btn btn-success me-2" onClick={playfunc}>Play Animation</button>
                <button className="btn btn-primary" onClick={clearfunc}>Clear Grid</button>
            </div>
        </div>
    )
}

export default SquareGridCanvas