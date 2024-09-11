export const useCreateGrid = () => {
    const createGrid = (n) => {
        let newGrid = new Array()
        for (let i = 0; i < n; i++) {
            let row = new Array()
            for(let j=0; j < n; j++){
                row.push(0)
            }
            newGrid.push(row)
        }
        return newGrid
    }
    return {createGrid}
}

// export const useTemplateGrid = () => {
//     const templateGrid = (seed) => {
//         if ()
//     }
// }
