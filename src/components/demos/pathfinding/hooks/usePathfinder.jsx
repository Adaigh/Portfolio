import { Heap } from 'heap-js'
import {
    AncestorCell,
    AStarAncestorCell,
    HeapEntry,
    SequenceStep
} from '../../utility/classes'

// Function to backtrack the found path through the memoization grid
function backtrack(ancestors, start, end) {

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

export const useAStar = () => {
    const aStarPathfinder = (grid, start, end) => {
        
        // console.log("ASTAR", grid, start, end)
        // Initialize AStar parameters
        let found = false
        let sequence = []

        // Heap init
        const customComparator = (a, b) => a.cost - b.cost;
        let heap = new Heap(customComparator)
        heap.push(new HeapEntry(0, start[0], start[1]))

        // Memoization and visited grid init
        let ancestors = new Array()
        let visited = new Array()
        for (let i = 0; i < grid.length; i++) {
            ancestors.push(new Array())
            visited.push(new Array())
            for (let j = 0; j < grid.length; j++) {
                ancestors[i].push(new AStarAncestorCell(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0, null, null))
                visited[i].push(false)
            }
        }
        ancestors[start[0]][start[1]] = new AStarAncestorCell(0, 0, 0, null, null)

        // Explore Astar grid
        while (heap.length > 0 && !found) {

            // Pop the 'lightest' cost, record as visited
            let { cost, x, y } = heap.pop()
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
                    let newCost = newPathLength + newDistance

                    // Checking for end cell
                    if (new_x == end[0] && new_y == end[1]) {
                        ancestors[new_x][new_y] = new AStarAncestorCell(newCost, newPathLength, newDistance, x, y)
                        found = true
                        let backtracking = backtrack(ancestors, start, end)
                        let aniSeq = sequence.concat(backtracking)
                        aniSeq.shift()
                        return aniSeq
                    }
                    else {

                        // Only push to the heap if it's a shorter path
                        if (ancestors[new_x][new_y].cost > newCost) {
                            ancestors[new_x][new_y] = new AStarAncestorCell(newCost, newPathLength, newDistance, x, y)
                            heap.push(new HeapEntry(newCost, new_x, new_y))
                            sequence.push(new SequenceStep(new_x, new_y, "heaped"))
                        }
                    }
                }
            }
        }

        // Delivers a sequence that turns start and end red if not found.
        if (!found) {
            // console.log("Not found")
            return [new SequenceStep(start[0], start[1], "analyzing"), new SequenceStep(end[0], end[1], "analyzing")]
        }
    }
    return { aStarPathfinder }
}

export const useDijkstra = () => {
    const dijkstraPathfinder = (grid, start, end) => {

        // Initialize Dijkstra parameters
        let found = false
        let sequence = []

        // Heap init
        const customComparator = (a, b) => a.cost - b.cost;
        let heap = new Heap(customComparator)
        heap.push(new HeapEntry(0, start[0], start[1]))

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
            // console.log(heap)
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
                        let backtracking = backtrack(ancestors, start, end)
                        let aniSeq = sequence.concat(backtracking)
                        aniSeq.shift()
                        return aniSeq
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
            // console.log("Not found")
            return [new SequenceStep(start[0], start[1], "analyzing"), new SequenceStep(end[0], end[1], "analyzing")]
        }
    }
    return { dijkstraPathfinder }
}