import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useEffect, useRef, useState } from "react"
import { useCreateGrid } from "../utility/useCreateGrid"
import ErrorMessage from "../../ui/ErrorMessage"
import { SequenceStep } from "../utility/classes"


export const SquareGridCanvas = ({ inGrid, gridUpdate, method, children }) => {

    // React-lifecycle variables
    const currentMode = useRef(1)
    const { createGrid } = useCreateGrid()

    // Non-React variables
    const colors = [[150, 150, 150], [0, 0, 0], [50, 50, 200], [50, 200, 50]]
    const animationColors = {
        'analyzing': [250, 0, 0],
        'heaped': [150, 0, 0],
        'back': [50, 150, 150],
        'path': [100, 200, 200],
        'start': [50, 50, 200],
        'end': [50, 200, 50]
    }
    let step = 30
    let pad = 2
    let thisCanvas = {}
    let start = [null, null]
    let end = [null, null]
    let animationSequence = []
    let currentGrid = JSON.parse(JSON.stringify(inGrid));

    // Functions for grid controls
    function playAnimation() {

        // Generate animation sequence
        animationSequence = method(inGrid, start, end)

        // Adjustments for start/end based on path existence
        if (animationSequence.length > 0) {
            // Re-marking start and end colors after animation
            animationSequence.push(new SequenceStep(start[0], start[1], 'start'))
            animationSequence.push(new SequenceStep(end[0], end[1], 'end'))
        } else {
            // Marks start/end red if not found
            animationSequence.push(new SequenceStep(start[0], start[1], 'analyzing'))
            animationSequence.push(new SequenceStep(end[0], end[1], 'analyzing'))
        }

        // Trigger the draw() loop
        thisCanvas.loop()
    }

    function clearGrid() {
        // Sets grid to a blank grid
        gridUpdate(createGrid(inGrid.length))
    }

    // P5.js sketch function, for canvas control
    function sketch(p5) {

        // Helper function to draw rounded squares on canvas
        function roundedSquare(x, y, fillColor) {
            p5.fill(fillColor[0], fillColor[1], fillColor[2])
            return p5.square(x * step + pad, y * step + pad, (step - (2 * pad)), 3)
        }

        // Draws the grid via reference, records start/end coords
        function drawGrid() {
            p5.fill(150)
            p5.noStroke()
            for (let row in inGrid) {
                for (let col in inGrid[row]) {
                    roundedSquare(row, col, colors[inGrid[row][col]])
                    if (inGrid[row][col] == 2) start = [parseInt(row), parseInt(col)]
                    if (inGrid[row][col] == 3) end = [parseInt(row), parseInt(col)]
                }
            }
        }

        // Creates the canvas, links thisCanvas for external function calls
        p5.setup = () => {
            thisCanvas = p5
            p5.createCanvas(inGrid.length * step, inGrid.length * step)
            drawGrid()
            p5.noLoop()
        }

        // Trigger setup when props are updated
        p5.updateWithProps = () => {
            p5.setup()
        }

        // Handling grid interactions
        function interact() {
            return () => {

                // Guard to protect against out-of-canvas clicks
                if (p5.mouseX == 0 && p5.mouseY == 0) return

                // Retrieve/discretize mouse coords
                let loc_x = Math.floor(p5.mouseX / step)
                let loc_y = Math.floor(p5.mouseY / step)

                // Validation
                if (loc_x < 0 || loc_x >= currentGrid.length || loc_y < 0 || loc_y >= currentGrid.length) return
                if (currentGrid[loc_x][loc_y] === currentMode.current) return

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
                        currentGrid[start[0]][start[1]] = 0
                    }
                    start = [loc_x, loc_y]
                }

                // End mode updates the end position
                if (currentMode.current === 3) {
                    if (end[0] !== null) {
                        currentGrid[end[0]][end[1]] = 0
                    }
                    end = [loc_x, loc_y]
                }

                // All modes update the current cell
                currentGrid[loc_x][loc_y] = currentMode.current
                roundedSquare(loc_x, loc_y, colors[currentMode.current])
            }
        }

        // Register interaction function to both click and drag
        // sends updates to parent on mouse-release
        p5.mousePressed = interact()
        p5.mouseDragged = interact()
        p5.mouseReleased = () => {
            gridUpdate(currentGrid)
        }

        // Loop to process the animation sequence
        p5.draw = () => {
            if (animationSequence.length === 0) {
                p5.noLoop()
                return
            } else {
                let nextStep = animationSequence.shift()
                let stepColor = animationColors[nextStep.step]
                roundedSquare(nextStep.x, nextStep.y, stepColor)
            }
        }
    }

    // React component return
    if (inGrid) {
        return (
            <>
                <div>
                    <div className="d-flex flex-column flex-md-row px-3 gap-3 align-items-center justify-content-around">

                        <Controls
                            currentMode={currentMode}
                            playfunc={playAnimation}
                            clearfunc={clearGrid}
                        >
                            <ul>
                                {children.map((x, idx) => {
                                    return <li key={idx}>{x}</li>
                                })}
                                <li>- Barrier cells are drawn in <span style={{ color: `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})` }}>Black</span></li>
                                <li>- Start cell is drawn in <span style={{ color: `rgb(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]})` }}>Blue</span></li>
                                <li>- End cell is drawn in <span style={{ color: `rgb(${colors[3][0]}, ${colors[3][1]}, ${colors[3][2]})` }}>Green</span></li>
                                <li>- Cells being analyzed are <span style={{ color: `rgb(${animationColors['analyzing'][0]}, ${animationColors['analyzing'][1]}, ${animationColors['analyzing'][2]})` }}>Red</span></li>
                                <li>- Cells on the heap are <span style={{ color: `rgb(${animationColors['heaped'][0]}, ${animationColors['heaped'][1]}, ${animationColors['heaped'][2]})` }}>Dark Red</span></li>
                                <li>- Cells found in backtracking are <span style={{ color: `rgb(${animationColors['back'][0]}, ${animationColors['back'][1]}, ${animationColors['back'][2]})` }}>Dark Teal</span></li>
                                <li>- Cells on the final path are <span style={{ color: `rgb(${animationColors['path'][0]}, ${animationColors['path'][1]}, ${animationColors['path'][2]})` }}>Teal</span></li>
                            </ul>
                        </Controls>
                        <ReactP5Wrapper sketch={sketch} />
                    </div>
                </div>
            </>
        )
    }
    else {
        return <ErrorMessage string={"There was an error loading the canvas"} />
    }
}

export const Controls = ({ currentMode, playfunc, clearfunc, children }) => {

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
            <div className="p-2 rounded light-bg">

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