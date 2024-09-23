import { useCallback } from "react";
import { SquareGridCanvas } from "../SquareGridCanvas";
import { Heap } from 'heap-js'
import ErrorMessage from "../../../ui/ErrorMessage";
import { useSiteContext } from "../../../../context/SiteContext";

const Dijkstra = () => {

    const { dijkstra } = {...useSiteContext().demos}

    const dijkstraPathfinder = useCallback((grid, start, end) => {

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
            constructor(cost, x, y) {
                this.cost = cost;
                this.x = x
                this.y = y
            }
        }

        // Memoization grid to record values and coordinates
        class AncestorCell {
            constructor(cost, px, py) {
                this.cost = cost;
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

        // Initialize Dijkstra parameters
        let found = false
        let sequence = []

        // Heap init
        const customComparator = (a, b) => a.cost - b.cost;
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
                ancestors[i].push(new AncestorCell(Number.MAX_SAFE_INTEGER, null, null))
                visited[i].push(false)
            }
        }
        ancestors[start[0]][start[1]] = new AncestorCell(0, null, null)

        // Explore Dijkstra grid
        while (heap.length > 0 && !found) {
            let { cost, x, y } = heap.pop()

            if (visited[x][y]) continue

            visited[x][y] = true
            sequence.push(new SequenceStep(x, y, "analyzing"))
            
            let new_cost = cost + 1;
            
            for (let dir of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                let new_x = x + dir[0]
                let new_y = y + dir[1]
                if (new_x >= 0 && new_x < grid.length && new_y >= 0 && new_y < grid.length) {
                    if (grid[new_x][new_y] == 1) continue
                    if (visited[new_x][new_y]) continue
                    if (new_x == end[0] && new_y == end[1]) {
                        ancestors[new_x][new_y] = new AncestorCell(new_cost, x, y)
                        found = true
                        let backtracking = backtrack(ancestors)
                        return sequence.concat(backtracking)
                    }
                    else {
                        ancestors[new_x][new_y] = new AncestorCell(new_cost, x, y)
                        heap.push(new HeapEntry(new_cost, new_x, new_y))
                        sequence.push(new SequenceStep(new_x, new_y, "heaped"))
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

    if (dijkstra) {
        return (
            <>
                <h1 className="p-3">{dijkstra.title}</h1>
                <SquareGridCanvas method={dijkstraPathfinder}>
                    {dijkstra.description}
                </SquareGridCanvas>
            </>
        )
    }

    return <ErrorMessage string={"There was an error loading DIJKSTRA data"} />
}

export default Dijkstra