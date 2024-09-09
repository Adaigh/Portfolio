import { ReactP5Wrapper } from "@p5-wrapper/react"
import { useState } from "react"

export const SquareGridCanvas = ({ n, mode, method }) => {

    const colors = [[250, 250, 250], [0, 0, 0], [50, 50, 200], [50, 200, 50]]
    const animationColors = {
        'analyzing':[250,0,0],
        'heaped':[150,0,0],
        'back':[50,150,150],
        'path':[100,200,200]
    }

    function sketch(p5) {
        let step = 25
        let grid = new Array()

        let start = [null, null]
        let end = [null, null]

        let animationSequence = []

        for (let i = 0; i < n; i++) {
            grid.push(new Array(n).fill(0))
        }

        p5.setup = () => {
            p5.createCanvas(n * step, n * step)
            p5.background(250)
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    p5.strokeWeight(3)
                    p5.square(i * step, j * step, 25)
                }
            }
            p5.noLoop()
        }

        function interact() {
            return () => {

                // Retrieve mouse coords
                let loc_x = Math.floor(p5.mouseX / step)
                let loc_y = Math.floor(p5.mouseY / step)

                // Validation
                if (loc_x < 0 || loc_x >= n || loc_y < 0 || loc_y >= n) return
                if (grid[loc_x][loc_y] === mode.current) return

                // Erase and Barrier mode reset the start or endpoints if clicked
                if (mode.current === 0 || mode.current === 1) {
                    if (start[0] === loc_x && start[1] == loc_y) {
                        start = [null, null]
                    }
                    if (end[0] === loc_x && end[1] === loc_y) {
                        end = [null, null]
                    }
                }

                // Start mode updates the start position
                if (mode.current === 2) {
                    if (start[0] !== null) {
                        grid[start[0]][start[1]] = 0
                        p5.fill(250)
                        p5.square(start[0] * step, start[1] * step, 25)
                    }
                    start = [loc_x, loc_y]
                }

                // End mode updates the end position
                if (mode.current === 3) {
                    if (end[0] !== null) {
                        grid[end[0]][end[1]] = 0
                        p5.fill(250)
                        p5.square(end[0] * step, end[1] * step, 25)
                    }
                    end = [loc_x, loc_y]
                }

                // All modes update the current cell
                grid[loc_x][loc_y] = mode.current
                p5.fill(colors[mode.current][0], colors[mode.current][1], colors[mode.current][2])
                p5.square(loc_x * step, loc_y * step, 25)
                // console.log("Grid updated", grid)
                // console.log("Start", start)
                // console.log("End",end)
            }
        }

        // Register interaction function to both click and drag
        p5.mouseDragged = interact()
        p5.mousePressed = interact()

        p5.keyPressed = () => {
            animationSequence = method(grid, start, end)
            p5.loop()
        }

        p5.draw = () => {
            if(animationSequence.length == 0){
                p5.noLoop()
                return
            }
            let nextStep = animationSequence.shift()
            let stepColor = animationColors[nextStep.step]
            p5.fill(stepColor[0],stepColor[1],stepColor[2])
            p5.square(nextStep.x * step, nextStep.y * step, 25)
        }
    }

    return (
        <>
            <div>
                <ReactP5Wrapper sketch={sketch} />
            </div>
        </>
    )
}

export const Controls = ({ reference }) => {

    const modes = ['erase', 'barrier', 'start', 'end']

    const [state, setState] = useState(reference.current)

    const changeMode = () => {
        setState(cur => (cur + 1) % 4)
        reference.current = (reference.current + 1) % 4
    }

    return (
        <button onClick={changeMode}>Current Mode: {modes[state]}</button>
    )
}

export default SquareGridCanvas