import { useCallback, useEffect, useRef, useState } from "react";
import { SquareGridCanvas, Controls } from "../SquareGridCanvas";
import { Heap } from 'heap-js'

const AStar = () => {


    const aStarPathfinder = useCallback((grid, start, end) => {

        // Stores data for each step in that the algorithm takes
        class SequenceStep {
            constructor(x, y, step) {
                this.x = x
                this.y = y
                this.step = step
            }
        }

        // Records to be sorted via heap
        class HeapEntry {
            constructor(weight, x, y) {
                this.weight = weight;
                this.x = x
                this.y = y
            }
        }

        // Memoization grid to record values and coordinates
        class AncestorCell {
            constructor(weight, pathLength, distance, px, py) {
                this.weight = weight;
                this.pathLength = pathLength;
                this.distance = distance;
                this.px = px;
                this.py = py;
            }

        }

        // Function to backtrack the found path through the memoization grid
        function backtrack(ancestors) {

            let path = [new SequenceStep(end[0], end[1], "path")]
            let backPath = [new SequenceStep(end[0], end[1], "back")]

            let cx = path[0].x
            let cy = path[0].y

            while (ancestors[cx][cy].px != null && ancestors[cx][cy].py != null) {
                let px = ancestors[cx][cy].px
                let py = ancestors[cx][cy].py
                path.unshift(new SequenceStep(px, py, "path"))
                backPath.push(new SequenceStep(px, py, "back"))
                cx = path[0].x
                cy = path[0].y
            }

            return backPath.concat(path)
        }

        // Initialize Astar parameters
        let found = false
        let sequence = []

        // Heap init
        const customComparator = (a, b) => a.weight - b.weight;
        let heap = new Heap(customComparator)
        heap.push(new HeapEntry(0, start[0], start[1]))

        // Sequence init
        sequence.push(new SequenceStep(start[0], start[1], "heaped"))

        // Memoization and visited grid init
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

        // Explore Astar grid
        while (heap.length > 0 && !found) {

            // Pop the 'lightest' weight, record as visited
            let { weight, x, y } = heap.pop()
            visited[x][y] = true
            sequence.push(new SequenceStep(x, y, "analyzing"))

            // Check all neighbors
            for (let dir of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                let new_x = x + dir[0]
                let new_y = y + dir[1]

                // Bounds check + barrier check + visited check
                if (new_x >= 0 && new_x < grid.length && new_y >= 0 && new_y < grid.length) {
                    if (grid[new_x][new_y] == 1) continue
                    if (visited[new_x][new_y]) continue

                    // Calculating new data
                    let newPathLength = ancestors[x][y].pathLength + 1.0
                    // Using point-distance as heuristic function
                    let newDistance = ((end[0] - new_x) ** 2 + (end[1] - new_y) ** 2) ** 0.5 
                    let newWeight = newPathLength + newDistance

                    // Checking for end cell
                    if (new_x == end[0] && new_y == end[1]) {
                        ancestors[new_x][new_y] = new AncestorCell(newWeight, newPathLength, newDistance, x, y)
                        found = true
                        let backtracking = backtrack(ancestors)
                        return sequence.concat(backtracking)
                    }
                    else {

                        // Only push to the heap if it's a shorter path
                        if (ancestors[new_x][new_y].weight > newWeight) {
                            ancestors[new_x][new_y] = new AncestorCell(newWeight, newPathLength, newDistance, x, y)
                            heap.push(new HeapEntry(newWeight, new_x, new_y))
                            sequence.push(new SequenceStep(new_x, new_y, "heaped"))
                        }
                    }
                }
            }
        }

        // Delivers a sequence that turns start and end red if not found.
        if (!found) {
            console.log("Not found")
            return [new SequenceStep(start[0], start[1], "analyzing"), new SequenceStep(end[0], end[1], "analyzing")]
        }
    }, [])


    return (
        <>
            <h1 className="p-3">A* Pathfinding animation</h1>
            <SquareGridCanvas method={aStarPathfinder} />
        </>
    )
}

export default AStar