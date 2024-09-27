// Stores data for each step in that the algorithm takes
export class SequenceStep {
    constructor(x, y, step) {
        this.x = x
        this.y = y
        this.step = step
    }
}

// Records to be sorted via heap
export class HeapEntry {
    constructor(cost, x, y) {
        this.cost = cost;
        this.x = x
        this.y = y
    }
}

// Memoization cell to record value and parent coordinates
export class AncestorCell {
    constructor(cost, px, py) {
        this.cost = cost;
        this.px = px;
        this.py = py;
    }

}

// Memoization cell, extended to support A* data
export class AStarAncestorCell extends AncestorCell{
    constructor(cost, pathLength, distance, px, py) {
        super(cost, px, py)
        this.pathLength = pathLength;
        this.distance = distance;
    }
}