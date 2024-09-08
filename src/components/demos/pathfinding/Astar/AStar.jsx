import { useCallback, useRef, useState } from "react";
import { SquareGridCanvas, Controls } from "../SquareGridCanvas";
import { Heap } from 'heap-js'

const AStar = () => {

    const [width, setWidth] = useState(10)
    let currentMode = useRef(1)

    const aStarPathfinder = useCallback((grid, start, end) => {

        class SequenceStep {
            constructor(x, y, step) {
                this.x = x
                this.y = y
                this.step = step
            }
        }

        class HeapEntry {
            constructor(f, x, y) {
                this.f = f;
                this.x = x
                this.y = y
            }
        }

        class AncestorCell {
            constructor(f, g, h, px, py) {
                this.f = f;
                this.g = g;
                this.h = h;
                this.px = px;
                this.py = py;
            }

        }

        function backtrack(ancestors) {
            let path = [new SequenceStep(end[0], end[1], "path")]
            let backPath = [new SequenceStep(end[0], end[1], "back")]

            while (path[0].x != start[0] && path[0].y != start[1]) {
                console.log("Loop check")
                let px = ancestors[path[0].x][path[0].y].px
                let py = ancestors[path[0].x][path[0].y].py
                path.unshift(new SequenceStep(px, py, "path"))
                backPath.push(new SequenceStep(px, py, "back"))
            }
            let px = ancestors[path[0].x][path[0].y].px
            let py = ancestors[path[0].x][path[0].y].py
            path.unshift(new SequenceStep(px, py, "path"))
            backPath.push(new SequenceStep(px, py, "back"))

            for (let b of backPath) {
                console.log(b)
            }
            for (let p of path) {
                console.log(p)
            }

            return backPath.concat(path)
        }

        console.log(grid, start, end)

        // Initialize 
        let found = false
        let sequence = []

        const customComparator = (a, b) => a.f - b.f;
        let heap = new Heap(customComparator)
        heap.push(new HeapEntry(0, start[0], start[1]))

        sequence.push(new SequenceStep(start[0], start[1], "heaped"))

        let ancestors = new Array()
        let visited = new Array()
        for (let i = 0; i < grid.length; i++) {
            ancestors.push(new Array())
            visited.push(new Array())
            for (let j = 0; j < grid.length; j++) {
                ancestors[i].push(new AncestorCell(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0, null, null))
                visited[i].push(false)
            }
        }
        ancestors[start[0]][start[1]] = new AncestorCell(0, 0, 0, null, null)




        // Explore
        while (heap.length > 0 && !found) {
            let { f, x, y } = heap.pop()

            visited[x][y] = true
            sequence.push(new SequenceStep(x, y, "analyzing"))

            for (let dir of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                let new_x = x + dir[0]
                let new_y = y + dir[1]
                console.log(new_x, new_y)
                if (new_x >= 0 && new_x < grid.length && new_y >= 0 && new_y < grid.length) {
                    console.log("Passed guards")
                    if (grid[new_x][new_y] == 1) continue
                    if (visited[new_x][new_y]) continue
                    console.log("Analyzing", new_x, new_y)
                    if (new_x == end[0] && new_y == end[1]) {
                        ancestors[new_x][new_y] = new AncestorCell(0, 0, 0, x, y)
                        found = true
                        let backtracking = backtrack(ancestors)
                        return sequence.concat(backtracking)
                    }
                    else {
                        // Calculate the new cost using the actual cost plus estimated straight-line-distance
                        let newG = ancestors[x][y].g + 1.0
                        let newH = (((end[0] - new_x) ** 2 + (end[1] - new_y) ** 2) ** 0.5)
                        let newF = newG + newH
                        if (ancestors[new_x][new_y].f == Number.MAX_SAFE_INTEGER || ancestors[new_x][new_y].f > newF) {
                            console.log("Pushing to heap")
                            ancestors[new_x][new_y] = new AncestorCell(newF, newG, newH, x, y)
                            heap.push(new HeapEntry(newF, new_x, new_y))
                            sequence.push(new SequenceStep(new_x, new_y, "heaped"))
                        }
                    }
                }
            }
        }

        if (!found) {
            console.log("Not found")
            return []
        }
    }, [])


    return (
        <>
            <h1>A* Pathfinding animation ....</h1>
            <SquareGridCanvas n={width} mode={currentMode} method={aStarPathfinder} />
            <Controls reference={currentMode} />
        </>
    )
}

export default AStar